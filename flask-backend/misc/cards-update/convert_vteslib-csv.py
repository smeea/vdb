import csv
import re
import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


integer_fields = ['Id']
useless_fields = ['Aka', 'Flavor Text', 'Draft']

with open("vteslib.csv", "r",
          encoding='utf8') as f_csv, open(
              "vteslib.json",
              "w", encoding='utf8') as f_json, open(
                  "cardbase_lib.json",
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

        # ASCII-fication of name
        if card ['Id'] == 101670:
            card['ASCII Name'] = "Sacre-Coeur Cathedral, France"
        elif card ['Id'] == 100130:
            card['ASCII Name'] = "Bang Nakh - Tiger's Claws"
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

            card['Set'][set[0]] = {}

            precons = set[1].split('/')

            # Fix for KoT & HttB Reprints (marked in CSV as KoT, but have only bundles named "A" or "B" not existing in original KoT)
            if set[0] in ["KoT", "HttB"]:
                counter = 0
                for precon in precons:
                    if re.match(r'(A|B)[0-9]?', precon):
                        counter += 1

                if counter > 0:
                    card['Set'][f"{set[0]}R"] = {}
                if counter < len(precons):
                    card['Set'][set[0]] = {}

            else:
                card['Set'][set[0]] = {}

            for precon in precons:
                if set[0] in ["KoT", "HttB"] and (m := re.match(r'^(A|B)([0-9]+)?', precon)):
                    s = f"{set[0]}R"
                    if m.group(2):
                        card['Set'][s][m.group(1)] = m.group(2)
                    else:
                        card['Set'][s][m.group(1)] = 1

                else:
                    if m := re.match(r'^(\D+)([0-9]+)?', precon):
                        if m.group(1) in ["C", "U", "R", "V", "DTC", "Promo"]:
                            card['Set'][set[0]][m.group(1)] = True
                        elif m.group(2):
                            card['Set'][set[0]][m.group(1)] = m.group(2)
                        else:
                            card['Set'][set[0]][m.group(1)] = 1
                    elif m := re.match(r'^[0-9]$', precon):
                        card['Set'][set[0]][""] = precon
                    else:
                        card['Set'][set[0]][precon] = True

        # Remove useless fields
        for k in useless_fields:
            del card[k]

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
