# FIX
- Iphone clipboard (export deck / copy url)
- Fix ERR_INCOMPLETE_CHUNKED_ENCODING while Proxy
- Crypt sorting in review (works in Deck!)
- Inventory table width for library on desktop & mobile (and q-ty for crypt)

# FEATURES
- Check TWD
- Show changes from base deck in A
- Review to create snapshots (tagged for easier removal)

# MAYBE LATER FEATURES
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move deck/inventory export in excel to frontend
- Move deck/inventory import to frontend
- Move pdf proxy to frontend
- TWD Cards History performance - react-window
- Refactor CSS
- Refactor inventoryDeckAdd/Delete, inventoryAddTo/DeleteFromState for +-qty
- Refactor inventoryCryptSort and resultCryptSort (same for Library)

# IMPROVE TECHNOLOGY - BACKEND
- Improve API endpoints - decks
- Refactor (merge?) deck create and clone and import
- Refactor (merge?) branch create and branch_import

# IMPROVE PWA
- Open urls in app by default (handle_links)

# REFACTORING TODO - Andrey
- remove Item UI from table into respective Item component.
- check InventoryLibrary to refactor
