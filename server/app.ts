import { createHash, randomBytes } from 'node:crypto'
import express, { type NextFunction, type Request, type Response } from 'express'
import type { Interest, NewResult, Role, Store, User } from './store.js'

export type AppConfig = {
  store: Store
  googleClientId: string
  googleClientSecret: string
  /** Lower-case emails that get the admin role at sign-in. */
  adminEmails: string[]
  commit: string
  /** Swappable so tests never call Google. */
  fetch?: typeof fetch
}

const SESSION_COOKIE = 'wwdd_session'
const STATE_COOKIE = 'wwdd_oauth'
const SESSION_DAYS = 30

type Authed = Request & { user: User }

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  for (const part of header?.split(';') ?? []) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')
const base64url = (b: Buffer) => b.toString('base64url')

function origin(req: Request) {
  return `${req.protocol}://${req.get('host')}`
}

/** Only allow redirects back into this site after sign-in. */
function safeNext(next: unknown) {
  return typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/members'
}

function cookieOptions(req: Request, maxAgeMs: number) {
  return { httpOnly: true, secure: req.secure, sameSite: 'lax' as const, path: '/', maxAge: maxAgeMs }
}

export function roleFor(email: string, adminEmails: string[]): Role {
  return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'member'
}

export function parseAdminEmails(value: string | undefined) {
  return (value ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
}

export function createApp(config: AppConfig) {
  const { store } = config
  const doFetch = config.fetch ?? fetch
  const app = express()
  app.set('trust proxy', true)
  app.disable('x-powered-by')
  app.use(express.json({ limit: '50kb' }))

  // Cookie-authenticated writes must come from this site's own pages.
  app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD') return next()
    const from = req.get('origin')
    if (from && from !== origin(req)) return res.status(403).json({ error: 'Cross-site request refused.' })
    next()
  })

  // ── Public ──────────────────────────────────────────────

  app.get('/api/version', (_req, res) => {
    res.json({ commit: config.commit })
  })

  app.get('/api/auth/google', (req, res) => {
    const state = base64url(randomBytes(24))
    const verifier = base64url(randomBytes(32))
    const challenge = base64url(createHash('sha256').update(verifier).digest())
    const next = safeNext(req.query.next)
    res.cookie(STATE_COOKIE, JSON.stringify({ state, verifier, next }), cookieOptions(req, 10 * 60 * 1000))

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    url.search = new URLSearchParams({
      client_id: config.googleClientId,
      redirect_uri: `${origin(req)}/api/auth/callback`,
      response_type: 'code',
      // Only what the app uses: who you are, your email (for admin matching) and your name.
      scope: 'openid email profile',
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      prompt: 'select_account',
    }).toString()
    res.redirect(url.toString())
  })

  app.get('/api/auth/callback', async (req, res) => {
    const fail = (reason: string) => res.redirect(`/signin?error=${encodeURIComponent(reason)}`)
    let saved: { state: string; verifier: string; next: string }
    try {
      saved = JSON.parse(parseCookies(req.headers.cookie)[STATE_COOKIE] ?? '')
    } catch {
      return fail('expired')
    }
    res.clearCookie(STATE_COOKIE, { path: '/' })
    if (typeof req.query.code !== 'string' || req.query.state !== saved.state) return fail('state')

    try {
      const tokenRes = await doFetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: req.query.code,
          client_id: config.googleClientId,
          client_secret: config.googleClientSecret,
          redirect_uri: `${origin(req)}/api/auth/callback`,
          grant_type: 'authorization_code',
          code_verifier: saved.verifier,
        }),
      })
      if (!tokenRes.ok) return fail('token')
      const { access_token } = (await tokenRes.json()) as { access_token: string }

      const infoRes = await doFetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { authorization: `Bearer ${access_token}` },
      })
      if (!infoRes.ok) return fail('profile')
      const info = (await infoRes.json()) as { sub: string; email: string; email_verified: boolean; name?: string; picture?: string }
      if (!info.email_verified) return fail('unverified')

      const user = await store.upsertUser(info, roleFor(info.email, config.adminEmails))
      const token = base64url(randomBytes(32))
      const expires = new Date(Date.now() + SESSION_DAYS * 864e5)
      await store.createSession(user.id, sha256(token), expires)
      res.cookie(SESSION_COOKIE, token, cookieOptions(req, SESSION_DAYS * 864e5))
      res.redirect(saved.next)
    } catch (err) {
      console.error('auth callback failed', err)
      fail('server')
    }
  })

  app.post('/api/auth/logout', async (req, res) => {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE]
    if (token) await store.deleteSession(sha256(token))
    res.clearCookie(SESSION_COOKIE, { path: '/' })
    res.status(204).end()
  })

  // ── Signed in (members and admins) ──────────────────────

  async function requireUser(req: Request, res: Response, next: NextFunction) {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE]
    const user = token ? await store.userForSession(sha256(token)) : null
    if (!user) return res.status(401).json({ error: 'Sign in to continue.' })
    ;(req as Authed).user = user
    next()
  }

  function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if ((req as Authed).user.role !== 'admin') return res.status(403).json({ error: 'Admins only.' })
    next()
  }

  const wrap = (fn: (req: Authed, res: Response) => Promise<unknown>) => (req: Request, res: Response, next: NextFunction) =>
    fn(req as Authed, res).catch(next)

  app.get('/api/me', requireUser, (req, res) => {
    res.json({ user: (req as Authed).user })
  })

  app.get('/api/interest/mine', requireUser, wrap(async (req, res) => {
    res.json({ interest: await store.getInterest(req.user.id) })
  }))

  app.put('/api/interest/mine', requireUser, wrap(async (req, res) => {
    const b = req.body ?? {}
    const note = typeof b.note === 'string' ? b.note.trim() : ''
    if (note.length > 1000) return res.status(400).json({ error: 'Keep the note under 1,000 characters.' })
    const interest: Interest = { play: b.play === true, sponsor: b.sponsor === true, volunteer: b.volunteer === true, note }
    res.json({ interest: await store.putInterest(req.user.id, interest) })
  }))

  app.get('/api/results', requireUser, wrap(async (_req, res) => {
    res.json({ results: await store.listResults() })
  }))

  // ── Admins only ─────────────────────────────────────────

  app.get('/api/admin/users', requireUser, requireAdmin, wrap(async (_req, res) => {
    res.json({ users: await store.listUsers() })
  }))

  app.get('/api/admin/interest', requireUser, requireAdmin, wrap(async (_req, res) => {
    res.json({ interest: await store.listInterest() })
  }))

  app.post('/api/admin/results', requireUser, requireAdmin, wrap(async (req, res) => {
    const b = req.body ?? {}
    const year = Number(b.year)
    const players = Array.isArray(b.players) ? b.players.map(String).map((p: string) => p.trim()).filter(Boolean) : []
    const text = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, 200) : null)
    if (!Number.isInteger(year) || year < 2025 || year > 2100) return res.status(400).json({ error: 'Year must be 2025 or later.' })
    if (players.length === 0 && !text(b.teamName)) return res.status(400).json({ error: 'Add a team name or at least one player.' })
    const place = b.place === '' || b.place == null ? null : Number(b.place)
    if (place !== null && (!Number.isInteger(place) || place < 1)) return res.status(400).json({ error: 'Place must be a whole number.' })
    const result: NewResult = { year, place, teamName: text(b.teamName), players: players.slice(0, 8), score: text(b.score), note: text(b.note) }
    res.status(201).json({ result: await store.addResult(result) })
  }))

  app.delete('/api/admin/results/:id', requireUser, requireAdmin, wrap(async (req, res) => {
    const ok = await store.deleteResult(Number(req.params.id))
    res.status(ok ? 204 : 404).end()
  }))

  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }))

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    void _next
    console.error(err)
    res.status(500).json({ error: 'Something went wrong on our end.' })
  })

  return app
}
