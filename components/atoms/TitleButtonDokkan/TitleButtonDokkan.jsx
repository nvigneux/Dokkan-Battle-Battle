import PropTypes from 'prop-types';

// Styles
import styles from './TitleButtonDokkan.module.css';

// Utils
import cn from '../../../utils/cn';

function TitleButtonDokkan({ position, children }) {
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

TitleButtonDokkan.defaultProps = {
  position: 'left',
};

export default TitleButtonDokkan;
