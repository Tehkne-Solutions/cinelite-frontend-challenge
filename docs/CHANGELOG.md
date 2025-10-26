# CHANGELOG

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- `src/assets/images/cinelite_hero_banner.jpg` — static hero banner image used in the HomePage hero section.
# NOTE: If the image file in your workspace has a double extension (e.g. `cinelite_hero_banner.jpg.jpg`), either rename it to `cinelite_hero_banner.jpg` or update the import in `src/components/HeroBanner/HeroBanner.jsx`. The current code imports the file that exists in the repo.
- `src/components/ScrollToTopButton` — minimal scroll-to-top button component.

### Changed
- `src/components/HeroBanner` — now imports the local static banner image and applies a dark overlay for legibility; search bar centered.
- `src/components/Logo` — accepts `size` and `light` props for flexible usage (banner, header, etc.).
- `src/components/MovieRow` / `src/components/MovieCard` — fixed nested anchor issue to prevent React DOM nesting/hydration errors.
- `src/pages/DetailsPage` — back button streamlined and positioned top-left; removed duplicate header usage.

### Fixed
- DOM nesting issue where a `<a>` was being rendered inside another `<a>`, causing React hydration errors.

---

For more details, check commit history and the README section "Fase 15 — Correções e melhorias".
