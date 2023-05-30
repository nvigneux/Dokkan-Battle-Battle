import { useRouter } from 'next/router';

// Utils
import { DOMAINS_LOCALE } from '../utils/constants';

function useCanonicalUrl() {
  const { asPath, locale } = useRouter();
  const path = asPath.split('?')[0].toLowerCase();
  return (`${DOMAINS_LOCALE[locale]}${asPath === '/'
    ? ''
    : path}`);
}

export default useCanonicalUrl;
