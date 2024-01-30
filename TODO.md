# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Remove proxy missing from compare
- Click on Author in PDA

# FEATURES
- Playtest reports

# TECH IMPROVEMENTS
- Migration from isWide, etc to container queries
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Back button behavior
- Update to Vite 5 (when hmr circular import issue is resolved)
- Update to Headlessui 2 (review new components)
- Refactor useDeckMissing in deck proxy/missing
- Refactor DeckSelectMy to use virtualized
- Review DeckSelectAdv performance
- Refactor DeckSelectAdv to use virtualized
- Performance improvement for inventory-related and all-deck related features triggered at every deck/card
