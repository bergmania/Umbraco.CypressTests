/// <reference types="Cypress" />

context('Tours', () => {
    beforeEach(() => {
        cy.loginToBackoffice(Cypress.env('username'), Cypress.env('password'), true);
        
        cy.globalHelp().click();
        
        cy.get('a.umb-help-list-item').click();
        cy.get('[label="Rerun"]').click();
    });

    it('Get Started ', () => {
        executeTour();
    });

});

function executeTour(){
    //Start tour
    cy.get('button.btn-action:visible').click();
    
    verifyTitleAndClickNext('Main Menu');
    verifyTitleAndClickNext('Sections');
    verifyTitleAndClickNext('The Tree');
    verifyTitleAndClickNext('Dashboards');
    verifyTitleAndClickNext('Search');

    //Click on user - User profile
    verifyTitle('User profile');
    cy.globalUser().click();
    
    verifyTitleAndClickNext('User profile');
    
    //Click on close - User profile
    verifyTitle('User profile');
    cy.get('.umb-overlay-drawer button.btn-link:visible').click();
    
    //Click on user - User profile
    verifyTitle('Help');
    cy.globalHelp().click();

    verifyTitleAndClickNext('Help');
    verifyTitleAndClickNext('Tours');

    // Congratulations!
    cy.get('h3.bold').should(($div) => {
        expect($div).to.contain('Congratulations!');
    });
    cy.get('button.btn-action:visible').click();
}

function verifyTitleAndClickNext(title){
    verifyTitle(title);
    cy.get('button.btn-action:visible').click();
}

function verifyTitle(title){
    cy.get('.umb-tour-step__title:visible').should(($div) => {
        expect($div).to.contain(title);
    });
}
  