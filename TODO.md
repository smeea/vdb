# FIX
* Alert message in Deck if wrong url
* Autofocus to modals (import)
* Deck select after clone
* TWD location/winner form reset
* Set search filters - HTTPAnthology, BCP
* Precon search - HttB
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Test history.push with deckid

# FIX MOBILE
* Add card to deck from mobile to restore focus to input
* Result table css+classes for mobile

# FEATURES
* Deck revisions
* Create revocable link to Inventory
* Different sets images
* Always-on opt-in deck-mode \ inventory-mode
* Precon Decks: name, set to description, company from sets.csv
* Rulings from KRCG
* Inventory data in TWD browser
* Show search results not in inventory (opacity/gray?)
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Capacity pre-calc for twd and checkbox brackets
* Amaranth import - fetch and id convert on backend

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview
* Export inventory to CSV
* Full Amaranth account copy

# IMPROVE TECHNOLOGY - FRONTEND
* Add access_token to cookies or localStorage
* Forms to React-Hook-Forms / Formik
* Dynamic media query with react-responsive
* Swipe search and deck on mobile - react-swipeable-views?
* Swipe in card modal image-description
* Screenshots to Bootstrap/Carousel
* Online/Offline detection
* Clear CSS
* Images to avif (fallbacks to webp and jpeg)
* Analytics: posthog
* Tests: cypress / puppeteer

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Flask-Restful
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
