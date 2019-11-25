/// <reference types="cypress" />


describe('Sample', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('has a title', () => {
        cy.contains('Logout')
        expect(2).to.equal(2)
    })
})