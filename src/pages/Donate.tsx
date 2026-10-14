import { Link } from 'react-router-dom'
import { links, photos } from '../content/site'
import { useReveal } from '../hooks/useReveal'
import { ArrowIcon, ExternalLink, PageHero } from '../components/ui'

export default function Donate() {
  useReveal()

  return (
    <main id="main">
      <PageHero
        eyebrow="Donate"
        title="Help make sure no child grieves alone"
        intro="Whether or not you’re on the course, a gift to WWDD goes to Experience Camps and helps send grieving kids to camp."
        photo={photos.dinnerFriends}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal card p-8 sm:p-10">
            <h2 className="font-serif text-3xl">Give through GiveSmart</h2>
            <p className="lede mt-4">
              Donations are made to Experience Camps on our GiveSmart page. Open it and enter any amount in the
              <strong className="font-semibold text-ink"> Donations</strong> box below the sponsorship packages.
            </p>
            <ExternalLink href={links.donate} className="btn-primary mt-8">
              Donate on GiveSmart <ArrowIcon />
            </ExternalLink>
            <p className="mt-4 text-sm text-slate">You’ll leave this site to give securely through GiveSmart.</p>
          </div>

          <div className="reveal space-y-4">
            <div className="card p-7">
              <h2 className="font-serif text-2xl">Raise money with your people</h2>
              <p className="mt-2 text-slate">Create your own fundraising page and share it with friends and family.</p>
              <ExternalLink href={links.champion} className="btn-ghost mt-5">
                Become a champion <ArrowIcon />
              </ExternalLink>
            </div>
            <div className="card p-7">
              <h2 className="font-serif text-2xl">Give by playing or sponsoring</h2>
              <p className="mt-2 text-slate">Registration and sponsorships support Experience Camps too.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/register" className="btn-ghost">Register</Link>
                <Link to="/sponsor" className="btn-ghost">Sponsor</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <img src={photos.youngFoursome.src} alt={photos.youngFoursome.alt} loading="lazy" className="reveal aspect-[3/2] w-full rounded-2xl object-cover" />
          <div className="reveal">
            <span className="eyebrow">Where it goes</span>
            <h2 className="h-section">Experience Camps</h2>
            <p className="lede mt-4">
              Experience Camps supports grieving children through summer camp programs and year-round initiatives, building
              compassion, connection and play into every part of it.
            </p>
            <ExternalLink href={links.experienceCamps} className="btn-ghost mt-7">
              Learn about Experience Camps <ArrowIcon />
            </ExternalLink>
          </div>
        </div>
      </section>
    </main>
  )
}
