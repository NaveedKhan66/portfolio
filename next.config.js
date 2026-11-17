/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '192.168.1.165',
    '192.168.1.*',
    '192.168.*.*',
    'localhost',
  ],
  experimental: {
    agentUpgrade: 'security',
  },
}

module.exports = nextConfig

