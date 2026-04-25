// ⚙️ SITE CONFIGURATION
// Edit this file to update contact details, branding, and social links site-wide.

export const siteConfig = {
  name: 'Maruti Care',
  location: 'Nabarangapur',
  tagline: "Nabarangapur's Trusted Garage",
  description:
    "Expert dent repair, scratch removal, bumper restoration, and showroom-quality polishing for every Maruti Suzuki Arena model.",

  // 📞 Contact — update these with real numbers
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210', // International format without +
  email: 'maruti.care.nbr@gmail.com',

  // 📍 Location
  address: 'Main Road, Nabarangapur',
  city: 'Odisha, 764059',

  // 🕒 Hours
  hours: {
    weekdays: 'Mon–Sat: 9AM – 7PM',
    weekend: 'Sunday: By appointment',
  },

  // 📊 Stats shown in Hero
  stats: {
    carsRestored: 500,
    modelsServed: 9,
    rating: '4.9',
  },

  // 🔗 Social links
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
