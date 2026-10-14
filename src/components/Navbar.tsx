import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../content/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-navy-deep/95 shadow-lg backdrop-blur' : 'bg-gradient-to-b from-navy-deep/70 to-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="WWDD Charity Golf Tournament home">
          <img src="/images/wwdd-logo.png" alt="" width="44" height="44" className="h-10 w-10 rounded-full bg-white sm:h-11 sm:w-11" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-white">What Would Don Do?</span>
            <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-sky sm:block">Charity Golf Tournament</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/donate" className="btn-light hidden px-5 py-2.5 text-sm sm:inline-flex">
            Donate
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-white/10 lg:hidden">
        <div className="container-page flex flex-col gap-1 py-4">
          {[{ label: 'Home', path: '/' }, ...navLinks, { label: 'Donate', path: '/donate' }].map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-white/15 text-white' : 'text-white/85 hover:bg-white/10'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
