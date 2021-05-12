# FIX
* TWD location/winner form reset
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Scroll modal for deck through library + crypt
* Error in twd sanitizeTwd with del (deck['description'])
* InventoryMode error in twd bytypes cards
* Increase quantity of missing card in inventory
* Inventory mode in Deck card modal - no results
* Inventory mode in Crypt/Library - no highlight of missing if 0 quantity
* Add popover in Deck on quantity to show inventory popover (in inventory mode)
* Add popover in Inventory to Used column (same as for quantity)

# FIX MOBILE

# FEATURES
* If no results but url on mobile to run search
* Create revocable link to Inventory
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Inventory add from precon
* Inventory add from decks with select form (mark decks already in)
* Offline PWA support
* Card modal popovers in text/rulings like /Card Name/ or {Card Name}
* Search for similar TWD decks
* Keyboard navigation + swipes in card view
* Localized proxies
* Improve add-from-deck to inventory menu

# MAYBE LATER FEATURES
* Update cardbase script
* Documentation on updates / update script

# IMPROVE TECHNOLOGY - FRONTEND
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Check frontend input (quantity/cardid) on backend
* Update API endpoints
* Add error codes to return
* Unify tests for current_user
