/// <reference types="cypress" />

describe('test if the routes render the correct screens', () => {
  it('Visiting / redirects to /payer-configuration', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('eq', 'http://localhost:3000/payer-configuration');
  });

  it('Visiting /payer-configuration renders the payer-configuration screen', () => {
    cy.visit('http://localhost:3000/payer-configuration');
    cy.get('#root').contains('Create Payer');
  });

  it('Visting /payer-status renders the payer-status screen', () => {
    cy.visit('http://localhost:3000/payer-status');
    cy.get('#root').contains('Active Payer');
    cy.get('#root').contains('Inactive Payer');
  });
});
