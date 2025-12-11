/* eslint-disable no-param-reassign */
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // false, if DnD development is neccesary
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  async headers() {
    return [
      {
        source: '/:all*(otf|jpg|png|svg|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
