from api import app, db
from models import Deck, User
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

changes = {
    210001: 201684,
    210002: 201679,
    210003: 201689,
    210004: 201692,
    210005: 201674,
    210006: 201672,
    210007: 201681,
    210008: 201683,
    210009: 201670,
    210010: 201675,
    210011: 201687,
    210021: 201664,
    210022: 201665,
    210023: 201667,
    210024: 201678,
    210025: 201669,
    210026: 201690,
    210027: 201677,
    210028: 201682,
    210029: 201688,
    210041: 201671,
    210042: 201691,
    210043: 201685,
    210044: 201680,
    210045: 201666,
    210046: 201676,
    210047: 201686,
    210048: 201663,
    210049: 201668,
    210050: 201673,
    110001: 102254,
    110002: 102265,
    110003: 102247,
    110005: 102264,
    110006: 102266,
    110007: 102249,
    110021: 102260,
    110022: 102255,
    110023: 102253,
    110024: 102256,
    110025: 102267,
    110027: 102251,
    110041: 102259,
    110042: 102257,
    110043: 102248,
    110044: 102250,
    110045: 102263,
    110046: 102262,
    110049: 102261,
    110050: 102258,
    110051: 102252,
}

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open("../frontend/public/data/cardbase_lib.json", "r") as library_file, open("../frontend/public/data/cardbase_lib_playtest.json", "r") as library_playtest_file, open("../frontend/public/data/cardbase_crypt_playtest.json", "r") as crypt_playtest_file:
    cardlist = sorted([*json.load(crypt_file).keys(), *json.load(library_file).keys(), *json.load(crypt_playtest_file).keys(),*json.load(library_playtest_file).keys(),])


with app.app_context():
    for deck in Deck.query.all():
        new_cards = {}
        new_used_cards = {}

        for k, v in deck.cards.items():
            if k in changes.keys():
                new_cards[changes[k]] = v
                print(f"{k} to {changes[k]} in deck")
                if k in deck.used_in_inventory:
                    print(f"{k} to {changes[k]} in used")
                    new_used_cards[changes[k]] = deck.used_in_inventory[k]

            elif str(k) not in cardlist:
                print(f"{k} deleted from deck")
                continue

            else:
                new_cards[k] = v
                if k in deck.used_in_inventory:
                    new_used_cards[k] = deck.used_in_inventory[k]


        deck.used_in_inventory = new_used_cards
        deck.cards = new_cards

    db.session.commit()
