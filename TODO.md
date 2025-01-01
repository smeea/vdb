# FIX
- Review TWDA radar: remove swarm, maybe replace?

# FIX ON HOLD
- Deck-in-url trim - cant reproduce in dev environment

# FEATURES
- Inventory 'target' q-ty -> for design consideration
- Search PDA by tags
- Search in TDA on mobile

# FEATURES ON HOLD
- TWD search with % V5-compatibility -> after BCP clarify V5
- Deck details show % V5-compatibility -> after BCP clarify V5
- Indicator of inventory-perfect decks in selector -> performance issue for many decks
- Draft Cube support -> when draft cube info is available

# TECH IMPROVEMENTS
- Update to TailwindCSS 4
  - isWidth to container queries
- Migrate to useSWR (test on playtest reports)
- Remove legacy polyfills (groupBy 2024-11-30 87.24%, 2024-12-12 89.08%)
