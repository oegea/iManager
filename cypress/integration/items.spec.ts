describe('Items list tests', () => {
  beforeEach(() => {
    cy.intercept('**/items.json').as('getItems');
  });

  it('should load the main page', () => {
    cy.visit('/');
  });

  it('should be able to mark an item as favourite', () => {
    cy.visit('/');
    cy.wait('@getItems');
    // Add two items to favourites
    cy.get('.item').contains('iPhone 6S Oro').siblings('.buttons').as('iPhoneButtons');
    cy.get('.item').contains('Reloj de Daniel Wellington').siblings('.buttons').as('clockButtons');

    cy.get('@iPhoneButtons').contains('Add to favourites').click();
    cy.get('@clockButtons').contains('Add to favourites').click();

    // Now they should be removable
    cy.get('@iPhoneButtons').contains('Remove from favourites').should('be.visible');
    cy.get('@clockButtons').contains('Remove from favourites').should('be.visible');
  });

  it('should properly filter by text', () => {
    cy.get('.item').should('have.length', 5);
    cy.get('input').type('iPhone{enter}');
    cy.wait('@getItems');
    cy.get('.item').should('have.length', 1);
    cy.get('input').clear();
    cy.get('input').type('{enter}');
  });

  it('should properly sort items', () => {
    cy.get(':nth-child(1) > .title').as('firstFavourite');
    cy.get('@firstFavourite').should('have.text', 'iPhone 6S Oro');
    cy.get('select').select('Title');
    cy.wait('@getItems');
    cy.get('@firstFavourite').should('have.text', 'Barbacoa');
  });

  it('should load more items if the pager button is pressed', () => {
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
    cy.get('.body > .searchbar-component > input').as('searchInput');
    cy.get('@searchInput').type('Reloj{enter}');
    cy.get('.favourite-items > .item').should('have.length', 1);
    cy.get('@searchInput').clear();
    cy.get('@searchInput').type('{enter}');
  });

  it('should be able to remove an item from favourites', () => {
    cy.get('.favourite-items > .item').as('favouriteItems');
    cy.get('@favouriteItems').should('have.length', 2);

    cy.get('@favouriteItems').contains('iPhone 6S Oro').siblings('.buttons').contains('Remove from favourites')
      .click();

    cy.get('@favouriteItems').should('have.length', 1);
  });

  it('should be able to close the favourites modal', () => {
    cy.get('.close').click();
    cy.get('.modal-content').should('not.exist');
  });
});
