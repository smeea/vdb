from api import app, db
from models import Deck
import json
import os
from dotenv import load_dotenv

with (
    open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file,
    open("../frontend/public/data/cardbase_lib.json", "r") as library_file,
    open(
        f'../frontend/public/data/cardbase_lib_playtest_{os.environ.get("PLAYTEST_KEY")}.json', "r"
    ) as library_playtest_file,
    open(
        f'../frontend/public/data/cardbase_crypt_playtest_{os.environ.get("PLAYTEST_KEY")}.json',
        "r",
    ) as crypt_playtest_file,
):
    cardlist = sorted(
        [
            *json.load(crypt_file).keys(),
            *json.load(library_file).keys(),
            *json.load(crypt_playtest_file).keys(),
            *json.load(library_playtest_file).keys(),
        ]
    )

with app.app_context():
    # REMOVE OLD PLAYTEST CARDS FROM DECKS
    # REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
    changes = {
        250000: 210768,
        250001: 210744,
        250002: 210767,
        250003: 210780,
        250004: 210760,
        250005: 210738,
        250006: 210756,
        250007: 210776,
        250008: 210742,
        250009: 210775,
        250010: 210743,
        250011: 210765,
        250012: 210739,
        250013: 210755,
        250014: 210771,
        250015: 210763,
        250016: 210770,
        250017: 210748,
        250018: 210735,
        250019: 210754,
        250020: 210758,
        250021: 210736,
        250022: 210782,
        250023: 210752,
        250024: 210783,
        250025: 210759,
        250026: 210778,
        250027: 210745,
        250028: 210741,
        250029: 210757,
        250030: 210737,
        250031: 210766,
        250032: 210734,
        250033: 210774,
        250034: 210785,
        250035: 210750,
        250036: 210751,
        250037: 210749,
        250038: 210740,
        250039: 210784,
        250040: 210781,
        250041: 210746,
        250042: 210773,
        250043: 210769,
        250044: 210747,
        250045: 210772,
        250046: 210762,
        250047: 210764,
        250048: 210733,
        250049: 210761,
        250050: 210753,
        250051: 210777,
    }

    for deck in Deck.query.all():
        new_cards = {}
        new_used_cards = {}

        for k, v in deck.cards.items():
            if k in changes.keys():
                new_cards[changes[k]] = v
                print(f"{k} to {changes[k]} in deck {deck.deckid}")
                if k in deck.used_in_inventory:
                    print(f"{k} to {changes[k]} in used")
                    new_used_cards[changes[k]] = deck.used_in_inventory[k]

            elif str(k) not in cardlist:
                print(f"{k} deleted from deck {deck.deckid}")
                continue

            else:
                new_cards[k] = v
                if k in deck.used_in_inventory:
                    new_used_cards[k] = deck.used_in_inventory[k]

        deck.used_in_inventory = new_used_cards
        deck.cards = new_cards

    db.session.commit()
