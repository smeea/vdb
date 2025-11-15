#!/bin/bash
if [ -f ../../backend/.env ]; then source ../../backend/.env; fi

# Check playtest files
mkdir -p playtest/images
if [ ! -f playtest/vtescrypt_playtest.csv ]; then touch playtest/vtescrypt_playtest.csv; fi
if [ ! -f playtest/vteslib_playtest.csv ]; then touch playtest/vteslib_playtest.csv; fi
if [ ! -f playtest/precons.json ]; then echo '{}' > playtest/precons.json; fi

# Update Card List
uv run generate_rulings.py
uv run generate_crypt.py
uv run generate_library.py
uv run fix_crossrefs.py
uv run generate_two_players.py
uv run generate_playtest_precons.py
uv run generate_precons.py
mv cardbase_crypt.min.json ../../frontend/public/data/cardbase_crypt.json
mv cardbase_lib.min.json ../../frontend/public/data/cardbase_lib.json
mv playtest/cardbase_crypt_playtest.min.json ../../frontend/public/data/cardbase_crypt_playtest_$PLAYTEST_KEY.json
mv playtest/cardbase_lib_playtest.min.json ../../frontend/public/data/cardbase_lib_playtest_$PLAYTEST_KEY.json
mv precon_decks.min.json ../../frontend/public/data/precon_decks.json
mv playtest/precon_decks_playtest.min.json ../../frontend/public/data/precon_decks_playtest_$PLAYTEST_KEY.json
cp artistsCrypt.json ../../frontend/src/assets/data/artistsCrypt.json
cp artistsLib.json ../../frontend/src/assets/data/artistsLib.json
if [ ! -z "$( ls -A playtest/images )" ]; then cp playtest/images/* ../../frontend/public/images/cards/playtest; fi

# Update Localizations
uv run generate_localizations.py
mv cardbase_crypt.fr-FR.min.json ../../frontend/public/data/cardbase_crypt.fr-FR.json
mv cardbase_lib.fr-FR.min.json ../../frontend/public/data/cardbase_lib.fr-FR.json
mv cardbase_crypt.es-ES.min.json ../../frontend/public/data/cardbase_crypt.es-ES.json
mv cardbase_lib.es-ES.min.json ../../frontend/public/data/cardbase_lib.es-ES.json
mv cardbase_crypt.pt-PT.min.json ../../frontend/public/data/cardbase_crypt.pt-PT.json
mv cardbase_lib.pt-PT.min.json ../../frontend/public/data/cardbase_lib.pt-PT.json

# Update Amaranth cards-ids (used for import from Amaranth)
uv run generate_amaranth_id.py
mv amaranth_ids.min.json ../../frontend/public/data/amaranth_ids.json

# Update TWD and Card recommendations
uv run generate_twd_decks.py
node generate_twd_decks_tags.js
npx @biomejs/biome format --write twd_decks.json
uv run generate_twd_cards_compatibility.py
uv run generate_twd_cards_history.py
cp twd_decks.json twd_locations.json twd_players.json cards_compatibility.json ../../backend/
mv twd_cards_history.min.json ../../frontend/public/data/twd_cards_history.json
