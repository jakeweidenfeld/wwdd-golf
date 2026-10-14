import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About WWDD', path: '/about' },
  { label: 'Experience Camps', path: '/experience-camps' },
  { label: 'Event Info', path: '/event-info' },
  { label: 'Register / Donate', path: '/register' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Photos', path: '/photos' },
  { label: 'Impact & Stats', path: '/impact' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/wwdd-logo.jpg" alt="WWDD Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div>
                <div className="font-serif text-white text-lg font-semibold leading-tight">What Would Don Do?</div>
                <div className="font-sans text-white/50 text-xs tracking-wider uppercase">Charity Golf Tournament</div>
              </div>
            </div>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              Honoring Don Weidenfeld's legacy,<br />one round at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-base mb-4 font-semibold">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-sans text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-base mb-4 font-semibold">Get In Touch</h4>
            <a
              href="mailto:wwddgolf@gmail.com"
              className="font-sans text-white/80 text-sm hover:text-white transition-colors block mb-2"
            >
              wwddgolf@gmail.com
            </a>
            <p className="font-sans text-white/50 text-sm mb-6">
              Boca West Country Club<br />
              Boca Raton, FL
            </p>
            <a
              href="https://experiencecamps.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-white/60 hover:text-white transition-colors"
            >
              Benefiting Experience Camps ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} What Would Don Do? Charity Golf Tournament.
            All rights reserved.
          </p>
          <p className="font-sans text-white/30 text-xs">
            Proceeds benefit{' '}
            <a
              href="https://experiencecamps.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Experience Camps
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
