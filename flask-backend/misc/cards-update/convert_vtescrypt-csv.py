import csv
import json

disciplines = [
    'Auspex',
    'Abombwe',
    'Animalism',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dementation',
    'Dominate',
    'Fortitude',
    'Melpominee',
    'Mytherceria',
    'Necromancy',
    'Obeah',
    'Obfuscate',
    'Obtenebration',
    'Potence',
    'Presence',
    'Protean',
    'Serpentis',
    'Sanguinus',
    'Spiritus',
    'Temporis',
    'Thanatosis',
    'Thaumaturgy',
    'Quietus',
    'Valeren',
    'Vicissitude',
    'Visceratika',
]

# Groups are not integers because of ANY-group vampires (i.e. Anarch Convert)
integer_fields = ['Id', 'Capacity'] + disciplines
useless_fields = ['Aka', 'Set', 'Artist']

with open("vtescrypt.csv", "r",
          encoding='utf8') as f_csv, open("vtescrypt.json",
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

        # Remove empty disciplines
        del card['Disciplines']
        card['Disciplines'] = {}
        for k, v in card.items():
            if k in disciplines and v > 0:
                card['Disciplines'][k] = v
        for d in disciplines:
            del card[d]

        cards.append(card)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards, f_json, indent=4, separators=(',', ':'))
