// Case Id: TC002
// Case Name: User can delete all services and routes
// Precondition: Kong UI is running, workspace is opened, default workspace is ready, services and routes created
// Steps：
//  1. Navigate to workspace
//  2. Delete all routes
//  3. Delete all services
// Expected：
//  1. User can navigate to workspace
//  2. User can delete all routes
//  3. User can delete all services


describe('Default Workspace - Service Management', () => {

  before(() => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
  });

  it(name, () => {
    cy.viewport(1920, 900);
    cy.visit('/workspaces');
    cy.get('[data-testid="workspace-link-default"]').click();
    cy.deleteAllRoutes('default');
    cy.deleteAllServices('default');
  });
});
