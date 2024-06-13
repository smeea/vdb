# FIX
- Swipes in inventory to change bg-colors (swipes disabled until fixes)
- Snapshot url in iOS
- PWA auto-reload in Chrome/iOS
- Fix partially used in inventory

# FEATURES
- TWD search with % V5-compatibility - after BCP clarify V5
- Deck details show % V5-compatibility - after BCP clarify V5
- Card played indicator for playtest
- Only modifier for discipline search in library
- And-Or-Not options to TWD search

# TECH IMPROVEMENTS
- Update to SQLAlchemy 3
- Update to React 19
- Update to TailwindCSS 4 (migrate from isWidth to container queries)
- Remove legacy polyfills when Safari adopts groupBy
- Refactor with cva, twMerge
- Refactor to replace TwdSearchFormClan/Sect with CryptSearchForm
