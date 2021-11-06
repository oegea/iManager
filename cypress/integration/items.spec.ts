describe('Items list tests', () => {
  it('should load the main page', () => {
    cy.visit('/');
  });

  it('should be able to mark an item as favourite', () => {
    cy.intercept('**/items.json').as('getItems');
    cy.visit('/');
    cy.wait('@getItems');
    // Add two items to favourites
    cy.get('.item').contains('iPhone 6S Oro').siblings('.buttons').contains('Add to favourites')
      .click();
    cy.get('.item').contains('Reloj de Daniel Wellington').siblings('.buttons').contains('Add to favourites')
      .click();

    // Now they should be removable
    cy.get('.item').contains('iPhone 6S Oro').siblings('.buttons').contains('Remove from favourites')
      .should('be.visible');
    cy.get('.item').contains('Reloj de Daniel Wellington').siblings('.buttons').contains('Remove from favourites')
      .should('be.visible');
  });

  it('should be able to open the favourites modal', () => {
    cy.get('.favouritesButton > .button').click();
    cy.get('.modal-content').should('be.visible');
  });

  it('should be able to remove an item from favourites', () => {
    cy.get('.favourite-items > .item').should('have.length', 2);

    cy.get('.favourite-items > .item').contains('iPhone 6S Oro').siblings('.buttons').contains('Remove from favourites')
      .click();

    cy.get('.favourite-items > .item').should('have.length', 1);
  });
});
