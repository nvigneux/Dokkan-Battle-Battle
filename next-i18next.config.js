const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    localeDetection: false,
    domains: [
      {
        domain: process.env.DOMAIN,
        defaultLocale: 'fr',
      },
    ],
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: true,
};
