# FIX
- Review TWDA radar: remove swarm, maybe replace?

# FEATURES
- Inventory 'target' q-ty -> for design consideration

# FEATURES ON HOLD
- TWD search with % V5-compatibility -> after BCP clarify V5
- Deck details show % V5-compatibility -> after BCP clarify V5
- Indicator of inventory-perfect decks in selector -> performance issue for many decks
- Legacy style in PDF select card -> all legacy to be available
- Draft Cube support -> when draft cube info is available

# TECH IMPROVEMENTS
- Refactor DeckStore and InventoryStore with useOptimistic
- Update to TailwindCSS 4
  - isWidth to container queries
- Migrate to useSWR (test on playtest reports)
- Remove legacy polyfills (groupBy 2024-11-30 87.24%, 2024-12-12 89.08%)
