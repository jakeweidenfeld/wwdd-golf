import { contact } from '../content/site'
import { MemberShell } from './Members'

export default function Privacy() {
  return (
    <MemberShell title="Privacy policy" intro="How the WWDD website handles your information. Last updated October 14, 2026.">
      <div className="card max-w-3xl space-y-5 p-7 leading-relaxed text-slate sm:p-9">
        <section>
          <h2 className="font-serif text-2xl text-ink">What we collect</h2>
          <p className="mt-2">
            Browsing the public site requires no account and we collect nothing about you. If you sign in to the member area
            with Google, Google shares your name, email address and profile photo with us. We never see your Google password.
            We also store anything you choose to enter, such as your 2027 interest list entry.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">How we use it</h2>
          <p className="mt-2">
            Only to run the member area: to know who you are when you sign in, to show you your own entries, and so tournament
            organizers can see the interest list and contact you about the tournament. We don’t sell or share your information,
            and we don’t use it for advertising.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Cookies</h2>
          <p className="mt-2">
            Signing in sets one cookie that keeps you signed in for up to 30 days. Signing out removes it. We use no tracking or
            advertising cookies.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Registration, sponsorships and donations</h2>
          <p className="mt-2">
            These happen on GiveSmart and are processed by Experience Camps, not on this site. Their own privacy policies apply.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Deleting your information</h2>
          <p className="mt-2">
            To have your account and entries deleted,{' '}
            {contact.privacy ? (
              <>
                email{' '}
                <a href={`mailto:${contact.privacy}`} className="text-brand underline underline-offset-2">{contact.privacy}</a>.
              </>
            ) : (
              <span className="tba">contact email to be added</span>
            )}
          </p>
        </section>
      </div>
    </MemberShell>
  )
}
