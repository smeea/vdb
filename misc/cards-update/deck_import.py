import json
import re
from unidecode import unidecode
from import_parse_card import import_parse_card

with open("cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)

try:
    with open("cardbase_lib_playtest.json", "r") as library_playtest_file, open(
        "cardbase_crypt_playtest.json", "r"
    ) as crypt_playtest_file:
        crypt_db = json.load(crypt_playtest_file)
        library_db = json.load(library_playtest_file)

except Exception:
    print(
        "PLAYTEST PRECONS DISABLED - NO PLAYTEST PRECONS FILES FOUND (CONTACT PLAYTEST COORDINATOR TO GET IT)"
    )

crypt = list(crypt_db.values())
library = list(library_db.values())


def deck_import(deck_text):
    linesArray = deck_text.splitlines()
    deck = {
        "name": "New Imported Deck",
        "author": "",
        "description": "",
        "cards": {},
        "bad_cards": [],
    }
    cardbase = {}

    for card in crypt:
        adv = True if card["Adv"] and card["Adv"][0] else False
        name = re.sub(r"\W", "", unidecode(card["Name"])).lower()

        if name not in cardbase:
            cardbase[name] = {"base": card["Id"], card["Group"]: card["Id"]}
        elif adv:
            cardbase[name]["adv"] = card["Id"]
        else:
            cardbase[name][card["Group"]] = card["Id"]

    for card in library:
        name = re.sub(r"\W", "", unidecode(card["Name"])).lower()
        cardbase[name] = {"base": card["Id"]}

    for i in linesArray:
        i = i.strip()
        if nameMatch := re.match(r"^Deck Name: (.*)", i):
            deck["name"] = nameMatch.group(1)
            continue
        if nameMatch := re.match(r"^Author: (.*)", i):
            deck["author"] = nameMatch.group(1)
            continue
        if nameMatch := re.match(r"^Description: (.*)", i):
            deck["description"] = nameMatch.group(1)
            continue
        if not i or re.match(r"^\D", i):
            continue

        id, quantity = import_parse_card(i, cardbase)
        if id and quantity:
            deck["cards"][id] = quantity
        else:
            deck["bad_cards"].append(i)

    return deck
