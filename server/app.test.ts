// @vitest-environment node
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp, parseAdminEmails, roleFor } from './app.js'
import type { Interest, Result, Store, User } from './store.js'

function memoryStore(): Store {
  const users: (User & { sub: string; createdAt: string })[] = []
  const sessions = new Map<string, { userId: number; expiresAt: Date }>()
  const interest = new Map<number, Interest & { updatedAt: string }>()
  let results: Result[] = []
  const strip = ({ id, email, name, picture, role }: User): User => ({ id, email, name, picture, role })
  return {
    async upsertUser(p, role) {
      let u = users.find((x) => x.sub === p.sub)
      if (!u) users.push((u = { id: users.length + 1, sub: p.sub, email: p.email, name: p.name ?? null, picture: null, role, createdAt: '' }))
      u.role = role
      return strip(u)
    },
    async createSession(userId, hash, expiresAt) { sessions.set(hash, { userId, expiresAt }) },
    async userForSession(hash) {
      const s = sessions.get(hash)
      const u = s && s.expiresAt > new Date() ? users.find((x) => x.id === s.userId) : undefined
      return u ? strip(u) : null
    },
    async deleteSession(hash) { sessions.delete(hash) },
    async listUsers() { return users.map((u) => ({ ...strip(u), createdAt: u.createdAt })) },
    async getInterest(id) {
      const i = interest.get(id)
      return i ? { play: i.play, sponsor: i.sponsor, volunteer: i.volunteer, note: i.note } : null
    },
    async putInterest(id, i) { interest.set(id, { ...i, updatedAt: '' }); return i },
    async listInterest() {
      return [...interest].map(([id, i]) => {
        const u = users.find((x) => x.id === id)!
        return { ...i, user: { name: u.name, email: u.email } }
      })
    },
    async listResults() { return results },
    async addResult(r) { const row = { ...r, id: results.length + 1 }; results.push(row); return row },
    async deleteResult(id) { const before = results.length; results = results.filter((r) => r.id !== id); return results.length < before },
  }
}

/** Pretends to be Google: any code signs in as the person encoded in it. */
const fakeGoogle: typeof fetch = async (input, init) => {
  const url = String(input)
  if (url.includes('/token')) {
    const code = new URLSearchParams(String(init?.body)).get('code')!
    return new Response(JSON.stringify({ access_token: code }))
  }
  const who = String((init?.headers as Record<string, string>).authorization).replace('Bearer ', '')
  return new Response(JSON.stringify({ sub: `sub-${who}`, email: `${who}@example.com`, email_verified: true, name: who }))
}

function setup() {
  const app = createApp({
    store: memoryStore(),
    googleClientId: 'client-id',
    googleClientSecret: 'client-secret',
    adminEmails: ['owner@example.com'],
    commit: 'abc123',
    fetch: fakeGoogle,
  })
  return { app }
}

async function signIn(app: ReturnType<typeof setup>['app'], who: string) {
  const agent = request.agent(app)
  const start = await agent.get('/api/auth/google?next=/members')
  expect(start.status).toBe(302)
  const state = new URL(start.headers.location).searchParams.get('state')
  const done = await agent.get(`/api/auth/callback?code=${who}&state=${state}`)
  expect(done.status).toBe(302)
  expect(done.headers.location).toBe('/members')
  return agent
}

describe('public routes', () => {
  it('reports the running commit without sign-in', async () => {
    const res = await request(setup().app).get('/api/version')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ commit: 'abc123' })
  })

  it('sends people to Google asking only for openid, email and profile', async () => {
    const res = await request(setup().app).get('/api/auth/google').set('host', 'wwdd.test')
    const url = new URL(res.headers.location)
    expect(url.host).toBe('accounts.google.com')
    expect(url.searchParams.get('scope')).toBe('openid email profile')
    expect(url.searchParams.get('redirect_uri')).toBe('http://wwdd.test/api/auth/callback')
    expect(url.searchParams.get('code_challenge_method')).toBe('S256')
  })
})

describe('signing in', () => {
  it('refuses /api/me with 401 when not signed in', async () => {
    const res = await request(setup().app).get('/api/me')
    expect(res.status).toBe(401)
  })

  it('signs a member in and out', async () => {
    const agent = await signIn(setup().app, 'guest')
    const me = await agent.get('/api/me')
    expect(me.status).toBe(200)
    expect(me.body.user).toMatchObject({ email: 'guest@example.com', role: 'member' })

    expect((await agent.post('/api/auth/logout')).status).toBe(204)
    expect((await agent.get('/api/me')).status).toBe(401)
  })

  it('rejects a callback whose state does not match', async () => {
    const agent = request.agent(setup().app)
    await agent.get('/api/auth/google')
    const res = await agent.get('/api/auth/callback?code=guest&state=forged')
    expect(res.headers.location).toBe('/signin?error=state')
    expect((await agent.get('/api/me')).status).toBe(401)
  })

  it('never redirects off-site after sign-in', async () => {
    const agent = request.agent(setup().app)
    const start = await agent.get('/api/auth/google?next=//evil.example')
    const state = new URL(start.headers.location).searchParams.get('state')
    const done = await agent.get(`/api/auth/callback?code=guest&state=${state}`)
    expect(done.headers.location).toBe('/members')
  })
})

describe('authorization levels', () => {
  it('refuses members on admin routes with 403', async () => {
    const { app } = setup()
    const member = await signIn(app, 'guest')
    expect((await member.get('/api/admin/users')).status).toBe(403)
    expect((await member.get('/api/admin/interest')).status).toBe(403)
    expect((await member.post('/api/admin/results').send({ year: 2026, players: ['A'] })).status).toBe(403)
    expect((await member.delete('/api/admin/results/1')).status).toBe(403)
  })

  it('lets admins (by email) use admin routes', async () => {
    const { app } = setup()
    const owner = await signIn(app, 'owner')
    expect((await owner.get('/api/me')).body.user.role).toBe('admin')
    expect((await owner.get('/api/admin/users')).status).toBe(200)
    const added = await owner.post('/api/admin/results').send({ year: 2026, place: 1, teamName: 'Team Don', players: ['A', 'B'] })
    expect(added.status).toBe(201)
    const member = await signIn(app, 'guest')
    expect((await member.get('/api/results')).body.results).toHaveLength(1)
  })

  it('keeps each member to their own interest entry', async () => {
    const { app } = setup()
    const a = await signIn(app, 'alice')
    const b = await signIn(app, 'bob')
    await a.put('/api/interest/mine').send({ play: true, note: 'Bringing a foursome' })
    expect((await b.get('/api/interest/mine')).body.interest).toBeNull()
    expect((await a.get('/api/interest/mine')).body.interest).toMatchObject({ play: true, note: 'Bringing a foursome' })
  })

  it('refuses cross-site writes', async () => {
    const agent = await signIn(setup().app, 'guest')
    const res = await agent.put('/api/interest/mine').set('origin', 'https://evil.example').send({ play: true })
    expect(res.status).toBe(403)
  })
})

describe('admin emails', () => {
  it('parses a comma-separated list case-insensitively', () => {
    const list = parseAdminEmails(' Owner@Example.com, second@example.com ,')
    expect(list).toEqual(['owner@example.com', 'second@example.com'])
    expect(roleFor('OWNER@example.com', list)).toBe('admin')
    expect(roleFor('guest@example.com', list)).toBe('member')
  })
})
