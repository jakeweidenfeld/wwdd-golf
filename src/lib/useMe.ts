import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type User } from './api'

type MeState = { status: 'loading' } | { status: 'signed-out' } | { status: 'signed-in'; user: User } | { status: 'error' }

/** Who is signed in, according to the server. The UI only uses this for display; the API enforces access. */
export function useMe() {
  const [state, setState] = useState<MeState>({ status: 'loading' })

  const load = useCallback(async () => {
    try {
      const { user } = await api<{ user: User }>('/api/me')
      setState({ status: 'signed-in', user })
    } catch (err) {
      setState(err instanceof ApiError && err.status === 401 ? { status: 'signed-out' } : { status: 'error' })
    }
  }, [])

  useEffect(() => {
    let live = true
    api<{ user: User }>('/api/me')
      .then(({ user }) => live && setState({ status: 'signed-in', user }))
      .catch((err) => live && setState(err instanceof ApiError && err.status === 401 ? { status: 'signed-out' } : { status: 'error' }))
    return () => {
      live = false
    }
  }, [])

  const signOut = useCallback(async () => {
    await api('/api/auth/logout', { method: 'POST' })
    setState({ status: 'signed-out' })
  }, [])

  return { ...state, reload: load, signOut }
}
