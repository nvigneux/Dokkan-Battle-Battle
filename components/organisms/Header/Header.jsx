import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Styles
import styles from './Header.module.css';

// Utils
import cn from '../../../utils/cn';
import { LOCALE_EN, LOCALE_FR } from '../../../utils/constants';

// Components
import Tooltip from '../../atoms/Tooltip/Tooltip';

function Header() {
  const { t } = useTranslation();
  const {
    locale, push, query, pathname,
  } = useRouter();

  const changeLocale = (selectedLocale) => {
    push({ pathname, query }, undefined, { locale: selectedLocale });
  };

  return (
    <div className={styles['dbb-navbar']}>
      <Link href="/patchs" className={styles['dbb-articles']}>
        2.02
      </Link>
      <Link href="/" aria-label="Dokkan Battle Battle" className={styles['dbb-navbar__logo']}>
        <div className={styles['dbb-navbar__logo--d']} />
        <div className={styles['dbb-navbar__logo--okkan']} />
        <div className={styles['dbb-navbar__logo--b']} />
        <div className={styles['dbb-navbar__logo--attle']} />
        <div className={styles['dbb-navbar__logo--b2']} />
        <div className={styles['dbb-navbar__logo--attle2']} />
      </Link>
      <nav className={styles['dbb-navbar__links']}>
        <Link href="/random-rush" className={cn([styles['dbb-navbar__link']])}>
          Random Rush
        </Link>
        <Link
          href="/challenge-battle"
          className={cn([styles['dbb-navbar__link']])}
        >
          Challenge Battle
        </Link>
        <Tooltip
          label={(
            <span className={cn([styles['dbb-locale'], styles['dbb-locale-label']])}>
              {t(`header.${locale}`)}
            </span>
        )}
        >
          <div className={styles['dbb-locale-container']}>
            {[LOCALE_FR, LOCALE_EN].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => changeLocale(item)}
                className={styles['dbb-locale']}
                disabled={locale === item}
              >
                {t(`header.${item}`)}
              </button>
            ))}
          </div>
        </Tooltip>
      </nav>
    </div>
  );
}

export default Header;
