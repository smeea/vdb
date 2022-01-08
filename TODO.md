# FIX
- Change url to empty on last form changed to 'any'
- Inventory bug for precon (also test for twd and shared)
- Inventory missing to respect discipline filter
- Recreate cardbase with 'any' Group and change 'ANY' to variable in crypt group calculation

# FEATURES
- Localized proxies
- Export all in xlsx and csv
- Links to custom deck
- Crypt discipline distribution
- Export missing in Inventory

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
