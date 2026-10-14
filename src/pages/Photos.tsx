import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

type Photo = { id: string; url: string; thumb: string; year: number; alt: string }

const photos: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80&fit=crop', year: 2024, alt: 'Golfers on the fairway' },
  { id: '2', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80&fit=crop', year: 2024, alt: 'Golf course sunrise' },
  { id: '3', url: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80&fit=crop', year: 2024, alt: 'Putting green' },
  { id: '4', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80&fit=crop', year: 2023, alt: 'Group of golfers' },
  { id: '5', url: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=600&q=80&fit=crop', year: 2023, alt: 'Outdoor charity event' },
  { id: '6', url: 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?w=600&q=80&fit=crop', year: 2023, alt: 'Family at outdoor event' },
  { id: '7', url: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&q=80&fit=crop', year: 2022, alt: 'Golf tee shot' },
  { id: '8', url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80&fit=crop', year: 2022, alt: 'Evening charity dinner' },
  { id: '9', url: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=600&q=80&fit=crop', year: 2022, alt: 'Golf course overview' },
  { id: '10', url: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?w=600&q=80&fit=crop', year: 2024, alt: 'Charity event awards' },
  { id: '11', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80&fit=crop', year: 2023, alt: 'Happy family outdoors' },
  { id: '12', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&fit=crop', thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop', year: 2022, alt: 'Community gathering' },
]

const years = ['All', '2024', '2023', '2022'] as const
type YearFilter = typeof years[number]

export default function Photos() {
  useReveal()
  const [filter, setFilter] = useState<YearFilter>('All')
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const filtered = filter === 'All' ? photos : photos.filter((p) => p.year === Number(filter))

  function openLightbox(photo: Photo) {
    const idx = filtered.findIndex((p) => p.id === photo.id)
    setLightboxIdx(idx)
    setLightbox(photo)
  }

  function closeLightbox() {
    setLightbox(null)
  }

  function prevPhoto() {
    const idx = (lightboxIdx - 1 + filtered.length) % filtered.length
    setLightboxIdx(idx)
    setLightbox(filtered[idx])
  }

  function nextPhoto() {
    const idx = (lightboxIdx + 1) % filtered.length
    setLightboxIdx(idx)
    setLightbox(filtered[idx])
  }

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lightboxIdx, filtered])

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="bg-forest-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Memories</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Photos
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Photos from past tournaments. More photos coming after each event.
          </p>
          <p className="font-sans text-white/50 text-sm mt-4">
            Want to share your photos?{' '}
            <a href="mailto:wwddgolf@gmail.com" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
              Submit them here
            </a>
          </p>
        </div>
      </section>

      {/* ── YEAR FILTER ── */}
      <section className="bg-cream border-b border-cream-dark py-6 px-4 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          <span className="font-sans text-forest-muted text-sm font-semibold tracking-wide">Filter by year:</span>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className={`font-sans text-sm px-4 py-1.5 rounded-full border transition-all duration-150 ${
                filter === y
                  ? 'bg-forest text-white border-forest'
                  : 'bg-white text-forest border-cream-dark hover:border-forest/30 hover:bg-cream'
              }`}
            >
              {y}
            </button>
          ))}
          <span className="ml-auto font-sans text-forest-muted text-sm">{filtered.length} photos</span>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 reveal"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => openLightbox(photo)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.thumb}
                    alt={photo.alt}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/30 transition-colors duration-300 flex items-end">
                    <div className="p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="font-sans text-white text-sm bg-black/50 rounded-full px-3 py-1">
                        {photo.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-forest-muted text-lg">No photos for this year yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT CTA ── */}
      <section className="bg-cream-dark py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-forest mb-3 font-semibold">Share Your Photos</h2>
          <p className="font-sans text-forest-muted text-base mb-6">
            Were you at a past WWDD tournament? We'd love to see your photos and add them to our gallery.
          </p>
          <a
            href="mailto:wwddgolf@gmail.com?subject=WWDD Tournament Photos"
            className="btn-primary"
          >
            Submit Your Photos →
          </a>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 lightbox-overlay flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 text-xl"
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 text-xl"
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            aria-label="Next"
          >
            ›
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-full overflow-hidden rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="bg-black/60 px-6 py-3 flex items-center justify-between">
              <span className="font-sans text-white/60 text-sm">{lightbox.alt}</span>
              <span className="font-sans text-white/70 text-sm">{lightbox.year}</span>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-white/40 text-sm">
            {lightboxIdx + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  )
}
