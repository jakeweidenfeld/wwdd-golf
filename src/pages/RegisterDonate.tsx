import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

export default function RegisterDonate() {
  useReveal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return
    const subject = encodeURIComponent('WWDD 2027 Waitlist')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nPlease add me to the WWDD 2027 notification list.`)
    window.open(`mailto:wwddgolf@gmail.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="bg-forest-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Join the Tournament</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Register & Donate
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            Every dollar you give sends a grieving child to Experience Camps.
            Every foursome you bring multiplies that impact.
          </p>
        </div>
      </section>

      {/* ── IMPACT CALLOUT ── */}
      <section className="bg-forest py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-white text-xl md:text-2xl font-semibold">
            <span className="font-bold text-3xl md:text-4xl">$2,500</span> sends one child to Experience Camps.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── REGISTER ── */}
          <div className="reveal">
            <div className="card-premium p-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">⛳</span>
                </div>
                <span className="section-label mb-0">Register to Play</span>
              </div>
              <h2 className="font-serif text-3xl text-forest mb-4 font-semibold">
                2027 Golf Tournament
              </h2>
              <p className="section-body mb-6">
                Join us for a day of golf, community, and purpose at Boca West Country Club.
                Registration includes a round of golf, cocktail hour, and dinner.
              </p>

              <div className="bg-forest/5 border border-forest/20 rounded-sm p-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-forest-light animate-pulse" />
                  <span className="font-sans text-forest font-semibold text-sm">2027 Date TBD</span>
                </div>
                <p className="font-sans text-forest-muted text-sm">
                  The 2027 event date has not been finalized. Sign up below to be notified
                  when registration opens.
                </p>
              </div>

              <a
                href="https://e.givesmart.com/events/LF5/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mb-4"
              >
                Register on GiveSmart ↗
              </a>
              <p className="font-sans text-forest-muted text-xs text-center">
                You'll be redirected to our official registration page.
              </p>

              {/* Waitlist form */}
              <div className="mt-8 pt-8 border-t border-cream-dark">
                <h3 className="font-serif text-xl text-forest mb-2 font-semibold">Get Notified First</h3>
                <p className="font-sans text-forest-muted text-sm mb-5">
                  Leave your name and email to be the first to know when 2027 registration opens.
                </p>

                {submitted ? (
                  <div className="bg-forest/5 border border-forest/20 rounded-sm p-5 text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <p className="font-sans text-forest font-semibold">You're on the list!</p>
                    <p className="font-sans text-forest-muted text-sm mt-1">We'll be in touch when registration opens.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors"
                    />
                    <button type="submit" className="btn-primary w-full justify-center">
                      Notify Me
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── DONATE ── */}
          <div className="reveal space-y-6 flex flex-col">
            <div className="card-premium p-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">♥</span>
                </div>
                <span className="section-label mb-0">Donate Now</span>
              </div>
              <h2 className="font-serif text-3xl text-forest mb-4 font-semibold">
                Every Dollar Counts
              </h2>
              <p className="section-body mb-6">
                Can't make it to the tournament? You can still make a profound difference.
                Donate directly to send grieving children to Experience Camps.
              </p>

              {/* Impact tiers */}
              <div className="space-y-3 mb-8">
                {[
                  { amount: '$100', impact: 'Provides camp supplies for one child' },
                  { amount: '$500', impact: 'Covers meals for a camper for the week' },
                  { amount: '$1,250', impact: 'Half a campership — split with a friend!' },
                  { amount: '$2,500', impact: 'Sends one child to Experience Camps ⛺' },
                ].map((tier) => (
                  <div key={tier.amount} className="flex items-center gap-4 p-3 bg-cream rounded-sm">
                    <span className="font-serif text-forest font-bold text-lg w-20 flex-shrink-0">{tier.amount}</span>
                    <span className="font-sans text-forest-muted text-sm">{tier.impact}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://e.givesmart.com/events/LF5/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Donate on GiveSmart ↗
              </a>
            </div>

            {/* Sponsor CTA */}
            <div className="bg-forest rounded-sm p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-white text-xl font-semibold mb-1">Interested in Sponsoring?</h3>
                <p className="font-sans text-white/60 text-sm">See our sponsorship opportunities and make a bigger impact.</p>
              </div>
              <Link to="/sponsors" className="btn-outline-white flex-shrink-0">
                See Opportunities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="bg-forest-dark py-24 px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-6">Why It Matters</span>
          <blockquote className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed mb-8">
            "1 in 14 children loses a parent before age 18.<br />
            Experience Camps gives them a place to belong."
          </blockquote>
          <p className="font-sans text-white/60 text-lg max-w-2xl mx-auto">
            Your participation in WWDD directly changes what that child's summer — and life —
            looks like. One round of golf. One child's world transformed.
          </p>
        </div>
      </section>
    </main>
  )
}
