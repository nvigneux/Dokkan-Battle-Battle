import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

// Utils
import {
  drawsHasStarted, findActiveTurnPlayer, findNextPlayer, getRandomArbitrary, getType,
} from '../utils/draw';
import { DRAWS_STATE } from '../utils/constants';
import { arrayToString, stringToArray } from '../utils/transform';

// Components
import Page from '../components/templates/Page/Page';
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
import TitleDokkan from '../components/atoms/TitleDokkan/TitleDokkan';
import DokkanToast from '../components/atoms/DokkanToast/DokkanToast';
import Players from '../components/organisms/Players/Players';
import TitleButtonDokkan from '../components/atoms/TitleButtonDokkan/TitleButtonDokkan';
import ButtonDokkan from '../components/atoms/ButtonDokkan/ButtonDokkan';
import Drawback from '../components/molecules/Drawback/Drawback';
import DrawCharacter from '../components/organisms/DrawCharacter/DrawCharacter';
import DrawsSummaryChallenge from '../components/molecules/DrawsSummaryChallenge/DrawsSummaryChallenge';
import DokkanTimer from '../components/atoms/DokkanTimer/DokkanTimer';

// Utils
import { getCommonProps } from '../utils/requests';

const DEFAULT_COST_DRAWS = [
  '200',
  '250',
  '300',
];

const EMPTY_DRAW = { line: null, column: null };
const INIT_PLAYER_DRAWS = { draws: Array(6).fill(EMPTY_DRAW) };

