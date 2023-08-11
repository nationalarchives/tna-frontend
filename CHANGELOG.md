# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/nationalarchives/tna-frontend/compare/v0.1.14-prerelease...HEAD)

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [v0.1.14-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.13-prerelease...v0.1.14-prerelease) - 2023-08-11

### Changed

- Simplified SCSS for inverted colours and introduced contrasting option

### Fixed

- Default colour scheme works without having to define a theme class on `tna-template`
- Fixed top navigation layout in header when on mobile with no JavaScript enabled

## [v0.1.13-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.12-prerelease...v0.1.13-prerelease) - 2023-08-11

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

## [v0.1.12-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.11-prerelease...v0.1.12-prerelease) - 2023-08-08

### Changed

- Updated dependencies

### Fixed

- Basic accent colour fixed

## [v0.1.11-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.10-prerelease...v0.1.11-prerelease) - 2023-08-08

### Added

- Footer component moved out of work in progress ready to test in beta
- Hero component has a small amount of support for users who prefer more contrast

### Changed

- Removed vendor-specific CSS values for IE10 from grid classes (`display: -ms-flexbox;`)
- Hero component background images now require a width and height
### Fixed

- The fallback font family for `supria-sans-condensed` was changed to `sans-serif` rather than `monospace`

## [v0.1.10-prerelease](https://github.com/nationalarchives/tna-frontend/compare/v0.1.9-prerelease...v0.1.10-prerelease) - 2023-07-14

### Added

- JavaScript adds helper classes to the document

## [v0.1.9-prerelease](https://github.com/nationalarchives/tna-frontend/releases/tag/v0.1.9-prerelease) - 2023-07-12

### Fixed

- Hero component styling inline with ETNA
