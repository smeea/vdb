#!/bin/sh
# Update Card List
python generate_crypt.py
python generate_library.py
python fix_crossrefs.py
python generate_precons.py
mv cardbase_crypt.min.json ../../react-frontend/dist/cardbase_crypt.json
mv cardbase_lib.min.json ../../react-frontend/dist/cardbase_lib.json
mv preconDecks.min.json ../../react-frontend/src/assets/data/preconDecks.json
mv artistsCrypt.min.json ../../react-frontend/src/assets/data/artistsCrypt.json
mv artistsLib.min.json ../../react-frontend/src/assets/data/artistsLib.json
cp cardbase_crypt.json cardbase_lib.json preconDecks.json ../../flask-backend/

# Update Localizations
python generate_localizations.py
mv cardbase_crypt.fr-FR.min.json ../../react-frontend/dist/cardbase_crypt.fr-FR.json
mv cardbase_lib.fr-FR.min.json ../../react-frontend/dist/cardbase_lib.fr-FR.json
mv cardbase_crypt.es-ES.min.json ../../react-frontend/dist/cardbase_crypt.es-ES.json
mv cardbase_lib.es-ES.min.json ../../react-frontend/dist/cardbase_lib.es-ES.json
mv cardbase_crypt.pt-PT.min.json ../../react-frontend/dist/cardbase_crypt.pt-PT.json
mv cardbase_lib.pt-PT.min.json ../../react-frontend/dist/cardbase_lib.pt-PT.json

# Update Amaranth cards-ids (used for import from Amaranth)
python generate_amaranth_id.py
mv amaranth_ids.min.json ../../react-frontend/dist/amaranth_ids.json

# Update TWD and Card recommendations
python generate_twd_decks.py
python generate_twd_cards_compatibility.py
python generate_twd_cards_history.py
cp twd_decks.json twd_locations.json twd_players.json cards_compatibility.json ../../flask-backend/
mv twd_cards_history.min.json ../../react-frontend/dist/twd_cards_history.json
