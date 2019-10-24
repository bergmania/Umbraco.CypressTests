/// <reference types="Cypress" />
import  * as Helpers from '../../support/helpers'
import {Builder} from 'umbraco-cypress-testhelpers'

context('Forms', () => {
    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
        //
        // cy.umbracoSection("Forms").click(); // Need to force for mobiles, where the link is hidden by default
        cy.deleteAllForms();
    });



    it('Test field with contains condition', () => {
        var textToInsert = 'test';
        var shortAnswer1Id = Helpers.generateGuid();

        var form = Builder.Form()
                .addPage()
                    .addFieldSet()
                        .addContainer()
                            .addShortAnswerField()
                                .withId(shortAnswer1Id)
                            .done()
                            .addShortAnswerField()
                                .addShowAllConditions()
                                    .addRule()
                                        .withContainsRule(shortAnswer1Id,textToInsert)
                                    .done()
                                .done()
                            .done()
                        .done()
                    .done()
                .done()
            .build();
        cy.saveForm(form).then(formBody => {
            
            var dataType = Builder.DataTypes.FormPicker().build();

            æ
            cy.saveDataType(dataType).then(dataTypeBody => {
                var formPickerAlias = "myFormPicker";
                var docType = new Builder.DocumentType()
                        .withAllowAsRoot(true)
                        .addGroup()
                            .addFormPickerProperty()
                                .withDataTypeId(dataTypeBody.id)
                                .withAlias(formPickerAlias)
                            .done()
                        .done()
                    .build();
                
                cy.saveDocumentType(docType).then(docTypeBody => {

                    var content = Builder.Content()
                        .withContentTypeAlias(docTypeBody.alias)
                        .addVariant()
                            .withSave(true)
                            .withPublish(true)
                            .addProperty()
                                .withAlias(formPickerAlias)
                                .withValue(formBody.id)
                            .done()
                        .done()
                    .build();

                   
                    
                    cy.saveContent(content).then(contentBody => {
                        cy.log("form", formBody);
                        cy.log("dataType", dataTypeBody);
                        cy.log("docTypeBody", docTypeBody);
                        cy.log("content", contentBody);
                    });
                    
                });
                
            });
            
           

 
           
            

        });
        
        
    });
   

});
  