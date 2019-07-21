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


Cypress.Commands.add('loginToBackoffice', (username, password) => {

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.request({
        method: 'POST',
        url: '/backoffice/UmbracoApi/Authentication/PostLogin',
        followRedirect: false,
        body: {
            username: username,
            password: password,
        },
        headers: {
            contentType: "application/json"
        }
    }).then((response) => {
        cy.visit('/').then($page => {
            cy.log("$page", $page);
        });
        
        cy.get('body').should($body => {
            if($body.hasClass('umb-tour-is-visible')){
                cy.get('.umb-tour-step__close').click();
            }
        });
    });
});


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

Cypress.Commands.add('globalUser', () => {
    cy.get('[data-element="global-user"]');
});



Cypress.Commands.add('globalHelp', () => {
    cy.get('[data-element="global-help"]');
});


