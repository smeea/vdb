#!/bin/sh
# Update Card List
python generate_crypt.py
python generate_library.py
python fix_crossrefs.py
python generate_precons.py
cp cardbase_crypt.json cardbase_lib.json ../../react-frontend/dist/
cp cardbase_crypt.json cardbase_lib.json vtescrypt.json vteslib.json ../../flask-backend/
cp artistsCrypt.json artistsLib.json ../../react-frontend/src/components/forms_data/
cp preconDecks.json ../../react-frontend/src/assets/data/

# Update Localizations
python generate_localizations.py
cp cardbase_crypt.fr-FR.json cardbase_lib.fr-FR.json cardbase_crypt.es-ES.json cardbase_lib.es-ES.json  ../../react-frontend/dist/

# Update Amaranth cards-ids (used for import from Amaranth)
python generate_amaranth_id.py
cp amaranth_ids.json ../../react-frontend/dist/

# Update TWD and Card recommendations
python generate_twd_decks.py
python generate_twd_cards_compatibility.py
cp twdDecks.json twdDecksById.json twdLocations.json twdPlayers.json cardsCompatibility.json ../../flask-backend/
