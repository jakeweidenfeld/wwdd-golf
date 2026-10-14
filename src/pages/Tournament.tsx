import { lastEvent, links, nextEvent, photos } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ActionBand, ArrowIcon, ExternalLink, PageHero, SectionHeader, Tba } from '../components/ui'

function Detail({ label, value, sub }: { label: string; value: string | null; sub?: string }) {
  return (
    <div className="reveal card p-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">{label}</dt>
      <dd className="mt-3">
        {value ? (
          <>
            <span className="font-serif text-2xl text-ink">{value}</span>
            {sub && <span className="mt-1 block text-sm text-slate">{sub}</span>}
          </>
        ) : (
          <Tba />
        )}
      </dd>
    </div>
  )
}

export default function Tournament() {
  useReveal()
  const schedule = nextEvent.schedule

  return (
    <main id="main">
      <PageHero
        eyebrow="Tournament information"
        title={`WWDD ${nextEvent.year}`}
        intro="Golf in the afternoon, cocktails, dinner and awards in the evening. We’ll post this year’s details here as soon as they’re set."
        photo={photos.course}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader eyebrow={`The ${nextEvent.year} tournament`} title="Key details" />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="Date" value={nextEvent.date} />
            <Detail label="Location" value={nextEvent.location} />
            <Detail label="Attire" value={nextEvent.attire} />
            <Detail label="Registration" value={nextEvent.registrationOpen ? 'Open now' : null} />
          </dl>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="reveal card p-7">
              <h3 className="font-serif text-2xl">Schedule</h3>
              {schedule ? (
                <ul className="mt-5 divide-y divide-mist border-y border-mist">
                  {schedule.map((s) => (
                    <li key={s.label} className="flex justify-between gap-4 py-3">
                      <span className="font-medium">{s.label}</span>
                      <span className="text-slate">{s.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 space-y-3">
                  <Tba>{nextEvent.year} schedule to be announced</Tba>
                  <p className="text-slate">For reference, last year’s schedule is below.</p>
                </div>
              )}
            </div>
            <div className="reveal card p-7">
              <h3 className="font-serif text-2xl">Travel & accommodations</h3>
              <div className="mt-4 space-y-3">
                <Tba>Hotel information to be announced</Tba>
                <p className="text-slate">If there’s a hotel room block for {nextEvent.year}, the booking link will be posted here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="reveal">
            <span className="eyebrow">Last year</span>
            <h2 className="h-section">How WWDD {lastEvent.year} ran</h2>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm text-slate">Date</dt>
                <dd className="mt-1 font-semibold">{lastEvent.date}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Attire</dt>
                <dd className="mt-1 font-semibold">{lastEvent.attire}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm text-slate">Location</dt>
                <dd className="mt-1 font-semibold">
                  {lastEvent.location}, {lastEvent.city}{' '}
                  <ExternalLink href={links.map} className="ml-1 font-normal text-brand underline underline-offset-2 hover:text-brand-light">
                    View map
                  </ExternalLink>
                </dd>
              </div>
            </dl>
            <ul className="card mt-8 divide-y divide-mist px-6">
              {lastEvent.schedule.map((s) => (
                <li key={s.label} className="flex justify-between gap-4 py-4">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-slate">{s.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            <img src={photos.swing.src} alt={photos.swing.alt} loading="lazy" className="col-span-2 aspect-[3/2] w-full rounded-2xl object-cover" />
            <img src={photos.putt.src} alt={photos.putt.alt} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
            <img src={photos.dinnerTable.src} alt={photos.dinnerTable.alt} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            eyebrow="The day"
            title="What to expect"
            intro={`Based on how the tournament has run so far. We’ll confirm the ${nextEvent.year} line-up once it’s set.`}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'Golf', b: 'A shotgun start, so every group tees off at once, with contests on the competition holes.' },
              { t: 'Cocktails', b: 'Everyone comes off the course and the evening begins.' },
              { t: 'Dinner & awards', b: 'A buffet dinner, the tournament awards, and time with the whole WWDD community.' },
            ].map((x) => (
              <div key={x.t} className="reveal card p-7">
                <h3 className="font-serif text-2xl">{x.t}</h3>
                <p className="mt-2 text-slate">{x.b}</p>
              </div>
            ))}
          </div>
          <ExternalLink href={links.givesmart} className="btn-ghost reveal mt-10">
            See the event page on GiveSmart <ArrowIcon />
          </ExternalLink>
        </div>
      </section>

      <ActionBand />
    </main>
  )
}
