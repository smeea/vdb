# FIX
- Iphone clipboard (export deck / copy url)
- Refactor DeckTogglePublicButton and DeckPublicButton
- Fix ERR_INCOMPLETE_CHUNKED_ENCODING while Proxy
- White border for Accordion Buttons (Hall of Fame)
- Deck export in TWD without hints

# FEATURES
- Check TWD
- Show changes from base deck in PDA
- Filter for TWD Card history
- Sort for TWD Cards history

# MAYBE LATER FEATURES
- Comments for PDA
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move deck/inventory export in csv/excel to frontend
- Move deck/inventory import to frontend
- TWD Cards History performance - react-window
- Remove useless useEffects - https://beta.reactjs.org/learn/you-might-not-need-an-effect
- Refactor sort functions used in other components (DRY for common like byName)
- Refactor useDeckCrypt from useEffect to useMemo
- Refactor CSS

# IMPROVE TECHNOLOGY - BACKEND
- Improve API endpoints - inventory
- Improve API endpoints - decks
- Improve API endpoints - account
- Move Hall of Fame Players data to Frontend

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
