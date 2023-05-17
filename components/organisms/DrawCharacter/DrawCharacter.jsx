import PropTypes from 'prop-types';

// Components
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';
import DrawNumbers from '../../atoms/DrawNumbers/DrawNumbers';

// Styles
import styles from './DrawCharacter.module.css';
import { DRAWS_STATE } from '../../../utils/constants';
import DrawTypes from '../../atoms/DrawTypes/DrawTypes';

function DrawCharacter({
  mode, activePlayer, previousPlayer, draws, handleDraw, activeDraw, drawState,
}) {
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
          {`Draw for Player ${activePlayer?.id}`}
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
            {`Re-Draw for P${previousPlayer?.id}`}
          </ButtonDokkan>

          <ButtonDokkan
            color="yellow"
            size="small"
            disabled={(!previousPlayer && !activeDraw?.randomLine) || !draws[previousPlayer?.id]?.draws[0]?.line}
            onClick={() => handleDraw(previousPlayer?.id, true, true)}
          >
            Re-Draw Column
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

DrawCharacter.defaultProps = {
  previousPlayer: null,
  activeDraw: null,
  mode: 'rush',
};

export default DrawCharacter;
