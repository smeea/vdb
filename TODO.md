# FIX
* Quick card to show on single result
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Bundle & Misc icons to Precon Select

# FIX MOBILE
* Optimize for tablet

# FEATURES
* Create revocable link to Inventory
* Different sets images - vtes.pl
* Precon Decks: name, set to description, company from sets.csv
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Popover on precons in modal preview set section
* Help sections to About/Pages
* Search criteries store/get from URL

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview (react-swipeable-views?)
* Export inventory to CSV
* Deck export to JOL

# IMPROVE TECHNOLOGY - FRONTEND
* Screenshots to Bootstrap/Carousel
* Clear CSS
* Analytics: posthog
* Tests: cypress / puppeteer
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Flask-Restful
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
* Amaranth import - fetch and id convert on backend
