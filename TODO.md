# FIX
- Review TWDA radar: remove swarm, maybe replace?
- Wall of Filth - Caine
- Conviction X cost (living wood staff)
- Fix legacy filenames

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
- HeadlessUI:
  - Forms to Fieldset
  - Input type=checkbox to Checkbox
- Remove legacy polyfills (2024-11-30 groupBy 87.24%)
- Refactor useFetch to useSWR (test on playtest reports)
- Add extra modal size (~900...1000px) and refactor using it (step down to xs?)
