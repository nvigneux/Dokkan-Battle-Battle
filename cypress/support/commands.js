// ***********************************************
// Custom Cypress commands
// ***********************************************

/**
 * Adds a specified number of players to the game
 * @param {number} count - Number of players to add (default: 2)
 */
Cypress.Commands.add('addPlayers', (count = 2) => {
  for (let i = 0; i < count; i += 1) {
    cy.get('[data-testid="player-add-button"]').click();
    cy.contains(new RegExp(`joueur ${i + 2}|player ${i + 2}`, 'i')).should('be.visible');
  }
});

/**
 * Verifies that a specified number of players are visible
 * @param {number} count - Number of players to verify (default: 3)
 */
Cypress.Commands.add('verifyPlayersCount', (count = 3) => {
  for (let i = 1; i <= count; i += 1) {
    cy.contains(new RegExp(`joueur ${i}|player ${i}`, 'i')).should('be.visible');
  }
});

/**
 * Sets the number of lines for a player
 * @param {number} playerId - The player ID
 * @param {number} lines - The number of lines to set
 */
Cypress.Commands.add('setPlayerLines', (playerId, lines) => {
  cy.get(`[data-testid="player-${playerId}-lines-input"]`).clear().type(String(lines));
  cy.get(`[data-testid="player-${playerId}-lines-input"]`).should('have.value', String(lines));
});

/**
 * Performs a draw for a player and waits for completion
 * @param {number} playerId - The player ID
 * @param {number} waitTime - Wait time in ms (default: 500)
 */
Cypress.Commands.add('drawForPlayer', (playerId, waitTime = 500) => {
  cy.get(`[data-testid="draw-button-player-${playerId}"]`).click();
  cy.wait(waitTime);
});

/**
 * Continues draws until all players have completed their draws
 * @param {number} maxIterations - Maximum number of iterations (default: 20)
 * @param {number} waitTime - Wait time between draws in ms (default: 300)
 */
Cypress.Commands.add('completeAllDraws', (maxIterations = 20, waitTime = 300) => {
  for (let i = 0; i < maxIterations; i += 1) {
    cy.get('[data-testid^="draw-button-player-"]').then(($buttons) => {
      const availableDrawButton = Array.from($buttons).find((btn) => !btn.disabled);

      if (availableDrawButton) {
        cy.wrap(availableDrawButton).click();
        cy.wait(waitTime);
      }
    });
  }
});

/**
 * Verifies that a toast notification contains specific text
 * @param {string|RegExp} text - Text or regex to search for
 * @param {number} timeout - Timeout in ms (default: 5000)
 */
Cypress.Commands.add('verifyToast', (text, timeout = 5000) => {
  cy.get('body', { timeout }).should(($body) => {
    const bodyText = $body.text();
    if (text instanceof RegExp) {
      return text.test(bodyText);
    }
    return bodyText.includes(text);
  });
});

/**
 * Verifies that a toast notification contains one of the provided texts
 * @param {string[]} texts - Array of possible texts to search for
 * @param {number} timeout - Timeout in ms (default: 5000)
 */
Cypress.Commands.add('verifyToastContainsOneOf', (texts, timeout = 5000) => {
  cy.get('body', { timeout }).should(($body) => {
    const bodyText = $body.text();
    return texts.some((text) => bodyText.includes(text));
  });
});

/**
 * Waits for a draw to complete by checking if the summary is updated
 * @param {number} playerId - The player ID
 * @param {number} drawIndex - The draw index (default: 0)
 */
Cypress.Commands.add('waitForDrawComplete', (playerId, drawIndex = 0) => {
  cy.get(`[data-testid="draws-summary-player-${playerId}"]`, { timeout: 5000 }).should('exist');
  cy.get(`[data-testid="draws-summary-line-button-player-${playerId}-draw-${drawIndex}"]`, { timeout: 5000 }).should('exist');
});

/**
 * Clicks a button conditionally if it exists and is not disabled
 * @param {string} testId - The data-testid of the button
 * @param {number} waitTime - Wait time after click in ms (default: 500)
 */
Cypress.Commands.add('clickIfAvailable', (testId, waitTime = 500) => {
  cy.get('body').then(() => {
    const btn = document.querySelector(`[data-testid="${testId}"]`);
    if (btn && !btn.disabled) {
      cy.get(`[data-testid="${testId}"]`).click();
      cy.wait(waitTime);
    }
  });
});

/**
 * Sets textarea value and verifies it
 * @param {string} testId - The data-testid of the textarea
 * @param {string} value - The value to set
 */
Cypress.Commands.add('setTextareaValue', (testId, value) => {
  cy.get(`[data-testid="${testId}"]`).clear().type(value);
  cy.get(`[data-testid="${testId}"]`).should('have.value', value);
});

/**
 * Clicks a button by text content (bilingual support)
 * @param {string|RegExp} text - Text or regex to match
 * @param {number} index - Index if multiple matches (default: 0)
 */
Cypress.Commands.add('clickButtonByText', (text, index = 0) => {
  cy.get('button').contains(text).eq(index).click();
});

/**
 * Verifies draft mode is open
 * @param {Object} options - Options for verification
 * @param {number} options.timeout - Timeout in ms (default: 10000)
 * @param {boolean} options.includeInstructions - Whether to check for instruction messages (default: true)
 *   Set to false for Challenge Battle mode
 */
Cypress.Commands.add('verifyDraftOpen', (options = {}) => {
  const { timeout = 10000, includeInstructions = true } = typeof options === 'number' ? { timeout: options } : options;

  cy.contains(/draft ouverte|draft open/i, { timeout }).should('be.visible');

  // Instruction messages are only shown in Random Rush mode
  if (includeInstructions) {
    cy.contains(/cliquez sur le nombre en haut|click top number/i).should('be.visible');
    cy.contains(/cliquez sur le nombre en bas|click bottom number/i).should('be.visible');
  }
});
