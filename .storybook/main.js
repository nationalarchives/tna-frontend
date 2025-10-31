export default {
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx)"],
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-vitest",
  ],
  staticDirs: ["../src/nationalarchives/assets", "../src/"],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      assetsInclude: ["**/*.njk"],
    });
  },
};
