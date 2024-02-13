#!/bin/bash

set -e
./tasks/build-package.sh
rm -fR package-global-header
mkdir package-global-header
cp -R package/nationalarchives/global-header-package.css package/nationalarchives/global-header-package.css.map package/nationalarchives/components/global-header/global-header.js package/nationalarchives/components/global-header/global-header.js.map package/nationalarchives/global-header-package.scss package/nationalarchives/assets LICENCE package-global-header
node tasks/global-header/generate-global-header-assets.js
