<img src="./src/nationalarchives/assets/images/tna-square-logo.svg" alt="The National Archives logo" title="The National Archives" width="100" />

# TNA Frontend

[![Main build status](https://img.shields.io/github/actions/workflow/status/nationalarchives/tna-frontend/tests.yml?style=flat-square&event=push&branch=main)](https://github.com/nationalarchives/tna-frontend/actions/workflows/tests.yml?query=branch%3Amain)
[![Latest release](https://img.shields.io/github/v/release/nationalarchives/tna-frontend?style=flat-square&logo=github&logoColor=white&sort=semver)](https://github.com/nationalarchives/tna-frontend/releases)
[![NPM version](https://img.shields.io/npm/v/@nationalarchives/frontend?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@nationalarchives/frontend)
[![Licence](https://img.shields.io/github/license/nationalarchives/tna-frontend?style=flat-square)](https://github.com/nationalarchives/tna-frontend/blob/main/LICENCE)

TNA Frontend contains the code you need to start building a user interface for National Archives platforms and services.

## Quickstart

```sh
# Node version
nvm use

# Install dependencies
npm install

# Start Storybook
npm start
```

## Useful links

- [TNA Frontend Storybook](https://nationalarchives.github.io/tna-frontend/)
- [TNA Frontend docs](https://nationalarchives.github.io/tna-frontend-docs/)
- [National Archives Design System](https://nationalarchives.github.io/design-system/)

## Accessibility

The National Archives Digital Services team works hard to ensure that TNA Frontend is accessible.

Using Frontend will help your service meet [level AA of WCAG 2.2](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag). But you must still [check that your service meets accessibility requirements](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction), especially if you extend or modify components.

You should also use:

- [the JavaScript from TNA Frontend](https://nationalarchives.github.io/tna-frontend-docs/get-started/setup/#javascript)

You can also read the [accessibility statement for the National Archives Design System](https://nationalarchives.github.io/design-system/accessibility/).

### Accessibility warnings

If you get a warning from a linter or accessibility checker, check our list of [issues you should not need to fix](https://nationalarchives.github.io/tna-frontend-docs/contributing/accessibility/#accessibility-issues-you-should-not-need-to-fix).
