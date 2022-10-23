def get_hof_players(twd_decks):
    players_twd = {}
    for deck in twd_decks:
        d = {
            "date": deck["creation_date"],
            "event": deck["event"],
            "location": deck["location"],
            "name": deck["name"],
            "deckid": deck["deckid"],
            "players": deck["players"],
        }

        if deck["author"] not in players_twd:
            players_twd[deck["author"]] = [d]
        else:
            players_twd[deck["author"]].append(d)

    for name in [n for n in players_twd.keys()]:
        if len(players_twd[name]) < 5:
            del players_twd[name]

    return players_twd
