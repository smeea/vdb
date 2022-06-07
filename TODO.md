# FIX
- Card image loop if no image available (i.e. /Cards offline search)
- Search on mobile with open url

# FEATURES
- Export all in xlsx and csv
- Embrace-like trait

# MAYBE LATER FEATURES
- Comments for PDA
- Script to update images from static.krcg.org
- Use DTC list from https://docs.google.com/spreadsheets/d/1RmtZqybXQfvohPEs0F043tayv6hSfhFfqWpVeo4wQrc/

# IMPROVE TECHNOLOGY - FRONTEND
- Move export to frontend
- Move import to frontend
- Transit from useContext to Recoil
- Reduce re-renders
- Add "Update (reload page)" button

# IMPROVE TECHNOLOGY - BACKEND
- Remove deprecated search code

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
