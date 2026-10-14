// Everything on the site that changes from year to year lives in this file.
// Update it here and every page picks it up. Anything set to `null` shows a
// clearly marked "to be announced" placeholder instead of a guess.

export const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Tournament', path: '/tournament' },
  { label: 'Register', path: '/register' },
  { label: 'Sponsor', path: '/sponsor' },
  { label: 'Impact', path: '/impact' },
]

export const links = {
  register: 'https://e.givesmart.com/events/LF5/signUp/',
  sponsor: 'https://e.givesmart.com/events/LF5/page/wwdd26-sponsorships/',
  // The GiveSmart sponsorship page has a "Donations" field below the packages.
  donate: 'https://e.givesmart.com/events/LF5/page/wwdd26-sponsorships/',
  champion: 'https://e.givesmart.com/events/LF5/signUpC/',
  givesmart: 'https://e.givesmart.com/events/LF5/',
  experienceCamps: 'https://experiencecamps.org/',
  map: 'https://maps.google.com/?q=Boca%20West%20Country%20Club,%20Boca%20West%20Drive,%20Boca%20Raton,%20FL,%20USA',
}

export const contact = {
  sponsorships: {
    name: 'Kristen Braunschweig',
    org: 'Experience Camps',
    email: 'kristen.braunschweig@experiencecamps.org',
  },
  // Add a WWDD email, Instagram, Facebook, etc. here when ready.
  social: [] as { label: string; href: string }[],
}

export type ScheduleItem = { time: string; label: string }

export const nextEvent = {
  year: 2027,
  date: null as string | null, // e.g. 'Monday, April 19, 2027'
  location: null as string | null,
  schedule: null as ScheduleItem[] | null,
  attire: null as string | null,
  registrationOpen: false,
}

export const lastEvent = {
  year: 2026,
  date: 'April 20, 2026',
  location: 'Boca West Country Club',
  city: 'Boca Raton, FL',
  schedule: [
    { time: '12:00–1:00 pm', label: 'Registration' },
    { time: '1:00 pm', label: 'Shotgun start' },
    { time: '5:30 pm', label: 'Cocktails' },
    { time: '6:00 pm', label: 'Buffet dinner & awards' },
  ] as ScheduleItem[],
  attire: 'Boat party attire',
  goal: '$145,000',
  raised: '$166,699',
}

export const history = [
  {
    year: 2025,
    title: 'Year one',
    facts: [
      { value: '222', label: 'Attendees' },
      { value: '$160,767.86', label: 'Gross raised' },
    ],
    champions: ['Matt Williams', 'Len Edelman', 'Michael Edelman', 'Jack Ronan'],
  },
  {
    year: 2026,
    title: 'Year two',
    facts: [
      { value: '$166,699', label: 'Raised' },
      { value: '$145,000', label: 'Goal' },
    ],
    champions: null as string[] | null,
  },
]

export const values = [
  { name: 'Give Generously', blurb: 'Show up for people, and give more than you take.' },
  { name: 'Connect Community', blurb: 'Bring people together and make room for everyone.' },
  { name: 'Adventure Always', blurb: 'Say yes to the next thing, on the course and off it.' },
  { name: 'Channel Your Inner Child', blurb: 'Play like it matters, and laugh like it doesn’t.' },
  { name: 'Love Lavishly', blurb: 'Love your people out loud, every day.' },
]

export type SponsorPackage = {
  name: string
  nickname?: string
  price: string | null
  status?: 'sold-out' | 'available'
  perks: string[]
}

// The 2026 packages, shown for reference until 2027 packages are posted.
export const sponsorPackagesYear = 2026
export const sponsorPackages: SponsorPackage[] = [
  {
    name: 'Tournament Title Sponsor',
    nickname: '“College League”',
    price: '$12,500',
    perks: [
      'Premium event parking with signage',
      'Signage at check-in and on scorecards',
      'Recognition at the pre-golf speech',
      'Starting hole on #1 or #10',
      'Pre-event video and social media post',
      'Premium logo placement on the ticketing site, emails and onsite signage',
      '2 foursomes and 4 additional dinner seats',
      'Logo on a hole sponsorship',
      'Visitor Day at an Experience Camps camp',
    ],
  },
  {
    name: 'Golfer Lunch Sponsor',
    nickname: '“Rest Period”',
    price: null,
    status: 'sold-out',
    perks: [
      'Logo on lunch and menu signage',
      'Recognition at the pre-golf speech',
      'Premium logo placement on event signage',
      '1 foursome and 4 additional dinner seats',
      'Visitor Day at an Experience Camps camp',
    ],
  },
  {
    name: 'Platinum Dinner Sponsor',
    nickname: '“Dance Party”',
    price: null,
    status: 'sold-out',
    perks: [
      'Recognition at dinner',
      'Exclusive table with signage at dinner',
      'Premium logo placement on event signage',
      '1 foursome and 4 additional dinner seats',
      'Visitor Day at an Experience Camps camp',
    ],
  },
  {
    name: 'Polo Sponsor',
    nickname: '“Theme Day”',
    price: null,
    status: 'sold-out',
    perks: ['Logo on the tournament polo given to all 120 golfers', '1 foursome', '2 additional dinner tickets'],
  },
  {
    name: 'Hat Sponsor',
    nickname: '“Keep it Cool”',
    price: null,
    status: 'sold-out',
    perks: ['Logo on the tournament hat given to all 120 golfers', '2 additional dinner tickets', 'Hole sponsorship'],
  },
  {
    name: 'Swag Bag Sponsor',
    price: null,
    status: 'sold-out',
    perks: ['Logo on the swag bag given to all golfers', '1 foursome', 'Social media shoutout'],
  },
  {
    name: 'On-Course Refreshment Sponsor',
    price: '$3,500',
    perks: ['Logo on every on-course refreshment station', 'Your own booth at a refreshment station', '1 foursome'],
  },
  {
    name: 'Golf Cart Sponsor',
    nickname: '“Director for the Day”',
    price: null,
    status: 'sold-out',
    perks: ['Logo on every golf cart', 'Logo on event signage', '1 foursome'],
  },
  {
    name: 'Volunteer Sponsor',
    price: '$3,500',
    perks: ['Funds the volunteers’ event experience', 'Logo on the volunteer shirt', 'Shoutout at dinner', '1 foursome'],
  },
  {
    name: 'Exclusive Competition Hole',
    price: null,
    status: 'sold-out',
    perks: ['One of 6 competition holes: closest to the pin, hole in one, longest drive and more'],
  },
  { name: 'Foursome & Hole Sponsorship', price: '$1,950', perks: ['A foursome in the tournament', 'A hole sponsorship'] },
  { name: 'Single Golfer & Hole Sponsor', price: '$700', perks: ['One golfer in the tournament', 'A hole sponsorship'] },
  { name: 'Hole Sponsor', price: '$300', perks: ['Sponsor a tournament hole', 'Logo on the ticketing site'] },
]

