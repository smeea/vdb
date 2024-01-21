# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Fix Card Version in About after V5C release
- Fix alignment/wraping in ResultCryptName (and Library)
- Fix alignment in DeckCrypHeader (and Library) with warnings

# FEATURES

# TECH IMPROVEMENTS
- Migration from isWide, etc to container queries
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Back button behavior
- Update to Vite 5 (when hmr circular import issue is resolved)
- Update to Headlessui 2 (review new components)
- Refactor Banned, Groups into getRestriction
- Refactor Warnings and ResultLegalIcons container
- Refactor utils/consts to include 'POD', 'Promo', 'bcp' (check for 'any')
