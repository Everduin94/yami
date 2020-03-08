/// <reference types="cypress" />
describe('Practice Route', () => {

    before(() => {
        cy.visit('http://localhost:4200/flashCards');
        cy.login();
    })

    describe('Filter List', () => {
        it('should find the category drop-down', () => {
            cy.get('[data-cy=filters-header').should('be.visible');
            cy.get('[data-cy=category]').should('be.visible');
            cy.wait(750); // Hack, until we figure out server firebase mocking
            cy.get('[data-cy=category]').click();
            cy.get('span.mat-option-text').contains(' DEMO ')
                .then(option => option[0].click());
        });

        it('should return 2 cards given DEMO is selected', () => {
            cy.get('[data-cy=content-header').should('be.visible');
            cy.get('[data-cy=card-0]').should('be.visible');
            cy.get('[data-cy=card-1]').should('be.visible');
            cy.get('[data-cy=card-2]').should('not.be.visible');
        });

        it('should activate a card given a content-button is clicked', () => {
            cy.get('[data-cy=card-0]').click();
            cy.get('[data-cy=question-content').should('be.visible');
        });

        it('should show the answer given the show-answer-button is clicked', () => {
            cy.get('[data-cy=show-answer-button]').click();
            cy.get('[data-cy=answer-content').should('be.visible');
        });

        it('should remove the answer given a new content button is clicked', () => {
            cy.get('[data-cy=card-1]').click();
            cy.get('[data-cy=answer-content').should('not.be.visible');
        });

        it('should hide the answer given the show-answer-button is clicked while showing', () => {
            cy.get('[data-cy=show-answer-button]').contains('Show Answer').click();
            cy.get('[data-cy=answer-content').should('be.visible');
            cy.get('[data-cy=show-answer-button]').contains('Hide Answer').click();
            cy.get('[data-cy=answer-content').should('not.be.visible');
        });
    });

    describe('Question Section', () => {
        it('should contain the question header', () => {
            cy.get('[data-cy=question-header').should('be.visible');
        });
    });

    describe('Answer Section', () => {
        it('should contain the answer header', () => {
            cy.get('[data-cy=answer-header').should('be.visible');
        });
    });

})