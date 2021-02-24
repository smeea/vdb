# FIX
* Alert message in Deck if wrong url
* Autofocus to modals (import)
* Deck select after clone
* Clone button in TWD to show effect
* TWD location/winner form reset
* Trim deck description for Deck-In-URL
* Precon & Set search filters - KoT/HTTB/Etc by BCP to BCP-only filters & Anthology:LARP remove from BCP-only

# FIX MOBILE
* Add card to deck from mobile to close modal
* Chance popover in draw in mobile
* Add to crypt/library in button to floating in Deck on mobile
* Result table css+classes for mobile

# FEATURES
* Deck revisions
* Create revocable link to Inventory
* Different sets images
* Always-on opt-in deck-mode \ inventory-mode
* Precon Decks: name, set to description, company from sets.csv
* Rulings from KRCG
* Export to CSV
* Inventory data in TWD browser

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates
* Makefile for updates
* Quick card check
* Go to next card in modal preview

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

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Flask-Restful
* Check frontend input (quantity/cardid/etc) on backend
