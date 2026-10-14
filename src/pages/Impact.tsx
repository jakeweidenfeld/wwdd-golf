import { useEffect, useState } from 'react'
import { gallery, history, photos } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ActionBand, PageHero, SectionHeader, Tba } from '../components/ui'

export default function Impact() {
  useReveal()
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((a) => (a === null ? a : (a + 1) % gallery.length))
      if (e.key === 'ArrowLeft') setActive((a) => (a === null ? a : (a - 1 + gallery.length) % gallery.length))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <main id="main">
      <PageHero
        eyebrow="Impact & community"
        title="The people who make WWDD"
        intro="Family, friends, golfers, sponsors and volunteers. Here’s what we’ve done together so far."
        photo={photos.hawaiian}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Our story so far" title="Year by year" />
          <ol className="relative space-y-6 border-l-2 border-brand-soft pl-6 sm:pl-10">
            {history.map((h) => (
              <li key={h.year} className="reveal relative">
                <span aria-hidden="true" className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-4 border-paper bg-brand sm:-left-[49px]" />
                <div className="card p-7">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">{h.title}</div>
                  <h3 className="font-serif text-3xl">WWDD {h.year}</h3>
                  <dl className="mt-5 grid gap-6 sm:grid-cols-3">
                    {h.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-sm text-slate">{f.label}</dt>
                        <dd className="mt-1 font-serif text-3xl text-brand">{f.value}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="text-sm text-slate">Tournament champions</dt>
                      <dd className="mt-1">{h.champions ? h.champions.join(', ') : <Tba>To be added</Tba>}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Memories" title="Moments from WWDD" intro="Photos from the course and the dinner. Select any photo to see it larger." />
          <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
            {gallery.map((p, i) => (
              <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="block w-full overflow-hidden rounded-xl"
                  aria-label={`View larger: ${p.alt}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width="1200"
                    height="800"
                    className={`w-full object-cover transition-transform duration-500 hover:scale-[1.03] ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[3/2]'}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[active].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <img src={gallery[active].src} alt={gallery[active].alt} className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button type="button" autoFocus onClick={() => setActive(null)} className="btn-light absolute right-4 top-4 px-4 py-2 text-sm">
            Close
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + gallery.length) % gallery.length) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % gallery.length) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            ›
          </button>
        </div>
      )}

      <ActionBand />
    </main>
  )
}
