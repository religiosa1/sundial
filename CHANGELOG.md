# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.3] - 2025-06-27

### Added

- Support for swipe navigation on landscape oriented touch devices

### Changed

- Better marker visibility on mobile and adaptivity for landscape mobile on
  yearly view page.

### Fixed

- Placeform flicker on current geolocation retrieval.
- Page swiping on interaction with range inputs

## [0.3.2] - 2025-06-24

### Added

- Highlight of map view azimuths on hover, to make it clearer what are you
  currently looking at.

### Changed

- Statusbar color in PWA mode made to match the theme.

### Fixed

- place form "Use My Location" button broken in 0.3.1
- visual fixes for azimuth form

## [0.3.1] - 2025-06-22

### Changed

- Mobile menu breakpoint adjusted for menu to be slightly lower, as well as menu
  is more adaptive in landscape mobile view.

### Added

- Adapativity support on landscape mobile for Map View.

### Fixed

- Current position no longer overrides the saved position on app start, if it's
  within 3km from the saved position or sensor accuracy is lower than the
  distance between saved position and returned position
- Visual fixes for color scheme (light/dark) and menu z-index with map during
  page transitions

## [0.3.0] - 2025-06-17

### Added

- MapView page with sun position display and azimuth visualization

### Changed

- Enhanced dateform visuals with anchor positioning

## [0.2.1] - 2025-06-02

### Added

- WebGL support detection before map initialization

## [0.2.0] - 2025-05-31

### Added

- Interactive map with location picker using MapLibre GL

### Fixed

- Dialog overflow issues

## [0.1.9] - 2024-12-26

### Added

- Enhanced error handling for geolocation
- Loading spinner and better user feedback
- Location operation status display

### Fixed

- Location caching issues
- Improved geolocation error messages

## [0.1.8] - 2025-12-05

- Improved touch sensitivity

## [0.1.7] - 2024-12-05

### Added

- Automatic geolocation on app startup
- Enhanced location state management

### Changed

- Improved location integration across components

## Here be dragons

Older changes are not tracked in the changelog.
