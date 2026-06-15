import { defineConfig, globalIgnores } from "eslint/config";

import tnaEslintConfig from "@nationalarchives/eslint-config";
import storybook from "eslint-plugin-storybook";

export default defineConfig([
  ...tnaEslintConfig,
  ...storybook.configs["flat/recommended"],
  globalIgnores(["!.storybook"], "Include Storybook Directory"),
  {
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "max-lines": ["warn"],
      "max-lines-per-function": ["warn"],
      "max-params": ["warn", 5],
      "max-statements": ["warn", 20, { ignoreTopLevelFunctions: true }],
    },
  },
  {
    files: ["**/analytics.js"],
    rules: {
      camelcase: "off",
      "no-ternary": "off",
    },
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}"],
    rules: {
      "import-x/no-unresolved": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-statements": "off",
      "new-cap": "off",
      "no-await-in-loop": "off",
      "no-magic-numbers": "off",
      "no-nested-ternary": "off",
      "no-promise-executor-return": "off",
      "no-ternary": "off",
      "no-warning-comments": "off",
      "sort-vars": "off",
    },
  },
]);
