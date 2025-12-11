// ***********************************************
// Helper functions for Cypress tests
// ***********************************************

/**
 * Constants for test timeouts
 */
export const TIMEOUTS = {
  SHORT: 500,
  MEDIUM: 2000,
  LONG: 5000,
  VERY_LONG: 10000,
};

/**
 * Common wait times
 */
export const WAIT_TIMES = {
  DRAW_COMPLETE: 500,
  DRAW_LOOP: 300,
  TIMER_COUNTDOWN: 1000,
};

/**
 * Common regex patterns for bilingual text matching
 */
export const TEXT_PATTERNS = {
  PLAYER: /joueur|player/i,
  DRAFT_OPEN: /draft ouverte|draft open/i,
  CLICK_TOP_NUMBER: /cliquez sur le nombre en haut|click top number/i,
  CLICK_BOTTOM_NUMBER: /cliquez sur le nombre en bas|click bottom number/i,
  DRAW_DISADVANTAGE: /tirer un désavantage|draw disadvantage/i,
  TEAM_COST: /coût de l'équipe|team cost/i,
  DRAW_JOKER: /tirage du joker|draw joker/i,
  TIMER: /minuteur|timer/i,
  EDIT: /modifier|edit/i,
  CLOSE: /fermer|close/i,
  RESET: /reset|resetall/i,
  STOP: /arrêter|stop/i,
  NUMBER_OF_LINES: /nombre de lignes|number of lines/i,
  ENTER_NUMBER_OF_LINES: /entrez le nombre de lignes|enter the number of lines/i,
};

/**
 * Helper to create player regex pattern
 * @param {number} playerId - The player ID
 * @returns {RegExp} Regex pattern for the player
 */
export const getPlayerPattern = (playerId) => new RegExp(`joueur ${playerId}|player ${playerId}`, 'i');
