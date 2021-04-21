import csv
import re
import json
import unicodedata

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ['Id']
useless_fields = ['Name', 'Adv']

languages = ['es-ES', 'fr-FR']


for i in ['crypt', 'lib']:
    filename_orig = f"cardbase_{i}.json"
    filename_en = f"cardbase_{i}.en-EN.json"

    with open(filename_orig, "r", encoding='utf8') as f_orig, open(filename_en, "w", encoding='utf8') as f_en:
        card_base = json.load(f_orig)
        cards_en = {}

        for lang in languages:
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

                    if card['Id'] not in cards_en:
                        cards_en[card['Id']] = {
                            "Name": card_base[card['Id']]['Name'],
                            "Card Text": card_base[card['Id']]['Card Text'],
                        }

                # json.dump(cards, f_out, separators=(',', ':'))
                # Use this instead, for output with indentation (e.g. for debug)
                json.dump(cards_localized, f_out, indent=4, separators=(',', ':'))

        json.dump(cards_en, f_en, indent=4, separators=(',', ':'))
