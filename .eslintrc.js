module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:storybook/recommended"],
  overrides: [
    {
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "**/*.test.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
