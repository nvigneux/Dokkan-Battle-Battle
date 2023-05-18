import PropTypes from 'prop-types';

// Styles
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <span>
        <span className={styles.desktopOnly}>
          Contact us Twitter
          {' '}
        </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/dokkanbattlex2"
        >
          @dokkanbattlex2
        </a>
      </span>
      <span>
        <span className={styles.desktopOnly}>
          {' '}
          or by email at
          {' '}
        </span>
        <a href="mailto:dokkanbattlebattle.contact@gmail.com">
          dokkanbattlebattle.contact@gmail.com
        </a>
      </span>
    </div>
  );
}

export default Footer;
