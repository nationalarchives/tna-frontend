const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: ["../src/nationalarchives/assets"],

  viteFinal: async (config, { configType }) => {
    return { ...config, assetsInclude: ["**/*.njk"] };
  },
};

export default config;
