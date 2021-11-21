import json
import re


def get_crypt_by_text(text, crypt):
    match_cards = []
    text = text.replace(' "', '"').replace('" ', '"').replace('"', '(\W|^|$)')
    for card in crypt:
        try:
            if re.search(text, card['Card Text'], re.IGNORECASE) or re.search(
                    text, card['Name'], re.IGNORECASE) or re.search(
                        text, card['ASCII Name'], re.IGNORECASE):
                match_cards.append(card)
        except Exception:
            pass

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
                name = re.match(r'^\w+', card['Name'], re.IGNORECASE)
                if re.search(
                        r'(he|she|it|they|{}) (can|may)( .* to)? {}'.format(
                            name[0], trait), card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'optional press':
                if re.search(r'gets (.*)?{}'.format(trait), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == '1 bleed':
                if re.search(r'{}'.format('[:.] \+. bleed.'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == '2 bleed':
                if re.search(r'{}'.format('[:.] \+2 bleed.'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == '1 strength':
                if re.search(r'{}'.format('[:.] \+. strength.'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == '2 strength':
                if re.search(r'{}'.format('[:.] \+2 strength.'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == '1 intercept':
                if re.search(r'{}'.format('[:.] \+1 intercept.'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == '1 stealth':
                if re.search(
                        r'{}'.format('[:.] \+1 stealth.'), card['Card Text'],
                        re.IGNORECASE
                ) or re.search(
                        r'{}'.format(
                            'gets \+1 stealth on each of (his|her|they) actions'
                        ), card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'prevent':
                if re.search(r'{}'.format('(?<!un)prevent(?<!able)'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'aggravated':
                if re.search(r'{}'.format('(?<!non-)aggravated'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'unlock':
                if re.search(r'{}'.format('(?!not )unlock(?! phase|ed)|wakes'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'black hand':
                if re.search(r'{}'.format('black hand[ .:]'),
                             card['Card Text'], re.IGNORECASE):
                    counter += 1

            elif trait == 'seraph':
                if re.search(r'{}'.format('seraph[.:]'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'infernal':
                if re.search(r'{}'.format('infernal[.:]'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'red list':
                if re.search(r'{}'.format('red list[.:]'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'flight':
                if re.search(r'{}'.format('\[flight\]\.'), card['Card Text'],
                             re.IGNORECASE):
                    counter += 1

            elif trait == 'advancement':
                if card['Adv']:
                    counter += 1

            elif trait == 'banned':
                if card['Banned']:
                    counter += 1

            elif trait == 'non-twd':
                if not card['Twd']:
                    counter += 1

            elif re.search(r'{}'.format(trait), card['Card Text'],
                           re.IGNORECASE):
                counter += 1

        if trait_counter == counter:
            match_cards.append(card)

    return match_cards


def get_crypt_by_titles(titles, crypt):
    # Title filter is cummulative i.e. it matches cards matching any
    # chosen title
    match_cards = []
    for card in crypt:
        if not card['Title'] and 'none' in titles.keys():
            match_cards.append(card)
            continue
        if card['Title'].lower() in titles.keys():
            match_cards.append(card)
            continue
        if card['Adv'] and card['Adv'][0]:
            for title in titles.keys():
                if re.search(r'{} {}'.format('\[MERGED\] ?\w*', title),
                             card['Card Text'], re.IGNORECASE):
                    match_cards.append(card)
                    continue

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


def get_crypt_by_clan(request, crypt):
    clans = request['value']
    match_cards = []

    if request['logic'] == 'or':
        for card in crypt:
            for clan in clans:
                if card['Clan'].lower() == clan:
                    match_cards.append(card)

    else:
        for card in crypt:
            if card['Clan'].lower() not in clans:
                    if card not in match_cards:
                        match_cards.append(card)
    return match_cards


def get_crypt_by_sect(request, crypt):
    sects = request['value']
    match_cards = []

    if request['logic'] == 'or':
        for card in crypt:
            for sect in sects:
                # Imbue 'sect' is defined by card['Type'], others are just 'vampire'
                if sect == 'imbued':
                    if  card['Type'].lower() == "imbued":
                        match_cards.append(card)

                # For vampires sect is determined only by card['Text']
                # It is another dirty hack (see trait above), but...
                elif re.search(r'^(advanced\,\ )?{}[:. $]'.format(sect), card['Card Text'], re.IGNORECASE):
                    match_cards.append(card)

    else:

        for card in crypt:
            # Imbue 'sect' is defined by card['Type'], others are just 'vampire'
            if card['Type'].lower() == "imbued":
                if "imbued" not in sects:
                    if card not in match_cards:
                        match_cards.append(card)

            else:
                # For vampires sect is determined only by card['Text']
                # It is another dirty hack (see trait above), but...
                counter = 0
                for sect in sects:
                    if not re.search(r'^(advanced\,\ )?{}[:. $]'.format(sect), card['Card Text'], re.IGNORECASE):
                        counter += 1

                if counter == len(sects):
                    if card not in match_cards:
                        match_cards.append(card)
                        continue

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
        'KSU',
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
        'KSU',
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
    r_sets = request['value']

    for r_set in r_sets:
        if 'or newer' in request:
            oldestSetIndex = sets.index(r_set)

            for card in crypt:
                for k in card['Set'].keys():
                    if sets.index(k) <= oldestSetIndex and sets.index(k) > 1:
                        if card not in match_cards:
                            match_cards.append(card)

        elif 'or older' in request:
            newestSetIndex = sets.index(r_set)

            for card in crypt:
                for k in card['Set'].keys():
                    if sets.index(k) >= newestSetIndex:
                        if card not in match_cards:
                            match_cards.append(card)

        else:
            if r_set == 'bcp':
                for card in crypt:
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
                                    if card not in match_cards:
                                        match_cards.append(card)

                            elif 'first print' in request:
                                oldestSetIndex = 0
                                for k in card['Set'].keys():
                                    if sets.index(k) > oldestSetIndex:
                                        # add 2 because of 'Promo' and 'DTC'
                                        oldestSetIndex = sets.index(k) + 2

                                if oldestSetIndex < len(bcp_sets):
                                    if card not in match_cards:
                                        match_cards.append(card)

                            else:
                                if card not in match_cards:
                                    match_cards.append(card)

            else:
                for card in crypt:
                    if r_set in card['Set']:
                        if 'only in' in request:
                            if len(card['Set'].keys()) == 1:
                                if card not in match_cards:
                                    match_cards.append(card)

                        elif 'first print' in request:
                            oldestSetIndex = 0
                            for k in card['Set'].keys():
                                if sets.index(k) > oldestSetIndex:
                                    oldestSetIndex = sets.index(k)

                            if oldestSetIndex == sets.index(r_set):
                                if card not in match_cards:
                                    match_cards.append(card)
                        else:
                            if card not in match_cards:
                                match_cards.append(card)

    return match_cards


def get_crypt_by_precon(request, crypt):
    bcp_sets = [
        'KSU',
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
        'KSU',
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
    reqs = request['value']

    for req in reqs:
        if req == 'bcp':
            for card in crypt:
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
                                        if card not in match_cards:
                                            match_cards.append(card)

                                elif 'first print' in request:
                                    oldestSetIndex = 0
                                    for k in card['Set'].keys():
                                        if sets.index(k) > oldestSetIndex:
                                            # add 2 because of 'Promo' and 'DTC'
                                            oldestSetIndex = sets.index(k) + 2

                                    if oldestSetIndex < len(bcp_sets):
                                        if card not in match_cards:
                                            match_cards.append(card)

                                else:
                                    if card not in match_cards:
                                        match_cards.append(card)

        else:
            [r_set, r_subset] = req.split(':')

            for card in crypt:
                if r_set in card['Set'] and r_subset in card['Set'][r_set]:
                    if 'only in' in request:
                        if len(card['Set'].keys()) == 1:
                            if card not in match_cards:
                                match_cards.append(card)

                    elif 'first print' in request:
                        oldestSetIndex = 0
                        for k in card['Set'].keys():
                            if sets.index(k) > oldestSetIndex:
                                oldestSetIndex = sets.index(k)

                        if oldestSetIndex == sets.index(r_set):
                            if card not in match_cards:
                                match_cards.append(card)

                    else:
                        if card not in match_cards:
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


def get_crypt_by_id(id):
    with open("cardbase_crypt.json", "r") as crypt_file:
        crypt = json.load(crypt_file)
        return crypt[str(id)]
