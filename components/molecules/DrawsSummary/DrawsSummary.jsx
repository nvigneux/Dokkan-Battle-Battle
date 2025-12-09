/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './DrawsSummary.module.css';

// Utils
import { DRAWS_STATE } from '../../../utils/constants';

function DrawsSummary({ draws, drawsState, handleDraw = () => {} }) {
  const { t } = useTranslation();

  const drawsArray = Object.keys(draws);
  return (
    <div className={styles['dbb-summary']}>
      <div className={styles['dbb-summary__wrapper']}>
        {drawsArray.map((key) => (
          <div
            key={key}
            className={styles['dbb-summary__container']}
            data-testid={`draws-summary-player-${key}`}
          >
            <div className={styles['dbb-summary-title']}>
              <h3 className={styles['dbb-summary-player']}>
                {t('drawsSummary.player', { id: key })}
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
                  data-testid={`draws-summary-item-player-${key}-draw-${index}`}
                >
                  <button
                    type="button"
                    className={`
                  ${styles['dbb-summary__number']}
                  ${drawsState === DRAWS_STATE.DRAFT ? styles['dbb-summary__clickable'] : ''}`}
                    onClick={() => handleDraw(+key, false, false, index)}
                    data-testid={`draws-summary-line-button-player-${key}-draw-${index}`}
                  >
                    <span className={styles['dbb-summary__cat']}>{t('drawsSummary.line')}</span>
                    {playerDraw.line}
                  </button>
                  <button
                    type="button"
                    className={`
                      ${styles['dbb-summary__number']} 
                      ${drawsState === DRAWS_STATE.DRAFT ? styles['dbb-summary__clickable'] : ''}
                      `}
                    onClick={() => handleDraw(+key, false, true, index)}
                    data-testid={`draws-summary-column-button-player-${key}-draw-${index}`}
                  >
                    <span className={styles['dbb-summary__cat']}>{t('drawsSummary.column')}</span>
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
          <span className={styles['dbb-summary__draft-text']}>{t('drawsSummary.clickTopNumber')}</span>
          <span className={styles['dbb-summary__draft-text']}>{t('drawsSummary.clickBottomNumber')}</span>
          <span className={`
                      ${styles['dbb-summary-player']}
                      ${styles['dbb-summary-player__draft']}
                      ${styles['dbb-summary-player--pulse']}`}
          >
            {t('drawsSummary.draftOpen')}
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

export default DrawsSummary;
