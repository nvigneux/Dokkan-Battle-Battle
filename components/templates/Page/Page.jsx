import PropTypes from 'prop-types';

// Styles
import styles from './Page.module.css';

// Utils
import cn from '../../../utils/cn';

function Page({
  children, theme = 'page',
}) {
  return (
    <div className={cn([
      styles.page,
      styles[theme],
    ])}
    >
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  theme: PropTypes.oneOf(['page', 'fullscreen']),
};

export default Page;
