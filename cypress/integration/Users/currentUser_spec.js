/// <reference types="Cypress" />

context('Current User', () => {
    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));

        cy.umbracoGlobalUser().click();
        cy.get('[data-element="button-editUser"]').click();
    });

    it('Update current user should success without any changes', () => {
        saveAndVerifySuccess("User Saved");
    });

    it('Update language on current user', () => {
        cy.get('select[name="culture"]').select("Danish (Denmark)");

        saveAndVerifySuccess("User Saved"); // User was english so the text is danish

        cy.get('select[name="culture"]').select("English (United States)");

        saveAndVerifySuccess("Bruger gemt"); // User was danish so the text is danish
    });

    it('Change password', () => {
        cy.get('[label-key="general_changePassword"] button').click();
        cy.get('input[name="oldPassword"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get('input[name="password"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get('input[name="confirmPassword"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));

        saveAndVerifySuccess("User Saved");

        //Remove again
        cy.get('[label-key="general_changePassword"] button').click();
        cy.get('input[name="oldPassword"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get('input[name="password"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get('input[name="confirmPassword"]').type(Cypress.env('password')).should('have.value', Cypress.env('password'));

        saveAndVerifySuccess("User Saved");
    });

    it('Update start nodes', () => {
        //TODO ensure the startnode is empty from start 

        cy.get('#content-start-add').click();
        cy.get('.umb-panel ul[treealias="content"] [data-element="tree-item-Cypress"]').click();
        cy.get('.umb-panel [button-style="success"][label-key="general_submit"]').click();

        saveAndVerifySuccess("User Saved");
    });
        
    
    function saveAndVerifySuccess(text) {
        cy.get('button.btn-success').click();
        
        cy.get('.umb-notifications__notifications span').should(($span) => {
            expect($span).to.contain(text);
        })
    }
});
  