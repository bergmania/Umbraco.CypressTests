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
        
        cy.get('[data-element="global-user"]').click();
        cy.get('[data-element="button-editUser"]').click();
    });

    it('Update current user should success without any changes', () => {
        saveAndVerifySuccess();
    });

    it('Update language on current user', () => {
        cy.get('select[name="culture"]');

        cy.get('select[name="culture"]').then(($select) => {
            cy.log("then", $select);
            if ($select.children(":selected").text() == 'English (United States)') {
                cy.get('select[name="culture"]').select("Danish (Denmark)");
            } else {
                cy.get('select[name="culture"]').select("English (United States)");
            }
        });

        saveAndVerifySuccess();
    });

    function saveAndVerifySuccess() {
        cy.get('button.btn-success').click();

        cy.get('.umb-notifications__notifications').children().should('have.class', 'alert-success');
    }
});
  