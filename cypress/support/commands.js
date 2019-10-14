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
import  * as Helpers from './helpers'

Cypress.Commands.add('loginToBackoffice', (username, password) => {

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.request({
        method: 'POST',
        url: '/umbraco/backoffice/UmbracoApi/Authentication/PostLogin',
        followRedirect: false,
        body: {
            username: username,
            password: password,
        },
        headers: {
            contentType: "application/json"
        }
    }).then((response) => {
        cy.visit('/umbraco/').then($page => {
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


Cypress.Commands.add('saveDocumentType', (docType) => {
    cy.request({
        method: 'POST',
        url: '/umbraco/backoffice/UmbracoApi/ContentType/PostSave',
        body: docType,
        timeout: 90000,
        headers: {
            contentType: "application/json"
        }
    }).then((response) => {
        var body = _getBody(response);

        docType.compositeContentTypes = body.compositeContentTypes;
        docType.isContainer = body.isContainer;
        docType.allowAsRoot = body.allowAsRoot;
        docType.allowedTemplates = body.allowedTemplates;
        docType.allowedContentTypes = body.allowedContentTypes;
        docType.alias = body.alias;
        docType.description = body.description;
        docType.thumbnail = body.thumbnail;
        docType.name = body.name;
        docType.id = body.id;
        docType.icon = body.icon;
        docType.trashed = body.trashed;
        docType.key = body.key;
        docType.parentId = body.parentId;
        docType.path = body.path;
        docType.allowCultureVariant = body.allowCultureVariant;
        docType.isElement = body.isElement;
        docType.defaultTemplate = body.defaultTemplate;
        docType.groups = body.groups;
    });
});

function _getBody(response){
    return JSON.parse(response.body.substr(6));
}

Cypress.Commands.add('deleteDocumentType', (id) => {
    
    if(id == null){
        return;
    }

    if (typeof id === 'string' || id instanceof String){
        cy.request({
            method: 'GET',
            url: '/umbraco/backoffice/UmbracoApi/ContentType/GetAll',
        }).then((response) => {
            var documentTypes = _getBody(response);
            
            for (var i = 0; i<documentTypes.length;i++){
                if(documentTypes[i].alias === id || documentTypes[i].key === id){
                    cy.deleteDocumentTypeById(documentTypes[i].id);
                    break;
                }
            } 
            
            
        });
    }else{ // assume int
        cy.deleteDocumentTypeById(id);
    }
   
});

Cypress.Commands.add('deleteDocumentTypeById', (id) => {

    cy.request({
        method: 'POST',
        url: '/umbraco/backoffice/UmbracoApi/ContentType/DeleteById?id=' + id,
        timeout: 150000,
        headers: {
            contentType: "application/json"
        }
    }).then((response) => {

    });
   
});




Cypress.Commands.add('section', (name) => {

    return cy.get('[data-element="section-'+Helpers.camelize(name)+'"]');
   
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


