#!/bin/bash

set -e
sh ./tasks/build-package.sh
rm -fR package-cookie-banner
mkdir package-cookie-banner
cp -R package/nationalarchives/components/cookie-banner/cookie-banner.css package/nationalarchives/components/cookie-banner/cookie-banner.css.map package/nationalarchives/components/cookie-banner/cookie-banner.js package/nationalarchives/components/cookie-banner/cookie-banner.js.map LICENCE package-cookie-banner
node tasks/cookie-banner/generate-cookie-banner-assets.js
