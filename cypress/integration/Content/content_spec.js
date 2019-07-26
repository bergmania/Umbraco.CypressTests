/// <reference types="Cypress" />
import {DocumentTypeBuilder, DocumentTypeGroupBuilder, PropertyBuilder} from '../../support/builders'

context('Content', () => {
    
    beforeEach(() => {
        cy.loginToBackoffice(Cypress.env('username'), Cypress.env('password'));
        
        cy.deleteDocumentType('coolName');
    });

    it.skip('TODO test af builder', () => {
        var docType = new DocumentTypeBuilder('Cool name')
            .addPropertyGroup(
                new DocumentTypeGroupBuilder('Unnamed')
                    .addProperty(new PropertyBuilder("Prop 1", -88).build())
                    .addProperty(new PropertyBuilder("Prop 2", -88).build())
                    .addProperty(new PropertyBuilder("Prop 3", -88).build())
                .build())
            .build();
        
        cy.log("docType", docType);

        cy.saveDocumentType(docType).then(() => {

        });
    
    });
});
  