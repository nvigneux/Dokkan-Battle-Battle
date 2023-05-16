import PropTypes from 'prop-types';

// Styles
import styles from './TitleDokkan.module.css';

function TitleDokkan({
  children, subtitle,
}) {
  return (
    <h2 className={styles['dbb-main-title']}>
      {children}
      <span className={styles['dbb-main-subtitle']}>{ subtitle }</span>
    </h2>
  );
}

TitleDokkan.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
};

TitleDokkan.defaultProps = {
  subtitle: '',
};

export default TitleDokkan;
