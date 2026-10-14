import { Link } from 'react-router-dom'
import { contact, links, navLinks } from '../content/site'
import { ExternalLink } from './ui'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/wwdd-logo.png" alt="" width="48" height="48" className="h-12 w-12 rounded-full bg-white" />
            <div className="font-serif text-lg font-semibold leading-tight text-white">
              What Would Don Do?
              <span className="block font-sans text-xs font-normal uppercase tracking-[0.18em] text-sky">Charity Golf Tournament</span>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Honoring Don Weidenfeld through golf, community and generosity. Benefiting{' '}
            <ExternalLink href={links.experienceCamps} className="text-white underline underline-offset-2 hover:text-sky">
              Experience Camps
            </ExternalLink>
            .
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            {navLinks.map((l) => (
              <li key={l.path}><Link to={l.path} className="hover:text-white">{l.label}</Link></li>
            ))}
            <li><Link to="/donate" className="hover:text-white">Donate</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">Take part</h2>
          <ul className="space-y-2 text-sm">
            <li><ExternalLink href={links.givesmart} className="hover:text-white">Event page on GiveSmart</ExternalLink></li>
            <li><ExternalLink href={links.sponsor} className="hover:text-white">Sponsorship packages</ExternalLink></li>
            <li><ExternalLink href={links.donate} className="hover:text-white">Make a donation</ExternalLink></li>
            <li><ExternalLink href={links.champion} className="hover:text-white">Become a fundraising champion</ExternalLink></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">Contact</h2>
          <p className="text-sm leading-relaxed">
            Sponsorship questions:
            <br />
            {contact.sponsorships.name}, {contact.sponsorships.org}
            <br />
            <a href={`mailto:${contact.sponsorships.email}`} className="break-all text-white underline underline-offset-2 hover:text-sky">
              {contact.sponsorships.email}
            </a>
          </p>
          {contact.social.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {contact.social.map((s) => (
                <li key={s.href}><ExternalLink href={s.href} className="hover:text-white">{s.label}</ExternalLink></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} WWDD Charity Golf Tournament</p>
          <p>Registration, sponsorships and donations are processed by Experience Camps through GiveSmart.</p>
        </div>
      </div>
    </footer>
  )
}
