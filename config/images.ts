// 📸 IMAGE CONFIGURATION — Swap images here
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SWAP AN IMAGE:
//   1. Replace the URL string with your own hosted URL
//   2. For local images: copy file to /public/images/ → use '/images/my-car.jpg'
//   3. If using a NEW external domain, add it to next.config.ts → remotePatterns
// ─────────────────────────────────────────────────────────────────────────────

const MS = 'https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem'

export const carImages = {
  altoK10: `${MS}:5834d2dc-af8c-4d41-b1f7-84c537954546/as/alto.png?height=400&width=660`,
  wagonR:  `${MS}:18f0b3ba-82b8-46ef-ae3a-cb3336612a83/as/wagon-r.png?height=400&width=660`,
  celerio: `${MS}:5228dd06-2901-413b-88dc-c8635b0ad8a2/as/celerio.png?height=400&width=660`,
  swift:   `${MS}:a0ea2bb5-dfd8-4569-a6bc-89b9928fc751/as/swift-banner-no-logo.png?height=400&width=660`,
  dzire:   `${MS}:834183c9-f40f-4d14-bc9b-18fe493302cd/as/Dzire-430X260.png?height=400&width=660`,
  ertiga:  `${MS}:6247cdf4-2af5-443f-b054-761da87fd6ba/as/ertiga.png?height=400&width=660`,
  brezza:  `${MS}:7d047132-966e-47ce-83ae-7f7550b91054/as/brezza.png?height=400&width=660`,
  sPresso: `${MS}:8f4f96e0-d5ae-4a4a-b3b9-93c36fdc3172/as/s-presso.png?height=400&width=660`,
  eeco:    `${MS}:a80daf16-aa5e-42a5-b3cd-4a3b10da21b4/as/EECO.png?height=400&width=660`,
} as const
