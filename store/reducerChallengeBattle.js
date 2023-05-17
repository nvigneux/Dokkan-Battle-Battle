const { DRAWS_STATE } = require('../utils/constants');

const DEFAULT_TYPES_DRAWS = [
  'Extrem Strong',
  'Extrem Physical',
  'Extrem Intelligent',
  'Extrem Technical',
  'Extrem Agility',
  'Super Strong',
  'Super Physical',
  'Super Intelligent',
  'Super Technical',
  'Super Agility',
  'Rainbow',
];

const EMPTY_DRAW = { line: null, column: null };
const INIT_PLAYER_DRAWS = { draws: Array(6).fill(EMPTY_DRAW) };

// Define initial state for players
export const initialPlayersState = {
  players: [{ id: 1, color: 'green' }],
  activePlayer: null,
};

// Define reducer function for players
function playersReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_ACTIVE_PLAYER':
      return { ...state, activePlayer: action.payload };
    default:
      return state;
  }
}

// Define initial state for draws
export const initialDrawsState = {
  draws: { 1: INIT_PLAYER_DRAWS },
  drawsState: DRAWS_STATE.OPEN,
  activeDraw: { line: '', column: '' },
};

// Define reducer function for draws
function drawsReducer(state, action) {
  switch (action.type) {
    case 'SET_DRAWS':
      return { ...state, draws: action.payload };
    case 'SET_DRAWS_STATE':
      return { ...state, drawsState: action.payload };
    case 'SET_ACTIVE_DRAW':
      return { ...state, activeDraw: action.payload };
    default:
      return state;
  }
}

// Define initial state for drawbacks
export const initialDrawbacksState = {
  editDrawsTypeIsOpen: false,
  drawbacksTypes: DEFAULT_TYPES_DRAWS,
  drawbackCostSelected: '',
  drawbackJokerSelected: '',
};

// Define reducer function for drawbacks
function drawbacksReducer(state, action) {
  switch (action.type) {
    case 'SET_EDIT_DRAWS_TYPE_OPEN':
      return { ...state, editDrawsTypeIsOpen: action.payload };
    case 'SET_DRAWBACKS_TYPES':
      return { ...state, drawbacksTypes: action.payload };
    case 'SET_DRAWBACK_COST_SELECTED':
      return { ...state, drawbackCostSelected: action.payload };
    case 'SET_DRAWBACK_JOKER_SELECTED':
      return { ...state, drawbackJokerSelected: action.payload };
    default:
      return state;
  }
}

// Combine reducers
export function rootReducer(state, action) {
  return {
    players: playersReducer(state.players, action),
    draws: drawsReducer(state.draws, action),
    drawbacks: drawbacksReducer(state.drawbacks, action),
  };
}

// const [state, dispatch] = useReducer(rootReducer, {
//   players: initialPlayersState,
//   draws: initialDrawsState,
//   drawbacks: initialDrawbacksState,
// });

// // Accessing state and dispatch for players
// const { players, activePlayer } = state.players;
// // ...
// const setPlayers = (updatedPlayers) => {
//   dispatch({ type: 'SET_PLAYERS', payload: updatedPlayers });
// };
// // ...

// // Accessing state and dispatch for draws
// const { draws, drawsState, activeDraw } = state.draws;
// // ...
// const setDraws = (updatedDraws) => {
//   dispatch({ type: 'SET_DRAWS', payload: updatedDraws });
// };
// // ...

// // Accessing state and dispatch for drawbacks
// const {
//   editDrawsTypeIsOpen,
//   drawbacksTypes,
//   drawbackCostSelected,
//   drawbackJokerSelected,
// } = state.drawbacks;
// // ...
// const setEditDrawsTypeOpen = (isOpen) => {
//   dispatch({ type: 'SET_EDIT_DRAWS_TYPE_OPEN', payload: isOpen });
// };
