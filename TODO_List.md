# Cypress Test Framework Improvement Plan

Due to the limitation of time, there are still things pending to be done.
The document outlines improvement plans for the Cypress-based test framework, focusing on **reusability**, **maintainability**, and **extensibility**.

---

## 1. Reusability Improvements

| Area             | Issue                                                      | Recommendation                                                                 |
|------------------|------------------------------------------------------------|---------------------------------------------------------------------------------|
| Custom Commands  | `commands.js` has limited logic reuse                      | Abstract common UI interactions into reusable commands (e.g., `cy.createService()`, `cy.deleteRoute()`) |
| Selector Reuse   | Data-testid selectors are hardcoded in multiple locations  | Centralize all selectors in a `selectors.js` file for better consistency       |
| Data Reuse       | Only `example.json` is used for fixtures                   | Create specific fixtures like `service_data.json` and `route_data.json`        |

---

## 2. Maintainability Improvements

| Area               | Issue                                                     | Recommendation                                                                 |
|--------------------|-----------------------------------------------------------|---------------------------------------------------------------------------------|
| Test Case Structure| Business logic is written directly in `*.cy.js` test files| Split logic into separate files in `testcases/`, keeping `*.cy.js` clean and declarative |
| YAML Integration   | `testcases.yml` is not programmatically integrated        | Use YAML parsers to dynamically generate test cases with looped `it()` blocks  |

---

## 3. Extensibility Suggestions

| Area               | Issue                                       | Recommendation                                                                 |
|--------------------|---------------------------------------------|---------------------------------------------------------------------------------|
| Environment Config | need to manage multiple test environments   | Add `cypress.env.json` or use `--env` for CI/local/staging support             |
| CI Strategy        | GitHub Actions runs only on the main branch | Add support for feature branches and matrix strategy (e.g., multiple browsers) |
| Test Reports       | No test report integration                  | Integrate with `mochawesome` or `Allure` for rich reporting                    |

---

