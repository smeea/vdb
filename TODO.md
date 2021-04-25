# FIX
* TWD location/winner form reset
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Scroll modal for deck through library + crypt
* Click on burned card from draw to open modal
* Error in twd sanitizeTwd with del (deck['description'])

# FIX MOBILE
* Optimize for tablet

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
