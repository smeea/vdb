import csv
import re
import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


disciplines = {
    'aus': ['Auspex', 1],
    'abo': ['Abombwe', 1],
    'ani': ['Animalism', 1],
    'cel': ['Celerity', 1],
    'chi': ['Chimerstry', 1],
    'dai': ['Daimoinon', 1],
    'dem': ['Dementation', 1],
    'dom': ['Dominate', 1],
    'for': ['Fortitude', 1],
    'mel': ['Melpominee', 1],
    'myt': ['Mytherceria', 1],
    'nec': ['Necromancy', 1],
    'obe': ['Obeah', 1],
    'obf': ['Obfuscate', 1],
    'obt': ['Obtenebration', 1],
    'pot': ['Potence', 1],
    'pre': ['Presence', 1],
    'pro': ['Protean', 1],
    'ser': ['Serpentis', 1],
    'san': ['Sanguinus', 1],
    'spi': ['Spiritus', 1],
    'tem': ['Temporis', 1],
    'tha': ['Thaumaturgy', 1],
    'thn': ['Thanatosis', 1],
    'qui': ['Quietus', 1],
    'val': ['Valeren', 1],
    'vic': ['Vicissitude', 1],
    'vis': ['Visceratika', 1],
    'AUS': ['Auspex', 2],
    'ABO': ['Abombwe', 2],
    'ANI': ['Animalism', 2],
    'CEL': ['Celerity', 2],
    'CHI': ['Chimerstry', 2],
    'DAI': ['Daimoinon', 2],
    'DEM': ['Dementation', 2],
    'DOM': ['Dominate', 2],
    'FOR': ['Fortitude', 2],
    'MEL': ['Melpominee', 2],
    'MYT': ['Mytherceria', 2],
    'NEC': ['Necromancy', 2],
    'OBE': ['Obeah', 2],
    'OBF': ['Obfuscate', 2],
    'OBT': ['Obtenebration', 2],
    'POT': ['Potence', 2],
    'PRE': ['Presence', 2],
    'PRO': ['Protean', 2],
    'SER': ['Serpentis', 2],
    'SAN': ['Sanguinus', 2],
    'SPI': ['Spiritus', 2],
    'TEM': ['Temporis', 2],
    'THA': ['Thaumaturgy', 2],
    'THN': ['Thanatosis', 2],
    'QUI': ['Quietus', 2],
    'VAL': ['Valeren', 2],
    'VIC': ['Vicissitude', 2],
    'VIS': ['Visceratika', 2],
}

virtues = {
    'def': 'Defense',
    'inn': 'Innocence',
    'jud': 'Judgment',
    'mar': 'Martyrdom',
    'red': 'Redemption',
    'ven': 'Vengeance',
    'viz': 'Vision',
}

artist_fixes = {
    "Alejandro Collucci": "Alejandro Colucci",
    "Chet Masterz": "Chet Masters",
    "Dimple": "Nicolas Bigot",
    "EM Gist": "Erik Gist",
    "G. Goleash": "Grant Goleash",
    "Gin\u00e9s Qui\u00f1onero-Santiago": "Gin\u00e9s Qui\u00f1onero",
    "Glenn Osterberger": "Glen Osterberger",
    "Heather V. Kreiter": "Heather Kreiter",
    "Jeff \"el jefe\" Holt": "Jeff Holt",
    "L. Snelly": "Lawrence Snelly",
    "Mathias Tapia": "Matias Tapia",
    "Mattias Tapia": "Matias Tapia",
    "Matt Mitchell": "Matthew Mitchell",
    "Mike Gaydos": "Michael Gaydos",
    "Mike Weaver": "Michael Weaver",
    "Nicolas \"Dimple\" Bigot": "Nicolas Bigot",
    "Pat McEvoy": "Patrick McEvoy",
    "Ron Spenser": "Ron Spencer",
    "Sam Araya": "Samuel Araya",
    "Sandra Chang": "Sandra Chang-Adair",
    "T. Bradstreet": "Tim Bradstreet",
    "Tom Baxa": "Thomas Baxa",
    "zelgaris": "Tomáš Zahradníček",
}

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ['Id', 'Capacity']
useless_fields = ['Aka']

