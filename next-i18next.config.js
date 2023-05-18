const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeDetection: false,
    domains: [
      {
        domain: process.env.DOMAIN,
        defaultLocale: 'en',
      },
    ],
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: true,
};
