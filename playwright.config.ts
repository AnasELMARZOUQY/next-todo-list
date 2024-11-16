import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./playwright-tests", // Directory where your tests are located
  timeout: 30000, // Maximum time one test can run for
  retries: 2, // Number of retries on failure
  use: {
    headless: false, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    actionTimeout: 0, // Maximum time for each action
    baseURL: "http://localhost:3000", // Base URL for your application
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
})
