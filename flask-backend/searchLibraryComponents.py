import json
import re


def get_library_by_text(text, library):
    match_cards = []
    text = text.replace(' "', '"').replace('" ', '"').replace('"', '(\W|^|$)')
    for card in library:
        if re.search(text, card['Card Text'], re.IGNORECASE) or re.search(
                text, card['Name'], re.IGNORECASE) or re.search(
                    text, card['ASCII Name'], re.IGNORECASE):
            match_cards.append(card)

    return match_cards


def get_library_by_type(types, library):
    match_cards = []
    for card in library:
        for type in types:
            if type in card['Type'].lower().split('/'):
                if card not in match_cards:
                    match_cards.append(card)

    return match_cards


def get_library_by_discipline(disciplines, library):
    match_cards = []
    for card in library:
        for discipline in disciplines:
            if (discipline in card['Discipline'].lower()) or (
                    discipline == 'none' and not card['Discipline'].lower()):
                if card not in match_cards:
                    match_cards.append(card)

    return match_cards


def get_library_by_clan(clans, library):
    match_cards = []
    for card in library:
        card_clans = [c.lower() for c in card['Clan'].split('/')]
        for clan in clans:
            if (clan in card_clans) or (clan == 'none'
                                        and not card['Clan'].lower()):
                if card not in match_cards:
                    match_cards.append(card)

    return match_cards


def get_library_by_title(titles, library):
    match_cards = []
    all_titles = [
        'primogen', 'prince', 'justicar', 'inner circle', 'baron', 'bishop',
        'archbishop', 'priscus', 'cardinal', 'regent', 'magaji'
    ]
    for card in library:
        for title in titles:
            if title == 'none':
                counter = len(all_titles)
                for i in all_titles:
                    if i not in card['Requirement'].lower():
                        counter -= 1
                if counter == 0 and card not in match_cards:
                    match_cards.append(card)

            elif title.lower() in card['Requirement'].lower(
            ) and not 'non-' + title in card['Requirement'].lower():
                if card not in match_cards:
                    match_cards.append(card)

    return match_cards


