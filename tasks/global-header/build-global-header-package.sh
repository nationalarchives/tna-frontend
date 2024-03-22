#!/bin/bash

set -e
./tasks/build-package.sh
rm -fR package-global-header
mkdir package-global-header
cp -R package/nationalarchives/global-header-package.css package/nationalarchives/global-header-package.css.map package/nationalarchives/all.js package/nationalarchives/all.js.map package/nationalarchives/global-header-package.scss package/nationalarchives/assets package/nationalarchives/analytics.js package/nationalarchives/analytics.js.map LICENCE package-global-header
node tasks/global-header/generate-global-header-assets.js
