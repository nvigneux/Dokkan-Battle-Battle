const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['fr', 'en'],
    localeDetection: true,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: true,
};
