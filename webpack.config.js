const path = require("path");
const glob = require("glob");

module.exports = {
  entry: {
    main: {
      import: "./src/nationalarchives/all.mjs",
      filename: "all.js",
      library: {
        name: "TNAFrontend",
        type: "umd",
      },
    },
    analytics: {
      import: "./src/nationalarchives/analytics.mjs",
      filename: "analytics.js",
      library: {
        name: "TNAFrontendAnalytics",
        type: "umd",
      },
    },
    ...glob
      .sync("./src/nationalarchives/components/**/*.mjs")
      .reduce((acc, path) => {
        acc[
          path
            .replace(
              /^(\.\/)?src\/nationalarchives\/components\/([\w\-]+\/)/,
              "",
            )
            .replace(/.mjs$/, "")
        ] = {
          import: `./${path}`.replace("././", "./"),
          filename: `components/[name]/[name].js`,
        };
        return acc;
      }, {}),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    library: "TNAFrontend",
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, "package/nationalarchives"),
  },
  devtool: "source-map",
};
