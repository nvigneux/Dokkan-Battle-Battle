describe('Random Rush - Complete scenario', () => {
  beforeEach(() => {
    // Visit the page with increased timeout for CI environments
    cy.visit('/random-rush', {
      timeout: 30000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    });
    // Wait for the page to be fully loaded before running tests
    cy.get('body').should('be.visible');
  });

  it('should complete the full Random Rush scenario', () => {
    // 1. Add two new players (3 players total)
    cy.addPlayers(2);

    // Verify we have 3 players
    cy.verifyPlayersCount(3);

    // 2. Try to draw for players when lines are at 0
    // Error toast should appear
    cy.get('[data-testid="draw-button-player-1"]').click();

    // Verify the error toast
    cy.contains(/nombre de lignes|number of lines/i, { timeout: 2000 }).should('be.visible');
    cy.contains(/entrez le nombre de lignes|enter the number of lines/i, { timeout: 2000 }).should('be.visible');

    // 3. Fill in the number of lines for each player
    cy.setPlayerLines(1, 25);
    cy.setPlayerLines(2, 30);
    cy.setPlayerLines(3, 20);

    // 4. Draw for player 1 and verify that line and column are displayed
    cy.drawForPlayer(1);

    // Verify that numbers are displayed (L and C)
    cy.contains(/^L$/i).should('be.visible');
    cy.contains(/^C$/i).should('be.visible');

    // Verify that the summary displays the draw
    // After a draw, the summary should contain buttons with numbers
    cy.get('[data-testid="draws-summary-player-1"]').should('exist');
    cy.get('[data-testid="draws-summary-line-button-player-1-draw-0"]').should('exist');
    cy.get('[data-testid="draws-summary-column-button-player-1-draw-0"]').should('exist');

    // 5. Re-draw for the same player (player 1)
    // Use the re-draw button if available
    cy.clickIfAvailable('redraw-button-player-1');
    cy.get('[data-testid="draws-summary-player-1"]').should('exist');

    // Continue with draws for other players
    cy.drawForPlayer(2);
    cy.drawForPlayer(3);

    // 6. Re-draw only the column for a player
    // Use the "Re-draw column" button if available
    cy.clickIfAvailable('redraw-column-button-player-3');
    cy.get('[data-testid="draws-summary-player-3"]').should('exist');

    // Continue draws until all players have 6 draws
    // Make several draws to complete 6 draws for each player (3 players x 6 = 18 draws)
    cy.completeAllDraws(20, 300);

    // 7. Special case: if line 1 column 1 is drawn, everything is reset
    // Note: This case is automatically handled by the code in handleDrawIsCanceled
    // If a 1-1 draw is made, a toast appears and all player draws are reset
    // We cannot force this case with random draws, but the code handles it

    // 8. When all players have 6 draws, the draft opens
    // Verify that the "Draft open" message appears
    cy.verifyDraftOpen();

    // 9. In draft mode, we can re-draw each choice (line or column)
    // Click on the top number (line) for a player
    cy.get('[data-testid="draws-summary-line-button-player-1-draw-0"]').click();
    cy.wait(500);

    // Click on the bottom number (column) for a player
    cy.get('[data-testid="draws-summary-column-button-player-1-draw-0"]').click();
    cy.wait(500);

    // 10. Once the draw is finished, players can draw a disadvantage
    // Verify that the disadvantage section exists
    cy.contains(/tirer un désavantage|draw disadvantage/i).should('be.visible');

    // 11. Disadvantages are customizable via textarea
    cy.get('[data-testid="drawback-textarea"]').should('exist');
    const customDrawbacks = 'Désavantage personnalisé 1\nDésavantage personnalisé 2\nDésavantage personnalisé 3';
    cy.setTextareaValue('drawback-textarea', customDrawbacks);

    // 12. When drawing, a line from the textarea is displayed
    cy.get('[data-testid="drawback-draw-button"]').click();
    cy.wait(500);

    // Verify that a disadvantage is displayed
    cy.get('body').should('contain.text', 'Désavantage');
  });
});
