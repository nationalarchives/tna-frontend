<img src="../../assets/images/tna-square-logo.svg" alt="The National Archives logo" title="The National Archives" width="100" />

# TNA Frontend Global Header and Footer

[![Latest release](https://img.shields.io/github/v/release/nationalarchives/tna-frontend?style=flat-square&logo=github&logoColor=white&sort=semver)](https://github.com/nationalarchives/tna-frontend/releases)
[![NPM version](https://img.shields.io/npm/v/@nationalarchives/frontend-global-header?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@nationalarchives/frontend-global-header)
[![Licence](https://img.shields.io/github/license/nationalarchives/tna-frontend?style=flat-square)](https://github.com/nationalarchives/tna-frontend/blob/main/LICENCE)

Use the cookie banner from TNA Frontend in your service.

## Preparation

### HTML

1. Add the class `tna-template` to your `<html>` element
1. Add the class `tna-template--light-theme`, `tna-template--light-theme` or `tna-template--system-theme` to your `<html>` element based on what [colour theme](https://nationalarchives.github.io/design-system/styles/colours/#theme-colours) you need (`tna-template--light-theme` suggested)
1. Add the class `tna-template__body` to your `<body>` element
1. Add the HTML for the header and footer to the appropriate part of your page (HTML found below)
1. Modify the HTML as necessary

### Assets

1. Include the `global-header-package.css` file in your page using a `<link>` element
1. Ensure the Font Awesome assets can be loaded - if they are not served from the same relative location as the `global-header-package.css` then you need to edit the include paths in the CSS or build the SCSS yourself
1. Include the `global-header.js` file in your page using a `<script>` element (ensure you add the JavaScript file AFTER the header and footer HTML - this should add a `TNAFrontend` object to your `window`)
1. Initialise the header JavaScript:

```js
const $globalHeader = document.querySelector(
  '[data-module="tna-global-header"]',
);

if ($globalHeader) {
  new TNAFrontend.GlobalHeader($globalHeader);
}
```

## Example HTML

Feel free to add or remove items as necessary. The recommended HTML is shown below.

### Header

```html
<!-- GLOBALHEADERHTML -->
```

### Footer

```html
<!-- FOOTERHTML -->
```
