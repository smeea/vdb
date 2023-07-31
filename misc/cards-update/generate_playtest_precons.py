import json
from deck_import import deck_import


playtest_files = {
    "playtest-precon-ravnos-round3.txt": "PR",
    "playtest-precon-tzimisce-round3.txt": "PTz",
    "playtest-precon-salubri-round3.txt": "PSal",
    "playtest-precon-hecata-round1.txt": "PH",
    "playtest-precon-lasombra-round1.txt": "PL",
}

playtest_cards = {}

for file, precon in playtest_files.items():
    try:
        with open(file, "r", encoding="utf8") as deck_file:
            precon_deck = " ".join(str(x) for x in deck_file.readlines())
            precon_cards = deck_import(precon_deck)["cards"]
            for cardid, q in precon_cards.items():
                cardid = str(cardid)
                if cardid in playtest_cards:
                    playtest_cards[cardid][precon] = q
                else:
                    playtest_cards[cardid] = {precon: q}

    except Exception:
        pass

try:
    with open("cardbase_crypt.json", "r+", encoding="utf8") as crypt_file, open(
        "cardbase_crypt.min.json", "w", encoding="utf8"
    ) as crypt_file_min, open(
        "cardbase_crypt_playtest.json", "r+", encoding="utf8"
    ) as crypt_playtest_file, open(
        "cardbase_crypt_playtest.min.json", "w", encoding="utf8"
    ) as crypt_playtest_file_min, open(
        "cardbase_lib.json", "r+", encoding="utf8"
    ) as library_file, open(
        "cardbase_lib.min.json", "w", encoding="utf8"
    ) as library_file_min, open(
        "cardbase_lib_playtest.json", "r+", encoding="utf8"
    ) as library_playtest_file, open(
        "cardbase_lib_playtest.min.json", "w", encoding="utf8"
    ) as library_playtest_file_min:
        crypt = json.load(crypt_file)
        crypt_playtest = json.load(crypt_playtest_file)
        library = json.load(library_file)
        library_playtest = json.load(library_playtest_file)

        for cardid in playtest_cards.keys():
            card = None
            if cardid > "210000":
                card = crypt_playtest[cardid]
            elif cardid > "200000":
                card = crypt[cardid]
            elif cardid > "110000":
                card = library_playtest[cardid]
            else:
                card = library[cardid]

            for precon, q in playtest_cards[cardid].items():
                if "PLAYTEST" in card["Set"]:
                    card["Set"]["PLAYTEST"][precon] = q
                else:
                    card["Set"]["PLAYTEST"] = {precon: q}

        crypt_file.seek(0)
        crypt_file.truncate()
        crypt_playtest_file.seek(0)
        crypt_playtest_file.truncate()
        library_file.seek(0)
        library_file.truncate()
        library_playtest_file.seek(0)
        library_playtest_file.truncate()

        json.dump(crypt, crypt_file_min, separators=(",", ":"))
        json.dump(crypt, crypt_file, indent=4, separators=(",", ":"))
        json.dump(crypt_playtest, crypt_playtest_file_min, separators=(",", ":"))
        json.dump(crypt_playtest, crypt_playtest_file, indent=4, separators=(",", ":"))
        json.dump(library, library_file_min, separators=(",", ":"))
        json.dump(library, library_file, indent=4, separators=(",", ":"))
        json.dump(library_playtest, library_playtest_file_min, separators=(",", ":"))
        json.dump(
            library_playtest, library_playtest_file, indent=4, separators=(",", ":")
        )

except Exception:
    pass
