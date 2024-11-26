import json
from deck_import import deck_import


playtest_files = {
    "precon-caine-round2.txt": "SCai",
    "precon-cathari-round2.txt": "SCat",
    "precon-death-round2.txt": "SDS",
    "precon-power-round2.txt": "SPIV",
    "precon-nb-ravnos-round4.txt": "NR",
    "precon-nb-salubri-round4.txt": "NSal",
    "precon-nb-tzimisce-round4.txt": "NTz",
    "precon-nb-hecata-round4.txt": "NH",
    "precon-nb-lasombra-round4.txt": "NL",
    "precon-hecata-round4.txt": "PH",
}

playtest_cards = {}

for file, precon in playtest_files.items():
    try:
        with open(f"playtest/precons/{file}", "r", encoding="utf8") as deck_file:
            precon_deck = " ".join(str(x) for x in deck_file.readlines())
            imported_deck = deck_import(precon_deck)
            precon_cards = imported_deck["cards"]
            bad_cards = imported_deck["bad_cards"]

            if len(bad_cards):
                for c in bad_cards:
                    print(f"BAD CARD: {c} [{file}]")

            for cardid, q in precon_cards.items():
                cardid = str(cardid)
                if cardid in playtest_cards:
                    playtest_cards[cardid][precon] = q
                else:
                    playtest_cards[cardid] = {precon: q}

    except Exception:
        print(f"{file} NOT FOUND")

try:
    with open("cardbase_crypt.json", "r+", encoding="utf8") as crypt_file, open(
        "cardbase_crypt.min.json", "w", encoding="utf8"
    ) as crypt_file_min, open(
        "playtest/cardbase_crypt_playtest.json", "r+", encoding="utf8"
    ) as crypt_playtest_file, open(
        "playtest/cardbase_crypt_playtest.min.json", "w", encoding="utf8"
    ) as crypt_playtest_file_min, open(
        "cardbase_lib.json", "r+", encoding="utf8"
    ) as library_file, open(
        "cardbase_lib.min.json", "w", encoding="utf8"
    ) as library_file_min, open(
        "playtest/cardbase_lib_playtest.json", "r+", encoding="utf8"
    ) as library_playtest_file, open(
        "playtest/cardbase_lib_playtest.min.json", "w", encoding="utf8"
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
                if "playtest" in card["set"]:
                    card["set"]["playtest"][precon] = q
                else:
                    card["set"]["playtest"] = {precon: q}

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

except Exception as e:
    print(e)
