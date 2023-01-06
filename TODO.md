# FIX
- Fix scroll + swipes (maybe add swipeDuration: <200 or something)
- Notification on Incognito mode
- Pdf image sharpness
- Update url for playtest images to mitigate caching

# IMPROVEMENTS
- Dont bundle changes - lazyload changelog + hardcode version
- Test bundle size with lazy load of pages
- Add fetch to api/version instead of include recent change in answer

# FEATURES
- Check TWD
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Playtest decks to PDA
- Multitable seating

# MAYBE LATER FEATURES
- Offline decks storage

# IMPROVE TECHNOLOGY - FRONTEND
- Inventory/deck import in excel
- Move Clone/Delete/Branches fetches to services and create relevant deck store functions
- Debouncing for text search query
- Refactor InventoryCrypt and InventoryLibrary
- Explicit image width/height

# TAILWIND MIGRATION
- Fix show password in Account on enter
- Style forms with https://github.com/tailwindlabs/tailwindcss-forms
- Test autoFocus / fix with forwardRefs
- Form with errorOverlay to have 'relative' class
- Replace -[#HEX] with config colors
- Refactor div with single nested div
- Remove useless items-center and justify-center from Table components (i.e. Inventory)
- Tooltip arrow https://floating-ui.com/docs/tutorial#arrow-middleware
