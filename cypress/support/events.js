Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    if (err.message.indexOf('r.shift is not a function') !== -1) {
        return false;
    }
    return true;
});