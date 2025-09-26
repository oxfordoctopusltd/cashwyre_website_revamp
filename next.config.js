/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Improve hydration performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Ensure consistent rendering
  swcMinify: true,
}

module.exports = nextConfig