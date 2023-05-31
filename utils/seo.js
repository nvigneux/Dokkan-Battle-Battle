/* eslint-disable import/prefer-default-export */

import { DOMAIN, LOCALE_EN, LOCALE_FR } from './constants';

export const pageLinksAlternate = ({ slug, locale }) => {
  if (!slug) return null;

  const alternateLinks = [
    {
      hrefLang: 'x-default',
      href: `${DOMAIN}/${locale === LOCALE_FR ? 'fr' : 'en'}/${slug}`,
    },
    {
      hrefLang: locale === LOCALE_FR ? LOCALE_EN : LOCALE_FR,
      href: `${DOMAIN}/${locale === LOCALE_FR ? 'en' : 'fr'}/${slug}`,
    },
    {
      hrefLang: locale === LOCALE_FR ? LOCALE_FR : LOCALE_EN,
      href: `${DOMAIN}/${locale === LOCALE_FR ? 'fr' : 'en'}/${slug}`,
    },
  ];

  return (
    <>
      {alternateLinks.map(({ hrefLang, href }) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
    </>
  );
};
