const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 900,
    baseUrl: "http://localhost:8002",
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
