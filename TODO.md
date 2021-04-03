# FIX
* Quick card to show on single result
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Chance of draw to documentation

# FIX MOBILE
* If no results but url on mobile to run search
* Optimize for tablet
* Inventory-mode on mobile in Deck

# FEATURES
* Create revocable link to Inventory
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Popover on precons in modal preview set section
* TWD library disciplines to match crypt disciplines
* Offline PWA support
* Draw table for full deck

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview (react-swipeable-views?) - with quantity in Deck
* Export inventory to CSV
* Deck export to JOL

# IMPROVE TECHNOLOGY - FRONTEND
* Tests: cypress / puppeteer
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
