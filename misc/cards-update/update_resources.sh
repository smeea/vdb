#!/bin/sh
# Update Card List
python generate_crypt.py
python generate_library.py
python fix_crossrefs.py
python generate_precons.py
cp cardbase_crypt.json cardbase_lib.json ../../react-frontend/dist/
cp cardbase_crypt.json cardbase_lib.json preconDecks.json ../../flask-backend/
cp preconDecks.json artistsCrypt.json artistsLib.json ../../react-frontend/src/assets/data/

# Update Localizations
python generate_localizations.py
cp cardbase_crypt.fr-FR.json cardbase_lib.fr-FR.json cardbase_crypt.es-ES.json cardbase_lib.es-ES.json  ../../react-frontend/dist/

# Update Amaranth cards-ids (used for import from Amaranth)
python generate_amaranth_id.py
cp amaranth_ids.json ../../react-frontend/dist/

# Update TWD and Card recommendations
python generate_twd_decks.py
python generate_twd_cards_compatibility.py
cp twd_decks.json twd_decks_by_id.json twd_locations.json twd_players.json cards_compatibility.json ../../flask-backend/
