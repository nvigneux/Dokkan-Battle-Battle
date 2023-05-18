/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

// Styles
import Link from 'next/link';
import styles from './Patch.module.css';

// Components
import ButtonDokkan from '../ButtonDokkan/ButtonDokkan';

// Utils
import cn from '../../../utils/cn';

function Patch({ patch: { title, date, content } }) {
  return (
    <>
      <Link href="/patchs">
        <ButtonDokkan className={styles.button} size="small" color="orange">Go back to patchs !</ButtonDokkan>
      </Link>
      <h1 className={cn([styles.title, 'h1'])}>
        Patch
        {' '}
        {title.toUpperCase()}
        {' '}
        Notes
      </h1>
      <p className={styles['dbb-patch__date']}>{date}</p>
      <div className={styles['dbb-patch__content']} dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

Patch.propTypes = {
  patch: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default Patch;
