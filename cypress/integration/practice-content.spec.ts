/// <reference types="cypress" />

describe('Starter', () => {

    before(() => {
        cy.visit('http://localhost:4200/flashCards');
        cy.login();
    })

    it('should find the category drop-down', () => {
        cy.get('[data-cy=filters-header').should('be.visible');
        cy.get('[data-cy=category]').should('be.visible');
        cy.wait(750); // Hack, until we figure out server firebase mocking
        cy.get('[data-cy=category]').click();
        cy.get('span.mat-option-text').contains(' FIB-TEST ')
            .then(option => option[0].click());
        cy.get('[data-cy=card-0]').should('be.visible').click();
    });

    it('should return X given Y', () => {
        cy.get("[data-cy=fib-0]")
        .should('be.visible')
        .should('have.id', 'fib-0')
        .type('123')
        .should('have.value', '123');

    });
});