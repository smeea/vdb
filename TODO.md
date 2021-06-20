# FIX
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Scroll modal for deck through library + crypt
* Error in twd sanitizeTwd with del (deck['description'])
* Autoswitch to imported deck
* Fix inventory card quantity to sync in new card window

# FIX MOBILE
* Card modal popovers in text/rulings like /Card Name/ or {Card Name} to open on mobile

# FEATURES
* Update cardbase script
* Create revocable link to Inventory
* Show missing cards for inventory
* Search for similar TWD decks
* Localized proxies
* Narrow search by clicks (i.e. twd author)
* Tags to deck main window

# MOBILE FEATURES
* If no results but url on mobile to run search
* Offline PWA support

# MAYBE LATER FEATURES
* Documentation on updates / update script

# IMPROVE TECHNOLOGY - FRONTEND
* Sync: websockets
* Reduce hook calls (login, decks, inventory)

# IMPROVE TECHNOLOGY - BACKEND
* Check frontend input (quantity/cardid) on backend
* Update API endpoints
* Add error codes to return
* Unify tests for current_user
