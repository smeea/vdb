import csv
import re
import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


integer_fields = ['Id']
useless_fields = ['Aka', 'Flavor Text', 'Draft']

with open("vteslib.csv", "r", encoding='utf8') as f_csv, open(
        "vteslib.json",
        "w", encoding='utf8') as f_json, open("rulings.json",
                                              "r",
                                              encoding='utf8') as f_rulings:

    rulings = json.load(f_rulings)
    reader = csv.reader(f_csv)
    fieldnames = next(reader)
    csv_cards = csv.DictReader(f_csv, fieldnames)
    cards = []

    for card in csv_cards:

        # Convert some fields values to integers
        for k in integer_fields:
            try:
                card[k] = int(card[k])
            except (ValueError):
                pass

        # ASCII-fication of name
        if card ['Id'] == 101670:
            card['ASCII Name'] = "Sacre-Coeur Cathedral, France"
        else:
            card['ASCII Name'] = letters_to_ascii(card['Name'])

        # Convert sets to dict
        sets = card['Set'].split(', ')
        card['Set'] = {}
        for set in sets:
            if ':' in set:
                set = set.split(':')
            elif '-' in set:
                set = set.split('-')
            card['Set'][set[0]] = set[1]

        # Remove useless fields
        for k in useless_fields:
            del card[k]

        # Remove {} and spaces in []
        card['Card Text'] = re.sub('[{}]', '', card['Card Text'])
        card['Card Text'] = re.sub(r'\[(\w+)\s*(\w*)\]', r'[\1\2]',
                                   card['Card Text'])

        # Add rules to card
        card['Rulings'] = []
        for rule in rulings:
            if rule == card['Name']:
                card['Rulings'] = rulings[rule]

        cards.append(card)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards, f_json, indent=4, separators=(',', ':'))
