describe('Testing form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('Add text to inputs and submit form', () => {
        cy.get('input[name="name"]')
            .type("Loc Giang")
            .should('have.value', 'Loc Giang');
        cy.get('input[name="email"]')
            .type('Locbgiang@gmail.com')
            .should('have.value', 'Locbgiang@gmail.com');
        cy.get('input[name="password"]')
            .type('password123')
            .should('have.value', 'password123');
        cy.get('input[name="terms"]')
            .check()
            .should('be.checked');
        cy.get('button[name="buttonName"]')
            .click();
    })
    it('displays errors on login',() => {
        cy.get('input[name="name"]')
            .type("@#!")
            .should("not.have.value", "");
        cy.get('input[name="email"')
            .type('email@email.com')
            .should("not.have.value", "");
        cy.get('input[name=password]')
            .type("asdf432423")
            .should("not.have.value", '');
        cy.get('input[name="terms"]')
            .should('not.be.checked');
    })
});