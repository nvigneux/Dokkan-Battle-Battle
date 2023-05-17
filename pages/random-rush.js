// Components
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Page from '../components/templates/Page/Page';
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
import TitleDokkan from '../components/atoms/TitleDokkan/TitleDokkan';
import Players from '../components/organisms/Players/Players';
import DrawCharacter from '../components/organisms/DrawCharacter/DrawCharacter';
import DrawsSummary from '../components/molecules/DrawsSummary/DrawsSummary';
import ButtonDokkan from '../components/atoms/ButtonDokkan/ButtonDokkan';
import TitleButtonDokkan from '../components/atoms/TitleButtonDokkan/TitleButtonDokkan';
import Drawback from '../components/molecules/Drawback/Drawback';
import DokkanToast from '../components/atoms/DokkanToast/DokkanToast';

// Utils
import { getCommonProps } from '../utils/requests';
import {
  drawAlreadyExists, drawIsCanceled, drawsHasStarted, findActiveTurnPlayer, findLastDraw, findLastDrawPlayers,
  findNextPlayer, getRandomArbitrary,
} from '../utils/draw';
import {
  DRAWS_STATE, RUSH_MAX_COLUMN, RUSH_MIN_COLUMN, RUSH_MIN_LINE,
} from '../utils/constants';
import { arrayToString, stringToArray } from '../utils/transform';

const DEFAULT_DRAWBACKS = [
  'Re-Draw one character',
  'Random friend leader',
  'Only 3 support item',
];
const EMPTY_DRAW = { line: null, column: null };
const INIT_PLAYER_DRAWS = { draws: Array(6).fill(EMPTY_DRAW) };

