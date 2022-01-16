import csv
import re
import json
import unicodedata

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ['Id']
useless_fields = ['Name', 'Adv']

languages = ['es-ES', 'fr-FR']

for lang in languages:
    for i in ['crypt', 'lib']:
        filename_in = f"vtes{i}.{lang}.csv"
        filename_out = f"cardbase_{i}.{lang}.json"

        with open(filename_in, "r", encoding='utf8') as f_in, open(filename_out, "w", encoding='utf8') as f_out:

            reader = csv.reader(f_in)
            fieldnames = next(reader)
            csv_cards = csv.DictReader(f_in, fieldnames)
            cards_localized = {}

            for card in csv_cards:
                card['Card Text'] = re.sub('[{}]', '', card['Card Text'])
                card['Card Text'] = re.sub(r'\[(\w+)\s*(\w*)\]', r'[\1\2]',
                                           card['Card Text'])
                cards_localized[card['Id']] = {
                    "Name": card[f"Name {lang}"] if card[f"Name {lang}"] else card["Name"],
                    "Card Text": card['Card Text'],
                }

            # json.dump(cards, f_out, separators=(',', ':'))
            # Use this instead, for output with indentation (e.g. for debug)
            json.dump(cards_localized, f_out, indent=4, separators=(',', ':'))
