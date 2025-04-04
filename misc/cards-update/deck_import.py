import json
import re
from unidecode import unidecode
from import_parse_card import import_parse_card

with open("cardbase_crypt.json", "r") as crypt_file, open(
    "cardbase_lib.json", "r"
) as library_file, open("playtest/cardbase_lib_playtest.json", "r") as library_playtest_file, open(
    "playtest/cardbase_crypt_playtest.json", "r"
) as crypt_playtest_file:
    crypt_db = json.load(crypt_file)
    library_db = json.load(library_file)
    crypt_db |= json.load(crypt_playtest_file)
    library_db |= json.load(library_playtest_file)

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
        adv = True if card["adv"] and card["adv"][0] else False
        name = re.sub(r"\W", "", unidecode(card["name"])).lower()

        if name not in cardbase:
            cardbase[name] = {"base": card["id"], card["group"]: card["id"]}
        elif adv:
            cardbase[name]["adv"] = card["id"]
        else:
            cardbase[name][card["group"]] = card["id"]

    for card in library:
        name = re.sub(r"\W", "", unidecode(card["name"])).lower()
        cardbase[name] = {"base": card["id"]}

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
