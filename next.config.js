/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @next module to managedPaths
      // Allows for hot refresh of changes to @next module
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@next)/],
    };
    return config;
  },
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
