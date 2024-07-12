#!/bin/bash

set -e
rm -fR package
npm run compile:sass
npm run compile:scripts
cp -R src/nationalarchives package.json package-lock.json README.md LICENCE govuk-prototype-kit.config.json package
mkdir package/config
cp -R .babelrc.json .eslintrc.js .htmlvalidate.json stylelint.config.js package/config
sed -i -e 's/, "plugin:storybook\/recommended"//g' package/config/.eslintrc.js
