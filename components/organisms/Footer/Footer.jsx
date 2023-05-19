import { useTranslation } from 'next-i18next';

// Styles
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <span className={styles.desktopOnly}>
        {t('footer.contact_us_twitter')}
      </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/dokkanbattlex2"
      >
        @dokkanbattlex2
      </a>
      <span className={styles.desktopOnly}>
        {' '}
        {t('footer.or_by_email')}
      </span>
      <a href="mailto:dokkanbattlebattle.contact@gmail.com">
        dokkanbattlebattle.contact@gmail.com
      </a>
    </div>
  );
}

export default Footer;
