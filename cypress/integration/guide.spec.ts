describe('Guides Route', () => {

    before(() => {
        cy.visit('http://localhost:4200/guides');
        cy.login();
    });

    it('should return X given Y', () => {
        cy.get('[data-cy=category]').should('be.visible');
        cy.get('[data-cy=category]').contains('Guides');
        cy.wait(750);
        cy.get('[data-cy=card-0]').should('be.visible').click();    
        cy.contains('markdown.md');
    });

});