function Home() {
  const { t } = useTranslation();

  const DEFAULT_TYPES_DRAWS = [
    t('challengebattle.drawsType.extremStr'),
    t('challengebattle.drawsType.extremPhy'),
    t('challengebattle.drawsType.extremInt'),
    t('challengebattle.drawsType.extremTec'),
    t('challengebattle.drawsType.extremAgl'),
    t('challengebattle.drawsType.superStr'),
    t('challengebattle.drawsType.superPhy'),
    t('challengebattle.drawsType.superInt'),
    t('challengebattle.drawsType.superTec'),
    t('challengebattle.drawsType.superAgl'),
    t('challengebattle.drawsType.rainbow'),
  ];
  const DEFAULT_JOKER_DRAWS = [
    t('challengebattle.addJoker'),
  ];

  const [editDrawsTypeIsOpen, setEditDrawsTypeIsOpen] = useState(false);
  const [drawbacksTypes, setDrawbacksTypes] = useState(DEFAULT_TYPES_DRAWS);

  const [drawbackCostSelected, setDrawbackCostSelected] = useState('');
  const [drawbackJokerSelected, setDrawbackJokerSelected] = useState('');

  const [draws, setDraws] = useState({ 1: INIT_PLAYER_DRAWS });
  const [drawsState, setDrawsState] = useState(DRAWS_STATE.OPEN);
  const [activeDraw, setActiveDraw] = useState({ line: '', column: '' });

  const [players, setPlayers] = useState([{ id: 1, color: 'green' }]);
  const [activePlayer, setActivePlayer] = useState(players[0]);

  const drawsHasValues = useMemo(() => drawsHasStarted(draws), [draws]);

  /**
 * Notifies the user with a toast message.
 *
 * @param {string} id - The ID of the toast message.
 * @param {string} text - The main text content of the toast.
 * @param {string} subText - The subtext content of the toast.
 * @param {string} [type='info'] - The type of the toast message. Defaults to 'info'.
 * @returns {void}
 */
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
        t('challengebattle.notifications.draftOpen'),
        t('challengebattle.notifications.draftOpenMsg'),
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
    const newPlayer = { id: idNewPlayer, color: 'green' };
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
  };

  /**
   * Handles the edit of draws type.
   * @param {string} selectedItem - The selected item to edit.
   * @returns {void}
   */
  const handleEditDrawsType = (selectedItem) => {
    const drawbacksArray = stringToArray(selectedItem);
    setDrawbacksTypes(drawbacksArray);
    setEditDrawsTypeIsOpen(false);
    notify(
      'editDrawback',
      t('challengebattle.notifications.modificationSaved'),
      t('challengebattle.notifications.modificationSavedMsg'),
      'success',
    );
  };

  const handleDraw = (playerId, activeTurn = -1) => {
    const randomLine = getRandomArbitrary(0, drawbacksTypes.length);
    const newDraw = getType(drawbacksTypes[randomLine]);
    const activeTurnPlayer = activeTurn >= 0 ? activeTurn : findActiveTurnPlayer(draws[playerId].draws);

    setDraws((prevDraws) => {
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

      const nextPlayer = defineNextPlayer(newDraws, players, true);
      setActivePlayer(nextPlayer);
      return newDraws;
    });
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
      setActiveDraw({ line: '', column: '' });
      return newDraws;
    });
  };

  const handleResetPlayer = (playerId) => {
    setDraws((prevState) => {
      const newDraws = {
        ...prevState,
        [playerId]: INIT_PLAYER_DRAWS,
      };
      const nextPlayer = defineNextPlayer(newDraws, players);
      setActivePlayer(nextPlayer);
      setActiveDraw({ line: '', column: '' });
      return newDraws;
    });
  };

  const handleSelectDrawbackCost = (items) => {
    const drawbacksArray = stringToArray(items);
    const randomIndex = Math.floor(Math.random() * drawbacksArray.length);
    setDrawbackCostSelected(drawbacksArray[randomIndex]);
  };

  const handleSelectDrawbackJoker = (items) => {
    const drawbacksArray = stringToArray(items);
    const randomIndex = Math.floor(Math.random() * drawbacksArray.length);
    setDrawbackJokerSelected(drawbacksArray[randomIndex]);
  };

  return (
    <>
      <Head>
        <title>{t('challengebattle.title')}</title>
        <meta
          name="description"
          content={t('challengebattle.description')}
        />
      </Head>

      <WithHeaderFooter>
        <Page>
          <TitleDokkan>{t('challengebattle.numberofplayers')}</TitleDokkan>
          <Players
            players={players}
            addPlayer={addPlayer}
            deletePlayer={deletePlayer}
            mode="challenge"
          />
          <TitleButtonDokkan>
            <TitleDokkan>{t('challengebattle.drawstype')}</TitleDokkan>
            <ButtonDokkan size="small" color="green" onClick={() => setEditDrawsTypeIsOpen(!editDrawsTypeIsOpen)}>
              {editDrawsTypeIsOpen ? t('challengebattle.close') : t('challengebattle.edit')}
            </ButtonDokkan>
          </TitleButtonDokkan>
          {editDrawsTypeIsOpen ? (
            <Drawback
              id="editDrawsType"
              label={t('challengebattle.validedit')}
              drawbacksOptions={arrayToString(drawbacksTypes)}
              handleClick={handleEditDrawsType}
              data-testid="edit-draws-type"
            />
          ) : null}
          <DrawCharacter
            activePlayer={activePlayer}
            handleDraw={handleDraw}
            draws={draws}
            drawState={drawsState}
            activeDraw={activeDraw}
            mode="challenge"
          />
          <TitleButtonDokkan>
            <TitleDokkan>{t('challengebattle.drawsummary')}</TitleDokkan>
            <ButtonDokkan
              size="small"
              color="green"
              onClick={handleResetDraws}
              disabled={!drawsHasValues}
            >
              {t('challengebattle.resetall')}
            </ButtonDokkan>
          </TitleButtonDokkan>
          <DrawsSummaryChallenge
            draws={draws}
            drawsState={drawsState}
            handleDraw={handleDraw}
            handleResetPlayer={handleResetPlayer}
          />
          <TitleDokkan>{t('challengebattle.teamcost')}</TitleDokkan>
          <Drawback
            id="drawbackCost"
            label={t('challengebattle.drawcost')}
            drawbacksOptions={arrayToString(DEFAULT_COST_DRAWS)}
            handleClick={handleSelectDrawbackCost}
            drawbackSelected={drawbackCostSelected}
            data-testid="team-cost"
          />
          <TitleDokkan>{t('challengebattle.drawjoker')}</TitleDokkan>
          <Drawback
            id="drawbackJoker"
            label={t('challengebattle.drawjoker')}
            drawbacksOptions={arrayToString(DEFAULT_JOKER_DRAWS)}
            handleClick={handleSelectDrawbackJoker}
            drawbackSelected={drawbackJokerSelected}
            data-testid="joker"
          />
          <TitleDokkan>{t('challengebattle.timer')}</TitleDokkan>
          <DokkanTimer />
        </Page>
      </WithHeaderFooter>
    </>
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

export default Home;
