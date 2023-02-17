# FIX
- Problem with valtio update
- Modal initialFocus forwardRef

# FEATURES
- Check TWD
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
- Migration from screen width to container queries where possible
- Refactor standard colors
- Refactor react-select to css-in-js styles
- Configure vite-pwa
- Move preconDecks to fetch+localStorage
- Update url for playtest images to mitigate caching
- Refactor InventoryCrypt and InventoryLibrary
- Refactor deck buttons (split in button ui and function incl. deckstore functions )
- Explicit image width/height
- ResultDisciplineImage class to width/size
- Refactor fetch to useFetch where possible

# TAILWIND MIGRATION
- Slow switching decks
- Library sticky hide above header
- Unify modal button blocks
- Switch from 'hidden sm:other' to 'max-sm:hidden'
