# FIX
- Fix scroll + swipes (maybe add swipeDuration: <200 or something)
- Notification on Incognito mode
- Pdf image sharpness
- Update url for playtest images to mitigate caching
- Pdf proxy add missing from inventory in card selection

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
- Test autoFocus / fix with forwardRefs
- Replace -[#HEX] with config colors, merge same config colors, name config colors
- DeckDraw ash heap tables (class prop)
