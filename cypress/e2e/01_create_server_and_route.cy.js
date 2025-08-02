describe('create service and route', () => {
  it('open workspace', () => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces')
    cy.get('[alt="Kong Manager Logo"]')
    /* ==== Generate service ==== */
    cy.get('.workspace-name').click();
    cy.get('[data-testid="action-button"]').click();
    cy.get('[data-testid="gateway-service-url-radio-label"] > .card-label-container > .radio-label').click();
    cy.get('[data-testid="gateway-service-url-radio"]').check();
    cy.get('[data-testid="gateway-service-url-input"]').type('http://httpbin.konghq.com');
    cy.get('[data-testid="gateway-service-name-input"]').clear('n');
    cy.get('[data-testid="gateway-service-name-input"]').type('test_service');
    cy.get('[data-testid="service-create-form-submit"]').click();
    cy.get('.alert-message > .k-button').click();
    /* ==== Generate route ==== */
    cy.get('[data-testid="route-form-name"]').type('test_route');
    cy.get('[data-testid="route-form-paths-input-1"]').type('/api/v1');
    cy.get('.expanded-selection-empty').click();
    cy.get('[data-testid="multiselect-item-GET"] > .multiselect-item-container > button > .multiselect-item-label').click();
    cy.get('[data-testid="multiselect-item-PUT"] > .multiselect-item-container > button > .multiselect-item-label').click();
    cy.get('[data-testid="multiselect-item-POST"] > .multiselect-item-container > button > .multiselect-item-label').click();
    cy.get('[data-testid="multiselect-item-PATCH"] > .multiselect-item-container > button > .multiselect-item-label').click();
    cy.get('[data-testid="multiselect-item-DELETE"] > .multiselect-item-container > button > .multiselect-item-label').click();
    cy.get('.form-section-content > .k-card > .card-content').click();
    cy.get('[data-testid="route-create-form-submit"]').click();
    /* ==== remove route ==== */
    cy.wait(1000);
    cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();
    cy.get('[data-testid="row-actions-dropdown-trigger"]').click();
    cy.get('[data-testid="action-entity-delete"] > .dropdown-item-trigger-label').click();
    cy.get('[data-testid="confirmation-input"]').clear('r');
    cy.get('[data-testid="confirmation-input"]').type('test_route');
    cy.get('[data-testid="modal-action-button"]').click();
    /* ==== remove service ==== */
    cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();
    cy.get('[data-testid="row-actions-dropdown-trigger"]').click();
    cy.get('[data-testid="action-entity-delete"] > .dropdown-item-trigger-label').click();
    cy.get('.confirmation-text').click();
    cy.get('[data-testid="confirmation-input"]').clear('test_service');
    cy.get('[data-testid="confirmation-input"]').type('test_service');
    cy.get('[data-testid="modal-action-button"]').click();
  })
})