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
    ...glob
      .sync("./src/nationalarchives/components/**/*.mjs")
      .reduce((acc, path) => {
        acc[
          path
            .replace(/^(\.\/)?src\/nationalarchives\//, "")
            .replace(".mjs", "")
        ] = `./${path}`.replace("././", "./");
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
    library: ["TNAFrontend", "[name]"],
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, "package/nationalarchives"),
  },
  devtool: "source-map",
};
