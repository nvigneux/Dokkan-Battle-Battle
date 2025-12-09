describe('Random Rush Page', () => {
  beforeEach(() => {
    cy.visit('/random-rush');
  });

  it('should display the Random Rush page', () => {
    cy.contains(/random rush/i).should('be.visible');
  });

  it('should have a player input field', () => {
    cy.contains(/player|joueur/i).should('be.visible');
  });

  it('should have a draw button', () => {
    cy.get('button').contains(/draw|tirer|jouer/i).should('be.visible');
  });

  it('should allow adding a new player', () => {
    cy.contains('button', /add|ajouter/i).click();
    cy.contains(/player|joueur/i).should('have.length.at.least', 2);
  });

  it('should display draw summary section', () => {
    cy.get('[class*="summary"]').should('exist');
  });

  it('should have a drawback section', () => {
    cy.get('textarea').should('exist');
  });
});
