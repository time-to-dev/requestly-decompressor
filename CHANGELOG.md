# Changelog

All notable changes to `requestly-decompressor` will be documented in this file

## [1.1.0] - 2025-04-18

### Added

- Duplicate removal functionality for network events in exported JSON:

  - New CLI option `--remove-duplicates` to remove duplicate network events in JSON exports.
  - `NetworkEventsCleaner` service to detect and remove duplicates by normalizing URLs and JSON structures.
  - Enhanced export and file-handling logic for duplicate removal.

- JSON prettification support during export:
  - New CLI option `--prettify-content` to format JSON output for improved readability.
  - Updated logic within `processFile` and `SessionExporter` supporting JSON prettification.
