/// <reference types="Cypress" />
import * as Utils from '../../utils/utils'

context('Login Page', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      cy.visit('/')
    });

  
  it('Login using correct email and password', () => {

    let backOfficeUsername = Cypress.env('username');
    let backOfficePassword = Cypress.env('password');

    cy.get('input[name="username"]').type(backOfficeUsername).should('have.value', backOfficeUsername)
    cy.get('input[name="password"]:visible').type(backOfficePassword+'{enter}').should('have.value', backOfficePassword)

    // we should be redirected to /dashboard
    cy.url().should('include', '#/content');

    // our auth cookie should be present
    cy.getCookie('UMB-XSRF-TOKEN').should('exist');
    cy.getCookie('UMB-XSRF-V').should('exist');
    cy.getCookie('UMB_UCONTEXT').should('exist');

    // Sections should be visible
      cy.get('ul.sections').should('be.visible');
    })
  
  });
  