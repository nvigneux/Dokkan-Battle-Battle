import { useState } from 'react';

// Styles
import styles from './Drawback.module.css';
// Components
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';
import { arrayToString, stringToArray } from '../../../utils/transform';

function Drawback() {
  const DEFAULT_DRAWBACKS = [
    'Re-Draw one character',
    'Random friend leader',
    'Only 3 support item',
  ];
  const [drawbacks, setDrawbacks] = useState(arrayToString(DEFAULT_DRAWBACKS));
  const [drawbackSelected, setDrawbackSelected] = useState('');

  const handleDrawback = (value) => {
    setDrawbacks(value);
  };

  const handleSelectedDrawback = () => {
    const drawbacksArray = stringToArray(drawbacks);
    const randomIndex = Math.floor(Math.random() * drawbacksArray.length);
    setDrawbackSelected(drawbacksArray[randomIndex]);
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
        <ButtonDokkan color="orange" size="small" onClick={handleSelectedDrawback}>
          Draw disadvantage
        </ButtonDokkan>
      </div>
    </div>
  );
}

export default Drawback;
