import memoize from 'lodash/memoize';
import kebabCase from 'lodash/kebabCase';

/**
   * Get random number between min and max
   * @param min
   * @param max
   * @returns {any}
   */
export function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * max) + min;
}

/**
 * Find the active turn for one player
 * @param {Array} drawsArr
 * @returns {Number} active turn
 */
export function findActiveTurnPlayer(drawsArr) {
  let activeTurn = -1;

  for (let i = 0; i < drawsArr.length; i += 1) {
    if (!drawsArr[i].line && !drawsArr[i].column) {
      activeTurn = i;
      break;
    }
  }

  return +activeTurn;
}

/**
 * Find the next player
 * @param {Array} drawsObj
 * @returns {Object} next player active turn
 */
export function findNextPlayer(drawsObj) {
  const array = Object.keys(drawsObj);

  const nextPlayer = array.reduce((acc, key) => {
    const playerDraws = drawsObj[key].draws;
    const activeTurn = findActiveTurnPlayer(playerDraws);
    if (!acc.id && acc.activeTurn === 0) return { id: key, activeTurn };

    const isMinActiveTurn = activeTurn < acc.activeTurn && activeTurn >= 0;
    const isDraftActiveTurn = activeTurn === -1 && acc.activeTurn === -1 && activeTurn === acc.activeTurn;
    const onePlayerHasFinished = activeTurn > acc.activeTurn && acc.activeTurn < 0;
    if (isMinActiveTurn || isDraftActiveTurn || onePlayerHasFinished) { return { id: key, activeTurn }; }

    return acc;
  }, { id: null, activeTurn: 0 });

  return nextPlayer;
}

export function drawsHasStarted(drawsObj) {
  const array = Object.keys(drawsObj);
  return array.reduce((acc, key) => {
    const playerDraws = drawsObj[key].draws;
    const activeTurn = findActiveTurnPlayer(playerDraws);
    if (activeTurn > 0 || activeTurn === -1) return true;
    return acc;
  }, false);
}

export function drawAlreadyExists(draw, drawsArr) {
  const indexOfdrawAlreadyExists = drawsArr.reduce((acc, item, index) => {
    if (item.line === draw.line && item.column === draw.column) return index;
    return acc;
  }, -1);
  return indexOfdrawAlreadyExists;
}

export function drawIsCanceled(draw) {
  return draw.line === 1 && draw.column === 1;
}

export function findLastDraw(draws) {
  const lastIndex = draws.reduce((accDraw, draw, index) => {
    if (draw.line && draw.column) {
      return index;
    }
    return accDraw;
  }, 0);

  return +lastIndex;
}

export function findLastDrawPlayers(drawsObj) {
  const lastKey = Object.keys(drawsObj).reduce((acc, key) => {
    const lastIndex = findLastDraw(drawsObj[key].draws);

    if (lastIndex >= acc.lastIndex) {
      return { ...acc, key, lastIndex };
    }

    return { ...acc };
  }, { key: 0, lastIndex: 0 });

  return { ...lastKey, key: +lastKey.key };
}

/**
 * Retrieves the type as an object with line and column properties.
 * @param {string} type - The type string.
 * @returns {{ line: string, column: string }} The type object with line and column properties.
 */

export const getType = memoize((type) => {
  const subType = type.split(' ');
  if (subType.length >= 2) {
    const firstWord = kebabCase(subType[0]);
    if (firstWord === 'super' || firstWord === 'extrem' || firstWord === 'extreme') {
      return { line: subType[1], column: subType[0] };
    }
  }
  return { line: type, column: '' };
});

/**
 * Retrieves the CSS class based on the provided value.
 * @param {string} value - The value to determine the CSS class.
 * @returns {string} The CSS class based on the value.
 */
export const getClassByValue = (value) => {
  switch (value.substring(0, 3).toUpperCase()) {
    case 'SUP':
      return 'color-sup';
    case 'EXT':
      return 'color-ext';
    case 'STR': case 'PUI':
      return 'color-str';
    case 'AGI':
      return 'color-agi';
    case 'PHY': case 'END':
      return 'color-phy';
    case 'INT':
      return 'color-int';
    case 'TEC':
      return 'color-tec';
    case 'RAI':
      return 'color-rai';
    default:
      return 'color-default';
  }
};
