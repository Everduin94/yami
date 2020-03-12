/// <reference types="cypress" />
describe('Starter', () => {

    before(() => {
        cy.visit('http://localhost:4200/add');
        cy.login();
    })


    it('should find the category drop-down', () => {
        cy.get('[data-cy=filters-header').should('be.visible');
        cy.get('[data-cy=category]').should('be.visible');
        cy.wait(750); // Hack, until we figure out server firebase mocking
        cy.get('[data-cy=category]').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click());
    });

    it('should activate a card given a content-button is clicked', () => {
        cy.get('[data-cy=card-0]').click();
        cy.get('[data-cy=question-content').should('be.visible');
        cy.get('[data-cy=answer-content').should('be.visible'); // On edit screen
    });


});