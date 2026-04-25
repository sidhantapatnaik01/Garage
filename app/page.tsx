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

export default function Home() {
  return (
    <>
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
