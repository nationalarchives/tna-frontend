import { viteStaticCopy } from "vite-plugin-static-copy";

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
  staticDirs: ["../src/nationalarchives/assets"],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [
        viteStaticCopy({
          targets: [
            {
              src: "node_modules/@fortawesome/fontawesome-free/webfonts/*.woff2",
              dest: "assets/assets/fonts",
            },
            {
              src: "src/nationalarchives/**/*.njk",
              dest: "nationalarchives",
              rename: (fileName, fileExtension, fullPath) =>
                fullPath.replace(/^.*\/src\/nationalarchives\//, "./"),
            },
          ],
        }),
      ],
    });
  },
};
