import PropTypes from 'prop-types';

// Styles
import styles from './WithHeaderFooter.module.css';

// Components
import Header from '../../organisms/Header/Header';

function WithHeaderFooter({ children }) {
  return (
    <>
      <Header />
      <div className={styles.main}>
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}

WithHeaderFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

WithHeaderFooter.defaultProps = {};

export default WithHeaderFooter;
