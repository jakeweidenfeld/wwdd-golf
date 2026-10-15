import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { api, type Interest, type Result, type User } from '../lib/api'
import { useMe } from '../lib/useMe'

export function MemberShell({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <main id="main" className="flex-1 bg-mist pb-20 pt-28 sm:pt-32">
      <div className="container-page">
        <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="lede mt-3 max-w-2xl">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </main>
  )
}

export function Loading() {
  return <main id="main" className="flex-1 bg-mist pt-40 text-center text-slate">Loading…</main>
}

function groupByYear(results: Result[]) {
  const years = new Map<number, Result[]>()
  for (const r of results) years.set(r.year, [...(years.get(r.year) ?? []), r])
  return [...years].sort(([a], [b]) => b - a)
}

function InterestForm() {
  const [form, setForm] = useState<Interest | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    api<{ interest: Interest | null }>('/api/interest/mine')
      .then(({ interest }) => setForm(interest ?? { play: false, sponsor: false, volunteer: false, note: '' }))
      .catch(() => setStatus('error'))
  }, [])

  async function save(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setStatus('saving')
    try {
      const { interest } = await api<{ interest: Interest }>('/api/interest/mine', { method: 'PUT', body: JSON.stringify(form) })
      setForm(interest)
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  if (!form) return <p className="text-slate">{status === 'error' ? 'Couldn’t load your entry.' : 'Loading…'}</p>

  const box = (key: 'play' | 'sponsor' | 'volunteer', label: string) => (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-mist px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-soft/40">
      <input
        type="checkbox"
        checked={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.checked }); setStatus('idle') }}
        className="h-4 w-4 accent-brand"
      />
      <span className="font-medium">{label}</span>
    </label>
  )

  return (
    <form onSubmit={save} className="space-y-4">
      <fieldset>
        <legend className="mb-3 text-sm text-slate">In 2027, I’d like to…</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {box('play', 'Play')}
          {box('sponsor', 'Sponsor')}
          {box('volunteer', 'Volunteer')}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-2 block text-sm text-slate">Anything we should know? (optional)</span>
        <textarea
          value={form.note}
          maxLength={1000}
          rows={3}
          onChange={(e) => { setForm({ ...form, note: e.target.value }); setStatus('idle') }}
          className="w-full rounded-xl border border-mist px-4 py-3 focus:border-brand focus:outline-none"
          placeholder="For example: bringing a foursome"
        />
      </label>
      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === 'saving'} className="btn-primary disabled:opacity-60">
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        <span role="status" className="text-sm text-slate">
          {status === 'saved' && 'Saved. Only you and the organizers can see this.'}
          {status === 'error' && 'Couldn’t save. Please try again.'}
        </span>
      </div>
    </form>
  )
}

export function ResultsList({ results, onDelete }: { results: Result[]; onDelete?: (id: number) => void }) {
  if (results.length === 0) return <p className="text-slate">No results posted yet.</p>
  return (
    <div className="space-y-8">
      {groupByYear(results).map(([year, rows]) => (
        <div key={year}>
          <h3 className="font-serif text-2xl">WWDD {year}</h3>
          <ul className="mt-3 divide-y divide-mist rounded-xl border border-mist">
            {rows.map((r) => (
              <li key={r.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-4">
                <span className="font-serif text-xl text-brand">{r.place ? `#${r.place}` : '–'}</span>
                <span>
                  <span className="block font-medium">{r.teamName ?? r.note ?? 'Team'}</span>
                  <span className="text-sm text-slate">{r.players.join(', ')}</span>
                </span>
                <span className="flex items-center gap-4 text-sm">
                  {r.score && <span className="font-semibold">{r.score}</span>}
                  {onDelete && (
                    <button type="button" onClick={() => onDelete(r.id)} className="text-slate underline hover:text-ink">
                      Remove
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Results() {
  const [results, setResults] = useState<Result[] | null>(null)
  useEffect(() => {
    api<{ results: Result[] }>('/api/results').then(({ results }) => setResults(results)).catch(() => setResults([]))
  }, [])
  return results ? <ResultsList results={results} /> : <p className="text-slate">Loading…</p>
}

export default function Members() {
  const me = useMe()
  if (me.status === 'loading') return <Loading />
  if (me.status !== 'signed-in') return <Navigate to="/signin?next=/members" replace />
  const user: User = me.user

  return (
    <MemberShell title={`Welcome${user.name ? `, ${user.name.split(' ')[0]}` : ''}`} intro="Your WWDD member area.">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {user.role === 'admin' && <Link to="/admin" className="btn-primary">Admin dashboard</Link>}
        <button type="button" onClick={() => me.signOut()} className="btn-ghost">Sign out</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-7">
          <h2 className="font-serif text-2xl">2027 interest list</h2>
          <p className="mb-5 mt-1 text-sm text-slate">Let the organizers know how you’d like to be involved. We’ll reach out when registration opens.</p>
          <InterestForm />
        </section>
        <section className="card p-7">
          <h2 className="font-serif text-2xl">Past finishes</h2>
          <p className="mb-5 mt-1 text-sm text-slate">Teams, scores and finishes from past tournaments.</p>
          <Results />
        </section>
      </div>
    </MemberShell>
  )
}
