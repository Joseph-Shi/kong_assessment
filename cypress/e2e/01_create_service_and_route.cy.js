// Case Id: TC001
// Case Name: User can create service and route
// Precondition: Kong UI is running, workspace is opened, default workspace is ready and no service and route created
// Steps：
//  1. Navigate to workspace
//  2. Create service and verify
//  3. Create route and verify
// Expected：
//  1. User can navigate to workspace
//  2. User can create service and verify correctly
//  3. User can create route and verify correctly

import { cases } from '../testcases/case_create_service';

describe('Default Workspace - Service Management', () => {

  before(() => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
  });

  cases.forEach(({ name, service_name, serviceUrl, serviceUrl_validate, routeName, routePath, methods }) => {
  it(name, () => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
    cy.get('[data-testid="workspace-link-default"]').click();
    cy.createService(service_name, serviceUrl, serviceUrl_validate);
    cy.createRoute(service_name, routeName, routePath, methods);
  });
});
});