with open("vtescrypt.csv", "r", encoding='utf8') as main_csv, open(
        "vtescrypt.json", "w", encoding='utf8') as cardbase_backend_file, open(
            "cardbase_crypt.json", "w",
            encoding='utf8') as cardbase_frontend_file, open(
                "vtes.json", "r", encoding='utf8') as krcg_file, open(
                    "artistsCrypt.json", "w",
                    encoding='utf8') as artists_file, open(
                        "../../twda.json", "r") as twda_input:

    krcg_cards = json.load(krcg_file)

    reader_main = csv.reader(main_csv)
    fieldnames_main = next(reader_main)
    csv_cards = csv.DictReader(main_csv, fieldnames_main)

    cards_backend = []
    cards_frontend = {}
    artistsSet = set()
    twda = json.load(twda_input)

    cards = []
    for card in csv_cards:
        cards.append(card)

    for card in cards:

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

            precons = set[1].split('/')

            # Fix for KoT, HttB Reprints (marked in CSV as KoT, but have only
            # bundles named "A" or "B" not existing in original KoT)
            if set[0] in ["KoT", "HttB"]:
                counter = 0
                for precon in precons:
                    if re.match(r'(A|B)[0-9]?', precon):
                        counter += 1

                if counter > 0:
                    card['Set'][f"{set[0]}R"] = {}
                if counter < len(precons):
                    card['Set'][set[0]] = {}

            elif set[0] not in ["AU", "DM", "TU"
                                ] and set[0] not in card['Set']:
                card['Set'][set[0]] = {}

            # Fix for DM, TU, AU Kickstarter Unleashed
            # (merge into Kickstarter Unleashed set)
            if set[0] in ["DM", "TU", "AU"]:
                for precon in precons:
                    if precon == 'C':
                        card['Set'][set[0]] = {'C': True}
                    else:
                        if "KSU" not in card['Set']:
                            card['Set']["KSU"] = {}

                        if m := re.match(r'^(A|B)([0-9]+)?', precon):
                            card['Set']["KSU"][
                                f"{set[0]}{m.group(1)}"] = m.group(2)
                        else:
                            card['Set']["KSU"][set[0]] = precon

            else:
                for precon in precons:
                    if set[0] in ["KoT", "HttB"] and (m := re.match(
                            r'^(A|B)([0-9]+)?', precon)):
                        s = f"{set[0]}R"
                        if m.group(2):
                            card['Set'][s][m.group(1)] = m.group(2)
                        else:
                            card['Set'][s][m.group(1)] = 1

                    else:
                        if m := re.match(r'^(\D+)([0-9]+)?', precon):
                            if m.group(1) in [
                                    "C", "U", "R", "V", "DTC", "Promo"
                            ]:
                                card['Set'][set[0]][m.group(1)] = True
                            elif m.group(2):
                                card['Set'][set[0]][m.group(1)] = m.group(2)
                            else:
                                card['Set'][set[0]][m.group(1)] = 1
                        elif m := re.match(r'^[0-9]$', precon):
                            card['Set'][set[0]][""] = precon
                        else:
                            card['Set'][set[0]][precon] = True

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
            card_disciplines_letters = card['Disciplines'].split()
            card_disciplines = {}
            for d in card_disciplines_letters:
                if d in virtues:
                    card_disciplines[virtues[d]] = 1

            card['Disciplines'] = card_disciplines

        elif card['Type'] == 'Vampire':
            card_disciplines_letters = card['Disciplines'].split()
            card_disciplines = {}
            for d in card_disciplines_letters:
                if d in disciplines:
                    card_disciplines[disciplines[d][0]] = disciplines[d][1]

            card['Disciplines'] = card_disciplines

        artists = []
        for artist in re.split('; | & ', card['Artist']):
            if artist in artist_fixes.keys():
                artists.append(artist_fixes[artist])
                artistsSet.add(artist_fixes[artist])
            else:
                artists.append(artist)
                artistsSet.add(artist)

        card['Artist'] = artists

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
                        text = re.sub(r'{The (\w+)}', r'{\1, The}', text)
                        card['Rulings'].append({
                            'text': text,
                            'refs': {},
                        })

                for id in c['rulings']['links'].keys():
                    for i, rule in enumerate(c['rulings']['text']):
                        if id in rule:
                            card['Rulings'][i]['refs'][id] = c['rulings'][
                                'links'][id]

        # Add twda info
        card['Twd'] = False
        for i in twda:
            if card['Twd']:
                continue

            for c in i['crypt']['cards']:
                if c['id'] == card['Id']:
                    card['Twd'] = True

        # Add Advancement info
        card['Advancement'] = ""
        for c in cards:
            if c['Name'] == card['Name'] and c['Id'] != card['Id'] and c[
                    'Group'] == card['Group']:
                isAdv = True if card['Adv'] else False
                card['Advancement'] = [isAdv, c['Id']]

        # Add new revision info
        card['New'] = False
        for c in cards:
            if c['Name'] == card['Name'] and int(
                    c['Id']) < card['Id'] and c['Group'] != card['Group']:
                card['New'] = True

        # Rename Assamite and Follower of Set
        if card['Clan'] == 'Assamite':
            card['Clan'] = 'Banu Haqim'

        if card['Clan'] == 'Follower of Set':
            card['Clan'] = 'Ministry'

        card['Card Text'] = card['Card Text'].replace(
            'Assamites', 'Banu Haqim').replace('Assamite', 'Banu Haqim')

        card['Card Text'] = card['Card Text'].replace('Followers of Set',
                                                      'Ministers')
        card['Card Text'] = card['Card Text'].replace('Follower of Set',
                                                      'Minister')

        # Prepare for export
        cards_frontend[card['Id']] = {
            'Id': card['Id'],
            'Name': card['Name'],
            'Clan': card['Clan'],
            'Adv': card['Advancement'],
            'Group': card['Group'],
            'Capacity': card['Capacity'],
            'Card Text': card['Card Text'],
            'Set': card['Set'],
            'Title': card['Title'],
            'Banned': card['Banned'],
            'Artist': card['Artist'],
            'ASCII Name': card['ASCII Name'],
            'Disciplines': card['Disciplines'],
            'Rulings': card['Rulings'],
            'New': card['New']
        }

        card_backend = {
            'Id': card['Id'],
            'Name': card['Name'],
            'Type': card['Type'],
            'Clan': card['Clan'],
            'Adv': card['Advancement'],
            'Group': card['Group'],
            'Capacity': card['Capacity'],
            'Card Text': card['Card Text'],
            'Set': card['Set'],
            'Title': card['Title'],
            'Banned': card['Banned'],
            'Artist': card['Artist'],
            'ASCII Name': card['ASCII Name'],
            'Disciplines': card['Disciplines'],
            'Twd': card['Twd'],
            'New': card['New']
        }

        cards_backend.append(card_backend)

    artists = sorted(artistsSet)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(cards_backend,
              cardbase_backend_file,
              indent=4,
              separators=(',', ':'))
    json.dump(cards_frontend,
              cardbase_frontend_file,
              indent=4,
              separators=(',', ':'))
    json.dump(artists, artists_file, indent=4, separators=(',', ':'))
