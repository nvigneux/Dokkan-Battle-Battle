import PropTypes from 'prop-types';

// Styles
import styles from './DrawTypes.module.css';

// Utils
import { getClassByValue } from '../../../utils/draw';

function DrawTypes({ line: type, column: subType }) {
  return (
    <div className={styles[getClassByValue(type || '')]}>
      <div className={`${styles['dbb-summary__item']} ${type === '' ? styles['dbb-summary__item--disabled'] : ''}`}>
        <div className={styles['dbb-summary__number']} style={{ display: !subType ? 'block' : 'none' }}>
          {type.slice(0, 3)}
        </div>
        {subType && (
          <div className={styles['dbb-summary__subnumber']}>
            <div className={styles.subType}>{subType}</div>
            <div className={styles.type}>{type.slice(0, 3)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

DrawTypes.propTypes = {
  line: PropTypes.string,
  column: PropTypes.string,
};

DrawTypes.defaultProps = {
  line: '',
  column: '',
};

export default DrawTypes;
