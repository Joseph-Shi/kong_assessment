// Case Id: TC002
// Case Name: User can delete all services and routes
// Precondition: Kong UI is running, workspace is opened, default workspace is ready, services and routes created
// Steps：
//  1. Navigate to default workspace
//  2. Delete all routes
//  3. Delete all services
// Expected：
//  1. User can navigate to default workspace
//  2. User can delete all routes
//  3. User can delete all services


describe('Default Workspace - Service Management', () => {

  before(() => {
    cy.visit('/workspaces');
  });

  it('Delete all routes and services', () => {
    cy.go_to_default_workspace();
    cy.deleteAllRoutes('default');
    cy.deleteAllServices('default');
  });
});
