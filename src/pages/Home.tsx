import { Link } from 'react-router-dom'
import { history, lastEvent, links, nextEvent, photos, values } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ActionBand, ArrowIcon, ExternalLink, RegisterButton, SectionHeader, Tba } from '../components/ui'

export default function Home() {
  useReveal()

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-navy-deep">
        <img
          src={photos.hero.src}
          alt={photos.hero.alt}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/20" />
        <div className="container-page pb-16 pt-32 sm:pb-24">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Annual charity golf tournament & dinner
          </span>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            What Would <em className="font-medium">Don</em> Do?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            A day of golf, a night together, and a way to keep Don Weidenfeld’s spirit going, all to send grieving kids to{' '}
            <ExternalLink href={links.experienceCamps} className="text-white underline decoration-sky underline-offset-4 hover:decoration-white">
              Experience Camps
            </ExternalLink>
            .
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <RegisterButton variant="light" />
            <Link to="/sponsor" className="btn-ghost-light">Become a sponsor</Link>
            <Link to="/donate" className="btn-ghost-light">Donate</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="font-semibold text-white">WWDD {nextEvent.year}</span>
            <span aria-hidden="true">·</span>
            {nextEvent.date ? <span>{nextEvent.date}</span> : <span>Date to be announced</span>}
            {nextEvent.location && (
              <>
                <span aria-hidden="true">·</span>
                <span>{nextEvent.location}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <span className="eyebrow">Why WWDD</span>
            <h2 className="h-section">More than a golf tournament</h2>
            <p className="lede mt-5">
              Don Weidenfeld was taken from this world far too early, at 52, by a sudden heart attack. We knew we wanted to carry
              his legacy on, forever.
            </p>
            <p className="lede mt-4">
              Since losing Don, the Weidenfelds have found a loving community in Experience Camps, which supports grieving kids
              through camp, connection and play. This tournament is how we honor Don, bring people together, and make sure no kid
              grieves alone.
            </p>
            <Link to="/about" className="btn-ghost mt-8">
              Read our story <ArrowIcon />
            </Link>
          </div>
          <div className="reveal grid grid-cols-5 grid-rows-5 gap-3 sm:gap-4">
            <img src={photos.speech.src} alt={photos.speech.alt} loading="lazy" className="col-span-3 row-span-3 h-full w-full rounded-2xl object-cover" />
            <img src={photos.blueHats.src} alt={photos.blueHats.alt} loading="lazy" className="col-span-2 row-span-2 h-full w-full rounded-2xl object-cover" />
            <img src={photos.dinnerDance.src} alt={photos.dinnerDance.alt} loading="lazy" className="col-span-2 row-span-3 h-full w-full rounded-2xl object-cover" />
            <img src={photos.hawaiian.src} alt={photos.hawaiian.alt} loading="lazy" className="col-span-3 row-span-2 h-full w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Don’s core values"
            title="Five ways Don lived, and the way we play"
            intro="Don lived by five core values. They shape everything about this day, from the first tee to the last dance."
            center
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <li key={v.name} className="reveal card flex flex-col p-6">
                <span className="font-serif text-3xl text-brand-light">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl text-ink">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{v.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The day */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader
            eyebrow="The tournament"
            title="An afternoon on the course, an evening together"
            intro={`Golf, cocktails, dinner and awards, with the whole WWDD community in one place. Here is how ${lastEvent.year} ran; details for ${nextEvent.year} are on the way.`}
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="reveal card p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-2xl">WWDD {nextEvent.year}</h3>
                {!nextEvent.date && <Tba>Date & details coming soon</Tba>}
              </div>
              <p className="mt-3 text-slate">
                Last year we played on {lastEvent.date} at {lastEvent.location} in {lastEvent.city}:
              </p>
              <ul className="mt-6 divide-y divide-mist border-y border-mist">
                {lastEvent.schedule.map((s) => (
                  <li key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-medium text-ink">{s.label}</span>
                    <span className="text-sm text-slate">{s.time}</span>
                  </li>
                ))}
              </ul>
              <Link to="/tournament" className="btn-ghost mt-7">
                Tournament details <ArrowIcon />
              </Link>
            </div>
            <img src={photos.teeShot.src} alt={photos.teeShot.alt} loading="lazy" className="reveal h-full min-h-72 w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-navy-deep py-20 text-white sm:py-24">
        <div className="container-page">
          <div className="reveal mb-12 max-w-2xl">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-sky">What we’ve done together</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem]">Two years in, and growing</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {history.map((h) => (
              <div key={h.year} className="reveal rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky">
                  {h.year} · {h.title}
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-6">
                  {h.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-sm text-white/65">{f.label}</dt>
                      <dd className="mt-1 font-serif text-3xl sm:text-4xl">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <Link to="/impact" className="reveal mt-10 inline-flex items-center gap-2 font-semibold text-sky hover:text-white">
            See the community and photos <ArrowIcon />
          </Link>
        </div>
      </section>

      <ActionBand />
    </main>
  )
}
