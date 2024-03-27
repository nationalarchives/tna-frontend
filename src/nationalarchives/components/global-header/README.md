<img src="../../assets/images/tna-square-logo.svg" alt="The National Archives logo" title="The National Archives" width="100">

# TNA Frontend Global Header and Footer

[![Latest release](https://img.shields.io/github/v/release/nationalarchives/tna-frontend?style=flat-square&logo=github&logoColor=white&sort=semver)](https://github.com/nationalarchives/tna-frontend/releases)
[![NPM version](https://img.shields.io/npm/v/@nationalarchives/frontend-global-header?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@nationalarchives/frontend-global-header)
[![Licence](https://img.shields.io/github/license/nationalarchives/tna-frontend?style=flat-square)](https://github.com/nationalarchives/tna-frontend/blob/main/LICENCE)

Use the cookie banner from TNA Frontend in your service.

## Preparation

### HTML

1. Add the classes `tna-template` and `tna-template--light-theme` to your `<html>` element
1. Add the class `tna-template__body` to your `<body>` element
1. Add the HTML for the header and footer to the appropriate part of your page (HTML found below)
1. Change the `#main-content` in the `href` of the skip link to the ID of your `<main>` element

### JavaScript and CSS

1. Include the `global-header-package.css` file in your page using a `<link>` element
1. Include the `all.js` and `analytics.js` files in your page using a `<script>` element (ensure you add the JavaScript file AFTER the header and footer HTML - this should add a `TNAFrontend` and `TNAFrontendAnalytics` object to your `window`)
1. Initialise the header JavaScript and analytics AFTER the JavaScript files you just included:

```html
<script>
    if(window.TNAFrontend && window.TNAFrontend.initAll) {
        window.TNAFrontend.initAll()
    }
    if(window.TNAFrontendAnalytics && window.TNAFrontendAnalytics.GA4) {
        new TNAFrontendAnalytics.GA4({ addTrackingCode: false })
    }
</script>
```

## Example HTML

Feel free to add or remove items as necessary. The recommended HTML is shown below.

### Header

```html
<!-- SKIPLINKHTML -->
<!-- GLOBALHEADERHTML -->
```

### Footer

```html
<!-- FOOTERHTML -->
```
