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
        cy.get('[data-cy=form-textarea-question]').should('be.visible');
        cy.get('[data-cy=form-textarea-answer]').should('be.visible');
        cy.get('[data-cy=form-select-category]').should('be.visible')
    });

    it('Temp: Full API Cycle', () => {
        cy.get('[data-cy=add-content-button]').click();
        cy.get('[data-cy=submit-content-button]').should('not.be.enabled');
        cy.get('[data-cy=form-text-input-title]').type('Cypress Full API')
        cy.get('[data-cy=form-textarea-question]').type('My Q')
        cy.get('[data-cy=form-textarea-answer]').type('My A');
        cy.get('[data-cy=form-select-category]').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click()); // Side effect - Form Updates. 
        // TODO: Add whole new category
        cy.get('[data-cy=submit-content-button]').click();
        cy.get('[data-cy=form-text-input-title]').should('have.value', ''); // Reset Form
        cy.get('[data-cy=card-0]').click(); // TODO: Fragile
        cy.get('[data-cy=form-textarea-question]').should('not.have.value', '');
        cy.get('[data-cy=form-textarea-answer]').should('not.have.value', ''); // On edit screen
        cy.get('[data-cy=delete-content-button]').click();
        cy.get('[data-cy=form-textarea-question]').should('have.value', '');
        cy.get('[data-cy=form-textarea-answer]').should('have.value', ''); // On edit screen
    });

    it('Details', () => {
        cy.get('[data-cy=details-header-info]').should('not.be.visible');
        cy.get('[data-cy=card-0]').click(); // TODO: Fragile
        cy.get('[data-cy=submit-content-button]').should('be.enabled');
        cy.get('[data-cy=details-header-info]').should('be.visible');
    })

});