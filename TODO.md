# FIX
- Older links (redirect in the web server)

# FEATURES
- Check TWD
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Playable by buttons to lib/crypt
- Add deck as revision
- Country twd search
- Search in deck/precons by set

# MAYBE LATER FEATURES
- Offline decks storage
- Notification on Incognito mode
- Prioritize exact matches in add card (more than twda)
- Inventory/deck import in excel

# IMPROVE TECHNOLOGY - FRONTEND
- Migration from screen width (isWide, etc) to container queries
- Refactor standard colors
- Configure vite-pwa
- Move preconDecks to fetch+localStorage
- Update url for playtest images to mitigate caching
- Refactor InventoryCrypt and InventoryLibrary
- Refactor deck buttons (split in button ui and function incl. deckstore functions )
- Explicit image width/height
- ResultDisciplineImage class to width/size
- Refactor fetch to useFetch where possible
- Add standard modal button blocks
- Refactor QuickSelect + NewCryptCard + NewLibraryCard
