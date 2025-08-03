// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('go_to_default_workspace', () => {
  cy.visit('/workspaces');
  cy.get('[data-testid="workspace-link-default"]').click();
});

Cypress.Commands.add('createService', (service_name, serviceUrl, serviceUrl_validate) => {
  cy.get('[data-testid="sidebar-item-gateway-services"]').click();
  cy.wait(2000);
  cy.get('body').then($body => {
    // check if there is no service created
    if ($body.find('[data-testid="empty-state-action"]').length > 0) {
      cy.get('[data-testid="empty-state-action"]').click();
    // check if there is already services created
    } else if ($body.find('[data-testid="toolbar-add-gateway-service"]').length > 0) {
      cy.get('[data-testid="toolbar-add-gateway-service"]').click();
    } else {
      throw new Error('No action button found to add service');
      }
  });
  cy.get('[data-testid="gateway-service-url-radio-label"]').click();
  cy.get('[data-testid="gateway-service-url-radio"]').check();
  cy.get('[data-testid="gateway-service-url-input"]').type(serviceUrl);
  cy.get('[data-testid="gateway-service-name-input"]').clear().type(service_name);
  cy.get('[data-testid="service-create-form-submit"]').click();
  // verify newly created service name and host value are as expected
  cy.get('[data-testid="name-plain-text"]')
    .should('be.visible')
    .and('contain.text', service_name);
  cy.get('[data-testid="host-plain-text"]')
    .scrollIntoView()
    .should('be.visible')
    .and('contain.text', serviceUrl_validate);
});

Cypress.Commands.add('createRoute', (service_name, routeName, routePath, methods) => {
  cy.get('[data-testid="sidebar-item-routes"]').click();
  cy.wait(2000);
  cy.get('body').then($body => {
    // check if there is no route created
    if ($body.find('[data-testid="empty-state-action"]').length > 0) {
      cy.get('[data-testid="empty-state-action"]').click();
    // check if there is already route created
    } else if ($body.find('[data-testid="toolbar-add-route"]').length > 0) {
      cy.get('[data-testid="toolbar-add-route"]').click();
    } else {
      throw new Error('No action button found to add route');
      }
  });
  cy.get('[data-testid="route-form-name"]').type(routeName);
  cy.get('[data-testid="route-form-service-id"]').click();
  cy.contains('.select-item-label', service_name)
    .should('be.visible')
    .click();
  cy.get('[data-testid="route-form-paths-input-1"]').type(routePath);
  cy.get('.expanded-selection-empty').click();
  methods.forEach(method => {
    cy.get(`[data-testid="multiselect-item-${method}"]`).click();
  });
  cy.get('[data-testid="route-create-form-submit"]')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
  // verify newly created route name, methods and path value are as expected
  cy.get('[data-testid="name-plain-text"]')
    .should('be.visible')
    .and('contain.text', routeName);
  methods.forEach(method => {
    cy.get('.badge-content-wrapper')
      .contains(method)
      .should('exist');
  });
});

Cypress.Commands.add('deleteService', (service_name, serviceUrl, serviceUrl_validate) => {
  cy.get('[data-testid="sidebar-item-gateway-services"]').click();
  cy.wait(2000);
  cy.get('body').then($body => {
    // check if there is no service created
    if ($body.find('[data-testid="empty-state-action"]').length > 0) {
      cy.get('[data-testid="empty-state-action"]').click();
    // check if there is already services created
    } else if ($body.find('[data-testid="toolbar-add-gateway-service"]').length > 0) {
      cy.get('[data-testid="toolbar-add-gateway-service"]').click();
    } else {
      throw new Error('No action button found to add service');
      }
  });
  cy.get('[data-testid="gateway-service-url-radio-label"]').click();
  cy.get('[data-testid="gateway-service-url-radio"]').check();
  cy.get('[data-testid="gateway-service-url-input"]').type(serviceUrl);
  cy.get('[data-testid="gateway-service-name-input"]').clear().type(service_name);
  cy.get('[data-testid="service-create-form-submit"]').click();
  // verify newly created service name and host value are as expected
  cy.get('[data-testid="name-plain-text"]')
    .should('be.visible')
    .and('contain.text', service_name);
  cy.get('[data-testid="host-plain-text"]')
    .should('be.visible')
    .and('contain.text', serviceUrl_validate);
});


Cypress.Commands.add('deleteAllRoutes', (workspace) => {
  cy.visit('/default/routes');
  cy.wait(2000);
  cy.get('body').then(($body) => {
    const triggers = $body.find('[data-testid="row-actions-dropdown-trigger"]');
    if (triggers.length === 0) {
      cy.log('No routes to delete');
      return;
    }
    cy.get('[data-testid="row-actions-dropdown-trigger"]').each(($el, index, $list) => {
    cy.wrap($el).click();
    cy.get('body').then($body => {
      const $dropdown = $body.find('[data-testid="action-entity-delete"]');
      if ($dropdown.length === 1) {
        cy.wrap($dropdown).click();
      } else if ($dropdown.length > 1) {
        cy.wrap($dropdown.eq(0)).click();
      } else {
        throw new Error('No delete button found');
      }
    });
    cy.get('.confirmation-text')
      .invoke('text')
      .then((confirmationText) => {
        const text = confirmationText.replace(/['"]/g, '').trim();
        cy.get('[data-testid="confirmation-input"]').type(text);
        cy.get('[data-testid="modal-action-button"]').click();
      });
    });
  });
});

Cypress.Commands.add('deleteAllServices', (workspace) => {
  cy.visit('/default/services');
  cy.wait(2000);
  cy.get('body').then(($body) => {
    const triggers = $body.find('[data-testid="row-actions-dropdown-trigger"]');
    if (triggers.length === 0) {
      cy.log('No service to delete');
      return;
    }
    cy.get('[data-testid="row-actions-dropdown-trigger"]').each(($el, index, $list) => {
    cy.wrap($el).click();
    cy.get('body').then($body => {
      const $dropdown = $body.find('[data-testid="action-entity-delete"]');
      if ($dropdown.length === 1) {
        cy.wrap($dropdown).click();
      } else if ($dropdown.length > 1) {
        cy.wrap($dropdown.eq(0)).click();
      } else {
        throw new Error('No delete button found');
      }
    });
    cy.get('.confirmation-text')
      .invoke('text')
      .then((confirmationText) => {
        const text = confirmationText.replace(/['"]/g, '').trim();
        cy.get('[data-testid="confirmation-input"]').type(text);
        cy.get('[data-testid="modal-action-button"]').click();
      });
    });
  });
});