import { links, photos, values } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ActionBand, ArrowIcon, ExternalLink, PageHero, SectionHeader } from '../components/ui'

export default function About() {
  useReveal()

  return (
    <main id="main">
      <PageHero
        eyebrow="About WWDD"
        title="Carrying Don’s legacy forward"
        intro="WWDD stands for What Would Don Do? It’s a question, a reminder, and now a tournament."
        photo={photos.speech}
      />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="reveal space-y-5 text-lg leading-relaxed text-slate">
            <span className="eyebrow">Our story</span>
            <h2 className="h-section">Why we play</h2>
            <p>
              Don Weidenfeld was taken from this world far too early, at the age of 52, by a sudden heart attack. Finding the right
              words or actions to describe what Don meant to our family and his community has been a difficult, winding road. We
              knew we wanted to carry on Don’s legacy forever.
            </p>
            <p>
              During his life, Don lived by five core values: Give Generously, Connect Community, Adventure Always, Channel Your
              Inner Child, and Love Lavishly.
            </p>
            <p>
              Since Don’s death, the Weidenfelds have volunteered with and supported Experience Camps, a community that lives by
              those very same values. In turn, Experience Camps has given us a loving community, an outlet for our grief, and a way
              to honor Don’s memory.
            </p>
            <p>
              We carry on Don’s legacy by living his values every day, and through the annual What Would Don Do Charity Golf
              Tournament & Dinner, benefiting Experience Camps.
            </p>
            <p className="font-serif text-2xl italic text-brand">This is what Don would do.</p>
          </div>
          <div className="reveal grid content-start gap-4">
            <img src={photos.welcome.src} alt={photos.welcome.alt} loading="lazy" className="aspect-[3/2] w-full rounded-2xl object-cover" />
            <img src={photos.teamBlue.src} alt={photos.teamBlue.alt} loading="lazy" className="aspect-[3/2] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Core values" title="What Don lived by" intro="Five values Don lived every day, and the ones this tournament is built on." />
          <ol className="space-y-3">
            {values.map((v, i) => (
              <li key={v.name} className="reveal card grid items-baseline gap-2 p-6 sm:grid-cols-[4rem_16rem_1fr] sm:gap-6 sm:p-7">
                <span className="font-serif text-2xl text-brand-light">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-ink">{v.name}</h3>
                <p className="text-slate">{v.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="experience-camps" className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <img src={photos.checkIn.src} alt={photos.checkIn.alt} loading="lazy" className="reveal aspect-[4/3] w-full rounded-2xl object-cover" />
          <div className="reveal">
            <span className="eyebrow">Who we support</span>
            <h2 className="h-section">Experience Camps</h2>
            <p className="lede mt-5">
              Experience Camps is an award-winning national nonprofit that transforms the lives of grieving children through summer
              camp programs and year-round initiatives. Through compassion, connection and play, grieving kids get to live a life
              full of hope and possibility.
            </p>
            <p className="lede mt-4">Registration, sponsorships and donations for WWDD are all made to Experience Camps, which hosts the tournament’s GiveSmart page.</p>
            <ExternalLink href={links.experienceCamps} className="btn-primary mt-8">
              Visit Experience Camps <ArrowIcon />
            </ExternalLink>
          </div>
        </div>
      </section>

      <ActionBand />
    </main>
  )
}
