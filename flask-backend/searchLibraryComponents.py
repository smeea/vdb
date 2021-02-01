import json
import re
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


def get_library_by_text(text, library):
    match_cards = []
    text = text.lower()
    for card in library:
        if text in card['Card Text'].lower(
        ) or text in card['ASCII Name'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_type(type, library):
    match_cards = []
    for card in library:
        if type in card['Type'].lower().split('/'):
            match_cards.append(card)

    return match_cards


def get_library_by_discipline(discipline, library):
    match_cards = []
    for card in library:
        if (discipline in card['Discipline'].lower()) or (
                discipline == 'none' and not card['Discipline'].lower()):
            match_cards.append(card)

    return match_cards


def get_library_by_clan(clan, library):
    match_cards = []
    for card in library:
        if (card['Clan'].lower() == clan) or (clan == 'none'
                                              and not card['Clan'].lower()):
            match_cards.append(card)

    return match_cards


def get_library_by_title(title, library):
    match_cards = []
    titles = [
        'primogen', 'prince', 'justicar', 'inner circle', 'baron', 'bishop',
        'archbishop', 'priscus', 'cardinal', 'regent', 'magaji'
    ]
    for card in library:
        if title == 'none':
            counter = len(titles)
            for i in titles:
                if i not in card['Requirement'].lower():
                    counter -= 1
            if counter == 0:
                match_cards.append(card)

        elif title.lower() in card['Requirement'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_sect(sect, library):
    match_cards = []
    sects = [
        'camarilla', 'sabbat', 'laibon', 'independent', 'anarch', 'imbued'
    ]
    for card in library:
        if sect == 'none':
            counter = len(sects)
            for i in sects:
                if i not in card['Requirement']:
                    counter -= 1
            if counter == 0:
                match_cards.append(card)

        elif sect in card['Requirement'].lower(
        ) and not 'non-' + sect in card['Requirement'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_blood(request, library):
    cost = request['blood']
    moreless = request['moreless']
    match_cards = []
    for card in library:
        if moreless == 'le':
            if card['Blood Cost'] <= cost or card['Blood Cost'] == 'X':
                match_cards.append(card)

        elif moreless == 'ge':
            if card['Blood Cost'] and card['Blood Cost'] >= cost or card[
                    'Blood Cost'] == 'X':
                match_cards.append(card)

        elif moreless == 'eq':
            if card['Blood Cost'] == cost or card['Blood Cost'] == 'X' or (
                    cost == "0" and not card['Blood Cost']):
                match_cards.append(card)

    return match_cards


def get_library_by_pool(request, library):
    cost = request['pool']
    moreless = request['moreless']
    match_cards = []
    for card in library:
        if moreless == 'le':
            if card['Pool Cost'] <= cost or card['Pool Cost'] == 'X':
                match_cards.append(card)

        elif moreless == 'ge':
            if card['Pool Cost'] and card['Pool Cost'] >= cost or card[
                    'Pool Cost'] == 'X':
                match_cards.append(card)

        elif moreless == 'eq':
            if card['Pool Cost'] == cost or card['Pool Cost'] == 'X' or (
                    cost == "0" and not card['Pool Cost']):
                match_cards.append(card)

    return match_cards


def get_library_by_traits(traits, library):
    match_cards = []
    trait_counter = len(traits)
    for card in library:
        counter = 0

        # Below are just dirty hacks to match by 'trait' (card text part).
        # It can break anytime (if card text in CVS card base changes), but
        # just works for now. Please refer to Python Regexp's ('re' module).

        for trait in traits.keys():

            if trait == 'intercept':
                if re.search(
                        r'{}'.format(
                            '\-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0'
                        ), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'stealth':
                if re.search(
                        r'{}'.format(
                            '\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\-[0-9]+ intercept'
                        ), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'bleed':
                if re.search(r'{}'.format('\+[0-9]+ bleed'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'strength':
                if re.search(r'{}'.format('\+[0-9]+ strength'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'dodge':
                if re.search(r'{}'.format('dodge'), card['Card Text'].lower()):
                    counter += 1

            elif trait == 'maneuver':
                if re.search(r'{}'.format('optional maneuver'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'additional strike':
                if re.search(r'{}'.format('additional strike'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'aggravated':
                if re.search(r'{}'.format('(?<!non-)aggravated'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'prevent':
                if re.search(r'{}'.format('(?<!un)prevent'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'press':
                if re.search(r'{}'.format('(optional )?press'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'combat ends':
                if re.search(r'{}'.format('combat ends'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'enter combat':
                if re.search(r'{}'.format('enter combat'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'bounce bleed':
                if re.search(
                        r'{}'.format(
                            'change the target of the bleed|is now bleeding'),
                        card['Card Text'].lower()):
                    counter += 1

            elif trait == 'black hand':
                if re.search(r'{}'.format('black hand'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'seraph':
                if re.search(r'{}'.format('seraph'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'anarch':
                if re.search(r'{}'.format('anarch'),
                             card['Card Text'].lower()):
                    counter += 1

            elif trait == 'infernal':
                if re.search(r'{}'.format('infernal'),
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


def get_library_by_set(request, library):
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
    set = request['set']

    if set == 'bcp':
        for card in library:
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
        for card in library:
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


def get_library_by_precon(request, library):
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
    precon = request['precon']

    if precon == 'bcp':
        for card in library:
            for bcp_precon in bcp_precons:
                if bcp_precon[0] in card['Set'] and bcp_precon[1] in card['Set'][bcp_precon[0]]:
                    if request['only in']:
                        counter = 0
                        for k in card['Set'].keys():
                            if k in bcp_precon[0]:
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
        precon = precon.split(':')
        for card in library:
            if precon[0] in card['Set'] and precon[1] in card['Set'][precon[0]]:
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


def get_library_by_artist(artist, library):
    match_cards = []
    for card in library:
        if artist in card['Artist']:
            match_cards.append(card)

    return match_cards


def get_library_by_name(name, library):
    match_cards = []
    for card in library:
        if name.lower() in card['ASCII Name'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_id(id):
    with open("vteslib.json", "r") as library_file:
        library = json.load(library_file)
        for card in library:
            if card['Id'] == int(id):
                return card
