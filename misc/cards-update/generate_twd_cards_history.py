import json

with open("twda.json", "r") as twda_input, open(
    "cardbase_crypt.json", "r"
) as crypt_file, open("cardbase_lib.json", "r") as library_file:

    crypt_cardbase = json.load(crypt_file).values()
    library_cardbase = json.load(library_file).values()
    cards = {}

    for card in [*crypt_cardbase, *library_cardbase]:
        cards[card["Id"]] = {
            "deckid": None,
        }

    twda = json.load(twda_input)
    total = len(twda)

    for i in twda:
        deckid = i["id"]
        player = i["player"]
        date = i["date"]

        for card in i["crypt"]["cards"]:
            cards[card["id"]]["deckid"] = deckid
            cards[card["id"]]["twdDate"] = date
            cards[card["id"]]["player"] = player

        for cardtype in i["library"]["cards"]:
            for card in cardtype["cards"]:
                cards[card["id"]]["deckid"] = deckid
                cards[card["id"]]["twdDate"] = date
                cards[card["id"]]["player"] = player

with open("twd_cards_history.json", "w") as output_file, open(
    "twd_cards_history.min.json", "w"
) as output_file_min:
    json.dump(cards, output_file_min, separators=(",", ":"))
    json.dump(cards, output_file, indent=4, separators=(",", ":"))
