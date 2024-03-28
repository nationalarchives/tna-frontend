#!/bin/bash

set -e
rm -fR package
npm run compile:sass
npm run compile:scripts
cp -R src/nationalarchives package.json package-lock.json README.md LICENCE govuk-prototype-kit.config.json package
