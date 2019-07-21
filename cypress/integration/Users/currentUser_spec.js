/// <reference types="Cypress" />

// Cypress.on('uncaught:exception', (err, runnable) => {
//   // returning false here prevents Cypress from
//   // failing the test
//   if(err.message.indexOf('r.shift is not a function') !== -1){
//     return false;
//   }
//   return true;
// })
context('Current User', () => {
    beforeEach(() => {
        cy.loginToBackoffice(Cypress.env('username'), Cypress.env('password'));

        cy.globalUser().click();
        cy.get('[data-element="button-editUser"]').click();
    });

    it('Update current user should success without any changes', () => {
        saveAndVerifySuccess("User Saved");
    });

    it('Update language on current user', () => {
        cy.get('select[name="culture"]');

        cy.get('select[name="culture"]').select("Danish (Denmark)");

        saveAndVerifySuccess("User Saved"); // User was english so the text is danish

        cy.get('select[name="culture"]').select("English (United States)");
        
        saveAndVerifySuccess("Bruger gemt"); // User was danish so the text is danish
    });

    it('Change password', () => {

    });

    it('Update start nodes', () => {

    });

    it('Update access', () => {

    });

    it('Update groups', () => {

    });

    it('Update photo', () => {

    });
    function saveAndVerifySuccess(text) {
        cy.get('button.btn-success').click();
        
        cy.get('.umb-notifications__notifications span').should(($span) => {
            expect($span).to.contain(text);
        })
    }
});
  