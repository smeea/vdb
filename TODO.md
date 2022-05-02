# FIX
- Long deck name in deck selector (in decks and diff)
- ND in Library info
- Merge anonymous import with import
- Import with trailing space (maybe rework export to not add it?)
- Deleting deck (test)

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
- Refactor setDecks calls (import/create/clone) into AddDeckToState

# IMPROVE TECHNOLOGY - BACKEND

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- move showFloatingButtons state into the context
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- refactor resultTrClass toggle
- check InventoryLibrary to refactor
