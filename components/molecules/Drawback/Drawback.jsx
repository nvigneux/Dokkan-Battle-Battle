import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './Drawback.module.css';

// Components
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';

function Drawback({
  id, label, drawbacksOptions = '', drawbackSelected = '', handleClick = () => {},
}) {
  const { t } = useTranslation();
  const [drawbacks, setDrawbacks] = useState(drawbacksOptions);

  const handleDrawback = (value) => {
    setDrawbacks(value);
  };

  return (
    <div className={styles['dbb-drawback']}>
      <div className={styles['dbb-drawback__textarea']}>
        <textarea
          id={id}
          className={styles['dbb-textarea']}
          value={drawbacks}
          onChange={(e) => handleDrawback(e.target.value)}
          data-testid="drawback-textarea"
        />
        <label htmlFor={id} className={styles['dbb-textarea__label']}>{t('drawback.label')}</label>
      </div>
      <div className={styles['dbb-drawback__result']}>
        <span className={styles['dbb-drawback__sentence']}>
          {drawbackSelected}
        </span>
        <ButtonDokkan
          color="orange"
          size="small"
          onClick={() => handleClick(drawbacks)}
          data-testid="drawback-draw-button"
        >
          {label}
        </ButtonDokkan>
      </div>
    </div>
  );
}

Drawback.propTypes = {
  label: PropTypes.string.isRequired,
  drawbacksOptions: PropTypes.string,
  drawbackSelected: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Drawback;
