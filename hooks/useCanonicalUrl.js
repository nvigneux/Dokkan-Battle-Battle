import { useRouter } from 'next/router';

// Utils
import { DOMAINS_LOCALE } from '../utils/constants';

/**
 * Extracts the path from the given URL.
 * @param {string} asPath - The URL to extract the path from.
 * @returns {string} The extracted path.
 */
function getPath(asPath) {
  return asPath.split('?')[0].toLowerCase();
}

/**
 * Uses the Next.js router to get the current URL and locale,
 * and constructs a canonical URL using the locale-specific domain.
 * @returns {string} The canonical URL.
 */
function useCanonicalUrl() {
  const { asPath, locale } = useRouter();
  const path = getPath(asPath);
  return `${DOMAINS_LOCALE[locale]}${asPath === '/' ? '' : path}`;
}

export default useCanonicalUrl;
