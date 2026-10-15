import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { signInUrl } from '../lib/api'
import { useMe } from '../lib/useMe'

const errors: Record<string, string> = {
  expired: 'That sign-in took too long. Please try again.',
  state: 'We couldn’t confirm that sign-in. Please try again.',
  unverified: 'Your Google account’s email isn’t verified yet.',
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.2C12.5 13.6 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z" />
      <path fill="#FBBC05" d="M10.5 28.5c-.5-1.4-.8-2.9-.8-4.5s.3-3.1.8-4.5l-7.9-6.2C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6.2z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.2C6.6 42.6 14.6 48 24 48z" />
    </svg>
  )
}

export default function SignIn() {
  const me = useMe()
  const [params] = useSearchParams()
  const error = params.get('error')
  const next = params.get('next') ?? '/members'

  if (me.status === 'signed-in') return <Navigate to={next} replace />

  return (
    <main id="main" className="relative isolate flex flex-1 items-center overflow-hidden bg-navy-deep px-4 pb-16 pt-28">
      <img src="/images/course-hole-9.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <img src="/images/wwdd-logo.png" alt="" width="64" height="64" className="mx-auto h-16 w-16" />
        <h1 className="mt-5 text-center font-serif text-3xl">Member sign in</h1>
        <p className="mt-3 text-center text-slate">
          Sign in to join the 2027 interest list, see past results and teams, and share your tournament photos.
        </p>

        {error && (
          <p role="alert" className="mt-6 rounded-xl bg-brand-soft/60 px-4 py-3 text-sm text-ink">
            {errors[error] ?? 'Sign-in didn’t work. Please try again.'}
          </p>
        )}

        <a
          href={signInUrl(next)}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-slate/30 bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-mist"
        >
          <GoogleMark />
          Continue with Google
        </a>

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-light">
          We only receive your name, email and profile photo from Google. We never see your password.
        </p>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-brand underline underline-offset-2">Back to the site</Link>
        </p>
      </div>
    </main>
  )
}
