import json
import re
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


# Card base file. It is JSON (human-readable format) converted from official
# CVS card base available at vekn.com.
with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def get_overall_library(card_lists):
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


def get_library_by_cardtext(cardtext):
    match_cards = []
    cardtext = cardtext.lower()
    for card in library:
        if cardtext in card['Card Text'].lower(
        ) or cardtext in letters_to_ascii(card['Name'].lower()):
            match_cards.append(card)

    return match_cards


def get_library_by_cardtype(cardtype):
    match_cards = []
    for card in library:
        if cardtype in card['Type'].split('/'):
            match_cards.append(card)

    return match_cards


def get_library_by_disciplines(discipline):
    match_cards = []
    for card in library:
        if discipline in card['Discipline']:
            match_cards.append(card)

    return match_cards


def get_library_by_clan(clan):
    match_cards = []
    for card in library:
        if clan == card['Clan']:
            match_cards.append(card)

    return match_cards


def get_library_by_title(title):
    match_cards = []
    for card in library:
        if title in card['Requirement'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_sect(sect):
    match_cards = []
    for card in library:
        if sect in card['Requirement'].lower():
            match_cards.append(card)

    return match_cards


def get_library_by_blood(cost, moreless):
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
            if card['Blood Cost'] == cost or card['Blood Cost'] == 'X':
                match_cards.append(card)

    return match_cards


def get_library_by_pool(cost, moreless):
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
            if card['Pool Cost'] == cost or card['Pool Cost'] == 'X':
                match_cards.append(card)

    return match_cards


def get_library_by_trait(traits):
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
                            '\-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept'
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

            elif re.search(r'{}'.format(trait), card['Card Text'].lower()):
                counter += 1

        if trait_counter == counter:
            match_cards.append(card)

    return match_cards


def get_library_by_id(id):
    for card in library:
        if card['Id'] == int(id):
            return card
