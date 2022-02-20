# FIX
- Scale to Inventory without % value
- Unify API outcome for decks (crypt+library into cards)
- Change Bundle precon names to set name

# FEATURES
- Export all in xlsx and csv
- Multi-forms with text and logic
- Documentation on PDA
- Favorites for PDA
- Add tags to filter by click

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

# IMPROVE TECHNOLOGY - BACKEND
- Add migration script to set default starting PickleType values for new empty db

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- move showFloatingButtons state into the context
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- refactor resultTrClass toggle
- check InventoryLibrary to refactor
