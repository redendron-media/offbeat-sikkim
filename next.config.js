// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['mui-file-input'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "", // You can omit `port` if it's empty
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        port: "", // You can omit `port` if it's empty
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.sembark.com/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/path/(.*)',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Adjust this for security as needed
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
      },
    ];
  },
};

module.exports = nextConfig;