describe('create service and route', () => {
  it('navigate to workspace page', () => {
    cy.visit('/workspaces')
    cy.get('[data-testid="sidebar-item-workspaces"]')
    .should('have.class', 'sidebar-item-primary')
    .and('have.class', 'active');
  });
  it('find default workspace', () => {
    cy.visit('/workspaces')
    cy.get('.workspace-name').then($el => {
      const text = $el.text().trim();
      if (text.includes('default')) {
        cy.wrap($el).click();
      } else {
        throw new Error(`element workspace-name does not contain default, but is：${text}`);
      }
    });
  });
  it('create a new server', () => {
    cy.visit('/default/services/create');
    cy.get('[data-testid="gateway-service-url-radio-label"] > .card-label-container > .radio-label')
        .should('be.visible')
        .click();
    cy.get('[data-testid="gateway-service-url-radio"]')
        .should('be.visible')
        .check();
    cy.get('[data-testid="gateway-service-url-input"]')
        .should('be.visible')
        .type('https://localhost:8002/test')
        .should('have.value', 'https://localhost:8002/test');
    cy.get('[data-testid="gateway-service-name-input"]')
        .should('be.visible')
        .clear('n');
    cy.get('[data-testid="gateway-service-name-input"]')
        .should('be.visible')
        .type('new-service-for-testing')
        .should('have.value', 'new-service-for-testing');
    cy.get('[data-testid="service-create-form-submit"]').click();
  });
//  it('remove created server', () => {
//    /* ==== remove service ==== */
//    cy.wait(5000);
//    cy.visit('/default/services');
//    cy.get('[data-testid="row-actions-dropdown-trigger"]')
//        .should('be.visible')
//        .click();
//    cy.get('[data-testid="action-entity-delete"] > .dropdown-item-trigger-label')
//        .should('be.visible')
//        .click();
//    cy.get('.confirmation-text')
//        .should('be.visible')
//        .click();
//    cy.get('[data-testid="confirmation-input"]')
//        .should('be.visible')
//        .clear('new-service-for-testing');
//    cy.get('[data-testid="confirmation-input"]')
//        .should('be.visible')
//        .type('new-service-for-testing');
//    cy.get('[data-testid="modal-action-button"]')
//        .should('be.visible')
//        .click();
//  })
})