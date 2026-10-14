import { Link } from 'react-router-dom'
import { links, nextEvent, photos, sponsorPackages, sponsorPackagesYear } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ArrowIcon, ExternalLink, PageHero, SectionHeader, Tba } from '../components/ui'

const playerOptions = sponsorPackages.filter((p) => p.name.startsWith('Foursome') || p.name.startsWith('Single Golfer'))

export default function Register() {
  useReveal()

  return (
    <main id="main">
      <PageHero
        eyebrow="Register"
        title="Come play with us"
        intro="Bring a foursome, join as a single golfer, or come for dinner. Registration and payment happen on GiveSmart, through Experience Camps."
        photo={photos.carts}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="reveal card p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-3xl">WWDD {nextEvent.year} registration</h2>
              {nextEvent.registrationOpen ? (
                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">Open</span>
              ) : (
                <Tba>Opening soon</Tba>
              )}
            </div>
            <ol className="mt-8 space-y-6">
              {[
                ['Choose how you’ll play', 'A foursome, a single spot, or a sponsorship that includes golf.'],
                ['Register on GiveSmart', 'You’ll pay there and can add your guests’ names to speed up check-in.'],
                ['Get ready for the day', 'We’ll share the schedule, attire and any travel details on the Tournament page.'],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold">{t}</h3>
                    <p className="text-slate">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {nextEvent.registrationOpen ? (
                <ExternalLink href={links.register} className="btn-primary">
                  Register on GiveSmart <ArrowIcon />
                </ExternalLink>
              ) : (
                <ExternalLink href={links.givesmart} className="btn-primary">
                  Check the GiveSmart event page <ArrowIcon />
                </ExternalLink>
              )}
              <Link to="/tournament" className="btn-ghost">Tournament details</Link>
            </div>
          </div>

          <aside className="reveal space-y-4">
            <div className="card p-7">
              <h2 className="font-serif text-2xl">Golfer spots</h2>
              <p className="mt-1 text-sm text-slate">{sponsorPackagesYear} pricing, for reference. {nextEvent.year} pricing to be announced.</p>
              <ul className="mt-5 divide-y divide-mist">
                {playerOptions.map((p) => (
                  <li key={p.name} className="flex items-baseline justify-between gap-4 py-3">
                    <span>
                      <span className="block font-medium">{p.name}</span>
                      <span className="text-sm text-slate">{p.perks.join(' · ')}</span>
                    </span>
                    <span className="font-serif text-xl text-brand">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7">
              <h2 className="font-serif text-2xl">Want to do more?</h2>
              <p className="mt-2 text-slate">
                Set up your own fundraising page and rally your people as a WWDD champion.
              </p>
              <ExternalLink href={links.champion} className="btn-ghost mt-5">
                Become a champion <ArrowIcon />
              </ExternalLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader title="Not a golfer?" intro="There’s still a place for you." />
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/sponsor" className="reveal card group p-7 hover:border-brand/30">
              <h3 className="font-serif text-2xl">Sponsor the tournament</h3>
              <p className="mt-2 text-slate">From a single hole sign to the title sponsorship.</p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand">See sponsorships <ArrowIcon /></span>
            </Link>
            <Link to="/donate" className="reveal card group p-7 hover:border-brand/30">
              <h3 className="font-serif text-2xl">Make a donation</h3>
              <p className="mt-2 text-slate">Give any amount to help send grieving kids to camp.</p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand">Donate <ArrowIcon /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
