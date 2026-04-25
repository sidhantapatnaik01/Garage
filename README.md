# Maruti Care — Nabarangapur Garage Site

Next.js 14 + TypeScript + Tailwind production site. All client-facing content (name, logo, phone, addresses, models, services, social, deploy URL) lives in **two config files** for one-shot rebrand to a real client.

**Live**: https://garagenabarangpur.vercel.app

## Stack

- Next.js 14 (App Router) — server-rendered shell, client-only sections
- TypeScript (strict)
- Tailwind CSS + shadcn/ui style primitives
- framer-motion (with `useReducedMotion` support)
- React Hook Form + Zod (Contact form)
- Sonner (toasts)
- WhatsApp redirect for all leads (no backend needed)

## Project structure

```
app/
  layout.tsx          ← SEO metadata (og, twitter, robots, canonical, icons)
  page.tsx            ← server component, injects LocalBusiness JSON-LD
  sitemap.ts          ← /sitemap.xml route
  robots.ts           ← /robots.txt route
  icon.tsx            ← favicon (auto-generated from siteConfig.name)
  apple-icon.tsx      ← Apple touch icon (auto-generated)
  opengraph-image.tsx ← /opengraph-image (auto-generated 1200x630)
  globals.css

config/
  site.ts             ← ⭐ EDIT TO REBRAND: name, phone, address, social, URL, etc.
  images.ts           ← ⭐ EDIT TO SWAP CAR PHOTOS

data/
  models.ts           ← ⭐ EDIT TO CHANGE CAR MODELS / SERVICES list

components/
  Header.tsx          ← logo (click → top), scroll-aware nav, mobile menu
  FloatingWhatsApp.tsx
  SectionBg.tsx       ← reusable animated gradient orbs
  ui/                 ← Button, Input, Textarea, Badge
  sections/           ← Hero, CarModels, BeforeAfter, Services, HowItWorks,
                       WhyChooseUs, Gallery, Testimonials, Contact, Footer
hooks/
  useCounter.ts       ← ref-based animated counter (no re-renders)
```

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
```

## Rebrand checklist (when handing off to a real client)

Most edits are isolated to **3 files**:

1. **`config/site.ts`** — name, location, tagline, phone, WhatsApp number, email, address, geo coordinates, hours, price range, stats, social links, deploy URL, Google Search Console verification code.
2. **`config/images.ts`** — car model photos (replace URLs or drop into `/public/images/`).
3. **`data/models.ts`** — list of car models and list of services.

Then replace placeholder content (still under client review):

- `components/sections/Testimonials.tsx` — replace fabricated reviews with real customer reviews (or hide section).
- `components/sections/Gallery.tsx` — replace emoji cards with real before/after photos.
- `components/sections/BeforeAfter.tsx` — replace tinted gradients with real photos.
- `siteConfig.stats` — replace placeholder counts (500 cars, 4.9 rating) with real numbers.

## SEO — post-deploy steps

The site already includes:
- `/sitemap.xml`, `/robots.txt`
- Full Open Graph + Twitter Card metadata, auto-generated `/opengraph-image`
- LocalBusiness (`AutoRepair`) JSON-LD structured data on the homepage
- Canonical URL
- Mobile-friendly, fast (static export, ~88kB main bundle)

**You must do these in Google after deploying:**

1. **Google Business Profile** — biggest single lever for local search.
   Create one at https://business.google.com — without this you will not rank for "car repair Nabarangapur" no matter how good the website is.
2. **Google Search Console** — https://search.google.com/search-console
   - Add property → use the **HTML tag** verification method
   - Copy the `content="..."` value into `siteConfig.googleVerification` and redeploy
   - After verification, submit `https://garagenabarangpur.vercel.app/sitemap.xml`
3. **Add geo coordinates** — open Google Maps, right-click the garage location, copy lat/lng, paste into `siteConfig.geo` for stronger local-search ranking.
4. **Validate structured data** — paste the deployed URL into https://search.google.com/test/rich-results to confirm the AutoRepair schema parses cleanly.
5. **Index check** — `site:garagenabarangpur.vercel.app` in Google after ~3–7 days.

If you switch to a custom domain (e.g. `marutiacarenbr.com`), update `siteConfig.url` and resubmit the sitemap.

## Deployment (Vercel)

Push to GitHub → import on Vercel → no config needed. Static export, no env vars required for the basic site.

---

## Original handoff notes (for archival)

This repo started from a Claude Design (claude.ai/design) handoff bundle. Original prototype HTML lives in `project/` and chat transcripts in `chats/` — kept for reference but not part of the build.
