# FIX
* Alert message in Deck if wrong url
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Save scrolling position
* Export from Deck-in-URL

# FIX MOBILE
* Optimize for tablet
* Inventory-mode & Add-mode to burger menu?
* Hide Missing in Inventory in Crypt/Library if inventory exist

# FEATURES
* Create revocable link to Inventory
* Different sets images - vtes.pl
* Always-on opt-in deck-mode \ inventory-mode
* Precon Decks: name, set to description, company from sets.csv
* Precon Decks icons (clan)
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Popover on precons in modal preview set section
* Quick card to show on single result
* Help sections to About/Pages
* Create account proposal in Decks for unlogged user
* Add card by word prefixes (Vincent Ripoll PR)

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview (react-swipeable-views?)
* Export inventory to CSV
* Deck export to JOL
* Append deckid to address line (history.push)

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
