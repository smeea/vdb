# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Swipes in inventory to change bg-colors (swipes disabled until fixes)
- InventoryUsed data for newly opened deck
- Sync Public

# FEATURES
- Playtest reports
- Change password to UI

# TECH IMPROVEMENTS
- Migration from isWide, etc to container queries
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Back button behavior
- Update to Headlessui 2 (review new components)
- Refactor useless map to forEach
- Update prompt using vite-pwa
- Remove legacy polyfills when Safari adopts groupBy
