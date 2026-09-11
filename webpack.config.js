import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: {
    main: {
      import: "./src/nationalarchives/all.mjs",
      filename: "all.js",
      library: {
        name: "TNAFrontend",
        type: "var",
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
    "all+analytics": {
      import: "./src/nationalarchives/all+analytics.mjs",
      filename: "all+analytics.js",
      library: {
        name: "TNAFrontend",
        type: "umd",
      },
    },
    ...globSync("./src/nationalarchives/components/**/*.mjs").reduce(
      (acc, path) => {
        acc[
          path
            .replace(
              /^(\.\/)?src\/nationalarchives\/components\/([\w\-]+\/)/u,
              "",
            )
            .replace(/.mjs$/u, "")
        ] = {
          import: `./${path}`.replace("././", "./"),
          filename: `components/[name]/[name].js`,
        };
        return acc;
      },
      {},
    ),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/u,
        exclude: /(node_modules|bower_components)/u,
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
    iife: true,
    path: path.resolve(__dirname, "package/nationalarchives"),
  },
  devtool: "source-map",
};
