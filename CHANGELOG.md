# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/nationalarchives/tna-frontend/compare/v0.1.21-prerelease...HEAD)

### Added

- `tna-aside` now has a `--tight` modifier with less padding
- Chips can be made plain with `tna-chip--plain`
- Visual regression tests can now be run in the Storyobok UI
- Allow right/left margins to be added to columns

### Changed

- Breadcrumbs are no longer contained within a container/column layout
- Header styles have been simplified
- External link icons changed from CSS to icon font in header and footer
- External links in footer have titles suffixed with "opens in new tab"
- Links in footer and text in buttons have balanced wrapping applied
- Header and header group class modifiers have been moved to separate blocks (`tna-heading tna-heading--xl` -> `tna-heading-xl`)
- `space-below` has been replaced with `space-above` and all paddings in between page elements reassessed
- Tweak spacing on hero component and `<hr>` elements
- Added `tna-button-group` around newletter subscription button in the footer
- Updated Storybook to `7.5.1`

### Deprecated
### Removed

- The black accent is no longer applied by default

### Fixed

- Font paths fixed for prototype kit, stylesheets and JavaScript loading
- Better alignment of site name next to logo in header
- Fixed right/left padding of logo and hamburger on small devices
- Change Supria Sans weight from `400` to `500` (medium, as provided by TypeKit)

### Security

## [0.1.21-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.20-prerelease...v0.1.21-prerelease) - 2023-10-12

### Added

- Cards can now have meta text/icons under the title
- `<dl>` elements are now styled using a `tna-dl` class
- Allow use of custom variables when loading SCSS as described in `src/nationalarchives/stories/development/using.mdx`
- Basic pagination element added
- `<small>` elements are now styled
- Some basic print styles added for tabs, breadcrumbs and cookie banners
- Grids can be centre aligned with `tna-container--centred`
- Skip links will focus on the targeted element with JavaScript once the skip link is clicked

### Changed

- Focus on the confirmation message of the cookie banner once accepted or rejected
- `hideCookieBannerKey` property on cookie banner changed to `cookiesPreferencesSetKey`
- When using the prototype kit, `<p>` tags have some alterations that remove the default GOV.UK styling
- When using the system theme, JavaScript is no longer required to write specific theme classes to the `<html>` element - all of this is done in CSS
- Standalone CSS such as `components/button.css` no longer includes Font Awesome
- `<nav>` elements in the footer now have a `role="navigation"` attribute
- The default cookie policies are now `essential`, `usage` and `settings`
- The SCSS mixin `colour-outline` now accepts optional width and style properties
- In coloured blocks, the custom CSS property `--background` now gets explictly replaced with `--accent-background`, `--contrast-background` or `--accent-background-light`
- `typography.$base-font-size-px` is now `typography.$relative-1rem-px`
- `xl` and `l` headings are Supria Sans and `m` and `s` are Open Sans
- Card heading size defaults to `s`
- Markup and styles altered for hero component
- Updated app icons and favicon
- Changed gutters on small devices to the same as medium and large, reduced tiny device gutters to `1rem`
- Body text is reduced from 18px to 17px on mobile devices
- Reduced the bottom margin on paragraphs from `1.5rem` to `1rem`

### Removed

- Explicit overflow properties applied to `.tna-template` and `.tna-template__body` have been removed

### Fixed

- Updated the prototype kit templates
- Tabs will not try to show a specific one on startup unless the target matches the ID of one of the tabs
- Closing `</nav>` tag added on to `index-grid`
- `/nationalarchives/_prototype-kit.scss` is now the entrypoint for the GOV.UK prototype kit SASS which fixes the asset location
- The cookie banner confirmation message is no longer outlined when highlighted
- The import routes of the layouts for use in the prototype kit now work
- Cookie banner header classes added
- Visited links within the dark theme are purple again

## [0.1.20-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.19-prerelease...v0.1.20-prerelease) - 2023-09-14

### Fixed

- Updated card fixtures in line with changes from `0.1.19-prerelease`

## [0.1.19-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.18-prerelease...v0.1.19-prerelease) - 2023-09-14

### Added

- Envelope icon added to newsletter subscription
- Card actions can have icons or brand icons
- Gallery component
- Button elements can be `<a>` or `<button>` with `buttonElement: true`
- Small button option
- Tabs also respond to the up/down keys on keyboard navigation as well as left/right
- Allow other image sources in a card image using a `<picture>` element
- Cookie banner and cookie handling
- Individual JavaScript and CSS files are exported for each component

### Changed

- Updated social icons in footer to use Font Awesome icons
- Consolidated markup for "opens in new tab" in external footer links#
- Columns have margin removed by default
- Flatten the template parameters for cards (e.g. `image.src` -> `imageSrc`)
- Open Sans and Roboto Mono are included in the package
- Gutters on mobile devices have changed from `1rem` to `1.5rem`

### Removed

- Deleted social SVG icons from assets

### Fixed

- `href` on cards is now optional
- Styling for focus outlines of links within headers
- Remove double underline from tab item hover
- Fix colour of visited tabs when JavaScript is not available
- Size of `<button class="tna-button">` now matches `<a class="tna-button">`
- Button colours for inverted and accented backgrounds

## [0.1.18-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.17-prerelease...v0.1.18-prerelease) - 2023-09-04

### Fixed

- Generic template import fixed

## [0.1.17-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.16-prerelease...v0.1.17-prerelease) - 2023-09-04

### Added

