# FIX
- Fix scroll + swipes
- Notification on Incognito mode
- Pdf image sharpness
- Autofocus forms with forward refs
- Update url for playtest images to mitigate caching

# IMPROVEMENTS
- Dont bundle changes - lazyload changelog + hardcode version
- Add fetch to api/version instead of include recent change in answer
- Exclude AC from getClan

# FEATURES
- Check TWD
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Playtest decks to PDA

# MAYBE LATER FEATURES
- Offline decks storage

# IMPROVE TECHNOLOGY - FRONTEND
- Inventory/deck import in excel
- Move Clone/Delete/Branches fetches to services and create relevant deck store functions
- Debouncing for text search query
- Refactor InventoryCrypt and InventoryLibrary

# TAILWIND MIGRATION
- Fix show password in Account on enter
- Account tooltips
- Style forms with https://github.com/tailwindlabs/tailwindcss-forms
- Test autoFocus
- Form with errorOverlay to have 'relative' class
- ButtonFloat variant to className (or create variants inside button component)
- Replace -[#HEX] with config colors
- Refactor div with single nested div
- Remove useless items-center and justify-center from Table components
