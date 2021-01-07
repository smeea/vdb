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


def get_overall_twd(twd_lists):
    match_list = twd_lists.pop()
    cards = {}
    while twd_lists:
        pre_match_list = []
        for i in twd_lists.pop():
            if i in match_list:
                pre_match_list.append(i)

        match_list = pre_match_list

    for deck in match_list:
        for id in deck['crypt']:
            cards[id] = get_crypt_by_id(id)
        for id in deck['library']:
            cards[id] = get_library_by_id(id)

    return [match_list, cards]

def get_new_twd(quantity):
    with open("twdNewDecks.json", "r") as twd_file:
        twda = json.load(twd_file)
        decks = []
        cards = {}
        for i in range(quantity):
            deck = twda[i]
            for id in deck['crypt']:
                cards[id] = get_crypt_by_id(id)
            for id in deck['library']:
                cards[id] = get_library_by_id(id)
            decks.append(twda[i])

        return [decks, cards]

def get_twd_by_crypt(crypt):
    cards_counter = len(crypt)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, q in crypt.items():
            if card in twda[deck]['crypt'].keys() and twda[deck]['crypt'][card]['q'] >= q:
                counter += 1

        if counter == cards_counter:
            match_decks.append(twda[deck])

    return match_decks


def get_twd_by_library(library):
    cards_counter = len(library)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, q in library.items():
            if card in twda[deck]['library'].keys() and twda[deck]['library'][card]['q'] >= q:
                counter += 1

        if counter == cards_counter:
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_player(player):
    match_decks = []
    for deck in twda:
        if player in twda[deck]['player']:
            match_decks.append(twda[deck])

    return match_decks


def get_twd_by_location(location):
    match_decks = []
    for deck in twda:
        if location in twda[deck]['location']:
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_event(event):
    match_decks = []
    for deck in twda:
        if event.lower() in twda[deck]['event'].lower():
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_date(date_from, date_to):
    match_decks = []
    for deck in twda:
        date = int(twda[deck]['date'][0:4])
        if date >= date_from and date <= date_to:
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_players(players_from, players_to):
    match_decks = []
    for deck in twda:
        if twda[deck]['players'] != 'Unknown' and twda[deck]['players'] >= players_from and twda[deck]['players'] <= players_to:
                match_decks.append(twda[deck])

    return match_decks

def get_twd_by_clan(clan):
    match_decks = []
    for deck in twda:
        clan_in_deck = 0
        crypt_cards = 0
        for id in twda[deck]['crypt']:
            # Skip Anarch Convert
            if id != '200076':
                q = twda[deck]['crypt'][id]['q']
                crypt_cards += q

                if get_crypt_by_id(id)['Clan'].lower() == clan:
                    clan_in_deck += q

        if (clan_in_deck / crypt_cards) >= 0.65:
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_disciplines(disciplines):
    disciplines_counter = len(disciplines)
    match_decks = []

    for deck in twda:
        counter = 0
        for discipline in disciplines.keys():
            if discipline in twda[deck]['disciplines']:
                counter += 1

        if disciplines_counter == counter:
            match_decks.append(twda[deck])

    return match_decks

def get_twd_by_cardtypes(cardtypes):
    cardtypes_counter = len(cardtypes)
    match_decks = []
    foo = 0

    for deck in twda:
        counter = 0
        total = 0
        types = {}

        for k, v in twda[deck]['library'].items():
            t = get_library_by_id(k)['Type'].lower()
            q = v['q']
            total += q

            if t not in types:
                types[t] = q
            else:
                types[t] += q

        for type, v in cardtypes.items():
            if type in types and (types[type] / total) > (v / 100):
                counter += 1

        if cardtypes_counter == counter:
            match_decks.append(twda[deck])

    return match_decks


def get_twd_by_capacity(capacity):
    [min, max] = capacity.split(',')
    [min, max] = [float(min), float(max)]

    match_decks = []

    for deck in twda:
        cryptTotalCap = 0
        cryptCards = 0
        capacityList = []

        for k, v in twda[deck]['crypt'].items():
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
            match_decks.append(twda[deck])

    return match_decks


def get_twd_by_traits(traits):
    trait_counter = len(traits)
    match_decks = []
    for deck in twda:
        counter = 0
        for trait in traits.keys():

            if trait == 'star':
                min = 5
                if '200076' in twda[deck]['crypt']:
                    min = 4

                for k, v in twda[deck]['crypt'].items():
                    # Skip Anarch Convert
                    if k != '200076':
                        if v['q'] >= min:
                            counter += 1
                            break

            if trait == 'monoclan':
                clans = []

                for k, v in twda[deck]['crypt'].items():
                    clan = get_crypt_by_id(k)['Clan']
                    if k != '200076' and clan not in clans:
                        clans.append(get_crypt_by_id(k)['Clan'])

                if len(clans) <= 1:
                    counter += 1
                    break

        if trait_counter == counter:
            match_decks.append(twda[deck])

    return match_decks
