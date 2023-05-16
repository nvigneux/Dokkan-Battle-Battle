import { max } from 'lodash';

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
    if (activeTurn < acc.activeTurn || acc.activeTurn === -1) return { id: key, activeTurn };
    return acc;
  }, { id: null, activeTurn: 0 });

  return nextPlayer;
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
    const lastIndex = drawsObj[key];

    if (lastIndex >= acc.lastIndex) {
      return { ...acc, key, lastIndex };
    }

    return { ...acc };
  }, { key: 0, lastIndex: 0 });

  return { ...lastKey, key: +lastKey.key };
}
