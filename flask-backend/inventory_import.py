import json
import re
from unidecode import unidecode
from import_parse_card import import_parse_card

with open("cardbase_crypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file).values()

with open("cardbase_lib.json", "r") as library_file:
    library = json.load(library_file).values()


def inventory_import(deckText):
    linesArray = deckText.splitlines()
    cards = {}
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
        cardbase[name] = {"base": str(card["Id"])}

    for i in linesArray:
        id, quantity = import_parse_card(i, cardbase)
        if id and quantity:
            cards[id] = quantity

    return cards
