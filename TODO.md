# FIX
- Move first getDecks and getInventory call too whoAmI to make one initial setState

# FEATURES
- Export all in xlsx and csv

# MAYBE LATER FEATURES
- Comments for PDA
- Sorting by new/favorites/comments in PDA/TWD
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move search to frontend
- Move export to frontend
- Move import to frontend
- Transit from useContext to Recoil
- Reduce re-renders
- Reduce first loading (Google PageSpeed Insights)

# IMPROVE TECHNOLOGY - BACKEND

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- move showFloatingButtons state into the context
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- refactor resultTrClass toggle
- check InventoryLibrary to refactor
