import PropTypes from 'prop-types';

// Styles
import styles from './WithHeaderFooter.module.css';

// Components
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';

function WithHeaderFooter({ children }) {
  return (
    <>
      <Header />
      <div className={styles.main}>
        {children}
      </div>
      <Footer />
      <div className={styles.bg} />
    </>
  );
}

WithHeaderFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default WithHeaderFooter;
