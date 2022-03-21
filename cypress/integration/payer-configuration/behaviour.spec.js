/// <reference types="cypress" />

describe('Test Behaviour of the Payer Configuration Screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/payer-configuration');
  });

  it('Default data from LocalStorage is shown on load', () => {
    cy.get('#root').contains('TSTPY');
    cy.get('#root').contains('Gwen');
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 10);
  });

  it('Clicking on Delete Button Deletes the Row of Data', () => {
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 10);
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
    cy.get('table').eq(2).find('tbody').find('tr').should('have.length', 9);
  });

  it('Clicking on Edit Button Shows the Edit Modal', () => {
    cy.get('table').eq(2).find('tbody').find('tr').first().find('[data-testid="EditIcon"]').click();
    cy.get('.ReactModalPortal').contains('Update Payer');
    cy.get('.ReactModalPortal').find('button:contains("Update")');
    cy.get('.ReactModalPortal').find('button:contains("Cancel")');
  });
});
