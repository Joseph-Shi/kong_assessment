describe('Create and delete service and route', () => {
  let testData;

  before(() => {
    cy.fixture('serviceRoute').then((data) => {
      testData = data;
    });
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
  });

  it('should create a new service in default workspace', () => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
    cy.get('[data-testid="workspace-link-default"]').click();
    cy.get('[data-testid="action-button"]').click();
    cy.get('[data-testid="gateway-service-url-radio-label"]').click();
    cy.get('[data-testid="gateway-service-url-radio"]').check();
    cy.get('[data-testid="gateway-service-url-input"]').type(testData.serviceUrl);
    cy.get('[data-testid="gateway-service-name-input"]').clear().type(testData.serviceName);
    cy.get('[data-testid="service-create-form-submit"]').click();
    // verify newly created service name and host value are as expected
    cy.get('[data-testid="name-plain-text"]')
      .should('be.visible')
      .and('contain.text', testData.serviceName);
    cy.get('[data-testid="host-plain-text"]')
      .should('be.visible')
      .and('contain.text', testData.serviceUrl_validate);
  });

  it('should create a new route', () => {
    cy.viewport(1920, 900);
    cy.visit('/default/routes');
    cy.get('[data-testid="empty-state-action"]').click();
    cy.get('[data-testid="route-form-name"]').type(testData.routeName);
    cy.get('[data-testid="route-form-service-id"]').click();
    cy.contains('.select-item-label', testData.serviceName)
      .should('be.visible')
      .click();
    cy.get('[data-testid="route-form-paths-input-1"]').type(testData.routePath);
    cy.get('.expanded-selection-empty').click();
    testData.methods.forEach(method => {
      cy.get(`[data-testid="multiselect-item-${method}"]`).click();
    });
    cy.get('[data-testid="route-create-form-submit"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    // verify newly created route name, methods and path value are as expected
    cy.get('[data-testid="name-plain-text"]')
      .should('be.visible')
      .and('contain.text', testData.routeName);
    cy.fixture('serviceRoute').then((data) => {
      const methods = data.methods;
      methods.forEach(method => {
        cy.get('.badge-content-wrapper')
          .contains(method)
          .should('exist');
      });
    });
  });
});
