import json
import re
import unicodedata
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


with open("twdDecks.json", "r") as twd_file:
    twda = json.load(twd_file)


def get_twd_by_crypt(crypt, twda=twda):
    cards_counter = len(crypt)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, q in crypt.items():
            if card in deck['crypt'].keys() and deck['crypt'][card]['q'] >= q:
                counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_library(library, twda=twda):
    cards_counter = len(library)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, q in library.items():
            if card in deck['library'].keys() and deck['library'][card]['q'] >= q:
                counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks

def get_twd_by_player(player, twda=twda):
    match_decks = []
    for deck in twda:
        if player in deck['player']:
            match_decks.append(deck)

    return match_decks


def get_twd_by_location(location, twda=twda):
    match_decks = []
    for deck in twda:
        if location in deck['location']:
            match_decks.append(deck)

    return match_decks

def get_twd_by_event(event, twda=twda):
    match_decks = []
    for deck in twda:
        if event.lower() in deck['event'].lower():
            match_decks.append(deck)

    return match_decks

def get_twd_by_date(request, twda=twda):
    date_from = int(request['from']) if 'from' in request else 1997
    date_to = int(request['to']) if 'to' in request else 2077
    match_decks = []

    for deck in twda:
        date = int(deck['date'][0:4])
        if date_from <= date <= date_to:
            match_decks.append(deck)

    return match_decks

def get_twd_by_players(request, twda=twda):
    players_from = int(request['from']) if 'from' in request else 1
    players_to = int(request['to']) if 'to' in request else 1000
    match_decks = []

    for deck in twda:
        if deck['players'] != 'Unknown' and players_from <= deck['players'] <= players_to:
            match_decks.append(deck)

    return match_decks

def get_twd_by_clan(clan, twda=twda):
    match_decks = []
    for deck in twda:
        clan_in_deck = 0
        crypt_cards = 0
        for id in deck['crypt']:
            # Skip Anarch Convert
            if id != '200076':
                q = deck['crypt'][id]['q']
                crypt_cards += q

                if get_crypt_by_id(id)['Clan'].lower() == clan:
                    clan_in_deck += q

        if (clan_in_deck / crypt_cards) >= 0.65:
            match_decks.append(deck)

    return match_decks

def get_twd_by_disciplines(disciplines, twda=twda):
    disciplines_counter = len(disciplines)
    match_decks = []

    for deck in twda:
        counter = 0
        for discipline in disciplines.keys():
            if discipline in deck['disciplines']:
                counter += 1

        if disciplines_counter == counter:
            match_decks.append(deck)

    return match_decks

def get_twd_by_cardtypes(cardtype_input, twda=twda):
    cardtypes_counter = len(cardtype_input)
    cardtypes = {}

    for k, v in cardtype_input.items():
        [min, max] = v.split(',')
        [min, max] = [float(min)/100, float(max)/100]
        cardtypes[k] = {'min': min, 'max': max}

    match_decks = []

    for deck in twda:
        counter = 0
        total = 0
        types = {}

        for k, v in deck['library'].items():
            t = get_library_by_id(k)['Type'].lower()
            q = v['q']
            total += q

            if t not in types:
                types[t] = q
            else:
                types[t] += q

        for type, v in cardtypes.items():
            if type in types:
                ratio = types[type] / total
                if ratio > v['min'] and ratio < v['max']:
                    counter += 1

        if cardtypes_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_capacity(capacity, twda=twda):
    [min, max] = capacity.split(',')
    [min, max] = [float(min), float(max)]

    match_decks = []

    for deck in twda:
        cryptTotalCap = 0
        cryptCards = 0
        capacityList = []

        for k, v in deck['crypt'].items():
            if k != '200076':
                c = get_crypt_by_id(k)['Capacity']
                q = v['q']
                cryptTotalCap += c * q
                cryptCards += q
                for x in range(q):
                    capacityList.append(c)

        cryptAvg = cryptTotalCap / cryptCards

        cryptMax = 0
        capacityList.sort()

        for i in range(4):
            cryptMax += capacityList[-i - 1]

        if cryptAvg >= min and cryptAvg <= max and cryptMax <= max * 4 + 6:
            match_decks.append(deck)

    return match_decks


def get_twd_by_traits(traits, twda=twda):
    trait_counter = len(traits)
    match_decks = []
    for deck in twda:
        counter = 0
        for trait in traits.keys():

            if trait == 'star':
                min = 5
                if '200076' in deck['crypt']:
                    min = 4

                for k, v in deck['crypt'].items():
                    # Skip Anarch Convert
                    if k != '200076':
                        if v['q'] >= min:
                            counter += 1
                            break

            if trait == 'monoclan':
                clans = []

                for k, v in deck['crypt'].items():
                    clan = get_crypt_by_id(k)['Clan']
                    if k != '200076' and clan not in clans:
                        clans.append(get_crypt_by_id(k)['Clan'])

                if len(clans) <= 1:
                    counter += 1
                    break

        if trait_counter == counter:
            match_decks.append(deck)

    return match_decks
