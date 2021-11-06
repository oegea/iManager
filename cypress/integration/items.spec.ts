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

  it('should properly filter by text', () => {
    cy.intercept('**/items.json').as('getItems');

    cy.get('.item').should('have.length', 5);
    cy.get('input').type('iPhone{enter}');
    cy.wait('@getItems');
    cy.get('.item').should('have.length', 1);
    cy.get('input').clear();
    cy.get('input').type('{enter}');
  });

  it('should properly sort items', () => {
    cy.intercept('**/items.json').as('getItems');

    cy.get(':nth-child(1) > .title').should('have.text', 'iPhone 6S Oro');
    cy.get('select').select('Title');
    cy.wait('@getItems');
    cy.get(':nth-child(1) > .title').should('have.text', 'Barbacoa');
  });

  it('should load more items if the pager button is pressed', () => {
    cy.intercept('**/items.json').as('getItems');

    cy.get('.item').should('have.length', 5);
    cy.get('.items-pager > .button').click();
    cy.wait('@getItems');
    cy.get('.item').should('have.length', 10);
  });

  it('should be able to open the favourites modal', () => {
    cy.get('.favouritesButton > .button').click();
    cy.get('.modal-content').should('be.visible');
  });

  it('should be able to filter favourite items', () => {
    cy.get('.favourite-items > .item').should('have.length', 2);
    cy.get('.body > .searchbar-component > input').type('Reloj{enter}');
    cy.get('.favourite-items > .item').should('have.length', 1);
    cy.get('.body > .searchbar-component > input').clear();
    cy.get('.body > .searchbar-component > input').type('{enter}');
  });

  it('should be able to remove an item from favourites', () => {
    cy.get('.favourite-items > .item').should('have.length', 2);

    cy.get('.favourite-items > .item').contains('iPhone 6S Oro').siblings('.buttons').contains('Remove from favourites')
      .click();

    cy.get('.favourite-items > .item').should('have.length', 1);
  });

  it('should be able to close the favourites modal', () => {
    cy.get('.close').click();
    cy.get('.modal-content').should('not.exist');
  });
});
