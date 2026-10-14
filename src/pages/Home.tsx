import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    icon: '♥',
    title: 'Honor Don\'s Legacy',
    body: 'Every round played, every dollar raised carries forward the spirit of a man who lived with extraordinary generosity and love.',
  },
  {
    icon: '⛺',
    title: 'Support Grieving Children',
    body: 'Your participation sends children who have lost a parent or sibling to Experience Camps — where they find community, healing, and hope.',
  },
  {
    icon: '🤝',
    title: 'Join Our Community',
    body: 'WWDD brings together golfers, families, and friends united by a shared belief that love outlasts loss.',
  },
]

const stats = [
  { value: '$210,000+', label: 'Total Raised' },
  { value: '84+', label: 'Children Sent to Camp' },
]

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal text-center">
      <div className="counter-number text-4xl md:text-5xl mb-2">{target}</div>
      <div className="font-sans text-white/70 text-sm tracking-wide uppercase">{label}</div>
    </div>
  )
}

export default function Home() {
  useReveal()

  return (
    <main className="page-enter">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/85 via-forest/80 to-forest-dark/90" />

        <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-24 pb-16">
          {/* Event label */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            <span className="font-sans text-white/80 text-sm tracking-widest uppercase">Annual Charity Golf Tournament & Dinner</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-none">
            What Would<br />
            <span className="italic">Don Do?</span>
          </h1>

          <p className="font-sans text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Annual Charity Golf Tournament &amp; Dinner benefiting{' '}
            <a
              href="https://experiencecamps.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              Experience Camps
            </a>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/register" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Register for 2027
            </Link>
            <Link to="/about" className="btn-outline-white text-base px-8 py-4 w-full sm:w-auto">
              Learn About Don
            </Link>
          </div>

          {/* Date teaser */}
          <div className="inline-flex items-center gap-3 font-sans text-white/60 text-sm">
            <span className="w-8 h-px bg-white/30" />
            Late April 2027 &nbsp;·&nbsp; Boca West Country Club, Boca Raton, FL
            <span className="w-8 h-px bg-white/30" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="bg-cream-light py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="section-label">Why We Play</span>
            <h2 className="section-title">Three Reasons to Join Us</h2>
          </div>

          <div className="stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="card-premium p-10 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-forest/10 border border-forest-light/30 flex items-center justify-center mb-6 text-2xl group-hover:bg-forest/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-serif text-xl text-forest mb-4 font-semibold">{p.title}</h3>
                <p className="font-sans text-forest-muted text-base leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">Our Impact</span>
            <p className="font-sans text-white/60 text-sm mt-2">Every $2,500 raised sends one child to Experience Camps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} target={s.value} label={s.label} />
            ))}
          </div>
          <div className="text-center mt-12 reveal">
            <Link to="/impact" className="font-sans text-white/60 text-sm hover:text-white transition-colors underline underline-offset-4">
              See Full Impact Report →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="reveal order-2 lg:order-1">
              <div
                className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="w-full h-full bg-forest/20" />
              </div>
            </div>

            {/* Copy */}
            <div className="reveal order-1 lg:order-2">
              <span className="section-label">About WWDD</span>
              <h2 className="section-title mb-6">
                Carrying Don's Legacy<br />
                <span className="italic text-forest-muted">Forward, Forever</span>
              </h2>
              <div className="divider-accent mb-6" />
              <p className="section-body mb-6">
                Don Weidenfeld was taken from this world far too early at 52 to a sudden heart attack.
                He lived every day by five core values: giving generously, connecting community,
                seeking adventure, channeling his inner child, and loving lavishly.
              </p>
              <p className="section-body mb-8">
                This tournament is our family's way of honoring those values — and channeling them
                into something that helps the next generation of children facing unimaginable loss.
              </p>
              <Link to="/about" className="btn-outline-forest">
                Read Don's Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE CAMPS TEASER ── */}
      <section className="bg-forest-dark py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">Benefiting</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-6 leading-tight">
              Experience Camps
            </h2>
            <div className="divider-accent mx-auto mb-6" />
            <p className="font-sans text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              An award-winning national nonprofit that transforms the lives of grieving children
              through summer camp programs and year-round initiatives. Through compassion,
              connection, and play — they help children find hope and possibility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://experiencecamps.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4"
              >
                Visit Experience Camps
              </a>
              <Link to="/experience-camps" className="btn-outline-white px-8 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ── */}
      <section className="bg-cream-dark py-24 px-4">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="section-label">Join Us in 2027</span>
          <h2 className="section-title mb-4">Ready to Play?</h2>
          <p className="section-body mb-10 max-w-xl mx-auto">
            Join us at Boca West Country Club for a day of golf, community, and purpose.
            Every foursome helps send a child to camp.
          </p>
          <Link to="/register" className="btn-primary text-base px-10 py-4">
            Register for 2027
          </Link>
        </div>
      </section>
    </main>
  )
}
