/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './Players.module.css';

// Utils
import cn from '../../../utils/cn';

function Players({
  mode, players, addPlayer, deletePlayer, setPlayerLine,
}) {
  const { t } = useTranslation();

  /**
   * Handles the onFocus event for a player input field.
   *
   * @param {Event} e - The onFocus event object.
   * @param {Object} player - The player object.
   */
  const handleOnBlur = (e, player) => {
    if (e.target.value === '') {
      setPlayerLine(player, 0);
    }
  };

  /**
   * Handles the onFocus event for a player input field.
   *
   * @param {Event} e - The onFocus event object.
   * @param {Object} player - The player object.
   */
  const handleOnFocus = (e, player) => {
    if (!player.nbLines) {
      e.target.select();
      setPlayerLine(player, '');
    }
  };

  return (
    <div className={cn([styles['dbb-players'], styles[mode]])}>
      {players.map((player) => (
        <div
          key={player.id}
          className={`${styles['dbb-player']} ${styles[`dbb-player--${player.color}`]} 
          ${styles[`dbb-player--border-${player.color}`]}`}
        >
          <label htmlFor={`player-${player.id}`} className={styles['dbb-player__id']}>
            {t('players.player')}
            {' '}
            {player.id}
          </label>
          <div className={styles['dbb-player__number']}>
            {mode === 'rush' ? (
              <input
                id={`player-${player.id}`}
                className={styles['dbb-player__number--input']}
                type="number"
                min="0"
                value={player.nbLines}
                onFocus={(e) => handleOnFocus(e, player)}
                onBlur={(e) => handleOnBlur(e, player)}
                onChange={(e) => {
                  const value = Math.min(Math.max(0, e.target.value), 999);
                  setPlayerLine(player, value);
                }}
              />
            ) : (
              <span className={styles['dbb-player__number--input']}>{`P${player.id}`}</span>
            )}
          </div>
          <div htmlFor={`player-${player.id}`} className={styles['dbb-player__line']}>
            {mode === 'rush' ? t('players.nbLines') : null}
          </div>
          {player.id !== 1 && (
            <button
              type="button"
              className={cn([styles['dbb-icon'], styles['dbb-icon--delete']])}
              onClick={() => {
                deletePlayer(player);
              }}
            />
          )}
        </div>
      ))}
      <button
        type="button"
        className={`${styles['dbb-player']} ${styles['dbb-player--add']} 
        ${styles['dbb-player--grey']} ${styles['dbb-player--border-grey']}`}
        onClick={addPlayer}
      >
        <span className={styles['dbb-player__id']}>{t('players.add')}</span>
        <div className={styles['dbb-player__number']}>
          <span className={styles['dbb-player__number--input']}>+</span>
        </div>
        <div className={styles['dbb-player__line']}>
          {`${t('players.player')} ${players[players.length - 1].id + 1}`}
        </div>
      </button>
    </div>
  );
}

Players.propTypes = {
  mode: PropTypes.oneOf(['challenge', 'rush']),
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  setPlayerLine: PropTypes.func,
};

Players.defaultProps = {
  mode: 'rush',
  setPlayerLine: () => {},
};

export default Players;
