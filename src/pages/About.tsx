import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

const values = [
  {
    number: '01',
    title: 'Give Generously',
    body: "Don believed that giving wasn't a transaction — it was an expression of character. He gave his time, energy, and resources without keeping score, and inspired everyone around him to do the same.",
    icon: '🎁',
  },
  {
    number: '02',
    title: 'Connect Community',
    body: "Wherever Don went, he built belonging. He had an extraordinary gift for making everyone in the room feel seen, valued, and part of something larger than themselves.",
    icon: '🤝',
  },
  {
    number: '03',
    title: 'Adventure Always',
    body: "Don lived with a spirit of adventure that was contagious. Whether on a golf course, in the mountains, or at the dinner table, he approached life with curiosity and enthusiasm.",
    icon: '⛰️',
  },
  {
    number: '04',
    title: 'Channel Your Inner Child',
    body: "No one could make a room laugh like Don. He never lost his sense of play, wonder, or delight — and he reminded everyone around him to hold onto theirs.",
    icon: '🎉',
  },
  {
    number: '05',
    title: 'Love Lavishly',
    body: "Don loved his family, friends, and community without restraint. His love was abundant, expressive, and unconditional — the truest measure of the man he was.",
    icon: '♥',
  },
]

export default function About() {
  useReveal()

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="relative bg-forest-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592919505780-303950717480?w=1400&q=80&fit=crop')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-28 text-center">
          <span className="section-label">Our Story</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mt-3 mb-6 leading-tight">
            Why{' '}
            <span className="italic">What Would<br />Don Do?</span>
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            A tournament born from grief, driven by love, and dedicated to the children
            who deserve the same community Don gave us all.
          </p>
        </div>
      </section>

      {/* ── DON'S STORY ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <span className="section-label">About Don</span>
              <h2 className="section-title mb-6">
                Don Weidenfeld
                <br />
                <span className="italic text-forest-muted">1965 – 2018</span>
              </h2>
              <div className="divider-accent mb-8" />
              <div className="space-y-5 section-body">
                <p>
                  Don Weidenfeld was taken from this world far too early at the age of 52 to
                  a sudden heart attack. Finding the right words or actions to describe what
                  Don meant to our family and his community has been a difficult, winding road.
                  We knew we wanted to carry on Don's legacy forever.
                </p>
                <p>
                  Don was the kind of person who made life richer simply by being in it. He
                  brought laughter to every room, generosity to every relationship, and an
                  unshakeable belief that the people around him were capable of extraordinary things.
                </p>
                <p>
                  His five core values weren't a list he kept on paper — they were the way he
                  breathed, the way he moved through the world, the way he loved. We carry them
                  forward in everything we do.
                </p>
              </div>
            </div>

            {/* Photo */}
            <div className="reveal">
              <div
                className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl max-w-md mx-auto"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              >
                <div className="w-full h-full bg-forest/10" />
              </div>
              <p className="font-sans text-forest-muted text-sm text-center mt-4 italic">
                Don Weidenfeld — always smiling, always giving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE VALUES ── */}
      <section className="bg-forest py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold">The Foundation</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-4 leading-tight">
              Don's 5 Core Values
            </h2>
            <div className="divider-accent mx-auto" />
          </div>

          <div className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.number}
                className="bg-forest-light/20 border border-white/10 rounded-sm p-8 hover:border-white/30 hover:bg-forest-light/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-serif text-white/30 text-5xl leading-none font-bold">{v.number}</span>
                  <span className="text-2xl mt-2">{v.icon}</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-3 font-semibold">{v.title}</h3>
                <p className="font-sans text-white/65 text-base leading-relaxed">{v.body}</p>
              </div>
            ))}

            {/* Sixth card — the tournament itself */}
            <div className="bg-forest-light/20 border border-white/20 rounded-sm p-8 flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <span className="font-sans text-white/70 text-xs tracking-widest uppercase font-semibold block mb-4">The Tournament</span>
                <h3 className="font-serif text-xl text-white mb-3 font-semibold">Live It Out</h3>
                <p className="font-sans text-white/65 text-base leading-relaxed">
                  Every year at WWDD, we bring these five values to life — through golf,
                  through giving, and through the community Don loved to build.
                </p>
              </div>
              <Link to="/register" className="btn-primary mt-6 inline-flex self-start">
                Join Us in 2027
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-cream-light py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="section-label">How We Got Here</span>
            <h2 className="section-title">Our Story</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>

          <div className="space-y-8 reveal">
            <div className="card-premium p-10">
              <p className="font-sans text-forest-muted text-lg leading-relaxed mb-6">
                During his life, Don lived by these five core values every single day. Since Don's passing,
                the Weidenfeld family — Justin, Jake, Megan, and Julie — has volunteered and supported
                <strong className="text-forest"> Experience Camps</strong>, a community that embodies
                these very same values.
              </p>
              <p className="font-sans text-forest-muted text-lg leading-relaxed mb-6">
                In turn, Experience Camps has given us a loving community, an outlet for our grief,
                and a way to honor Don's memory. We've seen firsthand how transformative camp can be
                for a child navigating loss — and we believe no child should have to face that journey alone.
              </p>
              <p className="font-sans text-forest-muted text-lg leading-relaxed">
                We carry on Don's legacy through living by his core values every day — and through
                the Annual "What Would Don Do?" Charity Golf Tournament &amp; Dinner, benefiting
                Experience Camps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-forest-dark py-20 px-4">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Be Part of Don's Legacy
          </h2>
          <p className="font-sans text-white/60 text-lg mb-8">
            Register for the 2027 tournament and help us send another child to Experience Camps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-4">Register for 2027</Link>
            <Link to="/experience-camps" className="btn-outline-white px-8 py-4">Learn About Experience Camps</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
