/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

// Styles
import Link from 'next/link';
import styles from './Patch.module.css';

// Components
import ButtonDokkan from '../ButtonDokkan/ButtonDokkan';

// Utils
import cn from '../../../utils/cn';

function Patch({ patch }) {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/patchs">
        <ButtonDokkan className={styles.button} size="small" color="orange">{t('patchs.back')}</ButtonDokkan>
      </Link>
      <h1 className={cn([styles.title, 'h1'])}>
        Patch
        {' '}
        {patch?.title.toUpperCase()}
        {' '}
        Notes
      </h1>
      <p className={styles['dbb-patch__date']}>{patch?.date}</p>
      <div className={styles['dbb-patch__content']} dangerouslySetInnerHTML={{ __html: patch?.content }} />
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
