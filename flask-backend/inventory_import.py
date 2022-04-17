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
        cardid = str(card["Id"])

        if name not in cardbase:
            cardbase[name] = {"base": cardid, card["Group"]: cardid}
        elif adv:
            cardbase[name]["adv"] = cardid
        else:
            cardbase[name][card["Group"]] = cardid

    for card in library:
        name = re.sub(r"\W", "", unidecode(card["Name"])).lower()
        cardid = str(card["Id"])
        cardbase[name] = {"base": cardid}

    for i in linesArray:
        id, quantity = import_parse_card(i, cardbase)
        if id and quantity:
            cards[id] = quantity

    return cards
