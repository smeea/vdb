import json
import multiprocessing
import sys
sys.path.insert(0, "../../flask-backend")
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id


def generate_twd(i):
    deck = {
        'cards': {},
        'cardtypes_ratio': {},
        'clan': '',
        'cryptTotal': i['crypt']['count'],
        'date': i['date'],
        'deckid': i['id'],
        'description': i['comments'] if 'comments' in i else 'x',
        'disciplines': [],
        'event': i['event'],
        'format': i['tournament_format'] if 'tournament_format' in i else 'Unknown',
        'libraryTotal': i['library']['count'],
        'link': i['event_link'] if 'event_link' in i else '',
        'location': i['place'],
        'name': i['name'] if 'name' in i else 'Unknown',
        'player': i['player'] if 'player' in i else 'Unknown',
        'players': i['players_count'] if 'players_count' in i else 'Unknown',
        'score': i['score'] if 'score' in i else 'Unknown',
        'timestamp': i['date'],
        'traits': [],
    }

    totalCapacity = 0
    totalCryptExAC = 0

    clans = {}

    disciplines = set()
    cryptDisciplines = set()

    crypt = {}
    for card in i['crypt']['cards']:
        crypt[card['id']] = card['count']
        if card['id'] != 200076:
            totalCryptExAC += card['count']

    for id, q in crypt.items():
        # Skip Anarch Convert
        if id != 200076:
            totalCapacity += q * get_crypt_by_id(id)['Capacity']

            if (clan := get_crypt_by_id(id)['Clan']) in clans:
                clans[clan] += q
            else:
                clans[clan] = q

        if 'star' not in deck['traits'] and id != 200076:
            adv = get_crypt_by_id(id)['Adv']
            if adv and adv[1] in crypt:
                if (q + crypt[adv[1]]) / totalCryptExAC > 0.38:
                    deck['traits'].append('star')
            else:
                if q / totalCryptExAC > 0.38:
                    deck['traits'].append('star')

        deck['cards'][id] = q

        for discipline in get_crypt_by_id(id)['Disciplines'].keys():
            cryptDisciplines.add(discipline)

    for clan, q in clans.items():
        if q / deck['cryptTotal'] > 0.5:
            deck['clan'] = clan

    if len(clans) <= 1 and 'monoclan' not in deck['traits']:
        deck['traits'].append('monoclan')

    deck['capacity'] = totalCapacity / totalCryptExAC

    for type in i['library']['cards']:
        deck['cardtypes_ratio'][
            type['type'].lower()] = type['count'] / deck['libraryTotal']

        for card in type['cards']:

            deck['cards'][card['id']] = card['count']

            card_discipline_entry = get_library_by_id(card['id'])['Discipline']
            if '&' in card_discipline_entry:
                for discipline in card_discipline_entry.split(' & '):
                    if discipline in cryptDisciplines:
                        disciplines.add(discipline)

            elif '/' in card_discipline_entry:
                for discipline in card_discipline_entry.split('/'):
                    if discipline in cryptDisciplines:
                        disciplines.add(discipline)

            elif card_discipline_entry in cryptDisciplines:
                disciplines.add(card_discipline_entry)

    deck['disciplines'] = sorted(list(disciplines))
    return (deck)


with open("twda.json", "r") as twda_input, open("twdDecks.json",
                                                "w") as twdaDecks_file, open(
                                                    "twdDecksById.json",
                                                    "w") as twdaDecksById_file:

    decks = []
    decks_by_id = {}

    twda = json.load(twda_input)
    total = len(twda)

    pool = multiprocessing.Pool(processes=4)
    decks = pool.map(generate_twd, twda)

    for deck in decks:
        decks_by_id[deck['deckid']] = deck

    json.dump(decks, twdaDecks_file, indent=4, separators=(',', ':'))
    json.dump(decks_by_id, twdaDecksById_file, indent=4, separators=(',', ':'))

with open("twda.json",
          "r") as twda_input, open("twdLocations.json",
                                   "w") as twdaLocations_file, open(
                                       "twdPlayers.json",
                                       "w") as twdaPlayers_file:

    twda = json.load(twda_input)
    locations = set(())
    players = set(())
    total = len(twda)

    for i in twda:
        place = i['place'].split(', ')
        locations.add(place.pop())
        locations.add(i['place'])

        players.add(i['player'])

    locations = sorted(locations)
    locationsOptions = []
    for i in locations:
        locationsOptions.append({'label': i, 'value': i})

    players = sorted(players)
    playersOptions = []
    for i in players:
        playersOptions.append({'label': i, 'value': i})

    json.dump(playersOptions,
              twdaPlayers_file,
              indent=4,
              separators=(',', ':'))
    json.dump(locationsOptions,
              twdaLocations_file,
              indent=4,
              separators=(',', ':'))
