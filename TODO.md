# FIX
* TWD location/winner form reset
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Scroll modal for deck through library + crypt

# FIX MOBILE
* Optimize for tablet

# FEATURES
* Quick card to show on single result
* If no results but url on mobile to run search
* Create revocable link to Inventory
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Inventory add from precon
* Offline PWA support
* Card modal popovers in text/rulings like /Card Name/ or {Card Name}

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Export inventory to CSV / .ods
* Deck export to JOL

# IMPROVE TECHNOLOGY - FRONTEND
* Tests: cypress
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
* Unify tests for current_user
