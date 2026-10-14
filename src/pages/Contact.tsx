import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const subjects = [
  'General Inquiry',
  'Register for 2027',
  'Sponsorship Inquiry',
  'Volunteer Opportunity',
  'Media / Press',
  'Photo Submission',
  'Other',
]

export default function Contact() {
  useReveal()

  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { name, email, subject, message } = form
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:wwddgolf@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="bg-forest-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">We'd Love to Hear From You</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Contact Us
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            Questions about the tournament, sponsorship opportunities, or how to get involved?
            We typically respond within 2–3 business days.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── INFO PANEL ── */}
          <div className="lg:col-span-2 reveal">
            <span className="section-label">Get in Touch</span>
            <h2 className="font-serif text-3xl text-forest mb-6 font-semibold leading-tight">
              We're Here<br />to Help
            </h2>
            <div className="divider-accent mb-8" />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-forest">✉️</span>
                </div>
                <div>
                  <div className="font-sans text-forest font-semibold text-sm mb-1">Email Us</div>
                  <a
                    href="mailto:wwddgolf@gmail.com"
                    className="font-sans text-forest-light hover:text-forest transition-colors text-base"
                  >
                    wwddgolf@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-forest">📍</span>
                </div>
                <div>
                  <div className="font-sans text-forest font-semibold text-sm mb-1">Event Venue</div>
                  <div className="font-sans text-forest-muted text-base leading-relaxed">
                    Boca West Country Club<br />
                    20583 Boca West Dr<br />
                    Boca Raton, FL 33434
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-forest">🕐</span>
                </div>
                <div>
                  <div className="font-sans text-forest font-semibold text-sm mb-1">Response Time</div>
                  <div className="font-sans text-forest-muted text-base">
                    We typically respond within 2–3 business days.
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsor inquiry callout */}
            <div className="mt-10 bg-forest rounded-sm p-6">
              <h3 className="font-serif text-white text-lg mb-2 font-semibold">Interested in Sponsoring?</h3>
              <p className="font-sans text-white/60 text-sm mb-4 leading-relaxed">
                Select "Sponsorship Inquiry" in the subject field, and we'll reach out
                with our full sponsorship packet.
              </p>
              <button
                onClick={() => setForm({ ...form, subject: 'Sponsorship Inquiry' })}
                className="font-sans text-white/80 text-sm hover:text-white transition-colors underline underline-offset-2"
              >
                Use Sponsorship Inquiry →
              </button>
            </div>
          </div>

          {/* ── CONTACT FORM ── */}
          <div className="lg:col-span-3 reveal">
            <div className="card-premium p-10">
              <h3 className="font-serif text-2xl text-forest mb-8 font-semibold">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-forest text-sm font-semibold block mb-2" htmlFor="name">
                      Full Name <span className="text-forest-light">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-forest text-sm font-semibold block mb-2" htmlFor="email">
                      Email Address <span className="text-forest-light">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-forest text-sm font-semibold block mb-2" htmlFor="subject">
                    Subject <span className="text-forest-light">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors appearance-none cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-forest text-sm font-semibold block mb-2" htmlFor="message">
                    Message <span className="text-forest-light">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-cream-dark rounded-sm font-sans text-base text-forest bg-cream-light focus:outline-none focus:border-forest-light transition-colors resize-y"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                  Send Message →
                </button>

                <p className="font-sans text-forest-muted text-xs text-center">
                  This will open your email client with the message pre-filled. Alternatively,
                  email us directly at{' '}
                  <a href="mailto:wwddgolf@gmail.com" className="text-forest-light hover:underline">
                    wwddgolf@gmail.com
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience Camps note ── */}
      <section className="bg-forest-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="font-sans text-white/50 text-base">
            Questions about Experience Camps specifically? Visit{' '}
            <a
              href="https://experiencecamps.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              experiencecamps.org
            </a>{' '}
            or reach out to them directly.
          </p>
        </div>
      </section>
    </main>
  )
}
