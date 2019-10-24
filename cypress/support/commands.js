// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {Umbraco} from 'umbraco-cypress-testhelpers'

Umbraco.RegisterCypressCommands();

Cypress.Commands.add('saveContent', (obj) => {
    if(obj == null){
        return;
    }
    cy.request({
        method: 'POST',
        url: '/umbraco/backoffice/UmbracoApi/Content/PostSave',
        body: "------WebKitFormBoundaryUy2SJeN3NOUy7pjp\n" +
            "Content-Disposition: form-data; name=\"contentItem\"\n" +
            "\n" +
            JSON.stringify(obj) + "\n" +
            "------WebKitFormBoundaryUy2SJeN3NOUy7pjp--",
        form: true,
        timeout: 90000,
        headers: {
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryUy2SJeN3NOUy7pjp"
        }
    }).then((response) => {
        return _getBody(response);
    });

    function _getBody(response){
        return JSON.parse(response.body.substr(6));
    }

});

///////////

    Cypress.Commands.add('addTextToUsernameInput', (username) => {
      cy.get('input[name="username"]').type(username).should('have.value', username);
    });

    Cypress.Commands.add('addTextToPasswordInput', (password, doNotEndWithEnter) => {

      if(doNotEndWithEnter !== true){
        cy.get('input[name="password"]:visible').type(password + '{enter}').should('have.value', password);
      }
      else{
        cy.get('input[name="password"]:visible').type(password).should('have.value', password);
      }

    });

    Cypress.Commands.add('treeItem', (treeName, itemNamePath1, itemNamePath2, itemNamePath3) => {


      cy.log("treeItem");

      if(itemNamePath3){
        //todo
      }

      if(itemNamePath2){

        cy.get('.umb-tree li')
          .contains(treeName)
          .closest('li')
          .find(".umb-tree-item__label")
          .contains(itemNamePath1)
          .closest('li')
          .find("[data-element=\"tree-item-expand\"]")
          .click();


        return cy.get('.umb-tree li')
          .contains(treeName)
          .closest('li')
          .find(".umb-tree-item__label")
          .contains(itemNamePath1)
          .closest('li')
          .find('ul li .umb-tree-item__label')
          .contains(itemNamePath2)
          .closest('li');
      }


      return cy.get('.umb-tree li')
        .contains(treeName)
        .closest('li')
        .find(".umb-tree-item__label")
        .contains(itemNamePath1)
        .closest('li')

    });

    Cypress.Commands.add('contextmenu', {
      prevSubject: true
    }, ($subject, method) => {

      const e = document.createEvent('HTMLEvents');
      e.initEvent('contextmenu', true, false);
      $subject[0].dispatchEvent(e);
    });


