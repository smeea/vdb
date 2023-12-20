# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Convert card-ids from playtest to release
- Remove tzi/sal/rav from playtest

# FEATURES
- Inventory cards with notes filter to crypt/library/inventory
- Show more reqs for library cards (like title)

# MAYBE LATER FEATURES
- Offline decks/inventory storage
- Playable by crypt filter to library
- OR search option for crypt by disciplines

# POSSIBLE IMPROVEMENTS
- Migration from screen width (isWide, etc) to container queries
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Back button behavior
- Update to Vite 5 (when hmr circular import issue is resolved)
- Use Dynamic Viewport Units (h-svh, -dvh, -lvh in tailwind)
- Unify onClick and handleClick
