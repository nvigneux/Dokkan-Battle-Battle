/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import Link from 'next/link';

// Styles
import styles from './PatchResume.module.css';

function PatchResume({
  patch: {
    title, date, resume, slug,
  },
}) {
  return (
    <Link href={`patchs/${slug}`} className={styles['dbb-patch']}>
      <h3 className={styles.title}>
        {`Patch note ${title}`}
      </h3>
      <p className={styles['dbb-patch__date']}>{date}</p>
      <h4 className={styles['dbb-patch__resume']} dangerouslySetInnerHTML={{ __html: resume }} />
    </Link>
  );
}

PatchResume.propTypes = {
  patch: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    resume: PropTypes.string,
  }).isRequired,
};

export default PatchResume;
