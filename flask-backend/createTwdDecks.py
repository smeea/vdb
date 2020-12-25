import json
from searchLibraryComponents import get_library_by_id

with open("twda.json", "r") as twda_input, open("twdDecks.json", "w") as twdaDecks_file:
    twda = json.load(twda_input)
    decks = {}

    for i in twda:
        decks[i['id']] = {
            'deckid': i['id'],
            'event': i['event'],
            'date': i['date'],
            'location': i['place'],
            'crypt': {},
            'library': {},
            'disciplines': [],
            'timestamp': i['date']
        }

        if 'players_count' in i:
            decks[i['id']]['players'] = i['players_count']
        else:
            decks[i['id']]['players'] = 'Unknown'
        if 'tournament_format' in i:
            decks[i['id']]['format'] = i['tournament_format']
        else:
            decks[i['id']]['format'] = 'Unknown'
        if 'comments' in i:
            decks[i['id']]['description'] = i['comments']
        else:
            decks[i['id']]['description'] = ''
        if 'score' in i:
            decks[i['id']]['score'] = i['score']
        else:
            decks[i['id']]['score'] = 'Unknown'
        if 'event_link' in i:
            decks[i['id']]['link'] = i['event_link']
        else:
            decks[i['id']]['link'] = ''
        if 'name' in i:
            decks[i['id']]['name'] = i['name']
        else:
            decks[i['id']]['name'] = 'Unknown'
        if 'player' in i:
            decks[i['id']]['player'] = i['player']
        else:
            decks[i['id']]['player'] = 'Unknown'

        for card in i['crypt']['cards']:
            decks[i['id']]['crypt'][card['id']] = {
                'q': card['count']
            }

        disciplines = []
        for types in i['library']['cards']:
            for card in types['cards']:
                decks[i['id']]['library'][card['id']] = {
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


        decks[i['id']]['disciplines'] = disciplines

    # json.dump(decks, twdaDecks_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaDecks_file, indent=4, separators=(',', ':'))


with open("twda.json", "r") as twda_input, open("twdLocations.json", "w") as twdaLocations_file, open("twdPlayers.json", "w") as twdaPlayers_file:

    twda = json.load(twda_input)
    locations = []
    players = []
    decks = []

    for i in twda:
        if i['place'] not in locations:
            place = i['place'].split(', ')
            # p = place.pop()
            # locations.append({'label': p, 'value': p})
            # locations.append({'label': i['place'], 'value': i['place']})
            locations.append(place.pop())
            locations.append(i['place'])


        if i['player'] not in players:
            players.append(i['player'])

        deck = {
            'id': i['id'],
            'event': i['event'],
            'location': i['place'],
            'date': i['date'],
            'player': i['player'],
        }

        if 'players_count' in i:
            deck['players'] = i['players_count']
        else:
            deck['players'] = 0

        decks.append(deck)

    locations.sort()
    locationsOptions = []
    for i in locations:
        locationsOptions.append({'label': i, 'value': i})

    players.sort()
    playersOptions = []
    for i in players:
        playersOptions.append({'label': i, 'value': i})

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(playersOptions, twdaPlayers_file, indent=4, separators=(',', ':'))
    json.dump(locationsOptions, twdaLocations_file, indent=4, separators=(',', ':'))

with open("twda.json", "r") as twda_input, open("twdNewDecks.json", "w") as twdaNewDecks_file:

    twda = json.load(twda_input)
    decks = []

    for i in range(25):
        deck = {
            'deckid': twda[i]['id'],
            'event': twda[i]['event'],
            'date': twda[i]['date'],
            'location': twda[i]['place'],
            'crypt': {},
            'library': {},
            'disciplines': [],
            'timestamp': twda[i]['date']
        }

        if 'players_count' in twda[i]:
            deck['players'] = twda[i]['players_count']
        else:
            deck['players'] = 'Unknown'
        if 'tournament_format' in twda[i]:
            deck['format'] = twda[i]['tournament_format']
        else:
            deck['format'] = 'Unknown'
        if 'comments' in twda[i]:
            deck['description'] = twda[i]['comments']
        else:
            deck['description'] = ''
        if 'score' in twda[i]:
            deck['score'] = twda[i]['score']
        else:
            deck['score'] = 'Unknown'
        if 'event_link' in twda[i]:
            deck['link'] = twda[i]['event_link']
        else:
            deck['link'] = ''
        if 'name' in twda[i]:
            deck['name'] = twda[i]['name']
        else:
            deck['name'] = 'Unknown'
        if 'player' in twda[i]:
            deck['player'] = twda[i]['player']
        else:
            deck['player'] = 'Unknown'

        for card in twda[i]['crypt']['cards']:
            deck['crypt'][card['id']] = {
                'q': card['count']
            }

        disciplines = []
        for types in twda[i]['library']['cards']:
            for card in types['cards']:
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

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaNewDecks_file, indent=4, separators=(',', ':'))
