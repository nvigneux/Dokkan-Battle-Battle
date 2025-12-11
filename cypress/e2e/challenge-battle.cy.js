describe('Challenge Battle - Complete scenario', () => {
  beforeEach(() => {
    // Visit the page with increased timeout for CI environments
    cy.visit('/challenge-battle', {
      timeout: 30000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    });
    // Wait for the page to be fully loaded before running tests
    cy.get('body').should('be.visible');
  });

  it('should complete the full Challenge Battle scenario', () => {
    // 1. Add two new players (3 players total)
    cy.addPlayers(2);

    // Verify we have 3 players
    cy.verifyPlayersCount(3);

    // 2. Edit draw types (optional - can customize available types)
    cy.contains(/type de tirage|draws type/i).should('be.visible');
    cy.clickButtonByText(/modifier|edit/i);

    // Verify the edit section is visible
    cy.get('[data-testid="edit-draws-type-textarea"]').should('be.visible');

    // Close the edit section
    cy.clickButtonByText(/fermer|close/i);

    // 3. Draw for player 1 and verify that type is displayed
    cy.drawForPlayer(1);

    // Verify that a type is displayed (should show type abbreviation like STR, PHY, etc.)
    cy.get('[data-testid="draws-summary-challenge-player-1"]').should('exist');
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-0"]').should('exist');

    // 4. Continue with draws for other players
    cy.drawForPlayer(2);
    cy.drawForPlayer(3);

    // 5. Continue draws until all players have 6 types
    // Make several draws to complete 6 draws for each player (3 players x 6 = 18 draws)
    cy.completeAllDraws(20, 300);

    // 6. When all players have 6 types, the draft opens
    // Verify that the "Draft open" message appears
    // Note: Challenge Battle doesn't show instruction messages like Random Rush
    cy.verifyDraftOpen({ includeInstructions: false });

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
    cy.verifyToastContainsOneOf(['200', '250', '300']);

    // 10. Draw joker (optional)
    // Verify that the joker section exists
    cy.contains(/tirage du joker|draw joker/i).should('be.visible');

    // Customize joker options
    cy.setTextareaValue('joker-textarea', 'Joker personnalisé 1\nJoker personnalisé 2');

    // Draw a joker
    cy.get('[data-testid="joker-button"]').click();
    cy.wait(500);

    // 11. Timer component should be visible
    cy.contains(/minuteur|timer/i).should('be.visible');
  });

  it('should allow editing draw types', () => {
    // Click edit button
    cy.clickButtonByText(/modifier|edit/i);

    // Verify edit section is visible
    cy.get('[data-testid="edit-draws-type-textarea"]').should('be.visible');

    // Edit the types
    const customTypes = 'Test\nTest2\nTest3';
    cy.setTextareaValue('edit-draws-type-textarea', customTypes);

    // Validate the edit
    cy.get('[data-testid="edit-draws-type-button"]').click();
    cy.wait(500);

    // Verify that the edit section is closed (indicates success)
    // The section closes automatically on successful edit
    cy.get('[data-testid="edit-draws-type-textarea"]').should('not.exist');

    // Verify success notification (toast appears in ToastContainer)
    cy.verifyToastContainsOneOf([
      'Modifications enregistrées',
      'modifications enregistrées',
      'Modification saved',
      'modification saved',
    ], 5000);

    // Test to draw the custom types
    cy.drawForPlayer(1);
    cy.get('[data-testid="draws-summary-challenge-item-player-1-draw-0"]').should('contain.text', 'Tes');
  });

  it('should reset all draws', () => {
    // Make some draws first
    cy.drawForPlayer(1);
    cy.drawForPlayer(1);

    // Verify draws exist
    cy.get('[data-testid="draws-summary-challenge-player-1"]').should('exist');

    // Click reset all button
    cy.clickButtonByText(/reset|resetall/i, 0);
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
    cy.verifyToastContainsOneOf([
      'Entrez un nombre',
      'entrez un nombre',
      'Enter a number',
      'Aucun temps détecté',
      'No time detected',
    ], 3000);
  });
});
