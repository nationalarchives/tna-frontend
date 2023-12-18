<img src="./src/nationalarchives/assets/images/tna-square-logo.svg" alt="The National Archives logo" title="The National Archives" width="100" />

# TNA Frontend Cookie Banner

[![Latest release](https://img.shields.io/github/v/release/nationalarchives/tna-frontend?style=flat-square&logo=github&logoColor=white&sort=semver)](https://github.com/nationalarchives/tna-frontend/releases)
[![NPM version](https://img.shields.io/npm/v/@nationalarchives/frontend-cookie-banner?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@nationalarchives/frontend-cookie-banner)
[![Licence](https://img.shields.io/github/license/nationalarchives/tna-frontend?style=flat-square)](https://github.com/nationalarchives/tna-frontend/blob/main/LICENCE)

Use the cookie banner from TNA Frontend in your service.

## HTML

```html
<!-- COOKIEBANNERHTML -->
```

### Attributes

| Attribute             | Purpose                                                                   | Default                  |
| --------------------- | ------------------------------------------------------------------------- | ------------------------ |
| `data-policies`       | Extra cookie policies in addition to "essential", "settings" and "usage"  | [none]                   |
| `data-preferenceskey` | The cookie name to state that the user preferences have already been set  | `cookie_preferences_set` |
| `data-policieskey`    | The cookie name for the policy preferences                                | `cookies_policy`         |
| `data-domain`         | The domain to save cookies for                                            | [The current domain]     |
| `data-path`           | The path that cookies are available within                                | `/`                      |
| `data-insecure`       | Allow cookies to be sent in HTTP environments (designed for testing only) | `false`                  |

## JavaScript

### Initialise the component

Include the JavaScript in your service. This should add a `TNAFrontend` object to your `window`. You can then initialise the component:

```js
const $cookieBanner = document.querySelector(
  '[data-module="tna-cookie-banner"]',
);

if ($cookieBanner) {
  new TNAFrontend.CookieBanner($cookieBanner).init();
}
```

### Work with cookies using the `Cookies` class

```js
const cookies = new TNAFrontend.Cookies();

if (cookies.isPolicyAccepted("usage")) {
  // Add tracking code
}
```

#### Use cookie events

```js
const cookies = new TNAFrontend.Cookies();

cookies.on("acceptPolicy", function(policy) {
  if (policy === "usage") {
    console.log("Usage cookies are permitted");
    // Add tracking code
  }
});

cookies.on("rejectPolicy", function(policy) {
  if (policy === "usage") {
    console.log("Usage cookies have been rejected");
    // Remove tracking code
  }
});
```

| Event               | Trigger                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `setCookie`         | Any time a cookie is changed in the browser using the `Cookie` class                        |
| `deleteCookie`      | When any cookie is deleted using `delete()`                                                 |
| `deleteAllCookies`  | When all cookies are deleted using `deleteAll()`                                            |
| `acceptPolicy`      | When any policy is accepted using `acceptPolicy()`                                          |
| `acceptAllPolicies` | When all policies are accepted using `acceptAllPolicies()`                                  |
| `rejectPolicy`      | When any policy is rejected using `rejectPolicy()`                                          |
| `rejectAllPolicies` | When all policies are rejected using `rejectAllPolicies()`                                  |
| `changePolicy`      | When any policy is changed using either `acceptPolicy()`, `rejectPolicy()` or `setPolicy()` |
