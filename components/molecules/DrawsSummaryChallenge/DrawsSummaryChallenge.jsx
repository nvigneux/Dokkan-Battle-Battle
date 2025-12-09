/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './DrawsSummaryChallenge.module.css';

// Utils
import { DRAWS_STATE } from '../../../utils/constants';
import { getClassByValue } from '../../../utils/draw';

function DrawsSummaryChallenge({
  draws, drawsState, handleDraw = () => {}, handleResetPlayer = () => {},
}) {
  const { t } = useTranslation();

  const drawsArray = Object.keys(draws);
  return (
    <div className={styles['dbb-summary']}>
      <div className={styles['dbb-summary__wrapper']}>
        {drawsArray.map((key) => (
          <div
            key={key}
            className={styles['dbb-summary__container']}
            data-testid={`draws-summary-challenge-player-${key}`}
          >
            <div className={styles['dbb-summary-title']}>
              <div className={styles['dbb-summary-title-container']}>
                <h3 className={styles['dbb-summary-player']}>
                  {t('drawsSummary.player', { id: key })}
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetPlayer(key)}
                  className={`${styles['dbb-summary-player']} ${styles['dbb-summary-player--reset']}`}
                  data-testid={`draws-summary-reset-player-${key}`}
                >
                  {t('drawsSummary.reset')}
                </button>
              </div>
              {drawsState === DRAWS_STATE.DRAFT && +key === 1 ? (
                <span className={`
                ${styles['dbb-summary-player']} 
                ${styles['dbb-summary-player__draft']} 
                ${styles['dbb-summary-player--pulse']}
                `}
                >
                  {t('drawsSummary.draftOpen')}
                </span>
              ) : null}
            </div>
            <div className={styles['dbb-summary__items']}>
              {draws[key].draws.map((playerDraw, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDraw(+key, index)}
                  className={`
                  ${styles['dbb-summary__item']} 
                  ${!playerDraw.line ? styles['dbb-summary__item--disabled'] : ''} 
                  ${drawsState === DRAWS_STATE.DRAFT
                    ? `${styles['dbb-summary__item--pulse-grey']} ${styles['dbb-summary__clickable']}` : ''} 
                  ${index === draws[key].draws.length - 1 ? styles['dbb-summary__item--no-mr'] : ''}
                  ${styles[getClassByValue(playerDraw?.line || '')]}
                `}
                  data-testid={`draws-summary-challenge-item-player-${key}-draw-${index}`}
                >
                  <div className={styles['dbb-summary__number']}>
                    {!playerDraw.column && playerDraw?.line?.slice(0, 3)}
                  </div>
                  {playerDraw.column && (
                  <div className={styles['dbb-summary__subnumber']}>
                    <div className={styles.subType}>{playerDraw.column}</div>
                    <div className={styles.type}>{playerDraw.line.slice(0, 3)}</div>
                  </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

DrawsSummaryChallenge.propTypes = {
  draws: PropTypes.shape({
    id: PropTypes.number,
    draws: PropTypes.arrayOf(PropTypes.shape({
      line: PropTypes.number,
      column: PropTypes.number,
    })),
  }).isRequired,
  drawsState: PropTypes.string.isRequired,
  handleResetPlayer: PropTypes.func,
  handleDraw: PropTypes.func,
};

export default DrawsSummaryChallenge;
