# FIX
- Merge anonymous import with import
- Floating buttons on narrow screen (but not mobile) => change isMobile && showFloating to isNarrow
- Move anthology larp to promo

# FEATURES
- Export all in xlsx and csv
- Store src (pda/twd) for Recent decks and add TWD/PDA appendix to name in selector
- Add email to account creation
- Accept The before and after card name for import
- Add to inventory from precon counter

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
- move showFloatingButtons state into the context
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- refactor resultTrClass toggle
- check InventoryLibrary to refactor
