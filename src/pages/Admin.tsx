import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { api, type Interest, type Result, type User } from '../lib/api'
import { useMe } from '../lib/useMe'
import { Loading, MemberShell, ResultsList } from './Members'

type InterestRow = Interest & { user: { name: string | null; email: string }; updatedAt: string }

function AddResult({ onAdded }: { onAdded: () => void }) {
  const empty = { year: String(new Date().getFullYear()), place: '', teamName: '', players: '', score: '' }
  const [f, setF] = useState(empty)
  const [error, setError] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/admin/results', {
        method: 'POST',
        body: JSON.stringify({ ...f, players: f.players.split(',') }),
      })
      setF(empty)
      onAdded()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const input = (key: keyof typeof empty, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="mb-1 block text-sm text-slate">{label}</span>
      <input
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
        className="w-full rounded-xl border border-mist px-3 py-2 focus:border-brand focus:outline-none"
        {...props}
      />
    </label>
  )

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-4">
      {input('year', 'Year', { type: 'number', required: true, min: 2025 })}
      {input('place', 'Place', { type: 'number', min: 1 })}
      {input('score', 'Score')}
      {input('teamName', 'Team name')}
      <div className="sm:col-span-4">{input('players', 'Players (comma-separated)')}</div>
      <div className="flex items-center gap-4 sm:col-span-4">
        <button type="submit" className="btn-primary">Add result</button>
        {error && <span role="alert" className="text-sm text-ink">{error}</span>}
      </div>
    </form>
  )
}

export default function Admin() {
  const me = useMe()
  const [users, setUsers] = useState<(User & { createdAt: string })[]>([])
  const [interest, setInterest] = useState<InterestRow[]>([])
  const [results, setResults] = useState<Result[]>([])
  const isAdmin = me.status === 'signed-in' && me.user.role === 'admin'

  const load = useCallback(() => {
    api<{ users: (User & { createdAt: string })[] }>('/api/admin/users').then((r) => setUsers(r.users))
    api<{ interest: InterestRow[] }>('/api/admin/interest').then((r) => setInterest(r.interest))
    api<{ results: Result[] }>('/api/results').then((r) => setResults(r.results))
  }, [])

  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin, load])

  if (me.status === 'loading') return <Loading />
  if (me.status !== 'signed-in') return <Navigate to="/signin?next=/admin" replace />
  if (!isAdmin) {
    return (
      <MemberShell title="Admins only" intro="Your account doesn’t have admin access.">
        <Link to="/members" className="btn-primary">Back to the member area</Link>
      </MemberShell>
    )
  }

  async function remove(id: number) {
    if (!confirm('Remove this result?')) return
    await api(`/api/admin/results/${id}`, { method: 'DELETE' })
    load()
  }

  const yes = (b: boolean) => (b ? '✓' : '')

  return (
    <MemberShell title="Admin dashboard" intro="Signed-in members, the 2027 interest list, and tournament results.">
      <Link to="/members" className="btn-ghost mb-6">Member area</Link>
      <div className="space-y-6">
        <section className="card overflow-hidden">
          <h2 className="px-7 pt-7 font-serif text-2xl">Interest list ({interest.length})</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-mist text-slate">
                <tr><th className="px-7 py-2 font-medium">Name</th><th className="font-medium">Email</th><th className="font-medium">Play</th><th className="font-medium">Sponsor</th><th className="font-medium">Volunteer</th><th className="pr-7 font-medium">Note</th></tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {interest.map((i) => (
                  <tr key={i.user.email}>
                    <td className="px-7 py-3">{i.user.name}</td><td>{i.user.email}</td>
                    <td>{yes(i.play)}</td><td>{yes(i.sponsor)}</td><td>{yes(i.volunteer)}</td><td className="pr-7">{i.note}</td>
                  </tr>
                ))}
                {interest.length === 0 && <tr><td colSpan={6} className="px-7 py-4 text-slate">No entries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card p-7">
          <h2 className="font-serif text-2xl">Results</h2>
          <div className="mt-5"><AddResult onAdded={load} /></div>
          <div className="mt-8"><ResultsList results={results} onDelete={remove} /></div>
        </section>

        <section className="card overflow-hidden">
          <h2 className="px-7 pt-7 font-serif text-2xl">Members ({users.length})</h2>
          <p className="px-7 text-sm text-slate">Admins are set by email in the ADMIN_EMAILS setting on Vercel.</p>
          <ul className="mt-4 divide-y divide-mist">
            {users.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-2 px-7 py-3 text-sm">
                <span><span className="font-medium">{u.name}</span> <span className="text-slate">{u.email}</span></span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.role === 'admin' ? 'bg-brand text-white' : 'bg-mist text-slate'}`}>{u.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MemberShell>
  )
}
