import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About WWDD', path: '/about' },
  { label: 'Experience Camps', path: '/experience-camps' },
  { label: 'Event Info', path: '/event-info' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Photos', path: '/photos' },
  { label: 'Impact & Stats', path: '/impact' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-forest shadow-lg'
          : 'bg-forest/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img src="/wwdd-logo.jpg" alt="WWDD Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="hidden sm:block">
              <div className="font-serif text-white text-base leading-tight font-600" style={{ fontWeight: 600 }}>What Would Don Do?</div>
              <div className="font-sans text-white/50 text-xs tracking-wider uppercase">Charity Golf Tournament</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-sm px-3 py-2 rounded transition-colors duration-150 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-white font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="btn-primary text-sm px-5 py-2.5 hidden sm:inline-flex"
            >
              Register / Donate
            </Link>
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-forest-dark border-t border-forest-light/20 transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-sans text-base px-3 py-2.5 rounded transition-colors ${
                location.pathname === link.path
                  ? 'text-white font-semibold bg-forest-light/30'
                  : 'text-white/70 hover:text-white hover:bg-forest-light/20'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/register"
            className="btn-primary mt-3 text-center"
          >
            Register / Donate
          </Link>
        </nav>
      </div>
    </header>
  )
}
