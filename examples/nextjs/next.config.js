/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.plugins.push(
      require('../../dist/webpack.cjs').default({
        debug: true,
        clsTags: ['raw'],
      }),
    )

    return config
  },
}

module.exports = nextConfig
