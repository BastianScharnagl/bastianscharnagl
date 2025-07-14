/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  rewrites: async () => {
    return [
      {
        source: '/contact',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/contact'
            : '/contact',
      },
      {
        source: '/static/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/static/:path*'
            : '/static/:path*',
      },
      {
        source: '/get',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/get'
            : '/get'
      }
    ]
  },
}

module.exports = nextConfig
