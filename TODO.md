# FIX
- Inventory bug for precon (also test for twd and shared)
- Inventory missing to respect discipline filter
- Fix dropdown button (name and drop direction) for Export
- Inventory bad clans in crypt for problem cards
- Inventory problem cards (in discord Hobbesgoblin)
- Inventory mode export for missing cards

# FEATURES
- Localized proxies
- Export all in xlsx and csv
- Links to custom deck
- Export missing in Inventory
- Add prefers-color-scheme

# BIG FEATURES
- Search for similar TWD decks
- Public deck archive

# MOBILE FEATURES

# MAYBE LATER FEATURES
- Documentation on updates
- Script to update images/rulings/twd from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Sync with websockets
- Move search to frontend
- Move export to frontend
- Move import to frontend

# IMPROVE TECHNOLOGY - BACKEND
- Check frontend input (quantity/cardior codes to return)

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- move showFloatingButtons state into the context
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- refactor resultTrClass toggle
- check InventoryLibrary to refactor
