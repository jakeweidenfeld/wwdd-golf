import { contact, links, nextEvent, photos, sponsorPackages, sponsorPackagesYear, sponsors } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ArrowIcon, ExternalLink, PageHero, SectionHeader, Tba } from '../components/ui'

export default function Sponsor() {
  useReveal()

  return (
    <main id="main">
      <PageHero
        eyebrow="Sponsor"
        title="Put your name behind the day"
        intro="Sponsors make WWDD possible. Businesses, families and friends sponsor everything from a single hole to the whole tournament."
        photo={photos.sponsorBoard}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="reveal mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">Packages</span>
              <h2 className="h-section">{sponsorPackagesYear} sponsorship packages</h2>
              <p className="lede mt-4">
                Here’s what was offered last year, for reference. {nextEvent.year} packages will be posted on GiveSmart.
              </p>
            </div>
            <Tba>{nextEvent.year} packages to be announced</Tba>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorPackages.map((p) => (
              <li key={p.name} className="reveal card flex flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {p.nickname && <span className="text-sm text-brand-light">{p.nickname}</span>}
                    <h3 className="font-serif text-xl leading-snug">{p.name}</h3>
                  </div>
                  {p.status === 'sold-out' ? (
                    <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-slate">Sold out in {sponsorPackagesYear}</span>
                  ) : (
                    <span className="shrink-0 font-serif text-2xl text-brand">{p.price}</span>
                  )}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" fill="currentColor">
                        <path d="M8 13.6 4.4 10l-1.4 1.4L8 16.4 17 7.4 15.6 6z" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="reveal mt-12 rounded-2xl bg-brand p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl">Interested in sponsoring?</h2>
              <p className="mt-3 text-white/85">
                Choose a package on GiveSmart. To pay offline by check, ACH or stock, or with any questions, contact{' '}
                {contact.sponsorships.name} at {contact.sponsorships.org}.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <ExternalLink href={links.sponsor} className="btn-light">
                Sponsorships on GiveSmart <ArrowIcon />
              </ExternalLink>
              <a href={`mailto:${contact.sponsorships.email}?subject=WWDD%20sponsorship`} className="btn-ghost-light">
                Email {contact.sponsorships.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Thank you" title={`Our ${sponsorPackagesYear} sponsors`} intro="With gratitude to everyone who made last year possible." center />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sponsors.map((s) => (
              <li key={s.name} className="reveal">
                <ExternalLink
                  href={s.href}
                  className="card flex h-28 items-center justify-center p-5 text-center font-serif text-lg text-ink transition-colors hover:border-brand/30 hover:text-brand"
                >
                  {s.logo ? <img src={s.logo} alt={s.name} className="max-h-16 w-auto object-contain" /> : s.name}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
