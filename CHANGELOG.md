# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/nationalarchives/tna-frontend/compare/v0.1.37...HEAD)

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [0.1.37](https://github.com/nationalarchives/tna-frontend/compare/v0.1.36...v0.1.37) - 2024-02-13

### Added

- New global header component

### Changed

- Changed the aspect ratio of the hero image to be 5:2
- Selected state of header component changed
- Phase banner font size reduced
- Header component spacing and sizing tweaked to more closely align to the global header
- Header and footer SVG logos changed to use `currentColor` as the foreground colour with a transparent background
- Removed "link" icons from external links in the footer

### Fixed

- Allowed taller images in picture elements on tiny devices
- Fixed focus styles for always-light components (e.g. text inputs) on high contrast themes
- Added link to the National Archives mailing list in footer
- Added `<title>` to inline SVGs in header and footers
- Added `aria-hidden="true"` to all Font Awesome icons

## [0.1.36](https://github.com/nationalarchives/tna-frontend/compare/v0.1.35...v0.1.36) - 2024-02-06

### Changed

- Tab elements in high contrast mode have an extra keyline to help with visibility
- The header element no longer uses background tint in high contrast mode
- The default cookie banner colour is dark on light but can be changed with a `style` attribute or classes such as `tna-cookie-banner--contrast`
- The card style of `boxed` has been changed to `contrast` in line with other components
- The background tint colour on the light theme is slightly darker for better contrast with the page background
- Set smaller minimum width for search field inputs
- Added more space between the text and chevron in a heading link
- Split out Font Awesome into a separate CSS file
- Change the default `htmlLang` from `en-GB` to `en`
- Changed the aspect ratio of the hero image to be closer to a 3:1
- Update large heading size to not be smaller than medium headings on medium devices
- Remove italicised text from picture element captions and blockquotes, update font sizes
- Reduce padding between checkboxes, radios and their labels when small
- Reduce padding on blockquotes on mobile

### Removed

- Removed option for `tna-search-field--no-border` - borders are dictated by the background colours and page theme

### Fixed

- Picture elements in high contrast mode have improved borders with no gaps

## [0.1.35](https://github.com/nationalarchives/tna-frontend/compare/v0.1.34...v0.1.35) - 2024-01-16

### Added

- More icon sizes added

### Changed

- Images on horizontal cards are now at least a 3:2 aspect ratio
- Icon assets have been renamed from `apple-touch-icon-xxx.png` to `icon-xxx.png`

## [0.1.34](https://github.com/nationalarchives/tna-frontend/compare/v0.1.33...v0.1.34) - 2024-01-10

### Added

- Base template can now accept `htmlAttributes`
- Compound filters can be used to show currently selected search filters

### Changed

- Changed `attributes` to `formGroupAttributes` and `classes` to `formClasses` on checkboxes and radios - `attributes` and `classes` now get applied to each checkbox and radio element

### Fixed

- Fixed `href` property of pagination `previous` and `next` links

## [0.1.33](https://github.com/nationalarchives/tna-frontend/compare/v0.1.32...v0.1.33) - 2023-12-29

### Added

- Added italic version of Open Sans

### Changed

- The default cookie banner colour is dark on light but can be changed with a `style` attribute or classes such as `tna-cookie-banner--contrast`
- The card style of `boxed` has been changed to `contrast` in line with other components
- Changed `tna-select--plain` to `tna-select--styled`
- Updated button styles - icon sizes, padding and gaps on small and icon-only buttons
- Removed slash on void elements (updating `<hr />` to `<hr>`)
- Italicise picture element captions to distinguish from regular text
- Use `text-wrap: pretty;` for headings

## [0.1.32](https://github.com/nationalarchives/tna-frontend/compare/v0.1.31...v0.1.32) - 2023-12-18

### Added

- Mixins for "always light" and "always dark"

### Changed

- Text-based form inputs (text input, search field, select, date search, date input and textarea) are always "light" themed with dark text on a light background

## [0.1.31](https://github.com/nationalarchives/tna-frontend/compare/v0.1.30...v0.1.31) - 2023-12-14

### Added

- Picture elements can have multiple tabs and customisable open/close button text
- A separate `@nationalarchives/frontend-cookie-banner` package is published for services just wanting to use the new TNA Cookie Banner

### Changed

- Added XML and DOCTYPE to `src/nationalarchives/assets/images/tna-square-logo.svg`
- Removed `fa-fw` from some icons
- Message component has a `<div>` rather than a `<p>` for the message which allows HTML as content
- Hero component caption allows HTML rather than assuming text
- Picture elements have a tinted background, a maximum height for images and break out of the grid on tiny devices
- Changed hero caption icon text from "Image caption" to "About this image"
- Updated the cookie banner attribute `data-policies-key` to `data-policieskey`

### Removed

- Picture elements no longer have `translation` and `transcript` options (see "Added" above for alternative)

## [0.1.30](https://github.com/nationalarchives/tna-frontend/compare/v0.1.29-prerelease...v0.1.30) - 2023-12-07

### Added

- `<dl>` elements can now be stacked with `<dl class="tna-dl tna-dl--stacked">`

### Changed

- Cookies class parameter `extraPolicies` moved to key inside the options object parameter

### Fixed

- Chip colours and icons in chip lists fixed
- Better support for `<dl class="tna-dl">` elements
- Removed some `:has` CSS selectors for better support with Firefox

## [0.1.29-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.28-prerelease...v0.1.29-prerelease) - 2023-12-01

### Changed

- Light font colour changed for better colour contrast on light accented backgrounds

### Removed

- High contrast themes don't have outlines when hovering over links

### Fixed

- Date search predefined value fixture amended
- Light icons can be used on light accented backgrounds

## [0.1.28-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.27-prerelease...v0.1.28-prerelease) - 2023-11-30

### Added

- Buttons can now have `buttonType` which sets the `type` attribute for `<button>` elements

### Changed

- Changed style of filters element to match with accent colour

### Removed

- Removed `title` attribute from tabs and `aria-label` from HTML

### Fixed

- Fixed HTML validation errors

## [0.1.27-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.26-prerelease...v0.1.27-prerelease) - 2023-11-29

### Fixed

- Added the correct `aria-label` in index grid components

## [0.1.26-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.25-prerelease...v0.1.26-prerelease) - 2023-11-29

### Added

- Form element components have been added: checkboxes, date input, date search, radios, search field, select, text input and textarea
- High contrast support for chip lists with icons
- Allow custom cookie path to be passed to cookie banner
- Index grids can have text/body as well as a title

### Changed

- Card meta information changed to chip list
- Improvements to high contrast modes
- Link colours changed for better contrast
- Index grid heading options have been flattened to match other components
- Pagination arrows switched from SVGs to Font Awesome icons

### Deprecated

- Removed generic `accent` CSS variable
- The black theme accent has been removed

### Fixed

- Multiple line spacing for chip lists fixed
- Accented chips can now be used on accented backgrounds
- Index grid can now be used on a contrast background

## [0.1.25-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.24-prerelease...v0.1.25-prerelease) - 2023-11-16

### Added

- Grid columns can be aligned along the cross axis with classes `tna-column--align-top`, `tna-column--align-bottom` and `tna-column--align-centre`
- Actions and items using the `href` attribute on cards can now have custom classes and attributes
- Events can now be added when cookie preferences change
- Table styles added
- Pagination component has the option to have no numbers
- Table wrapper for tables wider than the current viewport

### Changed

- Change many instances of Font Awesome icons to a fixed width
- Adjusted the width of the hero caption
- Removed margin and padding from all elements by default
- The standard cookie policies are always `essential`, `usage` and `settings` - other custom policies can be added
- Focus outline on dark themes has changed from blue to orange to avoid colour conflict with links

### Removed

- Removed CSS to counter conflicting GOV.UK paragraph styling
- Transitions removed from most elements
- `loadScriptsOnAccept` option for cookie banner removed in favour of callback events
- Removed the `accent-color` property for form elements

### Fixed

- Assets path fixed for GOV.UK prototype kit
- Colour fixed for plain card supertitles in accented style
- Header navigation uses flexbox for layout of tabs and top navigation stacks on mobile
- Explicitly declare font colour for tinted and light accent backgrounds
- Accepting or declining individual cookie policies now works
- Removed extra space from nested links

## [0.1.24-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.23-prerelease...v0.1.24-prerelease) - 2023-11-06

### Added

- Elements can be hidden on certain devices with `tna-!--hide-on-[large|medium|small|tiny]`
- Allow links to have no visited state with `tna-link--no-visited-state`
- Card supertitles can be made "plain" with no contrasting colour
- Roboto Mono Bold added
- Ability to either use bundled fonts or fonts hosted by Google (default is Google fonts)
- Featured records component

### Changed

- Tweaked dark theme colours
- `tna-visually-hidden` could instead use the class `tna-!--visually-hidden` (will deprecate one of these in the future)
- Changed Node version from `lts/hydrogen` to `lts/iron`
- Update the `spacing` and `spacing-mobile` functions in `spacing` to `space` and `space-mobile`
- Mixin `colour.invert` changed to `colour.contrast`
- Background colour classes changed to BEM (`tna-background--accent` -> `tna-background-accent`)
- Open Sans body weight changed from `500` to `400`
- Text balance on headings removed but left on headings with links
- `background-tint` colour changed for better accessibility/contrast
- Change pagination `aria-label` in line with GOV.UK Frontend `5.0.0`

### Removed

- The `@import` for Supria Sans Condensed (`supria-sans-condensed`) from TypeKit has been removed - each service needs to import their own copy of the fonts

### Fixed

- Cookie banner URL is now correctly used
- Spacing above picture elements fixed
- Image widths fixed (not stretched)

## [0.1.23-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.22-prerelease...v0.1.23-prerelease) - 2023-10-25

### Fixed

- Header allows accent colour to be used with `tna-header--accent`
- More consistent spacing between elements

## [0.1.22-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.21-prerelease...v0.1.22-prerelease) - 2023-10-24

### Added

- `tna-aside` now has a `--tight` modifier with less padding
- Chips can be made plain with `tna-chip--plain`
- Visual regression tests can now be run in the Storybook UI
- Allow right/left margins to be added to columns
- Hero components can have different image sources with `<source>` elements

### Changed

- Breadcrumbs are no longer contained within a container/column layout
- Header styles have been simplified
- External link icons changed from CSS to icon font in header and footer
- External links in footer have titles suffixed with "opens in new tab"
- Links in footer and text in buttons have balanced wrapping applied
- Header and header group class modifiers have been moved to separate blocks (`tna-heading tna-heading--xl` -> `tna-heading-xl`)
- `space-below` has been replaced with `space-above` and all paddings in between page elements reassessed
- Tweak spacing on hero component and `<hr>` elements
- Added `tna-button-group` around newsletter subscription button in the footer
- Updated Storybook to `7.5.1`

### Removed

- The black accent is no longer applied by default
- Removed margin and padding overrides for device-specific sizes (e.g. `tna-!--margin-top-xl-small`)

### Fixed

- Font paths fixed for prototype kit, stylesheets and JavaScript loading
- Better alignment of site name next to logo in header
- Fixed right/left padding of logo and hamburger on small devices
- Change Supria Sans weight from `400` to `500` (medium, as provided by TypeKit)
- Card image type is now variable when using sources

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
- In coloured blocks, the custom CSS property `--background` now gets explicitly replaced with `--accent-background`, `--contrast-background` or `--accent-background-light`
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
