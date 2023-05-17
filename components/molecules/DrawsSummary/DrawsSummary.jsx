/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';

// Styles
import styles from './DrawsSummary.module.css';

// Utils
import { DRAWS_STATE } from '../../../utils/constants';

function DrawsSummary({ draws, drawsState, handleDraw }) {
  const drawsArray = Object.keys(draws);
  return (
    <div className={styles['dbb-summary']}>
      <div className={styles['dbb-summary__wrapper']}>
        {drawsArray.map((key) => (
          <div key={key} className={styles['dbb-summary__container']}>
            <div className={styles['dbb-summary-title']}>
              <h3 className={styles['dbb-summary-player']}>
                Player
                {' '}
                {key}
              </h3>
            </div>
            <div className={styles['dbb-summary__items']}>
              {draws[key].draws.map((playerDraw, index) => (
                <div
                  key={index}
                  className={`
                ${styles['dbb-summary__item']}
                ${!playerDraw.line ? styles['dbb-summary__item--disabled'] : ''}
                ${drawsState === DRAWS_STATE.DRAFT ? styles['dbb-summary__item--pulse-grey'] : ''}
                ${index === draws[key].draws.length - 1 ? styles['dbb-summary__item--no-mr'] : ''}`}
                >
                  <button
                    type="button"
                    className={`
                  ${styles['dbb-summary__number']}
                  ${drawsState === DRAWS_STATE.DRAFT ? styles['dbb-summary__clickable'] : ''}`}
                    onClick={() => handleDraw(+key, false, false, index)}
                  >
                    <span className={styles['dbb-summary__cat']}>L</span>
                    {playerDraw.line}
                  </button>
                  <button
                    type="button"
                    className={`
                      ${styles['dbb-summary__number']} 
                      ${drawsState === DRAWS_STATE.DRAFT ? styles['dbb-summary__clickable'] : ''}
                      `}
                    onClick={() => handleDraw(+key, false, true, index)}
                  >
                    <span className={styles['dbb-summary__cat']}>C</span>
                    {playerDraw.column}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {drawsState === DRAWS_STATE.DRAFT ? (
        <div className={styles['dbb-summary__draft']}>
          <span className={styles['dbb-summary__draft-text']}>Click top number to draw</span>
          <span className={styles['dbb-summary__draft-text']}>Click bottom number to draw column</span>
          <span className={`
                      ${styles['dbb-summary-player']}
                      ${styles['dbb-summary-player__draft']}
                      ${styles['dbb-summary-player--pulse']}`}
          >
            Draft open
          </span>
        </div>
      ) : null}
    </div>
  );
}

DrawsSummary.propTypes = {
  draws: PropTypes.shape({
    id: PropTypes.number,
    draws: PropTypes.arrayOf(PropTypes.shape({
      line: PropTypes.number,
      column: PropTypes.number,
    })),
  }).isRequired,
  drawsState: PropTypes.string.isRequired,
  handleDraw: PropTypes.func,
};

DrawsSummary.defaultProps = {
  handleDraw: () => {},
};

export default DrawsSummary;
