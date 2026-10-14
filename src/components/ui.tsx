import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Photo } from '../content/site'
import { links, nextEvent } from '../content/site'

export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Tba({ children = 'To be announced' }: { children?: ReactNode }) {
  return (
    <span className="tba">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-light" />
      {children}
    </span>
  )
}

export function PageHero({ eyebrow, title, intro, photo }: { eyebrow: string; title: ReactNode; intro?: ReactNode; photo: Photo }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-28 pb-16 sm:pt-36 sm:pb-24">
      <img src={photo.src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/40" />
      <div className="container-page">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-sky">{eyebrow}</span>
        <h1 className="max-w-3xl font-serif text-4xl text-white sm:text-5xl md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
      </div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={`reveal mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h-section">{title}</h2>
      {intro && <p className="lede mt-4">{intro}</p>}
    </div>
  )
}

export function RegisterButton({ variant = 'primary' }: { variant?: 'primary' | 'light' }) {
  const cls = variant === 'light' ? 'btn-light' : 'btn-primary'
  if (nextEvent.registrationOpen) {
    return (
      <ExternalLink href={links.register} className={cls}>
        Register to play <ArrowIcon />
      </ExternalLink>
    )
  }
  return (
    <Link to="/register" className={cls}>
      Registration info <ArrowIcon />
    </Link>
  )
}

/** The three ways to take part, repeated at the bottom of most pages. */
export function ActionBand() {
  const items = [
    { title: 'Play', body: 'Bring a foursome or come as a single golfer.', to: '/register', label: 'How to register' },
    { title: 'Sponsor', body: 'Put your name behind the day, from a hole sign to the title.', to: '/sponsor', label: 'Sponsorships' },
    { title: 'Give', body: 'Can’t make it? A donation still sends kids to camp.', to: '/donate', label: 'Donate' },
  ]
  return (
    <section className="bg-brand py-16 sm:py-20">
      <div className="container-page">
        <h2 className="reveal mb-10 text-center font-serif text-3xl text-white sm:text-4xl">Three ways to be part of it</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((i) => (
            <Link
              key={i.title}
              to={i.to}
              className="reveal group rounded-2xl bg-white/10 p-7 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
            >
              <h3 className="font-serif text-2xl">{i.title}</h3>
              <p className="mt-2 text-white/80">{i.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky group-hover:text-white">
                {i.label} <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
