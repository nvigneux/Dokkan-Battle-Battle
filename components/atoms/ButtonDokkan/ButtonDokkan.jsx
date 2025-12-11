import PropTypes from 'prop-types';

// Styles
import styles from './ButtonDokkan.module.css';

// Utils
import cn from '../../../utils/cn';

function ButtonDokkan({
  children,
  color = 'orange',
  size = 'big',
  disabled = false,
  onClick = () => {},
  className = '',
  'data-testid': dataTestId,
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
        className,
      ])}
      data-testid={dataTestId}
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
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default ButtonDokkan;
