import { Wrench, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig, buildWhatsAppUrl } from '@/config/site'

const SERVICES_LINKS = ['Dent Repair', 'Scratch Removal', 'Bumper Repair', 'Panel Paint', 'Body Polishing', 'Accident Repair']
const MODEL_LINKS = ['Alto K10', 'WagonR', 'Swift', 'Dzire', 'Brezza', 'Ertiga']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#040404] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">{siteConfig.name}</div>
                <div className="text-white/30 text-xs mt-0.5">{siteConfig.location}</div>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">{siteConfig.description}</p>
            <div className="flex gap-3">
              {[
                { href: siteConfig.social.facebook, Icon: Facebook },
                { href: siteConfig.social.instagram, Icon: Instagram },
                { href: siteConfig.social.youtube, Icon: Youtube },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href={buildWhatsAppUrl(`Hi, I need ${s} for my car.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Models</h4>
            <ul className="space-y-2.5">
              {MODEL_LINKS.map((m) => (
                <li key={m}>
                  <a
                    href={buildWhatsAppUrl(`Hi, I need repair for my Maruti ${m}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    Maruti {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-white/40 text-sm">
                  {siteConfig.address}<br />{siteConfig.city}
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-white/40 hover:text-white text-sm transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-white/40 hover:text-white text-sm transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 text-white/20 text-xs space-y-1">
              <div>{siteConfig.hours.weekdays}</div>
              <div>{siteConfig.hours.weekend}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-sm">© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-white/20 text-xs">Expert Maruti Suzuki body repair in Nabarangapur, Odisha</p>
        </div>
      </div>
    </footer>
  )
}
