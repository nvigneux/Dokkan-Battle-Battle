import PropTypes from 'prop-types';

// Styles
import styles from './DokkanToast.module.css';

function DokkanToast({ text, subText }) {
  return (
    <div className={styles.container}>
      <h2>{text}</h2>
      <h2>{subText}</h2>
    </div>
  );
}

DokkanToast.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
};

DokkanToast.defaultProps = {
  text: '',
  subText: '',
};

export default DokkanToast;
