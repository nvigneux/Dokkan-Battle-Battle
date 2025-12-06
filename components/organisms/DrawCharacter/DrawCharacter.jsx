import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

// Components
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';
import DrawNumbers from '../../atoms/DrawNumbers/DrawNumbers';
import DrawTypes from '../../atoms/DrawTypes/DrawTypes';

// Styles
import styles from './DrawCharacter.module.css';

// Utils
import { DRAWS_STATE } from '../../../utils/constants';

function DrawCharacter({
  mode = 'rush', activePlayer, previousPlayer = null, draws, handleDraw, activeDraw = null, drawState,
}) {
  const { t } = useTranslation();

  return (
    <div className={styles['dbb-draw-container']}>
      <div className={styles['dbb-draw-random']}>
        {mode === 'rush' ? (
          <DrawNumbers line={activeDraw?.line} column={activeDraw?.column} />
        ) : (
          <DrawTypes line={activeDraw?.line} column={activeDraw?.column} />
        )}
      </div>
      <div className={styles['dbb-draw']}>
        <ButtonDokkan
          color="orange"
          size="big"
          onClick={() => handleDraw(activePlayer?.id)}
          disabled={drawState !== DRAWS_STATE.OPEN}
        >
          {t('drawCharacter.drawButton', { id: activePlayer?.id })}
        </ButtonDokkan>
      </div>
      {mode === 'rush' ? (
        <div className={styles['dbb-redraw']}>
          <ButtonDokkan
            color="yellow"
            size="small"
            disabled={(!previousPlayer && !activeDraw?.randomLine) || !draws[previousPlayer?.id]?.draws[0]?.line}
            onClick={() => handleDraw(previousPlayer?.id, true)}
          >
            {t('drawCharacter.redrawButton', { id: previousPlayer?.id })}
          </ButtonDokkan>

          <ButtonDokkan
            color="yellow"
            size="small"
            disabled={(!previousPlayer && !activeDraw?.randomLine) || !draws[previousPlayer?.id]?.draws[0]?.line}
            onClick={() => handleDraw(previousPlayer?.id, true, true)}
          >
            {t('drawCharacter.redrawColumnButton')}
          </ButtonDokkan>
        </div>
      ) : null}
    </div>
  );
}

DrawCharacter.propTypes = {
  activePlayer: PropTypes.shape({
    id: PropTypes.number,
    nbLines: PropTypes.number,
  }).isRequired,
  previousPlayer: PropTypes.shape({
    id: PropTypes.number,
    nbLines: PropTypes.number,
  }),
  draws: PropTypes.shape({
    id: PropTypes.number,
    draws: PropTypes.arrayOf(PropTypes.shape({
      line: PropTypes.number,
      column: PropTypes.number,
    })),
  }).isRequired,
  handleDraw: PropTypes.func.isRequired,
  activeDraw: PropTypes.shape({
    randomLine: PropTypes.number,
    randomColumn: PropTypes.number,
  }),
  drawState: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['rush', 'challenge']),
};

export default DrawCharacter;
