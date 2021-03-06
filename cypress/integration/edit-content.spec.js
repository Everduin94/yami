/// <reference types="cypress" />

describe('Starter', () => {

    // These are no longer valid since large UI changes.

    /*before(() => {
        cy.login();



        cy.wait(1200); // TODO: Again, hackky.

       
        cy.visit('http://localhost:4200/manage');
        
    })


    it('should find the deck drop-down', () => {
    
        cy.get('[data-cy=filters-header').should('be.visible');
        cy.get('[data-cy=filter-deck]').should('be.visible');
        cy.wait(750); // Hack, until we figure out server firebase mocking
        cy.get('[data-cy=filter-deck]').click();
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
        // cy.get('[data-cy=form-textarea-answer]').should('be.visible');
        cy.get('[data-cy=form-select-deck]').should('be.visible')
    });

    it('Temp: Full API Cycle', () => {
        cy.get('[data-cy=add-content-button]').click();
        cy.get('[data-cy=submit-content-button]').should('not.be.enabled');
        cy.get('[data-cy=form-text-input-title]').type('Cypress Full API')
        cy.get('[data-cy=form-textarea-question]').type('My Q')
        // cy.get('[data-cy=form-textarea-answer]').type('My A');
        cy.get('[data-cy=form-select-deck]').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click()); // Side effect - Form Updates. 
        // TODO: Add whole new deck
        cy.get('[data-cy=submit-content-button]').click();
        cy.get('[data-cy=form-text-input-title]').should('have.value', ''); // Reset Form
        cy.wait(250);
        cy.get('[data-cy=card-0]').should('be.visible');
        cy.get('[data-cy=card-0]').click(); // TODO: Fragile
        cy.get('[data-cy=form-textarea-question]').should('not.have.value', '');


        cy.get('[data-cy=copy-content-button]').click();
        cy.get('[data-cy=card-1]').should('be.visible');
        cy.get('[data-cy=card-1]').click();
        // cy.get('[data-cy=form-textarea-answer]').should('not.have.value', ''); // On edit screen
        cy.get('[data-cy=delete-content-button]').click();
        cy.get('[data-cy=form-textarea-question]').should('have.value', '');
        // cy.get('[data-cy=form-textarea-answer]').should('not.be.visible'); // Because fill in blank

        cy.get('[data-cy=card-0]').should('be.visible');
        cy.get('[data-cy=card-0]').click();
        cy.get('[data-cy=delete-content-button]').click();
        cy.get('[data-cy=form-textarea-question]').should('have.value', '');
    });

    it('Details', () => {
        cy.get('[data-cy=details-header-info]').should('have.text', ' - Adding New Card');
        cy.get('[data-cy=filter-deck]').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click());
        cy.wait(250);
        cy.get('[data-cy=card-0]').should('be.visible');
        cy.get('[data-cy=card-0]').click(); // TODO: Fragile
        cy.get('[data-cy=submit-content-button]').should('be.disabled'); // Disable because no changes
        cy.get('[data-cy=details-header-info]').should('be.visible');
        cy.get('[data-cy=form-select-type]').click();
        cy.get('span.mat-option-text').contains(' Fill in Blank (Cloze) ')
            .then(option => option[0].click());
        cy.get('[data-cy=form-textarea-question').should('have.value', 'My Q');
        // cy.get('[data-cy=form-textarea-answer]').should('have.value', 'My Q').should('be.disabled');
        cy.get('[data-cy=form-textarea-question').type(' FIB');
        // cy.get('[data-cy=form-textarea-answer]').should('have.value', 'My Q FIB')
        
        cy.get('[data-cy=preview-mode]').click();
        cy.get('[data-cy=preview-question]').should('be.visible');


    });*/


});