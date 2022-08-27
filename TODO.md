# FIX
- Iphone clipboard (export deck / copy url)
- Fix ERR_INCOMPLETE_CHUNKED_ENCODING while Proxy
- Crypt sorting in review (works in Deck!)

# FEATURES
- Check TWD
- Show changes from base deck in PDA
- Sort for TWD Cards history
- Language-sensitive export

# MAYBE LATER FEATURES
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move deck/inventory export in csv/excel to frontend
- Move deck/inventory import to frontend
- Move pdf proxy to frontend
- TWD Cards History performance - react-window
- Refactor CSS
- Refactor inventoryDeckAdd/Delete, inventoryAddTo/DeleteFromState for +-qty

# IMPROVE TECHNOLOGY - BACKEND
- Improve API endpoints - decks
- Refactor (merge?) deck create and clone and import
- Refactor (merge?) branch create and branch_import

# IMPROVE PWA
- Open urls in app by default (handle_links)

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
