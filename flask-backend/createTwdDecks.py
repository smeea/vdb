import json

with open("twda.json", "r") as twda_input, open("twdDecks.json", "w") as twda_output:
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
        if 'score' in i:
            decks[i['id']]['score'] = i['score']
        else:
            decks[i['id']]['score'] = 'Unknown'
        if 'event_link' in i:
            decks[i['id']]['link'] = i['event_link']
        else:
            decks[i['id']]['link'] = 'Unknown'
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

        for types in i['library']['cards']:
            for card in types['cards']:
                decks[i['id']]['library'][card['id']] = {
                    'q': card['count']
                }

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twda_output, indent=4, separators=(',', ':'))
