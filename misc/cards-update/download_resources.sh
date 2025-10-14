#!/bin/sh
# Download resources for cards/twda updates
wget https://raw.githubusercontent.com/GiottoVerducci/vtescsv/refs/heads/main/vtescrypt.csv -O vtescrypt.csv
wget https://raw.githubusercontent.com/GiottoVerducci/vtescsv/refs/heads/main/vteslib.csv -O vteslib.csv
wget https://raw.githubusercontent.com/GiottoVerducci/vtescsv/refs/heads/main/vteslibmeta.csv -O vteslibmeta.csv

wget https://www.vekn.net/images/stories/downloads/french/vtescsv_utf8.fr-FR.zip -O vtescsv_utf8.fr-FR.zip
wget https://www.vekn.net/images/stories/downloads/spanish/vtescsv_utf8.es-ES.zip -O vtescsv_utf8.es-ES.zip
unzip -q -o vtescsv_utf8.fr-FR.zip
unzip -q -o vtescsv_utf8.es-ES.zip
rm vtescsv_utf8.fr-FR.zip vtescsv_utf8.es-ES.zip vtessets.fr-FR.csv vtessets.es-ES.csv

wget https://static.krcg.org/data/twda.json -O twda.json
npx @biomejs/biome format --write twda.json
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/groups.yaml -O rulings/groups.yaml
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/references.yaml -O rulings/references.yaml
wget https://raw.githubusercontent.com/vtes-biased/vtes-rulings/refs/heads/main/rulings/rulings.yaml -O rulings/rulings.yaml

curl https://amaranth.vtes.co.nz/js/pt.cards.pack.js --output amaranth_response.json
