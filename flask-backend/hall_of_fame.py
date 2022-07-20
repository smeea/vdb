import json


def get_hof_cards(twd_decks):
    with open("setsAndPrecons.json", "r") as sets_file, open(
        "cardbase_crypt.json", "r"
    ) as crypt_file, open("cardbase_lib.json", "r") as library_file:

        sets_data = json.load(sets_file)
        sets = {}
        for set in sets_data.keys():
            if sets_data[set]["date"]:
                sets[set] = sets_data[set]["date"]

        crypt_cardbase = json.load(crypt_file).values()
        library_cardbase = json.load(library_file).values()
        crypt = {}
        library = {}

        for card in crypt_cardbase:
            crypt[card["Id"]] = {
                "player": None,
                "twd": None,
                "twd_date": None,
            }

            date = None
            for set in card["Set"]:
                if set == "POD":
                    continue

                d = None
                if set == "Promo":
                    d = list(card["Set"]["Promo"].keys())[0]
                else:
                    d = sets[set]

                if date is None:
                    date = d
                elif date > d:
                    date = d

            crypt[card["Id"]]["release_date"] = date

        for card in library_cardbase:
            library[card["Id"]] = {
                "player": None,
                "twd": None,
                "twd_date": None,
            }

            date = None
            for set in card["Set"]:
                if set == "POD":
                    continue

                d = None
                if set == "Promo":
                    d = list(card["Set"]["Promo"].keys())[0]
                else:
                    d = sets[set]

                if date is None:
                    date = d
                elif date > d:
                    date = d

            library[card["Id"]]["release_date"] = date

        for d in twd_decks:
            for cardid in d["crypt"].keys():
                crypt[cardid]["twd"] = d["deckid"]
                crypt[cardid]["twd_date"] = d["creation_date"]
                crypt[cardid]["player"] = d["author"]

            for cardid in d["library"].keys():
                library[cardid]["twd"] = d["deckid"]
                library[cardid]["twd_date"] = d["creation_date"]
                library[cardid]["player"] = d["author"]

        return {"crypt": crypt, "library": library}


def get_hof_players(twd_decks):
    players_twd = {}
    for deck in twd_decks:
        d = {
            "date": deck["creation_date"],
            "event": deck["event"],
            "location": deck["location"],
            "name": deck["name"],
            "deckid": deck["deckid"],
        }

        if deck["author"] not in players_twd:
            players_twd[deck["author"]] = [d]
        else:
            players_twd[deck["author"]].append(d)

    for name in [n for n in players_twd.keys()]:
        if len(players_twd[name]) < 5:
            del players_twd[name]

    return players_twd
