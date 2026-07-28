import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
      screenshotFailures: false,
    },
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
        },
      },
      {
        extends: true,
        test: {
          name: "unit",
          include: ["test/*.test.js"],
        },
      },
    ],
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.js", "src/**/*.mjs"],
      exclude: ["**/analytics.js", "**/*.json"],
    },
  },
});
