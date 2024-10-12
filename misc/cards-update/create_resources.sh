#!/bin/sh
# Update Card List
echo '{}' > playtest/cardbase_crypt_playtest.min.json
echo '{}' > playtest/cardbase_lib_playtest.min.json
python generate_crypt.py
python generate_library.py
python fix_crossrefs.py
python generate_playtest_precons.py
python generate_precons.py
mv cardbase_crypt.min.json ../../frontend/public/data/cardbase_crypt.json
mv cardbase_lib.min.json ../../frontend/public/data/cardbase_lib.json
mv playtest/cardbase_crypt_playtest.min.json ../../frontend/public/data/cardbase_crypt_playtest.json
mv playtest/cardbase_lib_playtest.min.json ../../frontend/public/data/cardbase_lib_playtest.json
mv precon_decks.min.json ../../frontend/public/data/precon_decks.json
mv artistsCrypt.min.json ../../frontend/src/assets/data/artistsCrypt.json
mv artistsLib.min.json ../../frontend/src/assets/data/artistsLib.json

# Update Localizations
python generate_localizations.py
mv cardbase_crypt.fr-FR.min.json ../../frontend/public/data/cardbase_crypt.fr-FR.json
mv cardbase_lib.fr-FR.min.json ../../frontend/public/data/cardbase_lib.fr-FR.json
mv cardbase_crypt.es-ES.min.json ../../frontend/public/data/cardbase_crypt.es-ES.json
mv cardbase_lib.es-ES.min.json ../../frontend/public/data/cardbase_lib.es-ES.json
mv cardbase_crypt.pt-PT.min.json ../../frontend/public/data/cardbase_crypt.pt-PT.json
mv cardbase_lib.pt-PT.min.json ../../frontend/public/data/cardbase_lib.pt-PT.json

# Update Amaranth cards-ids (used for import from Amaranth)
python generate_amaranth_id.py
mv amaranth_ids.min.json ../../frontend/public/data/amaranth_ids.json

# Update TWD and Card recommendations
python generate_twd_decks.py
python generate_twd_cards_compatibility.py
python generate_twd_cards_history.py
cp twd_decks.json twd_locations.json twd_players.json cards_compatibility.json ../../backend/
mv twd_cards_history.min.json ../../frontend/public/data/twd_cards_history.json
