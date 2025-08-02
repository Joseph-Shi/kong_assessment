const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // baseUrl: "http://localhost:3000",
//    viewportWidth: 1920,
//    viewportHeight: 900,
    baseUrl: "http://localhost:8002",
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js'
  },
  reporter: 'cypress-mochawesome-reporter',
  env: {
    allure: true,
    allureResultsPath: 'allure-results'
  }
});
