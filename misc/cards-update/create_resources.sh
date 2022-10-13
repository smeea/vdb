#!/bin/sh
# Update Card List
echo '{}' > cardbase_crypt_playtest.min.json
echo '{}' > cardbase_lib_playtest.min.json
python generate_crypt.py
python generate_library.py
python fix_crossrefs.py
python generate_playtest_precons.py
python generate_precons.py
mv cardbase_crypt.min.json ../../frontend/dist/cardbase_crypt.json
mv cardbase_lib.min.json ../../frontend/dist/cardbase_lib.json
mv cardbase_crypt_playtest.min.json ../../frontend/dist/cardbase_crypt_playtest.json
mv cardbase_lib_playtest.min.json ../../frontend/dist/cardbase_lib_playtest.json
mv preconDecks.min.json ../../frontend/src/assets/data/preconDecks.json
mv artistsCrypt.min.json ../../frontend/src/assets/data/artistsCrypt.json
mv artistsLib.min.json ../../frontend/src/assets/data/artistsLib.json

# Update Localizations
python generate_localizations.py
mv cardbase_crypt.fr-FR.min.json ../../frontend/dist/cardbase_crypt.fr-FR.json
mv cardbase_lib.fr-FR.min.json ../../frontend/dist/cardbase_lib.fr-FR.json
mv cardbase_crypt.es-ES.min.json ../../frontend/dist/cardbase_crypt.es-ES.json
mv cardbase_lib.es-ES.min.json ../../frontend/dist/cardbase_lib.es-ES.json
mv cardbase_crypt.pt-PT.min.json ../../frontend/dist/cardbase_crypt.pt-PT.json
mv cardbase_lib.pt-PT.min.json ../../frontend/dist/cardbase_lib.pt-PT.json

# Update Amaranth cards-ids (used for import from Amaranth)
python generate_amaranth_id.py
mv amaranth_ids.min.json ../../frontend/dist/amaranth_ids.json

# Update TWD and Card recommendations
python generate_twd_decks.py
python generate_twd_cards_compatibility.py
python generate_twd_cards_history.py
cp twd_decks.json twd_locations.json twd_players.json cards_compatibility.json ../../backend/
mv twd_cards_history.min.json ../../frontend/dist/twd_cards_history.json