function Accueil() {
  const [draws, setDraws] = useState({ 1: INIT_PLAYER_DRAWS });
  const [drawsState, setDrawsState] = useState(DRAWS_STATE.OPEN);
  const [activeDraw, setActiveDraw] = useState({ line: 0, column: 0 });

  const [players, setPlayers] = useState([{ id: 1, nbLines: 0, color: 'green' }]);
  const [activePlayer, setActivePlayer] = useState(players[0]);
  const [previousPlayer, setPreviousPlayer] = useState(players[0]);

  const [drawbackSelected, setDrawbackSelected] = useState('');

  const drawsHasValues = useMemo(() => drawsHasStarted(draws), [draws]);

  const notify = (id, text, subText, type = 'info') => {
    if (!toast.isActive(id)) {
      toast(
        <DokkanToast
          text={text}
          subText={subText}
          type={type}
        />,
        {
          toastId: id,
          duration: 3000,
          position: 'top-right',
          onClose: () => toast.clearWaitingQueue(),
        },
      );
    }
  };

  /**
 * Defines the next player based on the current state of draws and active turn.
 * @param {Object} drawsObj - The previous state of draws.
 * @returns {Players} all players.
 */
  const defineNextPlayer = (drawsObj, playersArr, isDraft = false) => {
    const { id, activeTurn } = findNextPlayer(drawsObj);
    const nextPlayer = playersArr.find((p) => p.id === +id);
    if (activeTurn === -1 && drawsState !== DRAWS_STATE.DRAFT && isDraft) {
      notify(
        'draft',
        'Draft is open',
        'Draws finished',
        'success',
      );
      setDrawsState(DRAWS_STATE.DRAFT);
    }
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

  /**
 * Resets the draws to their initial state for all players.
 * Then sets the active player based on the new draw data.
 */
  const handleResetDraws = () => {
    setDraws((prevState) => {
      const newDraws = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = INIT_PLAYER_DRAWS;
        return acc;
      }, {});
      const nextPlayer = defineNextPlayer(newDraws, players);
      setActivePlayer(nextPlayer);
      setPreviousPlayer(nextPlayer);
      return newDraws;
    });
  };

  /**
 * Handles the cancellation of a draw for a player.
 * Updates the draws with the canceled draw for the player.
 * Sets the active draw to the new draw.
 * Sets the active player and the previous player based on the new draws.
 *
 * @param {Player} player - The player whose draw was canceled.
 * @param {object} newDraw - The new draw for the player.
 */
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
    notify(
      'draw-1-1',
      'Draw 1-1',
      'You need to re-draw your picks.',
    );
  };

  /**
 * Handles the draw for a player.
 * Generates a random line and column for the draw.
 * Checks if the draw is canceled, and handles it accordingly.
 * Updates the draws with the new draw and sets the active player based on the updated draws.
 *
 * @param {string} playerId - The ID of the player.
 * @param {boolean} [reDraw=false] - Indicates whether it is a redraw.
 * @param {boolean} [onlyColumn=false] - Indicates whether it is only column draw.
 * @param {number} [activeTurn=-1] - The active turn of the player.
 * @returns {void}
 */
  const handleDraw = (playerId, reDraw = false, onlyColumn = false, activeTurn = -1) => {
    const player = players.find((p) => p.id === playerId);

    if (player.nbLines > 0) {
      const line = getRandomArbitrary(RUSH_MIN_LINE, player.nbLines);
      const column = getRandomArbitrary(RUSH_MIN_COLUMN, RUSH_MAX_COLUMN);
      const activeTurnPlayerFunc = reDraw ? findLastDraw : findActiveTurnPlayer;
      const activeTurnPlayer = activeTurn >= 0 ? activeTurn : activeTurnPlayerFunc(draws[playerId].draws);
      const activeDrawPlayer = activeTurn >= 0 ? draws[playerId].draws[activeTurn] : activeDraw;

      const newDraw = onlyColumn && activeDrawPlayer.line
        ? { line: activeDrawPlayer.line, column } : { line, column };

      if (drawIsCanceled(newDraw)) {
        handleDrawIsCanceled(player, newDraw);
        return;
      }

      // if only column and column is the same as the active draw relaunch the draw for avoid duplicate check and delete
      if (onlyColumn && activeDrawPlayer.column === column) {
        handleDraw(playerId, true, true, activeTurnPlayer);
        return;
      }

      const drawAlreadyExistsInPreviousDraws = drawAlreadyExists(newDraw, draws[playerId].draws);

      if (drawAlreadyExistsInPreviousDraws >= 0) {
        notify(
          'duplicate',
          'Duplicate',
          'Redraw, the last pick was a duplicate',
        );
      }

      setDraws((prevDraws) => {
        const newPlayersDraws = draws[playerId].draws.reduce((acc, draw, index) => {
          if (index === drawAlreadyExistsInPreviousDraws) return [...acc, { line: null, column: null }];
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

        const nextPlayer = defineNextPlayer(newDraws, players, true);
        setActivePlayer(nextPlayer);
        setPreviousPlayer(player);
        return newDraws;
      });
      return;
    }

    if (player.nbLines <= 0) {
      notify('error-nbLines', 'Numbers of lines', `Enter the number of lines for the Player ${player.id}`, 'error');
    }
  };

  const handleSelectDrawback = (items) => {
    const drawbacksArray = stringToArray(items);
    const randomIndex = Math.floor(Math.random() * drawbacksArray.length);
    setDrawbackSelected(drawbacksArray[randomIndex]);
  };

  return (
    <WithHeaderFooter>
      <Page>
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
          draws={draws}
          drawState={drawsState}
          activeDraw={activeDraw}
        />
        <TitleButtonDokkan>
          <TitleDokkan>Draws summary</TitleDokkan>
          <ButtonDokkan
            size="small"
            color="green"
            onClick={handleResetDraws}
            disabled={!drawsHasValues}
          >
            Reset
          </ButtonDokkan>
        </TitleButtonDokkan>
        <DrawsSummary draws={draws} drawsState={drawsState} handleDraw={handleDraw} />
        <TitleDokkan>Draw disadvantage</TitleDokkan>
        <Drawback
          label="Draw disadvantage"
          drawbacksOptions={arrayToString(DEFAULT_DRAWBACKS)}
          handleClick={handleSelectDrawback}
          drawbackSelected={drawbackSelected}
        />
      </Page>
    </WithHeaderFooter>
  );
}

export const getStaticProps = async (ctx) => {
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      ...commonProps,
    },
  };
};

export default Accueil;