// 2026 sponsors as linked from the GiveSmart page. Add `logo: '/images/sponsors/x.png'` when you have files.
export const sponsors: { name: string; href: string; logo?: string }[] = [
  { name: 'Sandler · TEM Associates', href: 'https://sandler.com/training-centers/tem-associates-inc/' },
  { name: 'Chad & Jake', href: 'https://chadandjake.com/' },
  { name: 'Winners Award Group', href: 'https://winnersawardgroup.com/' },
  { name: 'Brooke Memorial Foundation', href: 'https://brookememorialfoundation.org/' },
  { name: 'Porter & Company', href: 'https://members.porterandcompanyresearch.com/' },
  { name: 'Ironbridge', href: 'https://www.ironbridgewc.com/' },
  { name: 'Gefen Law', href: 'https://www.gefenlaw.com/' },
  { name: 'Gilbert Family Foundation', href: 'https://gilbertfamilyfoundation.org/' },
]

export type Photo = { src: string; alt: string }

export const photos: Record<string, Photo> = {
  hero: { src: '/images/course-hole-9.webp', alt: 'Palm trees and a lake beside a green on the Fazio II course' },
  course: { src: '/images/course-fazio.webp', alt: 'Bunkers and waterfalls on the Fazio II course' },
  welcome: { src: '/images/welcome-sign.webp', alt: 'Welcome sign for the 1st annual What Would Don Do Charity Golf Tournament' },
  teamBlue: { src: '/images/team-blue.webp', alt: 'Three people in WWDD shirts and hats posing by the golf carts' },
  youngFoursome: { src: '/images/young-foursome.webp', alt: 'A large group of young golfers lined up by the carts' },
  sponsorBoard: { src: '/images/sponsor-board.webp', alt: 'Thank you to our sponsors board at the 2025 tournament' },
  blueHats: { src: '/images/blue-hats.webp', alt: 'Three golfers smiling together in WWDD hats' },
  speech: { src: '/images/speech.webp', alt: 'A speaker in a WWDD hat addressing golfers before the shotgun start' },
  checkIn: { src: '/images/check-in.webp', alt: 'Volunteers greeting golfers at check-in' },
  waterfall: { src: '/images/foursome-waterfall.webp', alt: 'A foursome posing in front of a waterfall on the course' },
  sky: { src: '/images/foursome-sky.webp', alt: 'A foursome posing on the course under a blue sky' },
  swing: { src: '/images/swing.webp', alt: 'A golfer following through on a swing' },
  putt: { src: '/images/putt.webp', alt: 'A golfer lining up a putt' },
  hawaiian: { src: '/images/hawaiian-shirts.webp', alt: 'Four golfers in matching Hawaiian shirts and WWDD hats' },
  teeShot: { src: '/images/tee-shot.webp', alt: 'A golfer watching a tee shot' },
  carts: { src: '/images/foursome-carts.webp', alt: 'A foursome posing in front of their golf carts' },
  pink: { src: '/images/foursome-pink.webp', alt: 'A foursome posing on the fairway' },
  dinnerFriends: { src: '/images/dinner-friends.webp', alt: 'Guests posing together at the dinner' },
  dinnerTable: { src: '/images/dinner-table.webp', alt: 'Three friends smiling at a dinner table' },
  dinnerDance: { src: '/images/dinner-dance.webp', alt: 'Guests on the dance floor at the dinner' },
}

export const gallery: Photo[] = [
  photos.welcome, photos.hawaiian, photos.speech, photos.swing, photos.blueHats,
  photos.dinnerDance, photos.waterfall, photos.checkIn, photos.teeShot, photos.dinnerTable,
  photos.youngFoursome, photos.putt, photos.carts, photos.dinnerFriends, photos.sky, photos.pink,
]
