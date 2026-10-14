import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'

type Sponsor = { name: string; url?: string; placeholder?: boolean }
type Tier = { tier: string; color: string; bg: string; border: string; sponsors: Sponsor[] }

const sponsorTiers: Tier[] = [
  {
    tier: 'Platinum',
    color: 'text-[#e8e8e8]',
    bg: 'bg-forest-dark',
    border: 'border-[#e8e8e8]/30',
    sponsors: [
      { name: 'Platinum Sponsor', placeholder: true },
      { name: 'Platinum Sponsor', placeholder: true },
    ],
  },
  {
    tier: 'Gold',
    color: 'text-[#4a90d9]',
    bg: 'bg-forest',
    border: 'border-[#4a90d9]/30',
    sponsors: [
      { name: 'Gold Sponsor', placeholder: true },
      { name: 'Gold Sponsor', placeholder: true },
      { name: 'Gold Sponsor', placeholder: true },
    ],
  },
  {
    tier: 'Silver',
    color: 'text-[#c0c0c0]',
    bg: 'bg-forest-light/20',
    border: 'border-[#c0c0c0]/30',
    sponsors: [
      { name: 'Silver Sponsor', placeholder: true },
      { name: 'Silver Sponsor', placeholder: true },
      { name: 'Silver Sponsor', placeholder: true },
      { name: 'Silver Sponsor', placeholder: true },
    ],
  },
  {
    tier: 'Bronze',
    color: 'text-[#cd7f32]',
    bg: 'bg-cream',
    border: 'border-[#cd7f32]/30',
    sponsors: [
      { name: 'Bronze Sponsor', placeholder: true },
      { name: 'Bronze Sponsor', placeholder: true },
      { name: 'Bronze Sponsor', placeholder: true },
      { name: 'Bronze Sponsor', placeholder: true },
      { name: 'Bronze Sponsor', placeholder: true },
    ],
  },
  {
    tier: 'Friends of WWDD',
    color: 'text-forest',
    bg: 'bg-cream-light',
    border: 'border-forest/20',
    sponsors: [
      { name: 'Friend of WWDD', placeholder: true },
      { name: 'Friend of WWDD', placeholder: true },
      { name: 'Friend of WWDD', placeholder: true },
      { name: 'Friend of WWDD', placeholder: true },
      { name: 'Friend of WWDD', placeholder: true },
      { name: 'Friend of WWDD', placeholder: true },
    ],
  },
]

const tierMeta: Record<string, { gridCols: string; cardSize: string; textSize: string }> = {
  Platinum:       { gridCols: 'grid-cols-1 sm:grid-cols-2',              cardSize: 'h-40',  textSize: 'text-2xl' },
  Gold:           { gridCols: 'grid-cols-1 sm:grid-cols-3',              cardSize: 'h-32',  textSize: 'text-xl' },
  Silver:         { gridCols: 'grid-cols-2 sm:grid-cols-4',              cardSize: 'h-28',  textSize: 'text-lg' },
  Bronze:         { gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5', cardSize: 'h-24', textSize: 'text-base' },
  'Friends of WWDD': { gridCols: 'grid-cols-3 sm:grid-cols-6',           cardSize: 'h-20',  textSize: 'text-sm' },
}

export default function Sponsors() {
  useReveal()

  return (
    <main className="page-enter pt-16">
      {/* ── HERO ── */}
      <section className="bg-forest-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Our Partners</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Thank You to Our<br />
            <span className="italic">Sponsors</span>
          </h1>
          <div className="divider-accent mx-auto mb-6" />
          <p className="font-sans text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            These generous partners make WWDD possible — and together, we send children to Experience Camps.
          </p>
        </div>
      </section>

      {/* ── SPONSOR TIERS ── */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {sponsorTiers.map((tier) => {
            const meta = tierMeta[tier.tier]
            return (
              <div key={tier.tier} className="reveal">
                {/* Tier header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-cream-dark" />
                  <h2 className="font-serif text-2xl font-semibold"
                    style={{
                      color:
                        tier.tier === 'Platinum' ? '#9ca3af'
                        : tier.tier === 'Gold' ? '#4a90d9'
                        : tier.tier === 'Silver' ? '#9ca3af'
                        : tier.tier === 'Bronze' ? '#cd7f32'
                        : '#172A43',
                    }}
                  >
                    {tier.tier}
                  </h2>
                  <div className="flex-1 h-px bg-cream-dark" />
                </div>

                {/* Sponsor cards */}
                <div className={`grid ${meta.gridCols} gap-4`}>
                  {tier.sponsors.map((s, i) => (
                    <div key={i}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center ${meta.cardSize} rounded-sm border-2 ${tier.border} bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-6`}
                        >
                          <span className={`font-serif ${meta.textSize} font-semibold text-forest`}>{s.name}</span>
                        </a>
                      ) : (
                        <div
                          className={`flex items-center justify-center ${meta.cardSize} rounded-sm border-2 border-dashed border-cream-dark bg-cream-light px-4`}
                        >
                          {s.placeholder ? (
                            <div className="text-center">
                              <div className="font-sans text-forest-muted/40 text-xs tracking-widest uppercase mb-1">
                                {tier.tier} Sponsor
                              </div>
                              <div className="font-sans text-forest-muted/30 text-xs">Spot Available</div>
                            </div>
                          ) : (
                            <span className={`font-serif ${meta.textSize} font-semibold text-forest`}>{s.name}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── BECOME A SPONSOR ── */}
      <section className="bg-forest py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal">
            <div>
              <span className="font-sans text-white/70 text-sm tracking-widest uppercase font-semibold block mb-4">Get Involved</span>
              <h2 className="font-serif text-4xl text-white mb-4 leading-tight font-semibold">
                Become a Sponsor
              </h2>
              <div className="divider-accent mb-6" />
              <div className="space-y-4 font-sans text-white/70 text-base leading-relaxed">
                <p>
                  Sponsoring WWDD puts your brand in front of a passionate community of golfers,
                  philanthropists, and families — while directly funding Experience Camps.
                </p>
                <p>
                  Sponsorship tiers offer a range of visibility, from logo placement and signage
                  to speaking opportunities and sponsored holes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { tier: 'Platinum', price: 'Inquire', perks: 'Premier hole, banner, dinner table, recognition' },
                { tier: 'Gold', price: 'Inquire', perks: 'Hole sponsorship, program listing, dinner seats' },
                { tier: 'Silver', price: 'Inquire', perks: 'Program listing, signage, recognition' },
                { tier: 'Bronze', price: 'Inquire', perks: 'Program listing, acknowledgment' },
              ].map((s) => (
                <div key={s.tier} className="bg-white/5 border border-white/10 rounded-sm p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-sans text-white font-semibold text-base">{s.tier}</div>
                    <div className="font-sans text-white/50 text-sm">{s.perks}</div>
                  </div>
                  <span className="font-sans text-white/70 text-sm font-semibold flex-shrink-0">{s.price}</span>
                </div>
              ))}
              <Link to="/contact" className="btn-primary w-full justify-center text-center mt-2 block">
                Inquire About Sponsorship →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
