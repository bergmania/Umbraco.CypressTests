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
     headers : {
       contentType: "application/json"
     }
   }).then((response) => {
     // response.body is automatically serialized into JSON
     cy.log("response", response.body);

     cy.visit('/');
   })
 });

 Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    if(err.message.indexOf('r.shift is not a function') !== -1){
      return false;
    }
    return true;
  });