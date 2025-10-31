#!/bin/bash

set -e
rm -fR package
npm run compile:sass
npm run compile:scripts
cp -R src/nationalarchives package.json package-lock.json README.md LICENCE govuk-prototype-kit.config.json package
mkdir package/config
cp -R .babelrc.json .eslintrc.js .htmlvalidate.json stylelint.config.js package/config
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e 's/, "plugin:storybook\/recommended"//g' package/config/.eslintrc.js
else
  sed -i -e 's/, "plugin:storybook\/recommended"//g' package/config/.eslintrc.js
fi
find package -name "*.mdx" -type f -delete
find package -name "*.stories.js" -type f -delete
cp node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 package/nationalarchives/assets/fonts
cp node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2 package/nationalarchives/assets/fonts
