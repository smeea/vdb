import csv
import json

integer_fields = ['Id']
useless_fields = ['Aka', 'Flavor Text', 'Artist', 'Draft']

with open("vteslib.csv",
          "r", encoding='utf8') as f_csv, open("vteslib.json",
                                               "w",
                                               encoding='utf8') as f_json:
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

        # Convert sets to dict
        sets = card['Set'].split(', ')
        card['Set'] = {}
        for set in sets:
            # print(set.split(':'))
            if ':' in set:
                set = set.split(':')
                # print(set[0], set[1])
            elif '-' in set:
                set = set.split('-')
            card['Set'][set[0]] = set[1]

        # Remove useless fields
        for k in useless_fields:
            del card[k]

        cards.append(card)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards, f_json, indent=4, separators=(',', ':'))
