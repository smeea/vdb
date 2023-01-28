# FIX

# FEATURES
- Check TWD
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Multitable seating
- Playable by buttons to lib/crypt
- Artist clickable in card modal

# MAYBE LATER FEATURES
- Offline decks storage
- Notification on Incognito mode
- Prioritize exact matches in add card (more than twda)
- Inventory/deck import in excel

# IMPROVE TECHNOLOGY - FRONTEND
- Update url for playtest images to mitigate caching
- Move Clone/Delete/Branches fetches to services and create relevant deck store functions
- Refactor DeckProxySelectModal proxySelected to useImmmer
- Debouncing for text search query
- Refactor InventoryCrypt and InventoryLibrary
- Explicit image width/height
- Test bundle size with lazy load of pages
- ResultDisciplineImage class to width/size

# TAILWIND MIGRATION
- Fix show password in Account on enter
- Test autoFocus / fix with forwardRefs
- Replace -[#HEX] with config colors, merge same config colors, name config colors
