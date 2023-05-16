import PropTypes from 'prop-types';

// Styles
import styles from './DrawNumbers.module.css';

function DrawNumbers({ line, column }) {
  return (
    <div className={styles['dbb-draw-number']}>
      <span className={styles['dbb-draw-cat']}>L</span>
      <span className={styles['dbb-draw-result']}>{line}</span>
      <span className={styles['dbb-draw-cat']}>C</span>
      <span className={styles['dbb-draw-result']}>{column}</span>
    </div>

  );
}

DrawNumbers.propTypes = {
  line: PropTypes.number,
  column: PropTypes.number,
};

DrawNumbers.defaultProps = {
  line: 0,
  column: 0,
};

export default DrawNumbers;
