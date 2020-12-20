import json

with open("twda.json", "r") as twda_input, open("twdList.json", "w") as twda_output:
    twda = json.load(twda_input)
    decks = []

    # index = 0
    for i in twda:
        # index += 1
        # if index == 10:
        #     break

        deck = {
            'i': i['id'],
            'e': i['event'],
            'l': i['place'],
            'd': i['date'],
            'w': i['player'],
        }

        if 'players_count' in i:
            deck['p'] = i['players_count']
        else:
            deck['p'] = 0

        decks.append(deck)

    json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    # json.dump(decks, twda_output, indent=4, separators=(',', ':'))
