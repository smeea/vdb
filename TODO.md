# FIX
- Review TWDA radar: remove swarm, maybe replace?
- Vertical padding for tags in adv select on mobile (if multi lines)

# FEATURES
- Card q-ty change in autocompletion
- Playtest cards in report only for that round
- New layout for old cards or fallback to scans?
- Non-english images to use webp with fallback image
- Paypal donations

# FEATURES ON HOLD
- TWD search with % V5-compatibility -> after BCP clarify V5
- Deck details show % V5-compatibility -> after BCP clarify V5
- Indicator of inventory-perfect decks in selector -> performance issue for many decks
- Legacy style in PDF select card -> all legacy to be available

# TECH IMPROVEMENTS
- Update to React 19 (useOptimistic, useMemo/useCallback, useContext, use, ref)
- Update to TailwindCSS 4
- Migrate from isWidth to container queries
- Migrate forms to useFormStatus+useActionState
- Remove legacy polyfills when Safari adopts groupBy
