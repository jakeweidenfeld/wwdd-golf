export type Role = 'member' | 'admin'
export type User = { id: number; email: string; name: string | null; picture: string | null; role: Role }
export type Interest = { play: boolean; sponsor: boolean; volunteer: boolean; note: string }
export type Result = {
  id: number
  year: number
  place: number | null
  teamName: string | null
  players: string[]
  score: string | null
  note: string | null
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'same-origin',
    ...init,
    headers: init?.body ? { 'content-type': 'application/json', ...init.headers } : init?.headers,
  })
  if (res.status === 204) return undefined as T
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(res.status, body.error ?? 'Something went wrong.')
  return body as T
}

export const signInUrl = (next = '/members') => `/api/auth/google?next=${encodeURIComponent(next)}`
