# FIX
- Fill conviction icons

# FEATURES
- Check TWD
- Events decks archive analyzing
- Custom values for cardtypes in TWD/PDA
- Playable by buttons to lib/crypt

# MAYBE LATER FEATURES
- Offline decks storage
- Notification on Incognito mode
- Prioritize exact matches in add card (more than twda)
- Inventory/deck import in excel

# IMPROVE TECHNOLOGY - FRONTEND
- Update url for playtest images to mitigate caching
- Move Clone/Delete/Branches fetches to services and create relevant deck store functions
- Debouncing for text search query - useTimeout+useDebouncing hook https://youtu.be/0c6znExIqRw?t=118
- Refactor fetch to useAsync+useFetch hook https://youtu.be/vrIxu-kfAUo&t=546
- Refactor InventoryCrypt and InventoryLibrary
- Refactor deck buttons (split in button ui and function)
- Explicit image width/height
- ResultDisciplineImage class to width/size
- Resize clan/types/misc images

# TAILWIND MIGRATION
- Test autoFocus / fix with forwardRefs
- Replace -[#HEX] with config colors, merge same config colors, name config colors
- Refactor or restore setShowFloatingButtons functionality
- TwdLibraryByType click to freeze popover
- Crypt & Library sticky headers (+ full crypt)
