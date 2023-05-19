/* eslint-disable import/prefer-default-export */

import { DOMAIN, LOCALE_EN, LOCALE_FR } from './constants';

export const pageLinksAlternate = ({
  slug, locale,
}) => (
  slug ? (
    <>
      <link
        rel="alternate"
        hrefLang="x-default"
        href={locale === LOCALE_FR
          ? `${DOMAIN}/${slug}`
          : `${DOMAIN}/en/${slug}`}
      />
      <link
        rel="alternate"
        hrefLang={locale === LOCALE_FR ? LOCALE_EN : LOCALE_FR}
        href={locale === LOCALE_FR
          ? `${DOMAIN}/en/${slug}`
          : `${DOMAIN}/${slug}`}
      />
      <link
        rel="alternate"
        hrefLang={locale === LOCALE_FR ? LOCALE_FR : LOCALE_EN}
        href={locale === LOCALE_FR
          ? `${DOMAIN}/${slug}`
          : `${DOMAIN}/en/${slug}`}
      />
    </>
  ) : null
);
