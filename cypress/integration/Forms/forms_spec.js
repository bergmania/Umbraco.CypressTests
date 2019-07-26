/// <reference types="Cypress" />
import  * as Helpers from '../../support/helpers'

context('Forms', () => {
    beforeEach(() => {
        cy.loginToBackoffice(Cypress.env('username'), Cypress.env('password'));

        cy.section("Forms").click();
    });

    it('Create Form - Simple with just the consent field', () => {
        let formName = 'My test form';

        ensureFormNameIsDeleted(formName);

        cy.treeItem('Forms', 'Forms').contextmenu();

        cy.get('[data-element="action-create"]').click();

        cy.get('[data-element="action-emptyForm"]').click();

        cy.get('[data-element="editor-name-field"]').type(formName).should('have.value', formName);

        saveAndVerifySuccess('Form saved')
    });

    function saveAndVerifySuccess(text) {
        cy.get('[data-element="button-save"]').click();

        cy.get('.umb-notifications__notifications strong').should(($span) => {
            expect($span).to.contain(text);
        })
    }
    
    function ensureFormNameIsDeleted(formName){
        cy.request({
            method: 'GET',
            url: '/backoffice/UmbracoForms/Form/GetOverView',
        }).then((response) => {
          var body = Helpers.getReponseBody(response);
          
          for (var i=0;i<body.length;i++){
              if(body[i].name === formName){
                  cy.request({
                      method: 'POST',
                      url: '/backoffice/UmbracoForms/Form/DeleteByGuid?guid=' + body[i].id,
                  }).then((response) => {
                     
                  });
              }
              
          } 
        });
    }

});
  