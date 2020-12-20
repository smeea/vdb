import json
import re
import unicodedata
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


# Card base file. It is JSON (human-readable format) converted from official
# CVS card base available at vekn.com.
with open("twdDecks.json", "r") as twd_file:
    twda = json.load(twd_file)


def get_overall_twd(twd_lists):
    match_list = twd_lists.pop()
    while twd_lists:
        pre_match_list = []
        for i in twd_lists.pop():
            if i in match_list:
                pre_match_list.append(i)

        match_list = pre_match_list

    for deck in match_list:
        for id in deck['crypt']:
            deck['crypt'][id]['c'] = get_crypt_by_id(id)
        for id in deck['library']:
            deck['library'][id]['c'] = get_library_by_id(id)

    return match_list


def get_twd_by_crypt(crypt):
    cards_counter = len(crypt)
    match_decks = []
    for deck in twda:
        counter = 0
        for card in crypt.keys():
            if card in twda[deck]['crypt'].keys():
                counter += 1

        if counter == cards_counter:
            match_decks.append(twda[deck])

    return match_decks


def get_twd_by_library(library):
    cards_counter = len(library)
    match_decks = []
    for deck in twda:
        counter = 0
        for card in library.keys():
            if card in twda[deck]['library'].keys():
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

# def get_twd_by_date(date, moreless):
#     match_decks = []
#     for deck in twda:
#         if moreless == 'le':
#             if card['Date'] <= date:
#                 match_decks.append(deck)

#         elif moreless == 'ge':
#             if card['Date'] >= date:
#                 match_decks.append(deck)

#     return match_decks



# def get_twd_by_disciplines(disciplines):
#     disciplines_counter = len(disciplines)
#     match_cards = []
#     for deck in twda:
#         counter = 0
#         for discipline in disciplines:
#             if discipline in deck['disciplines']:
#                 counter += 1
#         if counter == disciplines_count:
#             match_decks.append(deck)

#     return match_decks

# def get_twd_by_clans(clans):
#     match_cards = []
#     clans_counter = len(clans)
#     for deck in twda:
#         for clan in clans:
#             if clan in deck['clans']:
#                 counter += 1
#             if counter == clans_counter:
#                 match_decks.append(deck)

#     return match_decks
