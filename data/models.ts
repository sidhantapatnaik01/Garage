import { carImages } from '@/config/images'

export interface CarModel {
  name: string
  tagline: string
  color: string
  desc: string
  img: string
}

export interface Service {
  icon: string
  title: string
  desc: string
  gradient: string
  color: string
}

export const CAR_MODELS: CarModel[] = [
  { name: 'Alto K10',  tagline: 'City Champion',    color: '#3b82f6', desc: "Scratch & dent repair for India's favourite city car",      img: carImages.altoK10 },
  { name: 'WagonR',   tagline: 'Family Favourite',  color: '#10b981', desc: 'Bumper and side panel restoration for the tall-boy icon',   img: carImages.wagonR  },
  { name: 'Celerio',  tagline: 'Urban Smart',       color: '#f59e0b', desc: 'Paint touch-up and polish for the smart commuter',          img: carImages.celerio },
  { name: 'Swift',    tagline: 'Sporty Icon',       color: '#ef4444', desc: "Full exterior restoration for India's sportiest hatch",     img: carImages.swift   },
  { name: 'Dzire',    tagline: 'Elegant Sedan',     color: '#8b5cf6', desc: 'Premium panel painting and scratch removal',                img: carImages.dzire   },
  { name: 'Ertiga',   tagline: 'Family MPV',        color: '#06b6d4', desc: 'Large panel repair and bumper refinishing',                 img: carImages.ertiga  },
  { name: 'Brezza',   tagline: 'Bold SUV',          color: '#f97316', desc: 'SUV body polishing and accident damage repair',             img: carImages.brezza  },
  { name: 'S-Presso', tagline: 'Micro SUV',         color: '#ec4899', desc: 'Minor dent and cosmetic refresh specialist',               img: carImages.sPresso },
  { name: 'Eeco',     tagline: 'Workhorse Van',     color: '#14b8a6', desc: 'Commercial vehicle exterior restoration',                  img: carImages.eeco    },
]

export const SERVICES: Service[] = [
  { icon: '⬡', title: 'Dent Repair',          desc: 'Precision dent removal restoring panels to factory finish without repainting',  gradient: 'from-[#e63946] to-[#ff6b6b]', color: '#e63946' },
  { icon: '◇', title: 'Scratch Removal',       desc: 'Deep and surface scratch repair with exact OEM colour matching',                gradient: 'from-[#3b82f6] to-[#60a5fa]', color: '#3b82f6' },
  { icon: '◎', title: 'Bumper Repair',         desc: 'Scuffs, cracks, and full bumper repainting and structural restoration',         gradient: 'from-[#f59e0b] to-[#fbbf24]', color: '#f59e0b' },
  { icon: '▣', title: 'Panel Paint',           desc: 'Professional panel painting with OEM-grade colour match technology',            gradient: 'from-[#10b981] to-[#34d399]', color: '#10b981' },
  { icon: '◉', title: 'Body Polishing',        desc: 'Machine polishing for showroom-quality shine and UV protection',                gradient: 'from-[#8b5cf6] to-[#a78bfa]', color: '#8b5cf6' },
  { icon: '⚡', title: 'Accident Repair',       desc: 'Minor collision damage restored quickly with insurance documentation',          gradient: 'from-[#ef4444] to-[#f87171]', color: '#ef4444' },
  { icon: '◈', title: 'Exterior Restoration',  desc: 'Full body makeover for aging, faded or weather-worn vehicles',                  gradient: 'from-[#06b6d4] to-[#22d3ee]', color: '#06b6d4' },
  { icon: '✦', title: 'Car Detailing',         desc: 'Interior and exterior deep clean with ceramic coating option',                  gradient: 'from-[#ec4899] to-[#f472b6]', color: '#ec4899' },
]
