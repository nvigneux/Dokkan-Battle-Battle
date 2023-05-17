import PropTypes from 'prop-types';
import { useState } from 'react';

// Styles
import styles from './Drawback.module.css';

// Components
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';

function Drawback({
  label, drawbacksOptions, drawbackSelected, handleClick,
}) {
  const [drawbacks, setDrawbacks] = useState(drawbacksOptions);

  const handleDrawback = (value) => {
    setDrawbacks(value);
  };

  return (
    <div className={styles['dbb-drawback']}>
      <div className={styles['dbb-drawback__textarea']}>
        <textarea
          className={styles['dbb-textarea']}
          value={drawbacks}
          onChange={(e) => handleDrawback(e.target.value)}
        />
        <span className={styles['dbb-textarea__label']}>Write your own sentences, each on a separate line</span>
      </div>
      <div className={styles['dbb-drawback__result']}>
        <div className={styles['dbb-drawback__sentence']}>
          {drawbackSelected}
        </div>
        <ButtonDokkan color="orange" size="small" onClick={() => handleClick(drawbacks)}>
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

Drawback.defaultProps = {
  drawbacksOptions: '',
  drawbackSelected: '',
  handleClick: () => {},
};

export default Drawback;
