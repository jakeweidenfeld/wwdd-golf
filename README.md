# WWDD Charity Golf Tournament website

React + TypeScript + Vite + Tailwind. Run `npm install`, then `npm run dev`.

## Updating the site

Almost everything that changes year to year lives in **`src/content/site.ts`**:

- `nextEvent`: set `date`, `location`, `schedule`, `attire`, and flip `registrationOpen` to `true`
  when GiveSmart registration opens. Anything left `null` shows a "to be announced" badge.
- `links`: GiveSmart registration, sponsorship and donation URLs. Update these when the new
  year's GiveSmart pages go live.
- `sponsorPackages` / `sponsors`: packages and the thank-you list. Add a sponsor logo by putting
  the file in `public/images/sponsors/` and setting `logo`.
- `history`: add a row for each year's results.
- `photos` / `gallery`: images live in `public/images/` as WebP, about 1200px wide.

Brand colors are in `tailwind.config.js`: the logo blue `#164386`, navy, and white. No gold.
