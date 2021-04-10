import json
import re


def get_library_by_text(text, library):
    match_cards = []
    text = text.replace('"', '(\W|^|$)')
    for card in library:
        if re.search(text, card['Card Text'], re.IGNORECASE) or re.search(text, card['Name'], re.IGNORECASE) or re.search(text, card['ASCII Name'], re.IGNORECASE) :
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
        clans = [c.lower() for c in card['Clan'].split('/')]
        if (clan in clans) or (clan == 'none' and not card['Clan'].lower()):
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
                        ), card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'stealth':
                if re.search(
                        r'{}'.format(
                            '\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\-[0-9]+ intercept'
                        ), card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'bleed':
                if re.search(r'{}'.format('\+[0-9]+ bleed'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'strength':
                if re.search(r'{}'.format('\+[0-9]+ strength'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'dodge':
                if re.search(r'{}'.format('dodge'), card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'maneuver':
                if re.search(r'{}'.format('optional maneuver'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'additional strike':
                if re.search(r'{}'.format('additional strike'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'aggravated':
                if re.search(r'{}'.format('(?<!non-)aggravated'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'prevent':
                if re.search(r'{}'.format('(?<!un)prevent'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'press':
                if re.search(r'{}'.format('(optional )?press'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'combat ends':
                if re.search(r'{}'.format('combat ends'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'enter combat':
                if re.search(r'{}'.format('enter combat'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'bounce bleed':
                if re.search(
                        r'{}'.format(
                            'change the target of the bleed|is now bleeding'),
                        card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'black hand':
                if re.search(r'{}'.format('black hand'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'seraph':
                if re.search(r'{}'.format('seraph'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'anarch':
                if re.search(r'{}'.format('anarch'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'infernal':
                if re.search(r'{}'.format('infernal'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'banned':
                if card['Banned']:
                    counter += 1

            elif re.search(r'{}'.format(trait), card['Card Text'], re.IGNORECASE):
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
                    if 'only in' in request:
                        counter = 0
                        for k in card['Set'].keys():
                            if k in bcp_sets:
                                counter += 1

                        if len(card['Set'].keys()) == counter:
                            match_cards.append(card)
                            break
                    elif 'first print' in request:
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
                if 'only in' in request:
                    if len(card['Set'].keys()) == 1:
                        match_cards.append(card)

                elif 'first print' in request:
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
        for card in library:
            for bcp_precon in bcp_precons:
                if bcp_precon[0] in card['Set']:
                    for i in card['Set'][bcp_precon[0]].split('/'):
                        if card in match_cards:
                            continue
                        card_precon = None;
                        match = re.match(r"(\w+)?(\d+)?", i)
                        if match:
                            if match.group(1):
                                card_precon = match.group(1)
                            else:
                                card_precon = ""

                            if bcp_precon[1] == card_precon:
                                if 'only in' in request:
                                    counter = 0
                                    for k in card['Set'].keys():
                                        if k in bcp_precon[0]:
                                            counter += 1

                                    if len(card['Set'].keys()) == counter:
                                        match_cards.append(card)

                                elif 'first print' in request:
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
        for card in library:
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
                            if 'only in' in request:
                                if len(card['Set'].keys()) == 1:
                                    match_cards.append(card)

                            elif 'first print' in request:
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

def is_match_by_initials(initials, text):
    prev_index = 0

    for c in initials:
        index = text.find(c, prev_index)
        if index == -1:
                return False
        if index != prev_index and index != 0:
            while text[index - 1].isalnum():
                index = text.find(c, index + 1)
                if index == -1:
                    return False

        prev_index = index + 1

    return True


def get_library_by_name(pattern, library):
    match_cards = []
    remaining_cards = []
    match_cards_by_initials = []
    pattern = pattern.lower()
    for card in library:
        if pattern in card['ASCII Name'].lower() or pattern in card['Name'].lower():
            match_cards.append(card)
        else:
            remaining_cards.append(card)

    for card in remaining_cards:
        if is_match_by_initials(pattern, card['ASCII Name'].lower()) or is_match_by_initials(pattern, card['Name'].lower()):
            match_cards_by_initials.append(card)

    return match_cards + match_cards_by_initials

def get_library_by_id(id):
    with open("cardbase_library.json", "r") as library_file:
        library = json.load(library_file)
        return library[str(id)]
