/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';

// Styles
import styles from './Players.module.css';

// Utils
import cn from '../../../utils/cn';

function Players({
  players, addPlayer, deletePlayer, setPlayerLine,
}) {
  return (
    <div className={styles['dbb-players']}>
      {players.map((player) => (
        <div
          key={player.id}
          className={`${styles['dbb-player']} ${styles[`dbb-player--${player.color}`]} 
          ${styles[`dbb-player--border-${player.color}`]}`}
        >
          <span className={styles['dbb-player__id']}>
            Player
            {' '}
            {player.id}
          </span>
          <div className={styles['dbb-player__number']}>
            <input
              name={`player-${player.id}`}
              className={styles['dbb-player__number--input']}
              type="number"
              min="0"
              value={player.nbLines}
              onChange={(e) => {
                const value = Math.min(Math.max(0, e.target.value), 999);
                setPlayerLine(player, value);
              }}
            />
          </div>
          <div className={styles['dbb-player__line']}>Nb lines</div>
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
        <span className={styles['dbb-player__id']}>Add</span>
        <div className={styles['dbb-player__number']}>
          <span className={styles['dbb-player__number--input']}>+</span>
        </div>
        <div className={styles['dbb-player__line']}>
          Player
          {' '}
          {players[players.length - 1].id + 1}
        </div>
      </button>
    </div>
  );
}

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  setPlayerLine: PropTypes.func.isRequired,
};

export default Players;
