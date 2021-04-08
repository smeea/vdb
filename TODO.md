# FIX
* Quick card to show on single result
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Restyle card quantity in Inventory
* Scroll modal for deck through library + crypt

# FIX MOBILE
* If no results but url on mobile to run search
* Optimize for tablet
* Inventory-mode on mobile in Deck

# FEATURES
* Create revocable link to Inventory
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Inventory add from precon
* Popover on precons in modal preview set section
* Offline PWA support

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