def get_library_by_sect(sects, library):
    match_cards = []
    all_sects = [
        'camarilla', 'sabbat', 'laibon', 'independent', 'anarch', 'imbued'
    ]
    for card in library:
        for sect in sects:
            if sect == 'none':
                counter = len(all_sects)
                for i in all_sects:
                    if i not in card['Requirement']:
                        counter -= 1
                if counter == 0 and card not in match_cards:
                    match_cards.append(card)

            elif sect in card['Requirement'].lower(
            ) and not 'non-' + sect in card['Requirement'].lower():
                if card not in match_cards:
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
                if re.search(r'{}'.format('\+[0-9]+ bleed'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'strength':
                if re.search(r'{}'.format('\+[0-9]+ strength'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'aggravated':
                if re.search(r'{}'.format('(?<!non-)aggravated'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'prevent':
                if re.search(r'{}'.format('(?<!un)prevent'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'bounce bleed':
                if re.search(
                        r'{}'.format(
                            'change the target of the bleed|is now bleeding'),
                        card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'unlock':
                if re.search(r'{}'.format('(?!not )unlock(?! phase|ed)|wakes'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'banned':
                if card['Banned']:
                    counter += 1

            elif trait == 'non-twd':
                if not card['Twd']:
                    counter += 1

            elif trait == 'burn':
                if card['Burn Option']:
                    counter += 1

            elif trait == 'no-requirements':
                if not card['Requirement'] and not card[
                        'Discipline'] and not card[
                            'Clan'] and 'requires a' not in card[
                                'Card Text'].lower():
                    counter += 1

            elif re.search(r'{}'.format(trait), card['Card Text'],
                           re.IGNORECASE):
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
        'KoTR',
        'HttBR',
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
        'KoTR',
        'HttBR',
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
    ]

    match_cards = []
    r_set = request['set']

    if 'or newer' in request:
        oldestSetIndex = sets.index(r_set)

        for card in library:
            for k in card['Set'].keys():
                if sets.index(k) <= oldestSetIndex and sets.index(k) > 1:
                    match_cards.append(card)

    else:
        if r_set == 'bcp':
            for card in library:
                for c_set in card['Set'].keys():
                    if c_set in bcp_sets:
                        if card in match_cards:
                            continue

                        if 'only in' in request:
                            counter = 0
                            for k in card['Set'].keys():
                                if k in bcp_sets:
                                    counter += 1

                            if len(card['Set'].keys()) == counter:
                                match_cards.append(card)

                        elif 'first print' in request:
                            oldestSetIndex = 0
                            for k in card['Set'].keys():
                                if sets.index(k) > oldestSetIndex:
                                    # add 2 because of 'Promo' and 'DTC'
                                    oldestSetIndex = sets.index(k) + 2

                            if oldestSetIndex < len(bcp_sets):
                                match_cards.append(card)

                        else:
                            match_cards.append(card)

        else:
            for card in library:
                if r_set in card['Set']:
                    if 'only in' in request:
                        if len(card['Set'].keys()) == 1:
                            match_cards.append(card)

                    elif 'first print' in request:
                        oldestSetIndex = 0
                        for k in card['Set'].keys():
                            if sets.index(k) > oldestSetIndex:
                                oldestSetIndex = sets.index(k)

                        if oldestSetIndex == sets.index(r_set):
                            match_cards.append(card)
                    else:
                        match_cards.append(card)

    return match_cards


def get_library_by_precon(request, library):
    bcp_sets = [
        'V5',
        '25th',
        'FB',
        'SP',
        'KoTR',
        'HttBR',
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
        'KoTR',
        'HttBR',
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
    ]

    booster_subsets = ["V", "C", "U", "R"]

    match_cards = []
    req = request['precon']

    if req == 'bcp':
        for card in library:
            for c_set, c_subsets in card['Set'].items():
                if c_set in bcp_sets:
                    for c_subset in c_subsets.keys():
                        if card in match_cards:
                            continue

                        if c_subset not in booster_subsets and card not in match_cards:
                            if 'only in' in request:
                                counter = 0
                                for k in card['Set'].keys():
                                    if k in bcp_sets:
                                        counter += 1

                                if len(card['Set'].keys()) == counter:
                                    match_cards.append(card)

                            elif 'first print' in request:
                                oldestSetIndex = 0
                                for k in card['Set'].keys():
                                    if sets.index(k) > oldestSetIndex:
                                        # add 2 because of 'Promo' and 'DTC'
                                        oldestSetIndex = sets.index(k) + 2

                                if oldestSetIndex < len(bcp_sets):
                                    match_cards.append(card)

                            else:
                                match_cards.append(card)

    else:
        [r_set, r_subset] = req.split(':')

        for card in library:
            if r_set in card['Set'] and r_subset in card['Set'][r_set]:
                if 'only in' in request:
                    if len(card['Set'].keys()) == 1:
                        match_cards.append(card)

                elif 'first print' in request:
                    oldestSetIndex = 0
                    for k in card['Set'].keys():
                        if sets.index(k) > oldestSetIndex:
                            oldestSetIndex = sets.index(k)

                    if oldestSetIndex == sets.index(r_set):
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
        if pattern in card['ASCII Name'].lower(
        ) or pattern in card['Name'].lower():
            match_cards.append(card)
        else:
            remaining_cards.append(card)

    for card in remaining_cards:
        if is_match_by_initials(
                pattern, card['ASCII Name'].lower()) or is_match_by_initials(
                    pattern, card['Name'].lower()):
            match_cards_by_initials.append(card)

    return match_cards + match_cards_by_initials


def get_library_by_id(id):
    with open("cardbase_lib.json", "r") as library_file:
        library = json.load(library_file)
        return library[str(id)]
