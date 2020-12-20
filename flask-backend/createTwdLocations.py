import json

with open("twda.json", "r") as twda_input, open("twdLocations.json", "w") as twdaLocations_file, open("twdPlayers.json", "w") as twdaPlayers_file, open("twdaIndex.json", "w") as twdaIndex_file:

    twda = json.load(twda_input)
    locations = []
    players = []
    decks = []

    for i in twda:
        if i['place'] not in locations:
            place = i['place'].split(', ')
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
    players.sort()

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(players, twdaPlayers_file, indent=4, separators=(',', ':'))
    json.dump(locations, twdaLocations_file, indent=4, separators=(',', ':'))
    json.dump(decks, twdaIndex_file, indent=4, separators=(',', ':'))
