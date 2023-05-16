import { useState } from 'react';
// Components
import TitleDokkan from '../../atoms/TitleDokkan/TitleDokkan';
import Players from '../../organisms/Players/Players';
import DrawCharacter from '../../organisms/DrawCharacter/DrawCharacter';

// Styles
import styles from './RandomRush.module.css';
import {
  drawAlreadyExists, drawIsCanceled, findActiveTurnPlayer, findLastDraw, findLastDrawPlayers, findNextPlayer, getRandomArbitrary,
} from '../../../utils/draw';
import DrawsSummary from '../../molecules/DrawsSummary/DrawsSummary';
import {
  DRAWS_STATE, RUSH_MAX_COLUMN, RUSH_MIN_COLUMN, RUSH_MIN_LINE,
} from '../../../utils/constants';

const EMPTY_DRAW = { line: null, column: null };
const INIT_PLAYER_DRAWS = { draws: Array(6).fill(EMPTY_DRAW) };

function RandomRush() {
  const [draws, setDraws] = useState({ 1: INIT_PLAYER_DRAWS });
  const [drawsState, setDrawsState] = useState(DRAWS_STATE.OPEN);
  const [activeDraw, setActiveDraw] = useState({ line: 0, column: 0 });

  const [players, setPlayers] = useState([{ id: 1, nbLines: 0, color: 'green' }]);
  const [activePlayer, setActivePlayer] = useState(players[0]);
  const [previousPlayer, setPreviousPlayer] = useState(players[0]);

  const handleEndOfDraws = () => {
    setDrawsState(DRAWS_STATE.DRAFT);
  };

  /**
 * Defines the next player based on the current state of draws and active turn.
 * @param {Object} drawsObj - The previous state of draws.
 * @returns {Player} The next player.
 */
  const defineNextPlayer = (drawsObj, playersArr) => {
    const { id, activeTurn } = findNextPlayer(drawsObj);
    const nextPlayer = playersArr.find((p) => p.id === +id);
    if (activeTurn === -1) handleEndOfDraws();
    if (drawsState !== DRAWS_STATE.OPEN && activeTurn > -1) setDrawsState(DRAWS_STATE.OPEN);
    return nextPlayer;
  };

  /**
 * Adds a new player to the players list and initializes their draws.
 */
  const addPlayer = () => {
    const idNewPlayer = players[players.length - 1].id + 1;
    const newPlayer = { id: idNewPlayer, nbLines: 0, color: 'green' };
    const newPlayers = [...players, newPlayer];
    setPlayers(newPlayers);
    setDraws((prevDraws) => {
      const newDraws = { ...prevDraws, [idNewPlayer]: INIT_PLAYER_DRAWS };
      const nextPlayer = defineNextPlayer(newDraws, newPlayers);
      setActivePlayer(nextPlayer);
      return newDraws;
    });
    setDrawsState(DRAWS_STATE.OPEN);
  };

  /**
 * Deletes a player from the players list and removes their draws from the state.
 * @param {Player} player - The player to delete.
 */
  const deletePlayer = (player) => {
    const newPlayers = players.filter((p) => p.id !== player.id);
    setPlayers(newPlayers);

    const updatedDraws = { ...draws };
    delete updatedDraws[player.id];
    setDraws({ ...updatedDraws });

    const nextPlayer = defineNextPlayer(updatedDraws, newPlayers);
    setActivePlayer(nextPlayer);

    const lastPlayerDraw = findLastDrawPlayers(updatedDraws);
    if (previousPlayer.id !== lastPlayerDraw.key) {
      const lastPlayer = newPlayers.find((p) => p.id === lastPlayerDraw.key);
      setPreviousPlayer(lastPlayer);
    }
  };

  /**
   * Set the number of lines for a player
   * @param {Player} player - The player to update.
   * @param {number} nbLines - The number of lines to set.
   */
  const setPlayerLine = (player, nbLines) => {
    setPlayers((prevPlayers) => prevPlayers.map((p) => {
      if (p.id === player.id) {
        return { ...p, nbLines };
      }
      return p;
    }));
  };

  const handleDrawIsCanceled = (player, newDraw) => {
    setDraws((prevDraws) => {
      const newDraws = {
        ...prevDraws,
        [player?.id]: INIT_PLAYER_DRAWS,
      };
      setActiveDraw(newDraw);

      const nextPlayer = defineNextPlayer(newDraws, players);
      setActivePlayer(nextPlayer);
      setPreviousPlayer(player);
      return newDraws;
    });
  };

  const handleDraw = (playerId) => {
    const player = players.find((p) => p.id === playerId);

    if (player.nbLines > 0) {
      const line = getRandomArbitrary(RUSH_MIN_LINE, player.nbLines);
      const column = getRandomArbitrary(RUSH_MIN_COLUMN, RUSH_MAX_COLUMN);
      const newDraw = { line, column };

      if (drawIsCanceled(newDraw)) {
        handleDrawIsCanceled(player, newDraw);
        return;
      }

      const drawAlreadyExistsInPreviousDraws = drawAlreadyExists(newDraw, draws[playerId].draws);

      if (drawAlreadyExistsInPreviousDraws >= 0) {
        setDraws((prevDraws) => {
          const newPlayerDrawsArray = draws[playerId].draws.reduce((acc, draw, index) => {
            if (index === drawAlreadyExistsInPreviousDraws) return [...acc, { line: null, column: null }];
            return [...acc, draw];
          }, []);

          const newDraws = {
            ...prevDraws,
            [playerId]: {
              ...prevDraws[playerId],
              draws: newPlayerDrawsArray,
            },
          };
          setActiveDraw(newDraw);

          const nextPlayer = defineNextPlayer(newDraws, players);
          setActivePlayer(nextPlayer);
          setPreviousPlayer(player);
          return newDraws;
        });
        return;
      }

      if (drawAlreadyExistsInPreviousDraws < 0) {
        setDraws((prevDraws) => {
          const activeTurnPlayer = findActiveTurnPlayer(draws[playerId].draws);
          const newPlayersDraws = draws[playerId].draws.reduce((acc, draw, index) => {
            if (index === activeTurnPlayer) return [...acc, newDraw];
            return [...acc, draw];
          }, []);

          const newDraws = {
            ...prevDraws,
            [playerId]: {
              ...prevDraws[playerId],
              draws: newPlayersDraws,
            },
          };
          setActiveDraw(newDraw);

          const nextPlayer = defineNextPlayer(newDraws, players);
          setActivePlayer(nextPlayer);
          setPreviousPlayer(player);
          return newDraws;
        });
        return;
      }
    }

    if (player.nbLines <= 0) {
      alert('No lines for this player');
    }
  };

  const handleReDraw = (playerId) => {
    const player = players.find((p) => p.id === playerId);

    if (player.nbLines > 0) {
      const line = getRandomArbitrary(RUSH_MIN_LINE, player.nbLines);
      const column = getRandomArbitrary(RUSH_MIN_COLUMN, RUSH_MAX_COLUMN);
      const newDraw = { line, column };

      if (drawIsCanceled(newDraw)) {
        handleDrawIsCanceled(player, newDraw);
        return;
      }

      const lastPlayerDraw = findLastDraw(draws[playerId].draws);
      const drawAlreadyExistsInPreviousDraws = drawAlreadyExists(newDraw, draws[playerId].draws);
      if (lastPlayerDraw) {
        setDraws((prevDraws) => {
          const newPlayersDraws = draws[player.id].draws.reduce((acc, draw, index) => {
            if (index === drawAlreadyExistsInPreviousDraws) return [...acc, { line: null, column: null }];
            if (index === lastPlayerDraw) return [...acc, newDraw];
            return [...acc, draw];
          }, []);

          const newDraws = {
            ...prevDraws,
            [player.id]: { draws: newPlayersDraws },
          };
          setActiveDraw(newDraw);
          const nextPlayer = defineNextPlayer(newDraws, players);
          setActivePlayer(nextPlayer);
          setPreviousPlayer(player);

          return newDraws;
        });
      }

      if (player.nbLines <= 0) {
        alert('No lines for this player');
      }
    }
  };

  return (
    <div className={styles.container}>
      <TitleDokkan>Number of players</TitleDokkan>
      <Players
        players={players}
        addPlayer={addPlayer}
        deletePlayer={deletePlayer}
        setPlayerLine={setPlayerLine}
      />
      <TitleDokkan>Draw character</TitleDokkan>
      <DrawCharacter
        activePlayer={activePlayer}
        previousPlayer={previousPlayer}
        handleDraw={handleDraw}
        handleReDraw={handleReDraw}
        draws={draws}
        drawState={drawsState}
        activeDraw={activeDraw}
      />
      <TitleDokkan>Draws summary</TitleDokkan>
      <DrawsSummary draws={draws} />
    </div>
  );
}

export default RandomRush;
