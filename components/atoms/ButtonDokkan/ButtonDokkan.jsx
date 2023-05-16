import PropTypes from 'prop-types';

// Styles
import styles from './ButtonDokkan.module.css';

// Utils
import cn from '../../../utils/cn';

function ButtonDokkan({
  children, color, size, disabled, onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn([
        styles['dbb-btn'],
        styles[`dbb-btn--${size}`],
        styles['dbb-btn--corner'],
        styles[`dbb-btn--gradient-${color}`],
        styles['dbb-btn--text-white'],
      ])}
    >
      {children}
      <div className={`${styles['dbb-btn__border']} ${styles['dbb-btn__border--black']}`} />
      <div className={`${styles['dbb-glossy']} ${styles['dbb-glossy--white']}`} />
    </button>
  );
}

ButtonDokkan.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['grey', 'orange', 'blue', 'green', 'yellow', 'black']),
  size: PropTypes.oneOf(['small', 'big']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonDokkan.defaultProps = {
  color: 'orange',
  size: 'big',
  disabled: false,
  onClick: () => {},
};

export default ButtonDokkan;
