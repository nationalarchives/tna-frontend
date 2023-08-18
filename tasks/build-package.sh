#!/bin/bash

set -e
rm -fR package
npm run package:sass
npm run package:scripts
cp -R src/nationalarchives package.json package-lock.json README.md LICENCE govuk-prototype-kit.config.json package
