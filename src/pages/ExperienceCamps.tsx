import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

const programs = [
  {
    title: 'Summer Camp',
    body: 'Week-long overnight camps where grieving children connect with peers who truly understand loss. Fun, friendship, and healing — all at once.',
    icon: '⛺',
  },
  {
    title: 'Year-Round Programs',
    body: 'Innovative initiatives that extend the camp community throughout the year, keeping children connected to their support network.',
    icon: '📅',
  },
  {
    title: 'Family Programs',
    body: 'Support for the whole family — because grief affects everyone, and healing is stronger together.',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: 'Counselor Training',
    body: 'Training the next generation of compassionate leaders who will carry this mission forward.',
    icon: '🎓',
  },
]

const familyMembers = [
  { name: 'Justin', role: 'Volunteer Counselor' },
  { name: 'Jake', role: 'Volunteer Counselor' },
  { name: 'Megan', role: 'Volunteer Counselor' },
  { name: 'Julie', role: 'Family Supporter' },
]

export default function ExperienceCamps() {
  useReveal()

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="relative bg-forest overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?w=1400&q=80&fit=crop')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-28 text-center">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Benefiting</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Experience Camps
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/75 text-xl max-w-2xl mx-auto leading-relaxed">
            Where grieving children find community, compassion, and a path toward hope.
          </p>
        </div>
      </section>

      {/* ── WHAT IS EC ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="section-label">About Experience Camps</span>
              <h2 className="section-title mb-6">
                Transforming the Lives<br />
                <span className="italic">of Grieving Children</span>
              </h2>
              <div className="divider-accent mb-8" />
              <div className="space-y-5 section-body">
                <p>
                  Experience Camps is an <strong className="text-forest">award-winning national nonprofit</strong> that
                  transforms the lives of grieving children through summer camp programs and
                  innovative, year-round initiatives.
                </p>
                <p>
                  Through compassion, connection, and play, Experience Camps allows grieving
                  children to embody a life full of hope and possibility — meeting them exactly
                  where they are, and walking alongside them toward healing.
                </p>
                <p>
                  Their camps are free of charge for the children who attend — made possible
                  entirely by the generosity of donors and supporters like you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href="https://experiencecamps.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Experience Camps ↗
                </a>
                <a
                  href="https://experiencecamps.org/donate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-forest"
                >
                  Donate to Experience Camps
                </a>
              </div>
            </div>

            <div className="reveal">
              <div
                className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&q=80&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="bg-forest-dark py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">What They Do</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-4 leading-tight">
              Programs &amp; Initiatives
            </h2>
            <div className="divider-accent mx-auto" />
          </div>
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-sm p-8 hover:border-white/25 transition-colors">
                <span className="text-3xl mb-4 block">{p.icon}</span>
                <h3 className="font-serif text-xl text-white mb-3 font-semibold">{p.title}</h3>
                <p className="font-sans text-white/65 text-base leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEIDENFELD FAMILY INVOLVEMENT ── */}
      <section className="bg-cream-light py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="section-label">Our Family's Connection</span>
            <h2 className="section-title">We've Seen It Firsthand</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>

          <div className="card-premium p-10 md:p-14 mb-12 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-5 section-body">
                <p>
                  Justin, Jake, Megan, and Julie — the Weidenfeld family — have all volunteered
                  at Experience Camps and seen firsthand how profoundly beneficial it is for
                  children navigating loss.
                </p>
                <p>
                  We know grief. We know how isolating it can feel, especially for a child who
                  doesn't understand why their parent isn't coming home. Experience Camps gives
                  those children a week — and a community — that says: <em>"You are not alone. You
                  are seen. You belong here."</em>
                </p>
                <p>
                  That experience has been healing for us, too. And it's the reason we've made
                  Experience Camps the beneficiary of every WWDD tournament.
                </p>
              </div>
              <div className="space-y-3">
                {familyMembers.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 bg-cream rounded-sm">
                    <div className="w-9 h-9 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-forest font-bold text-sm">{m.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-sans text-forest font-semibold text-sm">{m.name} Weidenfeld</div>
                      <div className="font-sans text-forest-muted text-xs">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost callout */}
          <div className="bg-forest rounded-sm p-10 text-center reveal">
            <div className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold mb-3">Make A Direct Impact</div>
            <div className="counter-number text-6xl md:text-7xl mb-4">$2,500</div>
            <p className="font-sans text-white/70 text-lg max-w-md mx-auto mb-8">
              sends <strong className="text-white">one child</strong> to Experience Camps.
              Every dollar raised at WWDD goes directly toward this mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary px-8 py-4">Register for 2027</Link>
              <a
                href="https://e.givesmart.com/events/LF5/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white px-8 py-4"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
