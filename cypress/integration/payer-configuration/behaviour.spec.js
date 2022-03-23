/// <reference types="cypress" />

describe('Test Behaviour of the Payer Configuration Screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/payer-configuration');
  });

  it('Default data from LocalStorage is shown on load', () => {
    // checking some default data
    cy.get('#root').contains('TSTPY');
    cy.get('#root').contains('Gwen');

    // selecting the second table and -> https://stackoverflow.com/a/57204421
    // counting 10 items
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 10);
  });

  it('Clicking on Delete Button Deletes the Row of Data', () => {
    // table initially has 10 elements
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 10);

    // clicking the first delete button of the second table
    cy.get('table')
      .eq(2)
      .find('tbody')
      .find('tr')
      .first()
      .find('td')
      .last()
      .find('svg')
      .first()
      .click();

    // ensure that now table has 9 rows
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 9);
  });

  it('Clicking on Edit Button Shows the Edit Modal', () => {
    // clicking the first edit button of the second table
    cy.get('table').eq(2).find('tbody').find('tr').first().find('[data-testid="EditIcon"]').click();

    // ensure pop up appears. Checking popup title, update and cancel button
    cy.get('.ReactModalPortal').contains('Update Payer');
    cy.get('.ReactModalPortal').find('button:contains("Update")');
    cy.get('.ReactModalPortal').find('button:contains("Cancel")');
  });
});
