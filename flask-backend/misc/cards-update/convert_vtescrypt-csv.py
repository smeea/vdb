import csv
import re
import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


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
    'jud': 'Judgment',
    'mar': 'Martyrdom',
    'red': 'Redemption',
    'ven': 'Vengeance',
    'vis': 'Vision',
}

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ['Id', 'Capacity'] + disciplines
useless_fields = ['Aka']

with open("vtescrypt.csv", "r",
          encoding='utf8') as f_csv, open(
              "vtescrypt.json",
              "w", encoding='utf8') as f_json, open(
                  "cardbase_crypt.json",
                  "w", encoding='utf8') as cardbase_file, open(
                      "vtes.json",
                      "r", encoding='utf8') as krcg_file:

    krcg_cards = json.load(krcg_file)
    reader = csv.reader(f_csv)
    fieldnames = next(reader)
    csv_cards = csv.DictReader(f_csv, fieldnames)
    cards = []
    card_base = {}

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
            if ':' in set:
                set = set.split(':')
            elif '-' in set:
                set = set.split('-')
            card['Set'][set[0]] = set[1]

        # ASCII-fication of name

        if card['Id'] == 201528:
            card['ASCII Name'] = "Boleslaw Gutowski"
        else:
            card['ASCII Name'] = letters_to_ascii(card['Name'])

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

        card['Artist'] = re.split('; | & ', card['Artist'])

        # Remove {} and spaces in []
        card['Card Text'] = re.sub('[{}]', '', card['Card Text'])
        card['Card Text'] = re.sub(r'\[(\w+)\s*(\w*)\]', r'[\1\2]',
                                   card['Card Text'])

        # Add rules to card
        card['Rulings'] = []
        for c in krcg_cards:
            if c['id'] == card['Id'] and 'rulings' in c:
                for rule in c['rulings']['text']:
                    if match := re.match(r'(.*?)\[... \S+\].*', rule):
                        text = match.group(1)
                        card['Rulings'].append({
                            'text': text,
                            'refs': {},
                        })

                for id in c['rulings']['links'].keys():
                    for i, rule in enumerate(c['rulings']['text']):
                        if id in rule:
                            card['Rulings'][i]['refs'][id] = c['rulings']['links'][id]

        cards.append(card)
        card_base[card['Id']] = card

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards, f_json, indent=4, separators=(',', ':'))
    json.dump(card_base, cardbase_file, indent=4, separators=(',', ':'))
