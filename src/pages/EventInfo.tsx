import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

const schedule = [
  { time: '12:00 PM', event: 'Golfer Registration & Warm-Up', detail: 'Check in, practice range, putting green, welcome cocktail' },
  { time: '1:00 PM', event: 'Shotgun Start', detail: 'All foursomes begin simultaneously across the course' },
  { time: '5:30 PM', event: 'Cocktail Hour Opens', detail: 'Drinks, hors d\'oeuvres, silent auction & mingles' },
  { time: '6:00 PM', event: 'Buffet Dinner & Awards Ceremony', detail: 'Dinner, live auction, awards presentation & program' },
]

export default function EventInfo() {
  useReveal()

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="relative bg-forest overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1400&q=80&fit=crop')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Mark Your Calendar</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            2027 Event Information
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            <span className="font-sans text-white text-sm">Coming Late April 2027 — Date TBD</span>
          </div>
        </div>
      </section>

      {/* ── DATE NOTICE ── */}
      <section className="bg-forest/10 border-b border-forest/20 py-5 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-forest text-base">
            <strong>2027 date not yet finalized.</strong>{' '}
            <Link to="/register" className="text-forest-light underline underline-offset-2 hover:text-forest transition-colors">
              Sign up below to be notified
            </Link>{' '}
            when the date is confirmed.
          </p>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <span className="section-label">The Venue</span>
              <h2 className="section-title mb-6">
                Boca West<br />
                <span className="italic text-forest-muted">Country Club</span>
              </h2>
              <div className="divider-accent mb-8" />
              <div className="space-y-4 section-body">
                <p>
                  One of South Florida's most prestigious private clubs, Boca West Country Club
                  offers four championship golf courses, impeccable service, and a setting worthy
                  of Don's legacy.
                </p>
                <div className="flex items-start gap-3 pt-2">
                  <span className="text-forest-light text-xl flex-shrink-0 mt-0.5">📍</span>
                  <div>
                    <div className="font-sans text-forest font-semibold">Boca West Country Club</div>
                    <div className="font-sans text-forest-muted text-base">20583 Boca West Dr</div>
                    <div className="font-sans text-forest-muted text-base">Boca Raton, FL 33434</div>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Boca+West+Country+Club/@26.378,-80.166,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-forest mt-8 inline-flex"
              >
                Get Directions ↗
              </a>
            </div>

            {/* Map placeholder */}
            <div className="reveal">
              <div className="rounded-sm overflow-hidden shadow-xl border border-cream-dark">
                <div
                  className="aspect-[16/10] bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80&fit=crop')`,
                  }}
                >
                  <div className="absolute inset-0 bg-forest/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-forest-light mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">📍</span>
                      </div>
                      <div className="font-sans text-white font-semibold text-sm bg-black/50 rounded-full px-4 py-2">
                        Boca West Country Club
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 flex items-center justify-between">
                  <span className="font-sans text-forest-muted text-sm">20583 Boca West Dr, Boca Raton, FL 33434</span>
                  <a
                    href="https://www.google.com/maps/place/Boca+West+Country+Club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-forest-light text-sm hover:text-forest transition-colors whitespace-nowrap ml-4"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="bg-forest-dark py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">Day of Event</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-4 leading-tight">
              2027 Event Schedule
            </h2>
            <div className="divider-accent mx-auto" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-white/20 hidden sm:block" />

            <div className="stagger space-y-6">
              {schedule.map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 hidden sm:flex">
                    <div className="w-12 h-12 rounded-full bg-forest border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-white/70" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-white/5 border border-white/10 rounded-sm p-6 flex-1 hover:border-white/25 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="font-sans text-white/80 font-semibold text-sm tracking-wide">{item.time}</span>
                      <span className="hidden sm:block text-white/20">·</span>
                      <h3 className="font-serif text-white text-lg font-semibold">{item.event}</h3>
                    </div>
                    <p className="font-sans text-white/55 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMAT ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="section-label">Golf Format</span>
            <h2 className="section-title">Sliding Scramble</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>

          <div className="card-premium p-10 md:p-14 reveal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 section-body space-y-5">
                <p>
                  In a <strong className="text-forest">Sliding Scramble</strong>, all players in a foursome tee off,
                  then select the best drive. From there, the number of players who must use
                  their own ball for subsequent shots slides based on handicap.
                </p>
                <p>
                  Lower handicap teams use fewer of the best ball advantages, keeping competition
                  fair and fun across all skill levels. It's a format that rewards both skill and
                  strategy while keeping every golfer engaged from the first tee to the final putt.
                </p>
                <p>
                  Whether you're a scratch golfer or picking up a club for the first time, the
                  Sliding Scramble is designed to make the day competitive, social, and memorable
                  for everyone.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Skill Level', value: 'All Welcome' },
                  { label: 'Format', value: '4-Person Teams' },
                  { label: 'Structure', value: 'Shotgun Start' },
                  { label: 'Handicap', value: 'Adjusted' },
                ].map((item) => (
                  <div key={item.label} className="bg-cream rounded-sm p-4 flex justify-between items-center">
                    <span className="font-sans text-forest-muted text-sm">{item.label}</span>
                    <span className="font-sans text-forest font-semibold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ── */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Reserve Your Spot
          </h2>
          <p className="font-sans text-white/65 text-lg mb-8 max-w-xl mx-auto">
            The 2027 date is coming. Sign up now to be first to know — and to secure your foursome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-4">Register for 2027</Link>
            <Link to="/contact" className="btn-outline-white px-8 py-4">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
