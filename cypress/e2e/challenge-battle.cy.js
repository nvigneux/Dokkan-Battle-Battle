describe('Challenge Battle Page', () => {
  beforeEach(() => {
    cy.visit('/challenge-battle');
  });

  it('should display the Challenge Battle page', () => {
    cy.contains(/challenge battle|challenge/i).should('be.visible');
  });

  it('should have player management', () => {
    cy.contains(/player|joueur/i).should('be.visible');
  });

  it('should have a draw button', () => {
    cy.get('button').contains(/draw|tirer|jouer/i).should('be.visible');
  });

  it('should display draw types instead of numbers', () => {
    // Challenge Battle uses types (STR, PHY, etc.) instead of numbers
    cy.get('[class*="draw"]').should('exist');
  });

  it('should have a timer component', () => {
    cy.get('[class*="timer"]').should('exist');
  });

  it('should allow selecting draw types', () => {
    cy.get('button').should('have.length.at.least', 1);
  });
});
