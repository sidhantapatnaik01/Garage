/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.marutisuzuki.com',
        pathname: '/**',
      },
      // Add more hostnames here when you swap images to other domains
    ],
  },
}

export default nextConfig
