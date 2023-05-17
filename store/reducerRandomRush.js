const { DRAWS_STATE } = require('../utils/constants');

const EMPTY_DRAW = { line: null, column: null };
const INIT_PLAYER_DRAWS = { draws: Array(6).fill(EMPTY_DRAW) };

// Define initial state for players
export const initialPlayersState = {
  players: [{ id: 1, nbLines: 0, color: 'green' }],
  activePlayer: null,
  previousPlayer: null,
};

// Define reducer function for players
function playersReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_ACTIVE_PLAYER':
      return { ...state, activePlayer: action.payload };
    case 'SET_PREVIOUS_PLAYER':
      return { ...state, previousPlayer: action.payload };
    default:
      return state;
  }
}

// Define initial state for draws
export const initialDrawsState = {
  draws: { 1: INIT_PLAYER_DRAWS },
  drawsState: DRAWS_STATE.OPEN,
  activeDraw: { line: 0, column: 0 },
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
  drawbackSelected: '',
};

// Define reducer function for drawbacks
function drawbacksReducer(state, action) {
  switch (action.type) {
    case 'SET_DRAWBACK_SELECTED':
      return { ...state, drawbackSelected: action.payload };
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
