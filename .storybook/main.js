const path = require("path");
const webpackConfig = require("../webpack.config");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    // config.resolve.alias = { ...webpackConfig.resolve.alias };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./src/nationalarchives",
            to: "./",
          },
        ],
      })
    );
    config.module.rules = [
      ...config.module.rules,
      ...webpackConfig.module.rules,
      {
        test: /\.njk$/,
        use: [
          {
            loader: "simple-nunjucks-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: '@use "/.storybook/storybook.scss";',
            },
          },
        ],
        include: path.resolve(__dirname, "../"),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ];
    return config;
  },
  docs: {
    autodocs: false,
  },
};
