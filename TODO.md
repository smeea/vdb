# FIX
- Bad imports for anonymous import
- Virtues in detailed disciplines info
- Merge backend and frontend cardbases (by adding TWD to frontend for search) + unify 'ANY' group
- Change BTC address from legacy format
- Icon alignment in main menu on mobile
- Info button width on mobile in crypt results with few groups
- Padding for buttons in /cards on mobile
- Feld import in csv (discord)

# FEATURES
- Export all in xlsx and csv
- Cards compare
- Add entered account to password reset email

# MAYBE LATER FEATURES
- Search for similar PDA/TWD decks
- Pagination for New
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
