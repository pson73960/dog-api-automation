# Test Strategy - Dog API Automation

## 1. Objective
To verify the core functionalities of The Dog API, specifically focusing on Breeds management and Image lifecycle (Upload, Retrieval, UI Rendering, and Deletion).

## 2. Testing Levels
- **API Testing**: Focused on status codes, payload structure, and data integrity.
- **UI Verification**: Ensuring that uploaded assets are correctly rendered in a real browser environment.
- **Negative Testing**: Validating system resilience against unauthorized access and invalid data.

## 3. Toolset & Framework
- **Playwright (TypeScript)**: Used for both API and UI layers.
- **POM (Page Object Model)**: For better maintainability and code reusability.
- **Dotenv**: For secure environment variable management.

## 4. Test Scenarios
### Positive Scenarios:
- Fetch all breeds and verify data consistency.
- Search for a specific breed and validate attributes.
- Upload a dog image (JPEG) and verify via UI.
- Retrieve a previously uploaded image by ID.

### Negative Scenarios:
- Unauthorized upload attempt (Invalid API Key).
- Fetching images with invalid/non-existent IDs.

## 5. Data Handling & Cleanup
- **Setup**: Test images are stored in the `/data` folder.
- **Cleanup**: An `afterEach` hook is implemented to ensure all images uploaded during testing are deleted from the server, maintaining a clean account quota.

## 6. Execution & Reporting
- Tests are executed in a single worker mode (`workers: 1`) to avoid rate-limiting issues.
- Detailed HTML reports are generated for every run, including Trace Viewer data for failures.

## 7. Code Design Patterns
- **Utility Pattern**: Centralized file handling in `src/utils/fileUtils.ts` to manage binary data and prevent code duplication across test suites.
- **Singleton-like Clients**: API clients are instantiated via Fixtures to maintain a clean state for each test.

- **Externalized Data-Driven Testing**: Test data is completely decoupled from the test logic and managed via `data/imageTestData.json`. This allows for easy test expansion without modifying the execution engine.

## 8. Reliability & Observability
- **Retry Mechanism**: Implemented a 1-retry policy to mitigate transient network issues and ensure test stability.
- **Reporting**: Integrated HTML and JSON reporters for both human readability and automated data processing.
- **Flakiness Control**: Standardized execution with `workers: 1` to strictly adhere to API Rate-Limiting and maintain deterministic results.
- **Debuggability**: Enabled Trace Viewer and automatic screenshots on failure to accelerate root-cause analysis.