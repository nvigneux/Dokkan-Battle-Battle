import PropTypes from 'prop-types';

// Styles
import styles from './DokkanToast.module.css';
import cn from '../../../utils/cn';

function DokkanToast({ type, text, subText }) {
  return (
    <div className={cn([styles.toast, styles[`toast-${type}`]])}>
      <h2 className={styles['toast-title']}>{text}</h2>
      <h2 className={styles['toast-message']}>{subText}</h2>
    </div>
  );
}

DokkanToast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']),
  text: PropTypes.string,
  subText: PropTypes.string,
};

DokkanToast.defaultProps = {
  type: 'success',
  text: '',
  subText: '',
};

export default DokkanToast;
