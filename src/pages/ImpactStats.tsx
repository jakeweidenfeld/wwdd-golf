import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

type YearData = {
  year: number | string
  raised: number | null
  golfers: number | null
  guests: number | null
  note?: string
}

const yearData: YearData[] = [
  { year: 2027, raised: null, golfers: null, guests: null, note: 'Coming Soon' },
  { year: 2026, raised: 110000, golfers: 116, guests: 60, note: undefined },
  { year: 2025, raised: 100000, golfers: 112, guests: 80, note: undefined },
]

const totalRaised = yearData.reduce((acc, d) => acc + (d.raised ?? 0), 0)
const totalChildren = Math.floor(totalRaised / 2500)

function useCountUp(target: number, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled || target === 0) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [enabled, target, duration])

  return count
}

function BigStat({ value, label, prefix = '', suffix = '', delay = 0 }: {
  value: number; label: string; prefix?: string; suffix?: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const count = useCountUp(value, 2200, enabled)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setEnabled(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const formatted =
    value >= 1000
      ? prefix + count.toLocaleString() + suffix
      : prefix + count + suffix

  return (
    <div ref={ref} className="text-center">
      <div className="counter-number text-5xl md:text-6xl lg:text-7xl mb-3">
        {formatted}
      </div>
      <div className="font-sans text-white/65 text-sm tracking-widest uppercase">{label}</div>
    </div>
  )
}

export default function ImpactStats() {
  useReveal()

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="bg-forest-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">The Difference We Make</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Impact & Stats
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            Every round of golf, every dollar raised, every child sent to camp —
            this is what WWDD has accomplished together.
          </p>
        </div>
      </section>

      {/* ── HEADLINE STATS ── */}
      <section className="bg-forest py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">Total Impact to Date</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 max-w-2xl mx-auto">
            <BigStat value={totalRaised} prefix="$" label="Total Raised" delay={0} />
            <BigStat value={totalChildren} suffix="+" label="Children Sent to Camp" delay={200} />
          </div>

          {/* Campership callout */}
          <div className="max-w-2xl mx-auto text-center reveal">
            <div className="bg-white/10 border border-white/20 rounded-sm p-8">
              <p className="font-sans text-white text-lg leading-relaxed">
                Every <strong className="text-white font-bold">$2,500</strong> raised sends one child to Experience Camps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── YEAR BY YEAR ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="section-label">Tournament History</span>
            <h2 className="section-title">Year by Year</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>

          <div className="space-y-4 reveal">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-5 gap-4 px-6 pb-2">
              <span className="font-sans text-forest-muted text-xs tracking-widest uppercase font-semibold">Year</span>
              <span className="font-sans text-forest-muted text-xs tracking-widest uppercase font-semibold text-right">Amount Raised</span>
              <span className="font-sans text-forest-muted text-xs tracking-widest uppercase font-semibold text-right">Children Sent</span>
              <span className="font-sans text-forest-muted text-xs tracking-widest uppercase font-semibold text-right">Golfers</span>
              <span className="font-sans text-forest-muted text-xs tracking-widest uppercase font-semibold text-right">Guests</span>
            </div>

            {yearData.map((d, i) => {
              const isCurrent = d.note === 'Coming Soon'
              return (
                <div
                  key={i}
                  className={`rounded-sm border px-6 py-5 grid grid-cols-2 sm:grid-cols-5 gap-4 items-center transition-all ${
                    isCurrent
                      ? 'bg-forest/5 border-forest-light/30'
                      : 'bg-white border-cream-dark hover:border-forest/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-forest text-xl font-semibold">{d.year}</span>
                    {isCurrent && (
                      <span className="font-sans text-forest-light text-xs bg-forest/5 border border-forest-light/30 rounded-full px-2 py-0.5">
                        TBD
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-forest-muted text-xs block sm:hidden mb-0.5">Raised</span>
                    <span className={`font-serif font-semibold text-lg ${isCurrent ? 'text-forest-muted/50 italic text-base' : 'text-forest'}`}>
                      {d.raised ? `$${d.raised.toLocaleString()}` : 'Coming Soon'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-forest-muted text-xs block sm:hidden mb-0.5">Children</span>
                    <span className={`font-sans font-semibold ${isCurrent ? 'text-forest-muted/50 italic text-sm' : 'text-forest'}`}>
                      {d.raised ? Math.floor(d.raised / 2500) : '—'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-forest-muted text-xs block sm:hidden mb-0.5">Golfers</span>
                    <span className={`font-sans font-semibold ${isCurrent ? 'text-forest-muted/50 italic text-sm' : 'text-forest'}`}>
                      {d.golfers ?? '—'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-forest-muted text-xs block sm:hidden mb-0.5">Guests</span>
                    <span className={`font-sans font-semibold ${isCurrent ? 'text-forest-muted/50 italic text-sm' : 'text-forest'}`}>
                      {d.guests ?? '—'}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Totals row */}
            <div className="bg-forest rounded-sm px-6 py-5 grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
              <span className="font-serif text-white text-base font-semibold">All-Time</span>
              <div className="text-right">
                <span className="counter-number text-xl">${totalRaised.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="counter-number text-xl">{totalChildren}</span>
              </div>
              <div className="text-right col-span-2 sm:col-span-1">
                <span className="font-sans text-white/40 text-sm">—</span>
              </div>
              <div className="hidden sm:block" />
            </div>
          </div>

        </div>
      </section>

      {/* ── VISUAL IMPACT ── */}
      <section className="bg-forest-dark py-24 px-4">
        <div className="max-w-5xl mx-auto text-center reveal">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-8">What It Means</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '⛺', stat: `${totalChildren}+`, detail: 'children have experienced the healing power of camp' },
              { emoji: '♥', stat: '100%', detail: 'of proceeds go directly to Experience Camps programs' },
            ].map((item) => (
              <div key={item.stat} className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="counter-number text-4xl mb-3">{item.stat}</div>
                <p className="font-sans text-white/60 text-base leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream py-20 px-4">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="section-title mb-4">Help Us Grow These Numbers</h2>
          <p className="section-body mb-8">Register for 2027 or donate today to add to our collective impact.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-4">Register for 2027</Link>
            <a href="https://e.givesmart.com/events/LF5/" target="_blank" rel="noopener noreferrer" className="btn-outline-forest px-8 py-4">Donate Now ↗</a>
          </div>
        </div>
      </section>
    </main>
  )
}
