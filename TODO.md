# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Fix Card Version in About after V5C release
- Fix alignment/wraping in ResultCryptName (and Library) - advanced, indicators
- Fix alignment in DeckCrypHeader (and Library) with warnings
- Show banned in card modal similar to legal notice
- Move lock button to selector (at least on Desktop)
- Indicator gaps with inventory icons in selector
- Recommendation for playtest (see backend errors)

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
