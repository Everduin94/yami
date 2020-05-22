describe('Practice Route', () => {

    before(() => {
        cy.visit('http://localhost:4200/flashCards');
        cy.login();
    });

    it('should return X given Y', () => {
        cy.get('[data-cy=category]').should('be.visible');
        cy.wait(750);   
        cy.get('[data-cy=category]').click();
        cy.get('span.mat-option-text').contains(' FIB-TEST ')
            .then(option => option[0].click());
        cy.get('[data-cy=card-0]').should('be.visible').click();
        cy.get('[data-cy=manage-link]').click();
        cy.wait(3000); // hack again -- make sure animation is done
        cy.get('[data-cy=card-0]').should('be.visible');
        cy.get('[data-cy=form-textarea-answer]').should('not.be.enabled', ''); // On edit screen


        cy.get('[data-cy=category]').click();
        cy.get('span.mat-option-text').contains(' DEMO ')
            .then(option => option[0].click());
        cy.wait(250);
        cy.get('[data-cy=details-header-info]').should('have.text', ' - Adding New Card');
    });

});