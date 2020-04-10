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
        cy.get('[data-cy=card-0]').should('be.visible').should('have.class', 'filter-body__content--active');
        
    });

    it('should test question input and answer comparator', () => {
        cy.get("[data-cy=fib-0]")
        .should('be.visible')
        .should('have.id', 'fib-0')
        .type('Hello')
        .should('have.value', 'Hello');
        cy.get('[data-cy=show-answer-button').click();
        cy.get('[data-cy=fib-answer-0]').should('have.class', 'correct');
        cy.get('[data-cy=fib-answer-1]').should('have.class', 'incorrect');
    });


    it('should have a functioning next button', () => {
        cy.get('[data-cy=category]').click();
        cy.get('span.mat-option-text').contains(' guide-examples ')
            .then(option => option[0].click());
        cy.wait(1200); // Hack: Make sure button is enabled
        cy.get('[data-cy=next-button]').click();
        cy.get('[data-cy=card-1]').should('be.visible').should('have.class', 'filter-body__content--active');
    })
});