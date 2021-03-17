import json
import re
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


def get_crypt_by_text(text, crypt):
    match_cards = []
    text = text.lower()
    for card in crypt:
        if text in card['Card Text'].lower(
        ) or text in card['ASCII Name'].lower() or text in card['Name'].lower():
            match_cards.append(card)

    return match_cards


def get_crypt_by_disciplines(disciplines, crypt):
    discipline_counter = len(disciplines)
    match_cards = []
    for card in crypt:
        counter = 0
        for k, v in disciplines.items():
            if k in card['Disciplines'] and card['Disciplines'][k] >= v:
                counter += 1

        if discipline_counter == counter:
            match_cards.append(card)

    return match_cards


def get_crypt_by_traits(traits, crypt):
    match_cards = []
    trait_counter = len(traits)
    for card in crypt:
        counter = 0
        # Below are just dirty hacks to match by 'trait' (card text part).
        # It can break anytime (if card text in CVS card base changes), but
        # just works for now.
        for trait in traits.keys():
            if trait == 'enter combat':
                name = re.match(r'^\w+', card['Name'].lower())
                if re.search(
                        r'(he|she|it|they|{}) (can|may)( .* to)? {}'.format(
                            name[0], trait), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'optional press':
                if re.search(r'gets (.*)?{}'.format(trait), card['Card Text'].lower()):
                    counter += 1

            elif trait == '1 bleed':
                if re.search(r'{}'.format('[:.] \+. bleed.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == '2 bleed':
                if re.search(r'{}'.format('[:.] \+2 bleed.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == '1 strength':
                if re.search(r'{}'.format('[:.] \+. strength.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == '2 strength':
                if re.search(r'{}'.format('[:.] \+2 strength.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == '1 intercept':
                if re.search(r'{}'.format('[:.] \+1 intercept.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == '1 stealth':
                if re.search(r'{}'.format('[:.] \+1 stealth.'), card['Card Text'].lower()) or re.search(r'{}'.format('gets \+1 stealth on each of (his|her|they) actions'), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'additional strike':
                if re.search(r'{}'.format('additional strike'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'optional maneuver':
                if re.search(r'{}'.format('optional maneuver'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'prevent':
                if re.search(r'{}'.format('(?<!un)prevent(?<!able)'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'aggravated':
                if re.search(r'{}'.format('(?<!non-)aggravated'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'black hand':
                if re.search(r'{}'.format('black hand[ .:]'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'seraph':
                if re.search(r'{}'.format('seraph[.:]'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'infernal':
                if re.search(r'{}'.format('infernal[.:]'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'red list':
                if re.search(r'{}'.format('red list[.:]'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'flight':
                if re.search(r'{}'.format('\[flight\]\.'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'banned':
                if card['Banned']:
                    counter += 1

            elif re.search(r'{}'.format(trait), card['Card Text'].lower()):
                counter += 1

        if trait_counter == counter:
            match_cards.append(card)

    return match_cards


def get_crypt_by_titles(titles, crypt):
    # Title filter is cummulative i.e. it matches cards matching any
    # chosen title
    match_cards = []
    for card in crypt:
        if card['Title'].lower() in titles.keys():
            match_cards.append(card)

    return match_cards


def get_crypt_by_votes(votes, crypt):
    title_worth = {
        "primogen": 1,
        "prince": 2,
        "justicar": 3,
        "imperator": 3,
        "inner circle": 4,
        "bishop": 1,
        "archbishop": 2,
        "priscus": 3,
        "cardinal": 3,
        "regent": 4,
        "1 vote": 1,
        "2 votes": 2,
        "magaji": 2,
        "kholo": 2,
        "baron": 2
    }
    match_cards = []
    votes = int(votes)
    for card in crypt:
        if card['Title'] and votes != 0:
            if title_worth[card['Title']] >= votes:
                match_cards.append(card)

        elif card['Title'] == '' and votes == 0:
            match_cards.append(card)

    return match_cards


def get_crypt_by_capacity(request, crypt):
    capacity = int(request['capacity'])
    moreless = request['moreless']
    match_cards = []

    for card in crypt:
        if moreless == 'le':
            if card['Capacity'] <= capacity:
                match_cards.append(card)

        elif moreless == 'ge':
            if card['Capacity'] >= capacity:
                match_cards.append(card)

        elif moreless == 'eq':
            if card['Capacity'] == capacity:
                match_cards.append(card)

    return match_cards


def get_crypt_by_clan(clan, crypt):
    match_cards = []
    for card in crypt:
        if card['Clan'].lower() == clan:
            match_cards.append(card)

    return match_cards


def get_crypt_by_sect(sect, crypt):
    match_cards = []
    for card in crypt:
        # Imbue 'sect' is defined by card['Type'], others are just 'vampire'
        if sect == 'imbued' and card['Type'].lower() == sect:
            match_cards.append(card)
            continue

        # For vampires sect is determined only by card['Text']
        # It is another dirty hack (see trait above), but...
        if re.search(r'^(advanced\,\ )?{}[:. $]'.format(sect), card['Card Text'].lower()):
            match_cards.append(card)

    return match_cards


def get_crypt_by_group(group_list, crypt):
    # Group filter is cummulative i.e. it matches cards matching any
    # chosen groups form field
    match_cards = []
    for card in crypt:
        if card['Group'] in group_list or card['Group'] == 'ANY':
            match_cards.append(card)

    return match_cards


def get_crypt_by_set(request, crypt):
    bcp_sets = [
        'V5',
        '25th',
        'FB',
        'SP',
        'Anthology',
        'LK',
    ]

    sets = [
        'Promo',
        'POD',
        'V5',
        '25th',
        'FB',
        'SP',
        'Anthology',
        'LK',
        'AU',
        'TU',
        'DM',
        'HttB',
        'EK',
        'BSC',
        'KoT',
        'TR',
        'SoC',
        'LotN',
        'NoR',
        'Third',
        'KMW',
        'LoB',
        'Gehenna',
        'Tenth',
        'Anarchs',
        'BH',
        'CE',
        'BL',
        'FN',
        'SW',
        'Sabbat',
        'AH',
        'DS',
        'VTES',
        'Jyhad',
    ];

    match_cards = []
    set = request['set']

    if set == 'bcp':
        for card in crypt:
            for k in card['Set'].keys():
                if k in bcp_sets:
                    if request['only in']:
                        counter = 0
                        for k in card['Set'].keys():
                            if k in bcp_sets:
                                counter += 1

                        if len(card['Set'].keys()) == counter:
                            match_cards.append(card)
                            break
                    elif request['first print']:
                        oldestSetIndex = 0
                        for k in card['Set'].keys():
                            if sets.index(k) > oldestSetIndex:
                                oldestSetIndex = sets.index(k)

                        if oldestSetIndex <= len(bcp_sets):
                            match_cards.append(card)
                            break
                    else:
                        match_cards.append(card)
                        break

    else:
        for card in crypt:
            if set in card['Set']:
                if request['only in']:
                    if len(card['Set'].keys()) == 1:
                        match_cards.append(card)

                elif request['first print']:
                    oldestSetIndex = 0
                    for k in card['Set'].keys():
                        if sets.index(k) > oldestSetIndex:
                            oldestSetIndex = sets.index(k)

                    if oldestSetIndex == sets.index(set):
                        match_cards.append(card)
                else:
                    match_cards.append(card)

    return match_cards


def get_crypt_by_precon(request, crypt):
    bcp_precons = [
        ['V5', 'PM',],
        ['V5', 'PN',],
        ['V5', 'PTo'],
        ['V5', 'PTr'],
        ['V5', 'PV'],
        ['SP', 'LB'],
        ['SP', 'PwN'],
        ['SP', 'DoF'],
        ['SP', 'PoS'],
        ['25th', ''],
        ['FB', 'PM'],
        ['FB', 'PN'],
        ['FB', 'PTo'],
        ['FB', 'PTr'],
        ['FB', 'PV'],
        ['Anthology', ''],
        ['KoT', 'A'],
        ['KoT', 'B'],
        ['HttB', 'A'],
        ['HttB', 'B'],
        ['LK', ''],
    ]

    bcp_sets = [
        'V5',
        '25th',
        'FB',
        'SP',
        'Anthology',
        'LK',
    ]

    sets = [
        'Promo',
        'POD',
        'V5',
        '25th',
        'FB',
        'SP',
        'Anthology',
        'LK',
        'AU',
        'TU',
        'DM',
        'HttB',
        'EK',
        'BSC',
        'KoT',
        'TR',
        'SoC',
        'LotN',
        'NoR',
        'Third',
        'KMW',
        'LoB',
        'Gehenna',
        'Tenth',
        'Anarchs',
        'BH',
        'CE',
        'BL',
        'FN',
        'SW',
        'Sabbat',
        'AH',
        'DS',
        'VTES',
        'Jyhad',
    ];

    match_cards = []
    precon = request['precon']

    if precon == 'bcp':
        for card in crypt:
            for bcp_precon in bcp_precons:
                if bcp_precon[0] in card['Set']:
                    for i in card['Set'][bcp_precon[0]].split('/'):
                        if card in match_cards:
                            continue
                        card_precon = None;
                        match = re.match(r"(\w+)?(\d+)", i)
                        if match:
                            if match.group(1):
                                card_precon = match.group(1)
                            else:
                                card_precon = ""

                            if bcp_precon[1] == card_precon:
                                if request['only in']:
                                    counter = 0
                                    for k in card['Set'].keys():
                                        if k in bcp_precon[0]:
                                            counter += 1

                                    if len(card['Set'].keys()) == counter:
                                        match_cards.append(card)

                                elif request['first print']:
                                    oldestSetIndex = 0
                                    for k in card['Set'].keys():
                                        if sets.index(k) > oldestSetIndex:
                                            oldestSetIndex = sets.index(k)

                                    if oldestSetIndex <= len(bcp_sets):
                                        match_cards.append(card)
                                else:
                                    match_cards.append(card)

    else:
        precon = precon.split(':')
        for card in crypt:
            if precon[0] in card['Set']:
                for i in card['Set'][precon[0]].split('/'):
                    if card in match_cards:
                        continue
                    card_precon = None;
                    match = re.match(r"(\D+)?(\d+)?", i)
                    if match:
                        if match.group(1):
                            card_precon = match.group(1)
                        else:
                            card_precon = ""

                        if precon[1] == card_precon:
                            if request['only in']:
                                if len(card['Set'].keys()) == 1:
                                    match_cards.append(card)

                            elif request['first print']:
                                oldestSetIndex = 0
                                for k in card['Set'].keys():
                                    if sets.index(k) > oldestSetIndex:
                                        oldestSetIndex = sets.index(k)

                                if oldestSetIndex == sets.index(precon[0]):
                                    match_cards.append(card)
                            else:
                                match_cards.append(card)

    return match_cards


def get_crypt_by_artist(artist, crypt):
    match_cards = []
    for card in crypt:
        if artist in card['Artist']:
            match_cards.append(card)

    return match_cards


def is_match_by_initials(initials, text):
    prev_index = 0

    for c in initials:
        index = text.find(c, prev_index)
        if index == -1:
                return False
        if index != prev_index:
            if index != 0 and text[index - 1].isalnum():
                return False

        prev_index = index + 1

    return True


def get_crypt_by_name(pattern, crypt):
    match_cards = []
    remaining_cards = []
    match_cards_by_initials = []
    pattern = pattern.lower()
    for card in crypt:
        if pattern in card['ASCII Name'].lower() or pattern in card['Name'].lower():
            match_cards.append(card)
        else:
            remaining_cards.append(card)

    for card in remaining_cards:
        if is_match_by_initials(pattern, card['ASCII Name'].lower()) or is_match_by_initials(pattern, card['Name'].lower()):
            match_cards_by_initials.append(card)

    return match_cards + match_cards_by_initials


def get_crypt_by_id(id):
    with open("vtescrypt.json", "r") as crypt_file:
        crypt = json.load(crypt_file)
        for card in crypt:
            if card['Id'] == int(id):
                return card

