import PropTypes from 'prop-types';

// Styles
import styles from './TitleButtonDokkan.module.css';

// Utils
import cn from '../../../utils/cn';

function TitleButtonDokkan({ position = 'left', children }) {
  return (
    <div className={cn([styles.container, styles[position]])}>
      {children}
    </div>
  );
}

TitleButtonDokkan.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
};

export default TitleButtonDokkan;
