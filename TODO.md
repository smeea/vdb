# FIX
- Iphone clipboard (export deck / copy url)
- Fix ERR_INCOMPLETE_CHUNKED_ENCODING while Proxy

# FEATURES
- Check TWD
- Show changes from base deck in PDA
- Filter for TWD Card history
- Sort for TWD Cards history
- Review deck (like Compare but without actually creating new deck on the server)
- Compare mode to add description of what is happening and calculate diff opposite way

# MAYBE LATER FEATURES
- Comments for PDA
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move deck/inventory export in csv/excel to frontend
- Move deck/inventory import to frontend
- TWD Cards History performance - react-window
- Remove useless useEffects - https://beta.reactjs.org/learn/you-might-not-need-an-effect
- Refactor sort functions used in other components (DRY for common like byName)
- Refactor CSS

# IMPROVE TECHNOLOGY - BACKEND
- Improve API endpoints - inventory
- Improve API endpoints - decks

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