- Accent colour can be added to the `tna-template` element (e.g. `tna-template--yellow-accent`)
- Accent buttons `tna-button--accent`
- Button groups - a wrapper for multiple buttons (`tna-button-group`)
- Horizontal, contrasting and accent cards (`tna-card--horizontal`, `tna-card--contrast`, `tna-card--accent`)
- Index grid items can now have tags
- `tna-section` and `tna-aside` classes added for areas of content
- `tna-tag` added as supertitles in `<hgroup>` and tags in cards
- `tna-scene-setter` class added for welcome content
- Buttons can have icons or brand icons
- Override classes for specific devices available e.g. `tna-!--no-margin-bottom-small` and `tna-!--padding-top-s-tiny`

### Changed

- New footer component implimented
- `@include colour.invert;` will also set the colour to `font-base`
- Removed explicit margin from hero component
- Index grid images are displayed in their original aspect ratio
- `tna-hgroup` titles should now be wrapped in an element with a `tna-hgroup__title` class
- Colours tweaked, such as page backgrounds
- Fallback font for `supria-sans-condensed` is `Arial Narrow`
- Update dependencies including Storybook to `7.4`
- Override classes changed format from `tna-!__padding-top--s` to `tna-!--padding-top-s`
- `tna-tag` changed to `tna-chip`
- Altered line heights of headings for better readability
- Utilised `gap` property for `tna-button-group` and `tna-filters` (thanks [@JohnHeeryTNA](https://github.com/JohnHeeryTNA))
- Updated dependencies

### Removed

- Secondary buttons `tna-button--secondary`
- Featured cards `tna-card--featured`
- Pattern example

### Fixed

- Message icon no longer collapses on smaller screens
- Filters visited state colour
- Index grid heading was not being output correctly

## [0.1.16-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.15-prerelease...v0.1.16-prerelease) - 2023-08-29

### Added

- New skip link component
- Breadcrumbs have non-collapsable option
- `colour.colour-border()` has support for extra optional parameters - `$width`, `$style` and `$direction`
- Brand colours can be retrieved with the helper `colour.brand-colour()`

### Changed

- Restructured brand colour variables
- `package-lock.json` and `LICENCE` added to the npm package
- Additional `<div>` added to breadcrumbs for layout purposes

### Removed

- Removed extra gutter on mobile grid
- Card heading sizes can no longer be changed

## [0.1.15-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.14-prerelease...v0.1.15-prerelease) - 2023-08-18

### Added

- Override classes available e.g. `tna-!--no-margin-bottom` and `tna-!__padding-top--s`
- Accent colour can be changed with `:root { --accent: #bada55; }`

### Changed

- Improvements to high contrast themes
- Full-height layouts need a `#main-content[role="main"]` rather than just a `#main[role="main"]`
- Added `role="button"` to all TNA buttons
- Allow collapsed breadcrumbs to be expanded on mobile devices
- Body font (Open Sans) weight changed from `400` to `500`
- Index grid changed to `<ul>`
- Index grid header requires an object of `title`, `level` and optionally, `size` (default "l")
- Card images are now wrapped in `<a>` elements
- Images in normal card and mobile feature cards are fixed to a 3:2 ratio

### Fixed

- Featured cards fixed for mobile layouts

## [0.1.14-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.13-prerelease...v0.1.14-prerelease) - 2023-08-11

### Changed

- Simplified SCSS for inverted colours and introduced contrasting option

### Fixed

- Default colour scheme works without having to define a theme class on `tna-template`
- Fixed top navigation layout in header when on mobile with no JavaScript enabled

## [0.1.13-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.12-prerelease...v0.1.13-prerelease) - 2023-08-11

### Added

- Automated accessibility testing for all stories
- Support for colour schemes
- Initial release of index-grid and message components
- Footer link to GOV.UK added (https://www.gov.uk/)
- Full-height layouts for pages with a `.tna-header`, `.tna-footer` and `#main[role="main"]`

### Changed

- Breadcrumbs collapse to first and last item on mobile (as per GOV.UK breadcrumbs)
- Increased padding on top and bottom of footer
- Exit link and top navigation font-size decreased to 16px
- Better outline on hover of TNA logo in the header
- Phase banner title is first-letter Capitalised rather than all CAPITALISED
- Altered weight of Roboto Mono (500 -> 400)
- Altered weight of Supria sans condensed (600 -> 400)
- Reduced bottom margin of all `.tna-heading` elements
- Increased contrast between "normal" and "light" fonts
- Updates to `_generic` layout template

### Removed

- Removed `package:test` npm script

### Fixed

- Breadcrumb visited link colour
- Header logo text visited link colour
- `aria-label` added to breadcrumb nav for accessibility compliance

## [0.1.12-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.11-prerelease...v0.1.12-prerelease) - 2023-08-08

### Changed

- Updated dependencies

### Fixed

- Basic accent colour fixed

## [0.1.11-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.10-prerelease...v0.1.11-prerelease) - 2023-08-08

### Added

- Footer component moved out of work in progress ready to test in beta
- Hero component has a small amount of support for users who prefer more contrast

### Changed

- Removed vendor-specific CSS values for IE10 from grid classes (`display: -ms-flexbox;`)
- Hero component background images now require a width and height
### Fixed

- The fallback font family for `supria-sans-condensed` was changed to `sans-serif` rather than `monospace`

## [0.1.10-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.9-prerelease...v0.1.10-prerelease) - 2023-07-14

### Added

- JavaScript adds helper classes to the document

## [0.1.9-prerelease](https://github.com/nationalarchives/tna-frontend/releases/tag/v0.1.9-prerelease) - 2023-07-12

### Fixed

- Hero component styling inline with ETNA
