import json
from deck_import import deck_import


with open("two_players/precons.json", "r") as precons_file:
    precons = json.load(precons_file)

two_players_cards = {}

for file, precon in precons.items():
    with open(f"two_players/precons/{file}", "r", encoding="utf8") as deck_file:
        precon_deck = " ".join(str(x) for x in deck_file.readlines())
        imported_deck = deck_import(precon_deck)
        precon_cards = imported_deck["cards"]
        bad_cards = imported_deck["bad_cards"]

        if len(bad_cards):
            for c in bad_cards:
                print(f"BAD CARD: {c} [{file}]")

        for cardid, q in precon_cards.items():
            cardid = str(cardid)

            if cardid in two_players_cards:
                two_players_cards[cardid]["C"] = True
                if precon != "C":
                    two_players_cards[cardid][precon] = q
            else:
                two_players_cards[cardid] = {"C": True}
                if precon != "C":
                    two_players_cards[cardid][precon] = q


with (
    open("cardbase_crypt.json", "r+", encoding="utf8") as crypt_file,
    open("cardbase_crypt.min.json", "w", encoding="utf8") as crypt_file_min,
    open("cardbase_lib.json", "r+", encoding="utf8") as library_file,
    open("cardbase_lib.min.json", "w", encoding="utf8") as library_file_min,
):
    crypt = json.load(crypt_file)
    library = json.load(library_file)

    for cardid in two_players_cards.keys():
        card = None
        if cardid > "200000":
            card = crypt[cardid]
        else:
            card = library[cardid]

        for precon, q in two_players_cards[cardid].items():
            if "2P" in card["set"]:
                card["set"]["2P"][precon] = q
            else:
                card["set"]["2P"] = {precon: q}

    crypt_file.seek(0)
    crypt_file.truncate()
    library_file.seek(0)
    library_file.truncate()

    json.dump(crypt, crypt_file_min, separators=(",", ":"))
    json.dump(crypt, crypt_file, indent=4, separators=(",", ":"))
    json.dump(library, library_file_min, separators=(",", ":"))
    json.dump(library, library_file, indent=4, separators=(",", ":"))
