/* eslint-disable import/prefer-default-export */

import { DOMAIN, LOCALE_EN, LOCALE_FR } from './constants';

/**
 * Generates alternate page links for SEO purposes.
 *
 * @param {Object} params - The parameters for generating the links.
 * @param {string} params.slug - The slug of the page.
 * @param {string} params.locale - The locale of the page.
 * @returns {JSX.Element|null} A JSX element containing the alternate links, or null if no slug is provided.
 */
export const pageLinksAlternate = ({ slug, locale }) => {
  if (!slug) return null;

  const alternateLocale = locale === LOCALE_FR ? LOCALE_EN : LOCALE_FR;
  const alternateLinks = [
    {
      hrefLang: 'x-default',
      href: `${DOMAIN}/${locale}/${slug}`,
    },
    {
      hrefLang: alternateLocale,
      href: `${DOMAIN}/${alternateLocale}/${slug}`,
    },
    {
      hrefLang: locale,
      href: `${DOMAIN}/${locale}/${slug}`,
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
