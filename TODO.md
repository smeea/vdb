# FIX
- Merge anonymous import with import
- Ventrue NB precon

# FEATURES
- Export all in xlsx and csv
- Store src (pda/twd) for Recent decks and add TWD/PDA appendix to name in selector
- Add email to account creation
- Add to compare notification/title
- Documentation discoverability (links to pages?)
- Sorting for inventory

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
- Remove 'owner' (use 'is_your' instead) for deck reply
- Remove 'public_child/parent' (use 'is_public' instead) for deck reply

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
