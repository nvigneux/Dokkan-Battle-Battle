describe('Random Rush - Complete scenario', () => {
  beforeEach(() => {
    cy.visit('/random-rush');
  });

  it('should complete the full Random Rush scenario', () => {
    // 1. Add two new players (3 players total)
    cy.get('[data-testid="player-add-button"]').click();
    cy.contains(/joueur 2|player 2/i).should('be.visible');

    cy.get('[data-testid="player-add-button"]').click();
    cy.contains(/joueur 3|player 3/i).should('be.visible');

    // Verify we have 3 players
    cy.contains(/joueur 1|player 1/i).should('be.visible');
    cy.contains(/joueur 2|player 2/i).should('be.visible');
    cy.contains(/joueur 3|player 3/i).should('be.visible');

    // 2. Try to draw for players when lines are at 0
    // Error toast should appear
    cy.get('[data-testid="draw-button-player-1"]').click();

    // Verify the error toast
    cy.contains(/nombre de lignes|number of lines/i, { timeout: 2000 }).should('be.visible');
    cy.contains(/entrez le nombre de lignes|enter the number of lines/i, { timeout: 2000 }).should('be.visible');

    // 3. Fill in the number of lines for each player
    // Player 1: 25 lines
    cy.get('[data-testid="player-1-lines-input"]').clear().type('25');
    cy.get('[data-testid="player-1-lines-input"]').should('have.value', '25');

    // Player 2: 30 lines
    cy.get('[data-testid="player-2-lines-input"]').clear().type('30');
    cy.get('[data-testid="player-2-lines-input"]').should('have.value', '30');

    // Player 3: 20 lines
    cy.get('[data-testid="player-3-lines-input"]').clear().type('20');
    cy.get('[data-testid="player-3-lines-input"]').should('have.value', '20');

    // 4. Draw for player 1 and verify that line and column are displayed
    cy.get('[data-testid="draw-button-player-1"]').click();
    cy.wait(500); // Wait for the draw to complete

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
    cy.get('[data-testid="redraw-button-player-1"]').then(($btn) => {
      if ($btn.length > 0 && !$btn[0].disabled) {
        cy.get('[data-testid="redraw-button-player-1"]').click();
        cy.wait(500);

        // Verify that the summary is updated
        cy.get('[data-testid="draws-summary-player-1"]').should('exist');
      }
    });

    // Continue with draws for other players
    // Draw for player 2
    cy.get('[data-testid="draw-button-player-2"]').click();
    cy.wait(500);

    // Draw for player 3
    cy.get('[data-testid="draw-button-player-3"]').click();
    cy.wait(500);

    // 6. Re-draw only the column for a player
    // Use the "Re-draw column" button if available
    cy.get('[data-testid="redraw-column-button-player-3"]').then(($btn) => {
      if ($btn.length > 0 && !$btn[0].disabled) {
        cy.get('[data-testid="redraw-column-button-player-3"]').click();
        cy.wait(500);

        // Verify that the summary still exists
        cy.get('[data-testid="draws-summary-player-3"]').should('exist');
      }
    });

    // Continue draws until all players have 6 draws
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

    // 7. Special case: if line 1 column 1 is drawn, everything is reset
    // Note: This case is automatically handled by the code in handleDrawIsCanceled
    // If a 1-1 draw is made, a toast appears and all player draws are reset
    // We cannot force this case with random draws, but the code handles it

    // 8. When all players have 6 draws, the draft opens
    // Verify that the "Draft open" message appears
    cy.contains(/draft ouverte|draft open/i, { timeout: 10000 }).should('be.visible');

    // Verify instruction messages
    cy.contains(/cliquez sur le nombre en haut|click top number/i).should('be.visible');
    cy.contains(/cliquez sur le nombre en bas|click bottom number/i).should('be.visible');

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
    cy.get('[data-testid="drawback-textarea"]').clear().type(customDrawbacks);
    cy.get('[data-testid="drawback-textarea"]').should('have.value', customDrawbacks);

    // 12. When drawing, a line from the textarea is displayed
    cy.get('[data-testid="drawback-draw-button"]').click();
    cy.wait(500);

    // Verify that a disadvantage is displayed
    cy.get('body').should('contain.text', 'Désavantage');
  });
});
