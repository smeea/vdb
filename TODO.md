# FIX
- Too many calls to Location or History APIs on filter changes in Firefox

# FIX ON HOLD
- Deck-in-Url trimmed at first card - cant reproduce in dev environment

# FEATURES
- Inventory 'target' q-ty -> for design consideration
- Search in TDA on mobile
- 'Not' twd/pda tags search

# FEATURES ON HOLD
- TWD search with % V5-compatibility -> after BCP clarify V5
- Deck details show % V5-compatibility -> after BCP clarify V5
- Indicator of inventory-perfect decks in selector -> performance issue for many decks
- Draft Cube support -> when draft cube info is available

# TECH IMPROVEMENTS
- Remove legacy polyfills (groupBy 2024-11-30 87.24%, 2024-12-12 89.08%)
- Refactor components with default '{}' prop
- Refactor with useCallbacks
  - Pda/Tda/TwdResult
  - ResultModal not to trigger rerender
