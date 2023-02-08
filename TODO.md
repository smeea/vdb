# FIX

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
- Refactor react-select to css-in-js styles
- Configure vite-pwa
- Move preconDecks to fetch+localStorage
- Update url for playtest images to mitigate caching
- Move Clone/Delete/Branches fetches to services and create relevant deck store functions
- Refactor fetch to useAsync+useFetch hook https://youtu.be/vrIxu-kfAUo&t=546
- Refactor InventoryCrypt and InventoryLibrary
- Refactor deck buttons (split in button ui and function incl. deckstore functions )
- Explicit image width/height
- ResultDisciplineImage class to width/size

# TAILWIND MIGRATION
- Replace -[#HEX] with config colors, merge same config colors, name config colors
- Library sticky hide above header
- Autoswitch to add mode on first search
- Library search total
- Checkbox labels non-clickable
- Import to inventory deck preview
- Modal initial focus
