import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import CarModels from '@/components/sections/CarModels'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { siteConfig } from '@/config/site'
import { SERVICES } from '@/data/models'

function buildJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((url) => url && url !== '#')
  const hasGeo = siteConfig.geo.latitude && siteConfig.geo.longitude

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${siteConfig.url}#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/opengraph-image`,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
    ...(hasGeo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    }),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    ...(sameAs.length > 0 && { sameAs }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.stats.rating,
      reviewCount: siteConfig.stats.carsRestored,
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Body Repair Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.desc },
      })),
    },
  }
}

export default function Home() {
  const jsonLd = buildJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <CarModels />
        <BeforeAfter />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  )
}
