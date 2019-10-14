/// <reference types="Cypress" />

context('Login Page', () => {
  let backOfficeUsernameCorrect = Cypress.env('username');
  let backOfficePasswordCorrect = Cypress.env('password');
  let backOfficeUsernameWrong = "wrong@email.com";
  let backOfficePasswordWrong = "wrongPas$$word";
  
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.visit('/umbraco')
    });

    it('Login using correct email and password and enter in password field', () => {
        cy.addTextToUsernameInput(backOfficeUsernameCorrect);
        cy.addTextToPasswordInput(backOfficePasswordCorrect);

        // we should be redirected to /dashboard
        cy.url().should('include', '#/content');

        // our auth cookie should be present
        cy.getCookie('UMB-XSRF-TOKEN').should('exist');
        cy.getCookie('UMB-XSRF-V').should('exist');
        cy.getCookie('UMB_UCONTEXT').should('exist');

        // Sections should be visible
        cy.get('ul.sections').should('be.visible');
    });


    it('Login using correct email and password and click login button', () => {
        cy.addTextToUsernameInput(backOfficeUsernameCorrect);
        cy.addTextToPasswordInput(backOfficePasswordCorrect, true);

        cy.get(".btn-success:visible").click();
        // we should be redirected to /dashboard
        cy.url().should('include', '#/content');

        // our auth cookie should be present
        cy.getCookie('UMB-XSRF-TOKEN').should('exist');
        cy.getCookie('UMB-XSRF-V').should('exist');
        cy.getCookie('UMB_UCONTEXT').should('exist');

        // Sections should be visible
        cy.get('ul.sections').should('be.visible');
    });

    it('Login using incorrect email and password should show error', () => {
    cy.get('p.text-error').should('not.exist');

    cy.addTextToUsernameInput(backOfficeUsernameWrong);
    cy.addTextToPasswordInput(backOfficePasswordWrong);
    
    cy.get('p.text-error').should(($p) => {
      expect($p).to.contain('Login failed for user ' + backOfficeUsernameWrong);
    })
  });

  it('Login without password should show error', () => {
    cy.get('p.text-error').should('not.exist');

    cy.addTextToUsernameInput(backOfficeUsernameWrong);
    cy.addTextToPasswordInput("");
    
    cy.get('p.text-error').should(($p) => {
      expect($p).to.contain('Username or password cannot be empty');
    })
  });

  it('Login without username/email should show error', () => {
    cy.get('p.text-error').should('not.exist');

    cy.addTextToPasswordInput(backOfficePasswordWrong);

    cy.get('p.text-error').should(($p) => {
      expect($p).to.contain('Username or password cannot be empty');
    })
  });


  it('Click on show password should change input to text', () => {
    cy.get('p.text-error').should('not.exist');
    
    cy.addTextToPasswordInput(backOfficePasswordWrong);

    cy.get('input[name=password]').should('have.attr', 'type', 'password');

    cy.get('.password-toggle a').click();
    
    cy.get('input[name=password]').should('have.attr', 'type', 'text');
    
    cy.get('.password-toggle a').click();

    cy.get('input[name=password]').should('have.attr', 'type', 'password');
  });
});
  