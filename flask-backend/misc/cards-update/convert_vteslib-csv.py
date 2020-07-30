import csv
import json

integer_fields = ['Id']
useless_fields = ['Aka', 'Set', 'Flavor Text', 'Artist', 'Draft']

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

        # Remove useless fields
        for k in useless_fields:
            del card[k]

        cards.append(card)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards, f_json, indent=4, separators=(',', ':'))
