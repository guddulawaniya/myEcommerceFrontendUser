/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sheduled-8umy.onrender.com/api/:path*',
      },
    ]
  },
}

export default nextConfig