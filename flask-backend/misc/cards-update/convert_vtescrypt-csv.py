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

virtues = {
    'def': 'Defense',
    'inn': 'Innocence',
    'jud': 'Justice',
    'mar': 'Martyrdom',
    'red': 'Redemption',
    'ven': 'Vengeance',
    'vis': 'Vision',
}

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ['Id', 'Capacity'] + disciplines
useless_fields = ['Aka', 'Artist']

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

        # Remove empty disciplines/virtues
        if card['Type'] == 'Imbued':
            card['Virtues'] = {}
            for virtue in virtues:
                if virtue in card['Disciplines']:
                    card['Virtues'][virtues[virtue]] = 1

            del card['Disciplines']
            card['Disciplines'] = card['Virtues']
            del card['Virtues']
            for d in disciplines:
                del card[d]
        elif card['Type'] == 'Vampire':
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
