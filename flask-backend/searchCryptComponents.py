import json
import re
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


# Card base file. It is JSON (human-readable format) converted from official
# CVS card base available at vekn.com.
with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)


def get_overall_crypt(card_lists):
    # 'card-lists' are nested list with all cards matching each of the filters
    # Below we step-by-step compare if next filter cards are in previous
    # list of matching cards (with all previous filters applied), so in the end
    # only cards matching ALL filters are left
    match_list = card_lists.pop()
    while card_lists:
        pre_match_list = []
        for i in card_lists.pop():
            if i in match_list:
                pre_match_list.append(i)

        match_list = pre_match_list

    return match_list


def get_crypt_by_cardtext(cardtext):
    match_cards = []
    cardtext = cardtext.lower()
    for card in crypt:
        if cardtext in card['Card Text'].lower(
        ) or cardtext in card['ASCII Name'].lower():
            match_cards.append(card)

    return match_cards


def get_crypt_by_cardname(cardname):
    match_cards = []
    cardname = cardname.lower()
    for card in crypt:
        if cardname in card['ASCII Name'].lower():
            match_cards.append(card)

    return match_cards


def get_crypt_by_disciplines(disciplines):
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


def get_crypt_by_trait(traits):
    match_cards = []
    trait_counter = len(traits)
    for card in crypt:
        counter = 0
        # Below are just dirty hacks to match by 'trait' (card text part).
        # It can break anytime (if card text in CVS card base changes), but
        # just works for now. Please refer to Python Regexp's ('re' module).
        for trait in traits.keys():
            if trait == 'enter combat':
                name = re.match(r'^\w+', card['Name'].lower())
                if re.search(
                        r'(he|she|it|they|{}) (can|may)( .* to)? {}'.format(
                            name[0], trait), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'optional press':
                name = re.match(r'^\w+', card['Name'].lower())
                if re.search(
                        r'(he|she|it|they|{}) gets (.*)?{}'.format(
                            name[0], trait), card['Card Text'].lower()):
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
                if re.search(r'{}'.format('[:.] \+1 stealth.'),
                             card['Card Text'].lower()):
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

            elif re.search(r'{}'.format(trait), card['Card Text'].lower()):
                counter += 1

        if trait_counter == counter:
            match_cards.append(card)

    return match_cards


def get_crypt_by_title(titles):
    # Title filter is cummulative i.e. it matches cards matching any
    # chosen title
    match_cards = []
    for card in crypt:
        if card['Title'].lower() in titles.keys():
            match_cards.append(card)

    return match_cards


def get_crypt_by_votes(votes):
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
    for card in crypt:
        if card['Title'] and votes != 0:
            if title_worth[card['Title']] >= votes:
                match_cards.append(card)

        elif card['Title'] == '' and votes == 0:
            match_cards.append(card)

    return match_cards


def get_crypt_by_capacity(capacity, moreless):
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


def get_crypt_by_clan(clan):
    match_cards = []
    for card in crypt:
        if card['Clan'].lower() == clan:
            match_cards.append(card)

    return match_cards


def get_crypt_by_sect(sect):
    match_cards = []
    for card in crypt:
        # Imbue 'sect' is defined by card['Type'], others are just 'vampire'
        if sect == 'imbued' and card['Type'].lower() == sect:
            match_cards.append(card)
            continue

        # For vampires sect is determined only by card['Text']
        # It is another dirty hack (see trait above), but...
        if re.search(r'^{}[:. $]'.format(sect), card['Card Text'].lower()):
            match_cards.append(card)

    return match_cards


def get_crypt_by_group(group_list):
    # Group filter is cummulative i.e. it matches cards matching any
    # chosen groups form field
    match_cards = []
    for card in crypt:
        if card['Group'] in group_list or card['Group'] == 'ANY':
            match_cards.append(card)

    return match_cards


def get_crypt_by_set(set, options=[]):
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
        'POD',
    ];

    match_cards = []

    if set == 'bcp':
        for card in crypt:
            for k in card['Set'].keys():
                if k in bcp_sets:
                    if 'only in' in options:
                        counter = 0
                        for k in card['Set'].keys():
                            if k in bcp_sets:
                                counter += 1

                        if len(card['Set'].keys()) == counter:
                            match_cards.append(card)
                            break
                    elif 'first print' in options:
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
                if 'only in' in options:
                    if len(card['Set'].keys()) == 1:
                        match_cards.append(card)
                elif 'first print' in options:
                    oldestSetIndex = 0
                    for k in card['Set'].keys():
                        if sets.index(k) > oldestSetIndex:
                            oldestSetIndex = sets.index(k)

                    if oldestSetIndex == sets.index(set):
                        match_cards.append(card)
                else:
                    match_cards.append(card)

    return match_cards


def get_crypt_by_precon(precon, options=[]):
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
        ['LK', ''],
    ]

    sets = [
        'Promo',
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
        'POD',
    ];

    match_cards = []

    if precon == 'bcp':
        for card in crypt:
            for bcp_precon in bcp_precons:
                if bcp_precon[0] in card['Set'] and bcp_precon[1] in card['Set'][bcp_precon[0]]:
                    if 'only in' in options:
                        counter = 0
                        for k in card['Set'].keys():
                            if k in bcp_precon[0]:
                                counter += 1

                        if len(card['Set'].keys()) == counter:
                            match_cards.append(card)
                            break
                    elif 'first print' in options:
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
        precon = precon.split(':')
        for card in crypt:
            if precon[0] in card['Set'] and precon[1] in card['Set'][precon[0]]:
                if 'only in' in options:
                    if len(card['Set'].keys()) == 1:
                        match_cards.append(card)

                elif 'first print' in options:
                    oldestSetIndex = 0
                    for k in card['Set'].keys():
                        if sets.index(k) > oldestSetIndex:
                            oldestSetIndex = sets.index(k)

                    if oldestSetIndex == sets.index(precon[0]):
                        match_cards.append(card)
                else:
                    match_cards.append(card)

    return match_cards


def get_crypt_by_artist(artist):
    match_cards = []
    artist = artist.lower()
    for card in crypt:
        if artist in card['Artist'].lower():
            match_cards.append(card)

    return match_cards


def get_crypt_by_id(id):
    for card in crypt:
        if card['Id'] == int(id):
            return card
