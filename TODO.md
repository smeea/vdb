# FIX
- Iphone clipboard (export deck / copy url)
- Refactor DeckTogglePublicButton and DeckPublicButton

# FEATURES
- Check TWD
- Show changes from base deck in PDA
- Filter card history as in inventory
- Sort cards history
- Floating buttons to switch crypt/library in cards history

# MAYBE LATER FEATURES
- Comments for PDA
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move deck/inventory export in csv/excel to frontend
- Move deck/inventory import to frontend
- TWD Cards History performance - react-window
- Remove useless useEffects - https://beta.reactjs.org/learn/you-might-not-need-an-effect

# IMPROVE TECHNOLOGY - BACKEND
- Improve API endpoints - inventory
- Improve API endpoints - decks
- Improve API endpoints - account

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
