import json
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id

with open("twda.json", "r") as twda_input, open("twdDecks.json", "w") as twdaDecks_file, open("twdDecksById.json", "w") as twdaDecksById_file:
    twda = json.load(twda_input)
    decks = []
    decks_by_id = {}
    total = len(twda)

    for idx, i in enumerate(twda):
        # if idx == 5:
        #     break
        print(f"Generating decks: {idx} of {total}")

        deck = {
            'deckid': i['id'],
            'name': 'Unknown',
            'event': i['event'],
            'date': i['date'],
            'location': i['place'],
            'score': 'Unknown',
            'format': 'Unknown',
            'players': 'Unknown',
            'player': 'Unknown',
            'crypt': {},
            'clan': '',
            'description': '',
            'library': {},
            'libraryTotal': i['library']['count'],
            'link': '',
            'disciplines': [],
            'cardtypes_ratio': {},
            'timestamp': i['date'],
        }

        if 'players_count' in i:
            deck['players'] = i['players_count']
        if 'tournament_format' in i:
            deck['format'] = i['tournament_format']
        if 'comments' in i:
            deck['description'] = i['comments']
        if 'score' in i:
            deck['score'] = i['score']
        if 'event_link' in i:
            deck['link'] = i['event_link']
        if 'name' in i:
            deck['name'] = i['name']
        if 'player' in i:
            deck['player'] = i['player']

        totalCapacity = 0
        totalCrypt = 0

        clans = {}

        for card in i['crypt']['cards']:

            # Skip Anarch Convert
            if card['id'] != 200076:
                totalCapacity += card['count'] * get_crypt_by_id(card['id'])['Capacity']
                totalCrypt += card['count']
                if (clan := get_crypt_by_id(card['id'])['Clan']) in clans:
                    clans[clan] += card['count']
                else:
                    clans[clan] = card['count']

            deck['crypt'][card['id']] = {
                'q': card['count']
            }

        for clan, q in clans.items():
            if q / totalCrypt > 0.5:
                deck['clan'] = clan

        deck['capacity'] = totalCapacity / totalCrypt

        disciplines = []

        for type in i['library']['cards']:
            deck['cardtypes_ratio'][type['type'].lower()] = type['count'] / i['library']['count']

            for card in type['cards']:

                deck['library'][card['id']] = {
                    'q': card['count']
                }

                card_discipline_entry = get_library_by_id(card['id'])['Discipline']
                if '&' in card_discipline_entry:
                    for discipline in card_discipline_entry.split(' & '):
                        if discipline not in disciplines:
                            disciplines.append(discipline)

                elif '/' in card_discipline_entry:
                    for discipline in card_discipline_entry.split('/'):
                        if discipline not in disciplines:
                            disciplines.append(discipline)

                elif card_discipline_entry and card_discipline_entry not in disciplines:
                    disciplines.append(card_discipline_entry)


        deck['disciplines'] = disciplines

        decks.append(deck)
        decks_by_id[i['id']] = deck

    # json.dump(decks, twdaDecks_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaDecks_file, indent=4, separators=(',', ':'))
    json.dump(decks_by_id, twdaDecksById_file, indent=4, separators=(',', ':'))


with open("twda.json", "r") as twda_input, open("twdLocations.json", "w") as twdaLocations_file, open("twdPlayers.json", "w") as twdaPlayers_file:

    twda = json.load(twda_input)
    locations = set(())
    players = set(())
    total = len(twda)

    for idx, i in enumerate(twda):
        # if idx == 0:
        #     break
        print(f"Generating players & locations: {idx} of {total}")

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

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(playersOptions, twdaPlayers_file, indent=4, separators=(',', ':'))
    json.dump(locationsOptions, twdaLocations_file, indent=4, separators=(',', ':'))
