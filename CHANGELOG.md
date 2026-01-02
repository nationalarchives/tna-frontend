# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/nationalarchives/tna-frontend/compare/v0.30.0...HEAD)

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [0.30.0](https://github.com/nationalarchives/tna-frontend/compare/v0.29.1...v0.30.0) - 2026-01-02

### Changed

- Updated the default `title` and `aria-label` of the global header logo link from "The National Archives" to "The National Archives home page"
- Improved design of horizontal scrollable tables
- Hero content will not use contrast background on smaller devices
- Add a `title` attribute to icon-only button components

### Removed

- `leftBorder` option removed from hero components

### Fixed

- Set height of icon in search field and add `aria-hidden="true" focusable="false"` for improved accessibility
- Add JS Firefox polyfill for scrollable tables (no support for [`scroll-timeline`](https://caniuse.com/?search=css-scroll-timeline))

## [0.29.1](https://github.com/nationalarchives/tna-frontend/compare/v0.29.0...v0.29.1) - 2025-11-27

### Fixed

- Fixed a spelling mistake in `parmas` to `params` on back link component

## [0.29.0](https://github.com/nationalarchives/tna-frontend/compare/v0.28.1...v0.29.0) - 2025-11-27

### Added

- Hero components can now have an `accent-light` style
- New back link component
- Checkbox, date input and radio components now have `fieldsetClasses` and `fieldsetAttributes` options

### Changed

- Changed icon on search field to magnifying glass
- Simplify form input element styles with `colour.colour-input()` mixin
- Set a default heading level and title for the error summary component
- Remove the option for a plain supertitle from the index grid component
- In higher contrast mode, the base font weight is increased

### Fixed

- Removed pointer events from images in index grid components to avoid dragging an image that overlaps the chip
- Add `aria-current="page"` attribute to the current page on the pagination component
- Fixed small border radius discrepancy on card images

## [0.28.1](https://github.com/nationalarchives/tna-frontend/compare/v0.28.0...v0.28.1) - 2025-10-28

### Fixed

- Fixed active item `z-index` issue

## [0.28.0](https://github.com/nationalarchives/tna-frontend/compare/v0.27.6...v0.28.0) - 2025-10-28

### Added

- Added `faux-full-outline` mixin for full-click cards and other elements that need a larger, pseudo-clickable area

### Changed

- Added back in the right border to search input textboxes and text input password components and spacing between text input and button
- Set header background to black in high contrast mode
- Simplify focus styles and remove some unrequired code

### Fixed

- Fixed focusable items `z-index` issue
- Removed focus style on droppable file input component button to match other button focus/hover styles

## [0.27.6](https://github.com/nationalarchives/tna-frontend/compare/v0.27.5...v0.27.6) - 2025-10-23

### Fixed

- Fixed focus styles after skip link is clicked

## [0.27.5](https://github.com/nationalarchives/tna-frontend/compare/v0.27.4...v0.27.5) - 2025-10-23

### Changed

- Improved focus indicator for cards
- Added small transition to focus indicators

## [0.27.4](https://github.com/nationalarchives/tna-frontend/compare/v0.27.3...v0.27.4) - 2025-10-23

### Fixed

- Fixed colour of active focus borders

## [0.27.3](https://github.com/nationalarchives/tna-frontend/compare/v0.27.2...v0.27.3) - 2025-10-23

### Fixed

- Improved skip link design in forced color mode

## [0.27.2](https://github.com/nationalarchives/tna-frontend/compare/v0.27.1...v0.27.2) - 2025-10-23

### Changed

- Improved colour of skip links
- Improved colour of focus indicator

### Removed

- Removed a11y variables `$focus-outline-width` and `$focus-outline-offset` in favour of `$focus-outline-inner-width` and `$focus-outline-outer-width`

## [0.27.1](https://github.com/nationalarchives/tna-frontend/compare/v0.27.0...v0.27.1) - 2025-10-22

### Changed

- Full-height cards remain the same height in high contrast mode

### Fixed

- Fix icon position for plain description lists in high contrast mode

## [0.27.0](https://github.com/nationalarchives/tna-frontend/compare/v0.26.2...v0.27.0) - 2025-10-22

### Changed

- Focus indicator refactored to be more visible and guarantee contrast with surrounding elements
- The label/heading for single checkboxes is now optional
- Improved styling of higher contrast cards
- Changed the colour of list item markers from light text to normal
- Increased indent of ordered and unordered lists

### Removed

- Full screen and index view options in gallery components have been removed

### Fixed

- Fixed vertical alignment of multiline buttons with icons on small devices

## [0.26.2](https://github.com/nationalarchives/tna-frontend/compare/v0.26.1...v0.26.2) - 2025-10-07

### Fixed

- Fixed issue with scrollable table captions in columns appearing wider than required

## [0.26.1](https://github.com/nationalarchives/tna-frontend/compare/v0.26.0...v0.26.1) - 2025-10-07

### Fixed

- Overwriting default global header and footer content with null values is more robust

## [0.26.0](https://github.com/nationalarchives/tna-frontend/compare/v0.25.1...v0.26.0) - 2025-10-07

### Added

- Table wrappers now have faded sides when scrolling is active

### Changed

- Reduced default border radius from `4px` to `2px`
- Table captions on scrollable tables now stay within the viewport so are always visible
- Allow `defaultContent` in global headers and footers to be overwritten
- Replaced deprecated `clip` properties with `clip-path` and `word-wrap` with `overflow-wrap`

### Fixed

- Remove unused element IDs from `aria-controls` attribute of hamburger menu in global header

## [0.25.1](https://github.com/nationalarchives/tna-frontend/compare/v0.25.0...v0.25.1) - 2025-09-16

### Fixed

- Removed relative paths for Font Awesome imports (`../../node_modules/`)

## [0.25.0](https://github.com/nationalarchives/tna-frontend/compare/v0.24.0...v0.25.0) - 2025-09-15

### Added

- Fieldsets now have a `smallerHint` option to match other form field components
- Global header and footer components now have `defaultContent` and `defaultContentBaseURL` options to allow more consistent global content to be used
- Accordions can have an optional open/close all button with `toggleAllButton`
- Checkboxes with a single item aren't rendered in a `<fieldset>`

### Changed

- Updated `data-module` on progressive date inputs from `date-input-progressive` to `tna-date-input-progressive`
- Moved `classes` on date input components to the inputs rather than the wrapper
- Reduced gap between fieldset items
- Allow HTML in hint text for fieldsets and form field components
- Used tilde concatination `~` in templates rather than plus `+`
- Change arrow icon in search field to SVG
- Update all embedded Font Awesome SVG icons

### Removed

- Removed `maxLength` property on text input and search field components (if required, use `attributes` property)

### Fixed

- Removed inline fixtures and macro options from date input and text input components

## [0.24.0](https://github.com/nationalarchives/tna-frontend/compare/v0.23.1...v0.24.0) - 2025-08-28

### Added

- Footer social links now show the `title` attribute or the new `shortTitle` attribute if it is set
- New panel component added for notification of successful transactions
- New fieldset component added to group form components

### Changed

- Updated the position of the newsletter block in the footer component on medium devices to ensure better accessibility with regards to tab order
- Fixed the padding between headers and scene setters
- Fixed text alignment in plain chip list
- Markup for all form components updated to align with fieldset styling
- `headingLevel` is no longer a required field for form components
- Attributes `formGroupAttributes` and `formGroupClasses` changed to `formItemAttributes` and `formItemClasses`

### Deprecated

- Inline option removed for date search, select, text input and textarea form components

## [0.23.1](https://github.com/nationalarchives/tna-frontend/compare/v0.23.0...v0.23.1) - 2025-07-31

### Fixed

- Fixed caption button colour in accented hero components

## [0.23.0](https://github.com/nationalarchives/tna-frontend/compare/v0.22.0...v0.23.0) - 2025-07-30

### Added

- Shadows tool added (`src/nationalarchives/tools/_shadows.scss`) with mixin of `drop-shadow`
- `itemHeadingSize` added for accordions to set heading size when JavaScript is not available
- Added full-height option for card components to allow consistent vertical alignment across a row of cards
- Analytics helper `getClosestElement` added to allow DOM traversal to find a matching element

### Changed

- Updated to [Font Awesome 7.0.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/7.0.0)
- Changed cookies property from `Cookies.completePoliciesOnInit` to `Cookies.policiesCorrectOnInit`
- Changed the default behaviour of an accordion to allow multiple open items, removing `openMultipleItems` as an option and replacing it with `singleOpenItem` which defaults to `false`
- Improved spacing of field labels in date input component
- Update the image caption button in hero components to be more accessible
- The analytics helper `getClosestHeading` searches for all headings but ignores non-heading elements with `tna-heading-x` classes
- Allowed `rootEventName` to be added to each analytics event config as well as the area
- Fullscreen galleries now always have dark backgrounds

### Fixed

- Removed left align of icons in a description list which created misalignment for fixed width icons
- Updated the `addressCountry` microdata in the address in the footer component from `UK` to `GB` (ISO 3166-1)
- If no domain is specified for the cookies, `window.location.hostname` will be used as the default

## [0.22.0](https://github.com/nationalarchives/tna-frontend/compare/v0.21.0...v0.22.0) - 2025-07-15

### Added

- New file input component added

### Changed

- Allow items in an error summary to not have an `href` property
- Galleries with fewer than two items don't use the JavaScript module

### Fixed

- Unindented width of secondary navigation component on tiny devices fixed to avoid overflow
- Fixed z-index issue with plain cards on coloured backgrounds

## [0.21.0](https://github.com/nationalarchives/tna-frontend/compare/v0.20.1...v0.21.0) - 2025-06-30

### Changed

- Updated month validation in progressive date input components to accept string representations of months (Jan-Dec and January-December)
- `DateInput` JavaScript function changed to `DateInputProgressive`

### Fixed

- Fixed issue with progressive date input components that used set fields

## [0.20.1](https://github.com/nationalarchives/tna-frontend/compare/v0.20.0...v0.20.1) - 2025-06-13

### Fixed

- Fixed text input and textarea fixtures for `spellcheck`, `autocapitalize` and `autocorrect`
- Clicking on an item in an error summary scrolls down to the top of the form field rather than the input

## [0.20.0](https://github.com/nationalarchives/tna-frontend/compare/v0.19.0...v0.20.0) - 2025-06-13

### Added

- Specific text input types can be set with `type`
- Added `autocapitalize` and `autocorrect` options to text inputs and textareas
- Added `autofillDateOfBirth` as an option to date input components to autocomplete date of birth

### Changed

- Changed `fields` option in text inputs from `day`, `month` and `year` options to `d`, `m` and `y`
- Added some instances of `translate="no"` to elements in the footer component

### Removed

- Removed `removeFieldNameSuffixes` option from text input components
- Removed `ticktok` as an option for the social media icons in footer components

### Fixed

- `autofill` properties on text inputs have been changed to `autocomplete`
- Removed the unnecessary error state from search field components

## [0.19.0](https://github.com/nationalarchives/tna-frontend/compare/v0.18.0...v0.19.0) - 2025-06-09

### Added

- Date input components now have a `progressive` option which enables a year field followed by an optional month and year depending on which fields are filled out
- Date inputs can optionally show only some fields (e.g. month/year, day/month or just year)

### Changed

- Remove markers from ordered list containers (`ol.tna-container`)
- Updated links in footer examples

## [0.18.0](https://github.com/nationalarchives/tna-frontend/compare/v0.17.1...v0.18.0) - 2025-05-20

### Added

- Chip lists have a stacked option with `tna-dl-chips--stacked`
- Card meta information can be stacked with `metaStacked`

### Changed

- Adjusted heading line heights
- Adjusted spacing between elements in cards
- Changed the font weight of index grid item titles to bold

## [0.17.1](https://github.com/nationalarchives/tna-frontend/compare/v0.17.0...v0.17.1) - 2025-05-06

### Changed

- Adjusted heading sizes

## [0.17.0](https://github.com/nationalarchives/tna-frontend/compare/v0.16.1...v0.17.0) - 2025-04-22

### Added

- Separate base font size added for medium devices
- Microdata added to the footer for TNA organisation
- Added option for a thick border on the left of the hero content box
- Option added for a "very thick" border mixin

### Changed

- Updated the base font size on large devices
- Items in a file list component can now have Font Awesome icons (if the FA stylesheet is available)

### Removed

- `structuredData` option was removed as an option on breadcrumb components - microdata is now added by default

## [0.16.1](https://github.com/nationalarchives/tna-frontend/compare/v0.16.0...v0.16.1) - 2025-04-04

### Fixed

- Fixed double top border issue on plain cards with no images

## [0.16.0](https://github.com/nationalarchives/tna-frontend/compare/v0.15.1...v0.16.0) - 2025-03-24

### Added

- `tna-block-*` classes added as alternatives to `tna-background-*`
- `tna-block-base` and `tna-background-base` classes and a `colour.base` mixin added to revert block colours
- Optional `classes` and `attributes` options added to quick filter `items`

### Changed

- GOV.UK Prototype Kit template extends path changed from relative to absolute
- Tweaks to spacing and style of chip links
- Added more properties to the CSS rule order in the Stylelint config
- Visual changes to quick filters to distinguish them from chips

### Removed

- `fill` option remove from quick filters

### Fixed

- Fixed border-radius on input and button in password style text inputs
- List items (`<li>`, `<dt>` and `<dd>`) are styled only as direct children of their parent lists for easier nesting of different list types
- List template classes fixed for GOV.UK Prototype Kit

## [0.15.1](https://github.com/nationalarchives/tna-frontend/compare/v0.15.0...v0.15.1) - 2025-03-05

### Added

- Static custom HTML error pages generated during a release for use in Cloudfront and nginx

### Fixed

- Fixed collapsing remove link in compound filters and remove rounded style

## [0.15.0](https://github.com/nationalarchives/tna-frontend/compare/v0.14.0...v0.15.0) - 2025-03-04

### Fixed

- Add missing `nofollow` to `rel` of footer links
- Fix form group classes and attributes for all form components and add missing fixtures

## [0.14.0](https://github.com/nationalarchives/tna-frontend/compare/v0.13.2...v0.14.0) - 2025-02-28

### Added

- Added a `<a id="top"></a>` element to the top of the `bodyStart` block to allow for jumping to the top of the page
- Allow the heading of a secondary navigation to be visually hidden with `visuallyHideHeading`
- Added some colours as "base" CSS colours that are always available with the prefix `--base-`
- Footer links can be marked as "external" which adds `rel="noreferrer nofollow noopener"`

### Changed

- Abstracted visually hidden CSS to a11y tools
- Increased contrast of light icons for improved accessibility
- The fullscreen button in gallery components is hidden on smaller devices in an attempt to avoid reflow issues

### Fixed

- Small border radius issues fixed with tabs and picture components
- Improved button aria labels in gallery components
- Added more descriptive `aria-label` text and added `rel="noreferrer nofollow noopener"` to the subscribe button in the footer

## [0.13.2](https://github.com/nationalarchives/tna-frontend/compare/v0.13.1...v0.13.2) - 2025-02-20

### Changed

- Improved card layout, spacing and hover/focus states

## [0.13.1](https://github.com/nationalarchives/tna-frontend/compare/v0.13.0...v0.13.1) - 2025-02-19

### Fixed

- Overflow issue with focused cards not showing an outline

## [0.13.0](https://github.com/nationalarchives/tna-frontend/compare/v0.12.0...v0.13.0) - 2025-02-19

### Added

- Option to set underline offset for links
- Customisable border radius added to many components and utilities
- Plain card option to add border to a card without adding a background colour
- Options for full-width and centred button groups

### Changed

- Updated phase banner markup with extra visually hidden text
- Removed TikTok from default options in the footer
- Standard link underline offset increased slightly to improve readability

### Fixed

- Fixed invalid `max-width` property on `tna-container--no-padding` class

## [0.12.0](https://github.com/nationalarchives/tna-frontend/compare/v0.11.3...v0.12.0) - 2025-02-10

### Added

- Added `labelText` option to breadcrumbs to enable custom `aria-label` attributes
- Phase banners can be added at the top of the header and global header components

### Changed

- Limited the maximum height of the information dropdown in picture components

### Removed

- Remove `accent` option of the phase banner component

### Fixed

- Clicking on a gallery item doesn't break keyboard navigation for the gallery
- Current gallery items are not announced twice for screen readers

## [0.11.3](https://github.com/nationalarchives/tna-frontend/compare/v0.11.2...v0.11.3) - 2025-01-28

### Changed

- When re-displaying the cookie banner, delete the preferences saved cookie rather than setting it to `false` (better compatibility with [ds-cookie-consent](https://github.com/nationalarchives/ds-cookie-consent))

## [0.11.2](https://github.com/nationalarchives/tna-frontend/compare/v0.11.1...v0.11.2) - 2025-01-28

### Changed

- All custom cookie policies (other than `usage`, `settings`, `marketing` and `essential`) are filtered out upon initialisation
- Small font size tweak to the strapline in a header component on tiny devices

## [0.11.1](https://github.com/nationalarchives/tna-frontend/compare/v0.11.0...v0.11.1) - 2025-01-28

### Fixed

- A complete cookie policy on initialisation no longer automatically hides the cookie banner

## [0.11.0](https://github.com/nationalarchives/tna-frontend/compare/v0.10.0...v0.11.0) - 2025-01-28

### Changed

- Cookie library settings can now be set at a document level in the `<html>` element rather than at a cookie banner level - in addition to `data-tna-cookies-domain` and `data-tna-cookies-path` parameters, there is now `tna-cookies-policies-key`, `tna-cookies-default-age` and `tna-cookies-insecure`
- Removed right and left margin from plain picture components

### Removed

- Removed `policies`, `policiesKey`, `cookiesDomain`, `cookiesPath` and `allowInsecure` options from the cookie banner component

## [0.10.0](https://github.com/nationalarchives/tna-frontend/compare/v0.9.0...v0.10.0) - 2025-01-27

### Removed

- The cookie library and the cookie banner component can no longer have custom cookie policies; only the four standard (`usage`, `settings`, `marketing` and `essential`)

### Fixed

- Better support for cookie banners with edge cases when partial or malformed cookie policies already exist
- Changed incorrect `aria-title` attribute on password input fields to `aria-label`

## [0.9.0](https://github.com/nationalarchives/tna-frontend/compare/v0.8.1...v0.9.0) - 2025-01-27

### Added

- Page not found error page template added to prototype kit

### Changed

- Default theme for prototypes changed from "light" to "system"
- Disabled `-apple-system-body` for dynamic type support in non-touch Apple devices due to issues in Mac OS (https://codepen.io/chrislachance/pen/OJpmgrM)

### Fixed

- If cookie policies are invalid or missing when the cookie class is initiated, the cookie banner is shown regardless of the existance of a `cookie_preferences_set` cookie

## [0.8.1](https://github.com/nationalarchives/tna-frontend/compare/v0.8.0...v0.8.1) - 2025-01-21

### Fixed

- Added missing `type` attribute on accordion buttons
- Fixed issue with invalid HTML in accordion JavaScript - headings are not permitted inside `<button>` elements

## [0.8.0](https://github.com/nationalarchives/tna-frontend/compare/v0.7.2...v0.8.0) - 2025-01-15

### Added

- Secondary navigation component

### Fixed

- Fixed the alignment of icons in description lists when in high contrast mode
- Fixed `hidden` attributes with value of `true` (`hidden="true"`) to a blank value (`hidden=""`)

## [0.7.2](https://github.com/nationalarchives/tna-frontend/compare/v0.7.1...v0.7.2) - 2025-01-15

### Changed

- Markers for ordered and unordered lists have changed from the accent colour to the light font colour
- `tna.pref.prefers-contrast` reports `normal` rather than a blank string in the analytics library when the user has no specific contrast preference
- Improvements to high contrast support for hero components, cards components and lists

### Removed

- Changed all experimental `hidden="until-found"` attributes to `hidden`

### Fixed

- Add missing `type` attribute to the expand button in the breadcrumbs component

## [0.7.1](https://github.com/nationalarchives/tna-frontend/compare/v0.7.0...v0.7.1) - 2025-01-14

### Fixed

- Fixed small size difference between show/hide password button width in text input
- Added missing `aria-controls` to password show/hide button in text input
- Captured missing page meta tags in analytics

## [0.7.0](https://github.com/nationalarchives/tna-frontend/compare/v0.6.0...v0.7.0) - 2025-01-13

### Added

- Capture user preferences (such as dark mode, reduced motion etc.) in GA4
- Text inputs can be turned into password inputs with `password: true`
- Conditional tracking of events with `onCondition`

### Changed

- Ensure accordion `aria-label` attributes are trimmed

### Deprecated

- Deprecated the `@nationalarchives/frontend-cookie-banner` package

### Fixed

- Trimmed `innerText` when tracking events

## [0.6.0](https://github.com/nationalarchives/tna-frontend/compare/v0.5.0...v0.6.0) - 2025-01-08

### Added

- More tracking added to galleries and sidebars

### Changed

- Update Font Awesome from `6.4.2` to `6.7.2`

### Fixed

- Set `aria-hidden="true"` and `focusable="false"` on presentational SVGs
- Removed quote marks from blockquotes that contain lists

## [0.5.0](https://github.com/nationalarchives/tna-frontend/compare/v0.4.0...v0.5.0) - 2025-01-03

### Added

- More tracking added to accordions, breadcrumbs, footers, galleries, headers and sidebars
- Disable [Google Chrome's "Auto dark theme"](https://developer.chrome.com/blog/auto-dark-theme) option

### Changed

- Optional `data-tnacookiesdomain` and `data-tnacookiespath` attributes on the `<html>` element are now `data-tna-cookies-domain` and `data-tna-cookies-path`
- The `data-preferenceskey` and `data-policieskey` attributes on the cookies component are now `data-preferences-key` and `data-policies-key`
- The `data-disableautofocus` attribute on the error summary component is now `data-disable-autofocus`
- The `data-informationlabelopen` and `data-informationlabelclose` attributes on the picture component are now `data-information-label-open` and `data-information-label-close`
- `$disable-image-loader-animations` (default: `false`) in `variables/features` has changed to `$image-loader-animations` (default: `true`)

### Fixed

- Style for current selected gallery item fixed

## [0.4.0](https://github.com/nationalarchives/tna-frontend/compare/v0.3.0...v0.4.0) - 2024-12-10

### Added

- Optional `data-tnacookiesdomain` and `data-tnacookiespath` attributes on the `<html>` element can be used to define the domain and path for cookies
- Analytics added for breadcrumbs and gallery components
- Allowed the document scope of an `EventTracker` instance to be changed
- Gallery components are unbounded by default but can have a background with `bounded: true`

### Changed

- Shifted and split hero components no longer assume a contrasted background by default
- `marketing` has been added to the default list of cookie policies
- Added a `tna-large-paragraph--bold` to change the weight and colour `tna-large-paragraph`

### Deprecated

- Removed the records list component

### Fixed

- Remove bottom margin of shifted hero components on smaller devices
- Fixed `getXPathTo` on analytics helpers if the element has no parent node
- Changed the incorrect `aria-selected` attribute on gallery items to `aria-current`

## [0.3.0](https://github.com/nationalarchives/tna-frontend/compare/v0.2.18...v0.3.0) - 2024-12-05

### Added

- Added support for the Dynamic Type setting in iOS, allowing users to change the default font size

### Changed

- Added an extra heading for the legal links in the footer component and tweaked the heading for the social media links
- Font size of quick filters component reduced

### Fixed

- Fixed the hover and focus outline colour of the logo in the global header component
- Added `width` and `height` attributes to inline SVGs
- Top border on cards with no images fixed for high contrast mode

## [0.2.18](https://github.com/nationalarchives/tna-frontend/compare/v0.2.17...v0.2.18) - 2024-11-05

### Changed

- Added `aria-label` attributes to all elements with custom `title` attributes
- Added a title for items in pagination components ("Page x")
- The LTS version of NodeJS used has been upgraded from `iron` (`20.x`) to `jod` (`22.x`)

### Removed

- Pagination items no longer have a `label` attribute - this is instead defined as `Page x` where `x` is the `number` attribute
- Removed the warnings about importing Google Fonts

### Fixed

- The click area for the logo link in a header component on tiny devices no longer stretches to fill the header
- Top borders on card components displayed on high contrast displays have been fixed

## [0.2.17](https://github.com/nationalarchives/tna-frontend/compare/v0.2.16...v0.2.17) - 2024-10-23

### Changed

- Updated header and global header HTML to allow adorn-able logos
- Reduced specificity of some CSS selectors for card elements

## [0.2.16](https://github.com/nationalarchives/tna-frontend/compare/v0.2.15...v0.2.16) - 2024-10-16

### Changed

- Changed the size of small images in horizontal cards

### Fixed

- Updated deprecated `color.red()`, `color.green()` and `color.blue()` SASS functions
- Fixed layout issues for fullscreen gallery components when viewed in landscape
- Removed list marker colour on yellow accented blocks
- Fixed layout of horizontal cards with no images

## [0.2.15](https://github.com/nationalarchives/tna-frontend/compare/v0.2.14...v0.2.15) - 2024-10-07

### Added

- Buttons can now have an `html` property that allows HTML to be used in place of the `text` property

### Fixed

- Change border widths on global header items from `0.5px` to `1px` to help with sub-pixel rendering
- Missing background colour added for focused buttons with `tna-button--solid-hover`
- Logo link in header and global header components updated to address image link purpose WCAG failure
- Added `aria-label` to image caption on hero components
- Added `title` attributes to social links in footer components
- Fix details expanded state not announced on iOS ([issue #5089 on govuk-frontend](https://github.com/alphagov/govuk-frontend/pull/5089))
- Fixed file list accessible link names to include file size and type
- Accessibility and usability improvements made to the gallery component with regards to HTML and JavaScript

## [0.2.14](https://github.com/nationalarchives/tna-frontend/compare/v0.2.13...v0.2.14) - 2024-09-18

### Added

- Items in a files list can be made entirely clickable using the `fullAreaClick` property

### Changed

- Updated the default `aria-label` on breadcrumbs components from "Breadcrumb" to "Breadcrumbs"
- Increased width of checkbox and radio components to allow more click area

### Removed

- Removed the separate [global header package](https://www.npmjs.com/package/@nationalarchives/frontend-global-header)

### Fixed

- Fixed colour of hovered buttons using the `<button>` element
- Improved cards CSS for IE11

## [0.2.13](https://github.com/nationalarchives/tna-frontend/compare/v0.2.12...v0.2.13) - 2024-09-13

### Added

- Added the option for a darker `<hr>` element with `tna-hr-dark`
- Tables needing horizontal scrolling can be focused on and receive a "(scroll to see more)" note added to their caption

### Changed

- Added outlines to hovered and focused cards with the full click option enabled
- `touched`, `tabbed` and `clicked` template modifiers added as part of `initAll()`
- Print modifiers moved into `initAll()`

### Removed

- Removed customisable colour variables `$dark-grey`, `$base-font`, `$link-colour` and `$link-colour-visited`
- Removed the ability to add attributes to items, previous buttons and next buttons in pagination components

### Fixed

- Added missing underline to focused buttons using on the `<button>` element
- Links around card images have been hidden from assistive technologies

## [0.2.12](https://github.com/nationalarchives/tna-frontend/compare/v0.2.11...v0.2.12) - 2024-09-05

### Added

- Items in a file list now require an ID so that an `aria-describedby` attribute can be used to describe the file details

### Changed

- Updated default text on cookie banner hide buttons
- Pagination arrows are now embedded SVGs rather than requiring the Font Awesome icons CSS
- "Previous" and "Next" text in pagination buttons is no longer hidden on tiny devices

### Fixed

- Increase thickness of underline for focused elements for when the focus indicator doesn't provide sufficient contrast with the background
- Don't add a `ga-disable-` variable to the `window` and set a disable cookie without having a GA4 ID
- Warning text colour on dark themes fixed
- Added missing Google Fonts file in prototype kit templates

## [0.2.11](https://github.com/nationalarchives/tna-frontend/compare/v0.2.10...v0.2.11) - 2024-08-30

### Removed

- Removed `$import-google-fonts` option
- Removed the `@import` rule for Google Fonts

### Fixed

- Increased `z-index` of active summary buttons on accordions

## [0.2.10](https://github.com/nationalarchives/tna-frontend/compare/v0.2.9...v0.2.10) - 2024-08-30

### Added

- `$import-google-fonts` option (default: `true`) which can disable the inclusion of Google Fonts using an `@import` declaration
- A new `all+analytics.js` file now exists which can be used as a drop-in replacement for `all.js`
- Google Analytics 4 can be automatically be instantiated by adding a `data-ga4` property to the `<html>` element
- New horizontal card options to control image width and position
- Added a CSS file for basic IE support (`ie.css`)

### Changed

- Removed the top and bottom padding of the breadcrumbs component
- Change the order of the HTML in hero components to put the caption below the image
- Refactored the card component to use CSS grid

### Fixed

- Changed conflicting GA4 window object instance in GA4 class from `TNAFrontendAnalytics` to `TNAFrontendAnalyticsGA4`
- Adjusted margin bottom of narrow, shifted hero components

## [0.2.9](https://github.com/nationalarchives/tna-frontend/compare/v0.2.8...v0.2.9) - 2024-08-21

### Changed

- Removed `:focus` styles and replaced with `:focus-visible` but retained outline on `:active` elements
- Light accent blocks appear normal accent colours in dark themes
- Added parsed meta tags to initial `gtm.js` analytics event

## [0.2.8](https://github.com/nationalarchives/tna-frontend/compare/v0.2.7...v0.2.8) - 2024-08-16

### Added

- New option `accentMeta` on card component to make meta tags accented
- Added image loader animations to card, hero, index grid, gallery and picture components
- Containers can be nested with `.tna-container--nested`
- Sticky sidebars can be "unstuck" on smaller devices with `.tna-sidebar--static-on-mobile`
- Added classeless styles for `<address>` elements

### Changed

- Refactored tabs component
- Removed unnecessary `title` attributes from footer, gallery, hero and index grid components
- Added lazy loading to gallery images
- The `title` of gallery components is now optional
- Reduced space above details components
- Added side padding to plain picture components
- Adjusted spacing of `<p>` elements inside `<li>` and `<dd>` elements

### Removed

- Removed container `--no-padding-all` classes and replaced with `--no-padding` classes for both containers and columns

### Fixed

- Removed max height for gallery components

## [0.2.7](https://github.com/nationalarchives/tna-frontend/compare/v0.2.6...v0.2.7) - 2024-08-12

### Added

- Content in the cookie banner component is now customisable

### Fixed

- Change skip link colours when hidden to avoid accessibility failures being raised
- Fixed incorrect use of `navigationId` and `topNavigationId` in global header component
- Fixed padding of sticky sidebars
- Fixed header navigation toggle analytics

## [0.2.6](https://github.com/nationalarchives/tna-frontend/compare/v0.2.5...v0.2.6) - 2024-08-02

### Added

- Spaced option for description lists with `.tna-dl--spaced`

### Changed

- Removed the tabindex on open accordion items
- Theme selector icons in footer changed to SVGs
- Updated style of gallery next and previous buttons
- Header and global header menu buttons now have text
- Reduced size of logo in header component
- Header markup changed to align more closely with global header
- Updated the newsletter block style in the footer

### Removed

- Pressing the up and down keyboard arrows no longer changes images within a gallery

### Fixed

- Pressing `Escape` whilst focused anywhere on the header or global header components will close the menu if it is open
- Icon vertical alignment fixed in description lists

## [0.2.5](https://github.com/nationalarchives/tna-frontend/compare/v0.2.4...v0.2.5) - 2024-07-30

### Changed

- Change default cookie age back to `31536000` (1 year) but allow `{ session: true }` for session cookies
- Allow default cookie age to be set on instantiation

## [0.2.4](https://github.com/nationalarchives/tna-frontend/compare/v0.2.3...v0.2.4) - 2024-07-30

### Added

- New style added for plain picture components

### Changed

- Allow search field to be smaller than the browser default
- Reduced space between paragraphs in hero captions
- Default cookie age changed from `31536000` (1 year) to `null` (session cookie)

### Fixed

- Added missing space above gallery component
- Updated gallery analytics

## [0.2.3](https://github.com/nationalarchives/tna-frontend/compare/v0.2.2...v0.2.3) - 2024-07-30

### Added

- Analytics added for accordion, detail and gallery components

### Changed

- Large paragraphs (`.tna-large-paragraph`) that follow headings and heading groups have less top margin
- Switch `.tna-gallery--fullscreen` class for `.tna-gallery:fullscreen`

### Fixed

- Further fixed gallery component layout when CSS loads but JS fails
- Buttons, inputs, selects and textareas now use the correct typeface rather than the browser default

## [0.2.2](https://github.com/nationalarchives/tna-frontend/compare/v0.2.1...v0.2.2) - 2024-07-24

### Added

- Allowed galleries to not show the first image by default using `showGrid`

### Changed

- Allowed the arrows to appear on card heading links
- The header component no longer requires the `tna-template--js-enabled` class on the `<html>` element to show and hide on smaller devices

### Fixed

- Arrow colour for visited heading links with the class `tna-link--no-visited-state`
- Incorrect padding on the bottom of horizontal cards
- Removed space between heading and exclamation mark on warning components
- Fixed gallery component layout when CSS loads but JS fails

## [0.2.1](https://github.com/nationalarchives/tna-frontend/compare/v0.2.0...v0.2.1) - 2024-07-19

### Added

- Added `itemHeadingLevel` to file list component and changed file titles to headings
- Ordered and unordered lists can be spaced out with `.tna-ul--spaced` and `.tna-ol--spaced`
- The contents of the details element can be [called in Nunjucks](https://mozilla.github.io/nunjucks/templating.html#call)
- Cards can be made entirely clickable using the `fullAreaClick` property

### Changed

- Tables are no longer automatically 100% width but can be made to be with `.tna-table--full`
- `<ul>` elements with the class `.tna-container` have their `list-style` removed
- The default `htmlElement` option for the card component is now `<article>`
- Gallery item captions are no longer wrapped in a `<p>` element
- Updated the heading link arrow style
- Added more space below table elements
- Removed focus shift on accordion items upon opening
- Changed the arrows on gallery buttons from Font Awesome SVGs to sharp CSS arrows

### Removed

- Cards can no longer have plain supertitles

### Fixed

- Fixed spacing in nested lists
- Set icon size for file list component for better viewing without CSS

## [0.2.0](https://github.com/nationalarchives/tna-frontend/compare/v0.1.65...v0.2.0) - 2024-07-15

### Changed

- Increased maximum depth of contents sidebar to three levels
- Removed the redundant `role` attribute from `<fieldset>` of the date input component
- Allow each item in a checkboxes component to have a `name` attribute that will override the main `name`
- Renamed "files" component to "files list" (`files` -> `files-list`, `tnaFiles()` -> `tnaFilesList()`)
- Renamed "featured records" component to "records list" (`featured-records` -> `records-list`, `tnaFeaturedRecords()` -> `tnaRecordsList()`)
- SCSS mixin `colour.light` changed to `colour.always-light`
- Index grid items within contrast blocks are now accented
- Colour variables `--button-accent-text` and `--button-accent-background` have changed to `--button-accented-text` and `--button-accented-background`
- Colour variable `form-error` split into `form-error-border` and `form-error-text`
- Moved the grid component to utilities

### Deprecated

- Removed `colour.plain` SCSS mixin

### Removed

- Removed search filters component
- Removed sensitive image component
- Removed `width: 100%;` reset of `<video>` and `<canvas>` elements

### Fixed

- Added missing space above files list
- Fixed alignment of warning text when a short body is used
- Incorrect `aria-labeledby` attribute changed to `aria-labelledby` in gallery items
- Add better labels for buttons in gallery component

## [0.1.65](https://github.com/nationalarchives/tna-frontend/compare/v0.1.64...v0.1.65) - 2024-07-11

### Added

- New files list component
- `.tna-!--hide-on-print` class added for hiding elements when printing
- Separate print stylesheet
- Buttons can now include an SVG icon
- Package now includes config files for Babel, ESLint, HTML-validate and Stylelint

### Changed

- Refactored gallery component
- Allow the size of the heading in the sidebar component to be changed
- Refactored accordion component for better accessibility
- Picture transcripts are hidden with `until-found`
- Open all accordion items and details elements when printing
- Changed `heading` property of sidebar components to `title`

### Removed

- Removed all print styles from `all.css`

### Fixed

- Fixed `aria-controls` property of accordion buttons
- All component attributes can now have blank values

## [0.1.64](https://github.com/nationalarchives/tna-frontend/compare/v0.1.63...v0.1.64) - 2024-06-24

### Fixed

- Fixed the optimised `.tna-header--no-link-arrow` class (again)

## [0.1.63](https://github.com/nationalarchives/tna-frontend/compare/v0.1.62...v0.1.63) - 2024-06-24

### Fixed

- Fixed the optimised `.tna-header--no-link-arrow` class

## [0.1.62](https://github.com/nationalarchives/tna-frontend/compare/v0.1.61...v0.1.62) - 2024-06-24

### Changed

- The default `headingSize` for cards has changed from `s` to `m`
- The font size of the scene setter has been reduced

### Deprecated

- The small scene setter style has been removed

### Fixed

- Removed extra spaces from template classes and attributes
- Fix horizontal card inner padding

## [0.1.61](https://github.com/nationalarchives/tna-frontend/compare/v0.1.60...v0.1.61) - 2024-06-18

### Fixed

- Fixed some colours combinations

## [0.1.60](https://github.com/nationalarchives/tna-frontend/compare/v0.1.59...v0.1.60) - 2024-06-18

### Added

- New sidebar component

### Changed

- Don't reload the window when `disableTracking()` is called in the analytics library
- Added warning when using `typography.relative-font-size()` to move to `typography.font-size()` (`relative-font-size` will be removed in a future release)

### Fixed

- Fixed bug with standard cards (not tinted, contrasted or accented) having extra padding when in a tinted, contrasted or accented ancestor block
- Fixed standard button colours
- Changed order of index grid items HTML to make more sense

## [0.1.59](https://github.com/nationalarchives/tna-frontend/compare/v0.1.58...v0.1.59) - 2024-06-13

### Added

- Allow `lazyImages` attribute for lazy loading of index grid images
- Dashed lists can be used with `.tna-ul--dashed` and `.tna-ol--dashed` which replace the markers with dashes

### Changed

- The transcript button on picture components no longer gets a `tna-picture__toggle-transcript--opened` class when opened

### Fixed

- Fix the error when calling `disableTracking()` within the analytics library

## [0.1.58](https://github.com/nationalarchives/tna-frontend/compare/v0.1.57...v0.1.58) - 2024-06-05

### Added

- Hero component can now have actions
- Hero component has a new `narrow` option for shorter headers

### Changed

- Theme selector is hidden when forced colors mode is enabled
- The markup for a chip list has been updated
- Better colours and contrasts for coloured elements within contrast and accent blocks
- Switched from using specific `--accent` modifier classes to the generic `tna-background-accent` classes for card, cookie banner, header, hero and phase banner components

### Removed

- Removed external icon from header exit link

### Fixed

- Fixed styling for compound filters in forced colors mode
- Fixed colour for header exit link in light high contrast mode
- Added title attribute to social links in the footer to help with navigation as well as to the theme selector buttons

## [0.1.57](https://github.com/nationalarchives/tna-frontend/compare/v0.1.56...v0.1.57) - 2024-05-30

### Added

- Index grids can now have supertitles, `hrefClasses` and `hrefAttributes`
- Quick filters component styling has changed and has a new `fill` option
- Picture components can now have alternative sources

### Changed

- Detail summaries no longer stretch the full width of the container
- Index grid `headingHref` changed to `href`
- Common page elements such as headers and footers are hidden when using print styles
- Accented keylines now use the more saturated variant of their colour for increased contrast with other accented elements

### Deprecated

- Removed unused `imageType` attribute from hero components

### Fixed

- The theme stored in a cookie is now reflected in pages using the prototype kit
- Removed duplicated source from hero image `<picture>` elements
- Better support for forced colors mode on several components
- Remove duplicated `<main>` element on index-grid and list prototype kit templates
- Accented header component colour fixed
- Removed hover state for header logos with no link

## [0.1.56](https://github.com/nationalarchives/tna-frontend/compare/v0.1.55...v0.1.56) - 2024-05-28

### Fixed

- `application.css` file no longer included when using the prototype kit

## [0.1.55](https://github.com/nationalarchives/tna-frontend/compare/v0.1.54...v0.1.55) - 2024-05-28

### Added

- New accordion and details components added
- Card images can be loaded lazily with `lazyImage`

### Changed

- Standard `application.css` file will be included when using the prototype kit

### Fixed

- Fixed spacing in nested lists
- Small images in hero components on smaller devices now fill the width of the component
- Prototype kit asset paths fixed

## [0.1.54](https://github.com/nationalarchives/tna-frontend/compare/v0.1.53...v0.1.54) - 2024-05-13

### Changed

- `assetPath` now requires a trailing slash

### Fixed

- Fixed issues with some templates, particularly around the theme selection

## [0.1.53](https://github.com/nationalarchives/tna-frontend/compare/v0.1.52...v0.1.53) - 2024-05-13

### Added

- Footer component can now contain an optional theme selector which requires the component to have the TNA cookies library initialised
- Hero components have a new split layout option

### Changed

- Removed single `content` property in hero components in favour of separate fields (i.e. `title`, `text`/`body`)
- Nested unordered lists use the same marker
- The cookie library is now a singleton
- The analytics library instance is saved to the window object
- Improved typeface definitions and includes
- Yellow buttons are now brown to meet [WCAG Success Criterion 1.4.11 (Non-text Contrast - Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)
- Box shadow added to picture components

### Fixed

- Date search component text updated to use the defined detail font

## [0.1.52](https://github.com/nationalarchives/tna-frontend/compare/v0.1.51...v0.1.52) - 2024-04-04

### Changed

- Better support for colour themes and high contrast options

### Deprecated

- Removed `tna-template--light-theme` option - `tna-template` is light by default
- Removed `accent-background` and `dark` mixins from colour tools

### Fixed

- Fix incorrect `tna-template--black-accent` class
- Removed all redundant high contrast classes

## [0.1.51](https://github.com/nationalarchives/tna-frontend/compare/v0.1.50...v0.1.51) - 2024-04-04

### Added

- "Thick" and button border widths are both customisable
- The colour of a card label can be changed
- Accent colours can be set on blocks with `tna-accent-pink`, `tna-accent-orange`, `tna-accent-yellow`, `tna-accent-blue` and `tna-accent-green`
- Hero components can now have a "shifted" style option and can have contrasting, tinted and accent backgrounds

### Changed

- Improved markup of warning component
- `--page-background` is now `--background`

### Deprecated

- Deprecated support for the `tna-template--high-contrast-theme` class - high contrast themes can be used by setting a preference for higher contrast in the operating system
- `colour-font()` no longer has the ability to define the default palette

### Removed

- Fallbacks for custom CSS properties are defined in the `var()` function rather than in a separate property - this removes any colouring support for browsers without custom CSS properties
- Hero components no longer have `heading`, `body` or `text` properties - these have been replaced with a `content` property

### Fixed

- Fixed column margin removal classes
- Added missing IDs to some form elements so they can be linked top from the error summary
- Active states of checkboxes and radios fixed

## [0.1.50](https://github.com/nationalarchives/tna-frontend/compare/v0.1.49...v0.1.50) - 2024-03-28

### Added

- Tinted cards are now an option
- Blockquotes have quotemarks added with CSS
- New "medium" (600) Open Sans font weight added
- Ability to remove margins from left and right of columns

### Changed

- Renamed "message" component to "warning"
- Changed all `#000` colours to `#010101`
- The newsletter subscribe button in the footer is no longer accented
- Added `role="group"` to date input component `<fieldset>`
- Colours changed for black theme accent blocks

### Fixed

- Fixed collapsed padding on details dropdown of hero component
- Added heights to Font Awesome SVGs

## [0.1.49](https://github.com/nationalarchives/tna-frontend/compare/v0.1.48...v0.1.49) - 2024-03-26

### Added

- Spacing can now be defined in relative terms (e.g. `1`, `3`, `0.25`) which is converted to absolute values
- Added a `$spacing-unit-px` variable to allow the setting of the base unit for all spacing
- Heading sizes and line heights are now customisable

### Changed

- Changed grid dimensions (max width, gutters etc.) from `rem` units to `px`
- Changed all spacing (margin, padding and gap) to use `spacing.space()` tool for relative sizes
- Tweaked some of the dark and contrasting colours

### Removed

- Removed strapline option for global header
- Removed all redundant `role` attributes in line with GOV.UK Frontend v5.3.0

### Fixed

- Removed explicit font size on `tna-template` allowing browser-defined font sizes
- Removed focus from elements with a `tabindex` of `-1`
- Fixed background colour of headers on system themes

## [0.1.48](https://github.com/nationalarchives/tna-frontend/compare/v0.1.47...v0.1.48) - 2024-03-21

### Added

- Navigation dropdowns in headers can be closed using the `Escape` key

### Changed

- Changed the `aria-current` attribute of the current header menu item from `true` to `page`
- Switched back from `<menu role="list">` to `<ul>` elements
- Changed the line height of `tna-heading-xl`
- Updated heading sizes for better consistency across devices

## [0.1.47](https://github.com/nationalarchives/tna-frontend/compare/v0.1.46...v0.1.47) - 2024-03-19

Version bump

## [0.1.46](https://github.com/nationalarchives/tna-frontend/compare/v0.1.45...v0.1.46) - 2024-03-19

Version bump

## [0.1.45](https://github.com/nationalarchives/tna-frontend/compare/v0.1.44...v0.1.45) - 2024-03-19

### Changed

- Updated footer links
- Removed inline styles for logos in footer and headers
- Reduced maximum height of the hero component

## [0.1.44](https://github.com/nationalarchives/tna-frontend/compare/v0.1.43...v0.1.44) - 2024-03-14

### Added

- TikTok is available as a social icon in the footer
- Visually hidden brackets added to index grid item subtitles
- `<main>` element can be styled with a `tna-main` class
- Index grid headings can be hidden by setting `headingLevel` to `0`
- Template fixtures are now included

### Changed

- Default maximum container width changed from `75.25rem` (`1204px`) to `80rem` (`1280px`)
- GA4 analytics implementation updated
- Updated `aria-label` attributes on navigation elements

### Deprecated

- Removed `tnaFrontendCssPath` and `tnaFrontendJsPath` variables from `_generic.njk` template

### Removed

- Card actions can no longer have icons
- Removed explicit `role="navigation"` on pagination component and `role="main"` on `<main>` elements
- Removed defaults from `stylesheets` and `bodyEnd` of `_generic.njk` template

### Fixed

- Card action classes and attributes fixed

## [0.1.43](https://github.com/nationalarchives/tna-frontend/compare/v0.1.42...v0.1.43) - 2024-03-11

### Added

- Global active style added

### Changed

- The default pagination style is plain buttons but can be changed with the `solid` option
- Updated the HTML of the headers, adding some attributes to the HTML to reduce reliance on JavaScript
- Switched from using `<ul>` to `<menu>` in the headers and footer
- Added some attributes to the HTML of the headers to reduce reliance on the JavaScript
- Cards without images now get a top border

### Fixed

- Fixed style of icon-only buttons in a small button group

## [0.1.42](https://github.com/nationalarchives/tna-frontend/compare/v0.1.41...v0.1.42) - 2024-03-01

### Added

- Error summary component
- Initial release of analytics library
- Initial idea for search filters
- Allow structured data in breadcrumbs with `structuredData`

### Changed

- `filters` are now `quick-filters` (and the Nunjucks has changed from `tnaFilters` to `tnaQuickFilters`)
- Border widths around inputs have been increased
- Removed `tna-ul tna-ul--plain` classes from compound filters

### Removed

- Removed the automatic `tna-form__` prefix from form field IDs

## [0.1.41](https://github.com/nationalarchives/tna-frontend/compare/v0.1.40...v0.1.41) - 2024-02-27

### Fixed

- Footer link URLs

## [0.1.40](https://github.com/nationalarchives/tna-frontend/compare/v0.1.39...v0.1.40) - 2024-02-27

### Changed

- Footer social links structure and HTML changed
- Header icons changed to SVGs
- Crown logo in footer changed from St Edward's Crown to Tudor Crown
- Added navigation toggle button to HTML of both headers
- Allow navigation groups in footer to have hidden titles
- `utilities/_global.scss` split into other files `_reset.scss` and `_areas.scss`

### Removed

- Removed option for brand icons on buttons, card actions and headers
- Removed Font Awesome icon selection for header and footers
- No `init` method for component JavaScript - components are now initialised on instantiation (`new Header($header).init()` -> `new Header($header)`)

## [0.1.39](https://github.com/nationalarchives/tna-frontend/compare/v0.1.38...v0.1.39) - 2024-02-19

### Added

- Automated AXE checks now include WCAG 2.2
- Lazy loading for images in picture component

### Changed

- Changed spacing between navigation items in header
- `tna-blockquote__author` changed to `tna-blockquote__citation`
- Added default CSS export in `package.json`
- Set global header background to pure black (`#000`) on dark themes

### Removed

- Ability to tint hero images

### Fixed

- Stopped logo from shrinking with longer straplines in headers
- The message component has a header rather than an icon which provides a better page landmark
- Hid some CSS pseudo elements from screen readers

## [0.1.38](https://github.com/nationalarchives/tna-frontend/compare/v0.1.37...v0.1.38) - 2024-02-13

### Security

- Updated dependencies

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
