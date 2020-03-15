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
        cy.get('[data-cy=card-0]').should('be.visible'); // Side effect of select
    });

    it('should have standard CRUD operations & Form Actions', () => {
        cy.get('[data-cy=add-content-button]').should('be.visible');
        cy.get('[data-cy=delete-content-button]').should('be.disabled');
        cy.get('[data-cy=submit-content-button]').should('be.disabled');
        cy.get('[data-cy=form-text-input-title]').should('be.visible');
    });

    it('select category', () => {
        cy.get('[data-cy=form-select-category]').should('be.visible').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click()); // Side effect - Form Updates.
        
    });

    it('should activate a card given a content-button is clicked', () => {
        cy.get('[data-cy=card-0]').click();
        cy.get('[data-cy=question-content').should('be.visible');
        cy.get('[data-cy=answer-content').should('be.visible'); // On edit screen
    });

});