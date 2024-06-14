# FIX
- Swipes in inventory to change bg-colors (swipes disabled until fixes)
- Snapshot url in iOS
- PWA auto-reload in Chrome/iOS
- Inventory state for cards in your deck opened from url (including page refresh)
- Fix even: to also use odd:

# FEATURES
- TWD search with % V5-compatibility - after BCP clarify V5
- Deck details show % V5-compatibility - after BCP clarify V5
- Card played indicator for playtest
- Only modifier for discipline search in library

# TECH IMPROVEMENTS
- Update to SQLAlchemy 3
- Update to React 19
- Update to TailwindCSS 4 (migrate from isWidth to container queries)
- Remove legacy polyfills when Safari adopts groupBy
- Refactor with cva, twMerge
