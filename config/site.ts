// ⚙️ SITE CONFIGURATION
// Edit this file to update contact details, branding, and social links site-wide.
// Every page, the Footer, the SEO metadata, and the LocalBusiness schema all read from here.

export const siteConfig = {
  // 🌐 Deployed URL — used for canonical, sitemap, og:image absolute URLs
  url: 'https://garagenabarangpur.vercel.app',

  name: 'Maruti Care',
  location: 'Nabarangapur',
  tagline: "Nabarangapur's Trusted Garage",
  description:
    "Expert dent repair, scratch removal, bumper restoration, and showroom-quality polishing for every Maruti Suzuki Arena model.",

  // 📞 Contact — update these with real numbers
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210', // International format without +
  email: 'maruti.care.nbr@gmail.com',

  // 📍 Location — used in PostalAddress JSON-LD
  address: 'Main Road, Nabarangapur',
  city: 'Nabarangapur',
  region: 'Odisha',
  postalCode: '764059',
  country: 'IN',

  // 🌐 Geo coordinates — fill in for stronger local SEO ranking
  // Find via Google Maps: right-click your location → coordinates copy
  geo: {
    latitude: '', // e.g. '19.2308'
    longitude: '', // e.g. '82.5436'
  },

  // 🕒 Hours
  hours: {
    weekdays: 'Mon–Sat: 9AM – 7PM',
    weekend: 'Sunday: By appointment',
  },

  // 💰 Price range (Schema.org) — $ to $$$$
  priceRange: '₹₹',

  // 📊 Stats shown in Hero
  stats: {
    carsRestored: 500,
    modelsServed: 9,
    rating: '4.9',
  },

  // 🔗 Social links — leave as '#' to hide. Real URLs feed into Footer + JSON-LD sameAs.
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },

  // 🔍 Google Search Console verification — paste the meta-tag content="..." value
  // Find it: search.google.com/search-console → Add property → HTML tag method
  googleVerification: '',
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
