# FIX
- Older links (redirect in the web server)
- Check TWD - check countries/cities (to repeat previously used cities)
- Text multi search

# FEATURES
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Playable by buttons to lib/crypt
- Add deck as revision

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
- TwdResultLibrary (crypt also?) refactor to use banned check
- Modal max width in pixels
- Close modal with esc
