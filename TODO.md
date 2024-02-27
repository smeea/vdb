# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Swipes in inventory to change bg-colors (swipes disabled until fixes)
- Inventory sort option

# FEATURES
- Playtest reports
- Update random seating decks from Codex

# TECH IMPROVEMENTS
- Migration from isWide, etc to container queries
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Refactor getDeck
- Back button behavior
- Update to Headlessui 2 (review new components)
- Update prompt using vite-pwa
- Remove legacy polyfills when Safari adopts groupBy
