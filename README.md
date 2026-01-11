# Playwright TypeScript Automation DogAPI

## 🐾 Dog API - Enterprise Automation Framework
This is an Enterprise-grade Automation Framework built with Playwright and TypeScript, designed for high scalability, maintainability, and stability. It covers both API Lifecycle management and UI Verification for an end-to-end testing experience.

## 🚀 Key Features
Page Object Model (POM): Enhanced maintainability by separating API clients/UI elements from test logic.

API Client Pattern: Robust handling of API requests, status codes, and JSON schemas for The Dog API.

Custom Fixtures: Simplified test setup with automated dependency injection for API Clients and test data.

Data-Driven Testing: Externalized test data in JSON format to validate multiple file types (JPEG, PNG).

Multi-Environment Management: Dynamic configuration supporting QA, Staging, and UAT via a single command.

CI/CD Integrated: Fully automated testing pipeline using GitHub Actions with manual trigger support.

Advanced Debugging: Automatic Trace Viewer, Video, and Screenshot collection on test failures.

## 📁 Project Structure
.github/workflows/: CI/CD pipeline definitions (GitHub Actions).

data/: Test data management (Images and JSON test data).

fixtures/: Custom Playwright fixtures for dependency injection.

src/api/clients/: API logic and request handling (POM for API).

tests/positive/: Functional/Happy path test suites.

tests/negative/: Error handling and edge case test suites (401, 404).

utils/: Helper functions for file handling and string manipulation.

TestStrategy.md: Strategic document explaining the testing methodology.

## 🛠️ Tech Stack
Language: TypeScript

Tool: Playwright Test

CI/CD: GitHub Actions

Reporting: HTML Report, JSON Report & Trace Viewer

## 🚦 How to Run
1. Local Setup
Clone the repository:

Bash
git clone <your-repo-link>
cd dog-api-automation
Install dependencies: npm install

Environment Setup: Create a .env file in the root directory and add:
DOG_API_KEY=your_actual_key_here

Execution Commands
Run all tests (Default: QA):
Bash
npx playwright test
Run in a specific environment:
Bash
ENV=staging npx playwright test
View HTML Report:
Bash
npx playwright show-report
## 📊 CI/CD & Reporting
Each test run on GitHub Actions generates a detailed HTML Report.

Automatic Triggers: Runs on every push to main and daily at 8:00 AM (VN Time).

Manual Control: Supports manual environment selection (QA/Staging/UAT) through the GitHub Actions UI.

Artifacts: In case of failure, a Playwright Trace and Screenshots are provided as artifacts for step-by-step debugging.
