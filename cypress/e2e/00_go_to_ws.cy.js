describe('go to workspace page', () => {
  it('navigate to workspace page', () => {
    cy.allure().startStep('Open Kong UI');
    cy.visit('/workspaces')
    cy.get('[data-testid="sidebar-item-workspaces"]')
    .should('have.class', 'sidebar-item-primary')
    .and('have.class', 'active');
    cy.allure().endStep();
    cy.allure().feature('Service Management workspace');
    cy.allure().severity('critical');
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
});