#!/bin/bash
# Download resources for cards/twda updates
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/vtescrypt.csv -O vtescrypt.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/vteslib.csv -O vteslib.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/vteslibmeta.csv -O vteslibmeta.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/French/vtescrypt.fr-FR.csv -O vtescrypt.fr-FR.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/French/vteslib.fr-FR.csv -O vteslib.fr-FR.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/Spanish/vtescrypt.es-ES.csv -O vtescrypt.es-ES.csv
wget https://github.com/GiottoVerducci/vtescsv/raw/refs/heads/main/Spanish/vteslib.es-ES.csv -O vteslib.es-ES.csv
wget https://static.krcg.org/data/v5/twda.json -O twda.json
npx @biomejs/biome format --write twda.json
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/groups.yaml -O rulings/groups.yaml
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/references.yaml -O rulings/references.yaml
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/rulings.yaml -O rulings/rulings.yaml
curl https://amaranth.vtes.co.nz/js/pt.cards.pack.js --output amaranth_response.json

# Requires .env to contain CLIENT and SECRET from your api.archon.vekn.net account
if [ -f .env ]; then source .env; fi
TOKEN=$(curl -s -X POST https://api.archon.vekn.net/oauth/token -d grant_type=client_credentials -d client_id=$CLIENT -d client_secret=$SECRET | jq '.access_token')
HEADER="Authorization: Bearer ${TOKEN//\"/}"
curl https://api.archon.vekn.net/v1/export --header "$HEADER" > archon.jsonl.gz
