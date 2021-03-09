# FIX
* Alert message in Deck if wrong url
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* No error on backend for user creation if already exist

# FIX MOBILE
* No autofocus on mobile on quick cards
* Optimize for tablet

# FEATURES
* Create revocable link to Inventory
* Different sets images - vtes.pl
* Always-on opt-in deck-mode \ inventory-mode
* Precon Decks: name, set to description, company from sets.csv
* Precon Decks icons (clan)
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode and set selector
* Show missing cards for inventory
* Popover on precons in modal preview set section
* Quick card to show on single result
* Help popups to Buttons
* Help sections to About/Pages
* Discard feature in Draw

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview (react-swipeable-views?)
* Export inventory to CSV
* Deck export to JOL
* Append deckid to address line (history.push)

# IMPROVE TECHNOLOGY - FRONTEND
* Add access_token to cookies or localStorage
* Forms to React-Hook-Forms / Formik
* Dynamic media query with react-responsive
* Screenshots to Bootstrap/Carousel
* Clear CSS
* Images to avif (fallbacks to webp and jpeg)
* Analytics: posthog
* Tests: cypress / puppeteer
* Sync clients with SSE/WS

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Flask-Restful
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
* Amaranth import - fetch and id convert on backend
