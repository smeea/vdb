import json
from searchLibraryComponents import get_library_by_id

with open("twda.json", "r") as twda_input, open("twdDecks.json", "w") as twdaDecks_file, open("twdDecksById.json", "w") as twdaDecksById_file:
    twda = json.load(twda_input)
    decks = []
    decks_by_id = {}

    for i in twda:
        deck = {
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
            deck['players'] = i['players_count']
        else:
            deck['players'] = 'Unknown'
        if 'tournament_format' in i:
            deck['format'] = i['tournament_format']
        else:
            deck['format'] = 'Unknown'
        if 'comments' in i:
            deck['description'] = i['comments']
        else:
            deck['description'] = ''
        if 'score' in i:
            deck['score'] = i['score']
        else:
            deck['score'] = 'Unknown'
        if 'event_link' in i:
            deck['link'] = i['event_link']
        else:
            deck['link'] = ''
        if 'name' in i:
            deck['name'] = i['name']
        else:
            deck['name'] = 'Unknown'
        if 'player' in i:
            deck['player'] = i['player']
        else:
            deck['player'] = 'Unknown'

        for card in i['crypt']['cards']:
            deck['crypt'][card['id']] = {
                'q': card['count']
            }

        disciplines = []
        for types in i['library']['cards']:
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
        decks_by_id[i['id']] = deck

    # json.dump(decks, twdaDecks_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaDecks_file, indent=4, separators=(',', ':'))
    json.dump(decks_by_id, twdaDecksById_file, indent=4, separators=(',', ':'))


with open("twda.json", "r") as twda_input, open("twdLocations.json", "w") as twdaLocations_file, open("twdPlayers.json", "w") as twdaPlayers_file:

    twda = json.load(twda_input)
    locations = set(())
    players = set(())

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

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(playersOptions, twdaPlayers_file, indent=4, separators=(',', ':'))
    json.dump(locationsOptions, twdaLocations_file, indent=4, separators=(',', ':'))

with open("twda.json", "r") as twda_input, open("twdNewDecks.json", "w") as twdaNewDecks_file:

    twda = json.load(twda_input)
    decks = []

    for i in range(100):
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

    # json.dump(decks, twdaNewDecks_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaNewDecks_file, indent=4, separators=(',', ':'))
