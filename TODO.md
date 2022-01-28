# FIX
- Inventory bug for precon (also test for twd and shared)
- Fix dropdown button (name and drop direction) for Export

# FEATURES
- Localized proxies
- Export all in xlsx and csv
- Add prefers-color-scheme
- Multi text filters

# BIG FEATURES
- Search for similar TWD decks
- Public deck archive

# MOBILE FEATURES

# MAYBE LATER FEATURES
- Script to update images from static.krcg.org

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
