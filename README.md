
# Cypress Kong UI Automation Test

This Project is build based on [Cypress](https://www.cypress.io/) + [Allure Report](https://docs.qameta.io/allure/) ，aim to test the Kong Gateway Web UI（Kong Manager），including workflow of creating and deleting Service and Route ，and CI/CD integration with GitHub Actions

---

## 📌 Features

- 🧪 Automate workflow of creating and deleting Service and Route via Kong Manager UI
- 📊 Integrate Allure report system
- 🔁 Support GitHub Actions
- 🐳 Use Docker Compose to start the test environment

---

## 📁 Structure

```
cypress-kong-ui-test/
├── cypress/
│   └── e2e/
│       └── 01_create_service_and_route.cy.js       # main workflow
│   └── testcases/
│       └── case_create_service.js                  # testcase data
├── cypress.config.js                               # Cypress config file
├── docker-compose.yml                              # Kong local test environment
├── package.json                                    # project dependecy and script
└── README.md                                       # project description
```

---

## 🚀 Quick Start

### 🔧 Environment

- Node.js 16+（suggest LTS）
- Java 8+（Allure report dependency）
- Docker + Docker Compose

---

### 📦 Install Dependency

```bash
npm install
```

---

### 🐳 Start Kong Test Environment

```bash
npm run docker:up
```

Visit [http://localhost:8002](http://localhost:8002)，make sure Kong Manager UI works.

---

### 🧪 Run Cypress Test

```bash
npx cypress run
```

Or use UI mode for testing

```bash
npx cypress open
```

---

### 📊 generate Allure test report

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

### 🧹 stop and clean the test environment

```bash
npm run docker:down
```


## 🤖 GitHub Actions

The project also support running e2e tests in GitHub Actions

---

## 📌 Please be noted

- By default, the Kong Manager deployed in the test environment doesn't have license configured，
- a warning message：**“No valid Kong Enterprise license configured”** will be pop up, this is as expected。

---

## 📄 License

This project is provided for personal and educational purposes only.  
**Commercial use in any form is strictly prohibited** — including but not limited to use in paid products, corporate systems, customer deliverables, or proprietary services.

Unauthorized commercial use may result in legal action.  
For commercial licensing, please contact the author.


## 📞 Contact and Support

For any question or suggestion，feel free to raise Issue or PR！

---
