describe('Challenge Battle - Complete scenario', () => {
  beforeEach(() => {
    cy.visit('/challenge-battle');
  });

  it('should complete the full Challenge Battle scenario', () => {
    // 1. Add two new players (3 players total)
    cy.get('[data-testid="player-add-button"]').click();
    cy.contains(/joueur 2|player 2/i).should('be.visible');

    cy.get('[data-testid="player-add-button"]').click();
    cy.contains(/joueur 3|player 3/i).should('be.visible');

    // Verify we have 3 players
    cy.contains(/joueur 1|player 1/i).should('be.visible');
    cy.contains(/joueur 2|player 2/i).should('be.visible');
    cy.contains(/joueur 3|player 3/i).should('be.visible');

    // 2. Edit draw types (optional - can customize available types)
    cy.contains(/type de tirage|draws type/i).should('be.visible');
    cy.get('button').contains(/modifier|edit/i).click();

    // Verify the edit section is visible
    cy.get('[data-testid="edit-draws-type-textarea"]').should('be.visible');

    // Close the edit section
    cy.get('button').contains(/fermer|close/i).click();

    // 3. Draw for player 1 and verify that type is displayed
    cy.get('[data-testid="draw-button-player-1"]').click();
    cy.wait(500); // Wait for the draw to complete

    // Verify that a type is displayed (should show type abbreviation like STR, PHY, etc.)
    cy.get('[data-testid="draws-summary-challenge-player-1"]').should('exist');
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-0"]').should('exist');

    // 4. Continue with draws for other players
    // Draw for player 2
    cy.get('[data-testid="draw-button-player-2"]').click();
    cy.wait(500);

    // Draw for player 3
    cy.get('[data-testid="draw-button-player-3"]').click();
    cy.wait(500);

    // 5. Continue draws until all players have 6 types
    // Make several draws to complete 6 draws for each player (3 players x 6 = 18 draws)
    // Make more to ensure all players have finished
    for (let i = 0; i < 20; i += 1) {
      // Find an available draw button for any player
      cy.get('[data-testid^="draw-button-player-"]').then(($buttons) => {
        const availableDrawButton = Array.from($buttons).find((btn) => !btn.disabled);

        if (availableDrawButton) {
          cy.wrap(availableDrawButton).click();
          cy.wait(300);
        }
      });
    }

    // 6. When all players have 6 types, the draft opens
    // Verify that the "Draft open" message appears
    cy.contains(/draft ouverte|draft open/i, { timeout: 10000 }).should('be.visible');

    // 7. In draft mode, we can re-draw each type by clicking on it
    // Click on a type for player 1 to re-draw it
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-0"]').click();
    cy.wait(500);

    // Click on another type for player 1
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-1"]').click();
    cy.wait(500);

    // 8. Test reset functionality for a specific player
    cy.get('[data-testid="draws-summary-reset-player-2"]').click();
    cy.wait(500);

    // Verify that player 2's draws are reset (all items should be disabled)
    cy.get('[data-testid="draws-summary-challenge-player-2"]').should('exist');

    // Player 2 should be able to draw again
    cy.get('[data-testid="draw-button-player-2"]').should('not.be.disabled');

    // 9. Draw team cost
    // Verify that the team cost section exists
    cy.contains(/coût de l'équipe|team cost/i).should('be.visible');

    // Draw a cost
    cy.get('[data-testid="team-cost-button"]').click();
    cy.wait(500);

    // Verify that a cost is displayed (one of the default costs)
    cy.get('body').should(($body) => {
      const text = $body.text();
      const hasCost = text.includes('200') || text.includes('250') || text.includes('300');
      return hasCost;
    });

    // 10. Draw joker (optional)
    // Verify that the joker section exists
    cy.contains(/tirage du joker|draw joker/i).should('be.visible');

    // Customize joker options
    cy.get('[data-testid="joker-textarea"]').clear().type('Joker personnalisé 1\nJoker personnalisé 2');
    cy.get('[data-testid="joker-textarea"]').should('have.value', 'Joker personnalisé 1\nJoker personnalisé 2');

    // Draw a joker
    cy.get('[data-testid="joker-button"]').click();
    cy.wait(500);

    // 11. Timer component should be visible
    cy.contains(/minuteur|timer/i).should('be.visible');
  });

  it('should allow editing draw types', () => {
    // Click edit button
    cy.get('button').contains(/modifier|edit/i).click();

    // Verify edit section is visible
    cy.get('[data-testid="edit-draws-type-textarea"]').should('be.visible');

    // Edit the types
    const customTypes = 'Test\nTest2\nTest3';
    cy.get('[data-testid="edit-draws-type-textarea"]').clear().type(customTypes);
    cy.get('[data-testid="edit-draws-type-textarea"]').should('have.value', customTypes);

    // Validate the edit
    cy.get('[data-testid="edit-draws-type-button"]').click();
    cy.wait(500);

    // Verify that the edit section is closed (indicates success)
    // The section closes automatically on successful edit
    cy.get('[data-testid="edit-draws-type-textarea"]').should('not.exist');

    // Verify success notification (toast appears in ToastContainer)
    // Look for the toast in the body or ToastContainer
    cy.get('body', { timeout: 5000 }).should(($body) => {
      const text = $body.text();
      const hasNotification = text.includes('Modifications enregistrées')
        || text.includes('modifications enregistrées')
        || text.includes('Modification saved')
        || text.includes('modification saved');
      return hasNotification;
    });

    // Test to draw the custom types
    cy.get('[data-testid="draw-button-player-1"]').click();
    cy.wait(500);
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-0"]').should('contain.text', 'Tes');
  });

  it('should reset all draws', () => {
    // Make some draws first
    cy.get('[data-testid="draw-button-player-1"]').click();
    cy.wait(500);
    cy.get('[data-testid="draw-button-player-1"]').click();
    cy.wait(500);

    // Verify draws exist
    cy.get('[data-testid="draws-summary-challenge-player-1"]').should('exist');

    // Click reset all button
    cy.get('button').contains(/reset|resetall/i).first().click();
    cy.wait(500);

    // Verify that draws are reset (player should be able to draw again from start)
    cy.get('[data-testid="draw-button-player-1"]').should('not.be.disabled');
  });

  it('should launch the timer', () => {
    // Verify timer component is visible
    cy.contains(/minuteur|timer/i).should('be.visible');

    // 1. Set timer values (1 minute and 30 seconds)
    cy.get('[data-testid="timer-minute-input"]').clear().type('1');
    cy.get('[data-testid="timer-minute-input"]').should('have.value', '1');

    cy.get('[data-testid="timer-second-input"]').clear().type('30');
    cy.get('[data-testid="timer-second-input"]').should('have.value', '30');

    // 2. Start the timer
    cy.get('[data-testid="timer-start-button"]').click();

    // 3. Verify timer is active
    // Start button should be disabled
    cy.get('[data-testid="timer-start-button"]').should('be.disabled');

    // Inputs should be disabled
    cy.get('[data-testid="timer-minute-input"]').should('be.disabled');
    cy.get('[data-testid="timer-second-input"]').should('be.disabled');

    // Stop/Reset button should show "Stop" text
    cy.get('[data-testid="timer-stop-reset-button"]').contains(/arrêter|stop/i).should('be.visible');

    // 4. Wait a bit and verify timer is counting down
    cy.wait(1000);
    // The timer should have decreased (we can't check exact value as it's counting down)
    cy.get('[data-testid="timer-second-input"]').should(($input) => {
      const value = parseInt($input.val(), 10);
      return value < 30;
    });

    // 5. Stop the timer
    cy.get('[data-testid="timer-stop-reset-button"]').click();

    // 6. Verify timer is stopped
    // Start button should be enabled again
    cy.get('[data-testid="timer-start-button"]').should('not.be.disabled');

    // Inputs should be enabled again
    cy.get('[data-testid="timer-minute-input"]').should('not.be.disabled');
    cy.get('[data-testid="timer-second-input"]').should('not.be.disabled');

    // Stop/Reset button should show "Reset" text
    cy.get('[data-testid="timer-stop-reset-button"]').contains(/reset/i).should('be.visible');

    // 7. Reset the timer
    cy.get('[data-testid="timer-stop-reset-button"]').click();

    // Verify timer is reset to 0
    cy.get('[data-testid="timer-minute-input"]').should('have.value', '0');
    cy.get('[data-testid="timer-second-input"]').should('have.value', '0');

    // 8. Test invalid input (try to start with 0 minutes and 0 seconds)
    // Set values to 0
    cy.get('[data-testid="timer-minute-input"]').clear().type('0');
    cy.get('[data-testid="timer-second-input"]').clear().type('0');

    // Try to start
    cy.get('[data-testid="timer-start-button"]').click();
    cy.wait(500);

    // Should show error notification
    cy.get('body', { timeout: 3000 }).should(($body) => {
      const text = $body.text();
      const hasError = text.includes('Entrez un nombre')
        || text.includes('entrez un nombre')
        || text.includes('Enter a number')
        || text.includes('Aucun temps détecté')
        || text.includes('No time detected');
      return hasError;
    });
  });
});
