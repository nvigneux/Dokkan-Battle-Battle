import Link from 'next/link';

// Styles
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles['dbb-navbar']}>
      <Link href="/patchs" className={styles['dbb-articles']}>
        1.20
      </Link>
      <Link href="/" className={styles['dbb-navbar__logo']}>
        <div className={styles['dbb-navbar__logo--d']} />
        <div className={styles['dbb-navbar__logo--okkan']} />
        <div className={styles['dbb-navbar__logo--b']} />
        <div className={styles['dbb-navbar__logo--attle']} />
        <div className={styles['dbb-navbar__logo--b2']} />
        <div className={styles['dbb-navbar__logo--attle2']} />
      </Link>
      <nav className={styles['dbb-navbar__links']}>
        <Link href="/random-rush" className={styles['dbb-navbar__link']}>
          Random Rush
        </Link>
        <Link href="/challenge-battle" className={styles['dbb-navbar__link']}>
          Challenge Battle
        </Link>
      </nav>
    </div>
  );
}

export default Header;
