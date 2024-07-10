from api import app, db
from models import Deck
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

# REMOVE OLD PLAYTEST CARDS FROM DECKS
# REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
changes = {
    130001: 102269, # conclave
    130002: 102270, # fist
    130003: 102271, # confiscation
    130005: 102273, # loup
    130572: 102268, # banu jus
    130006: 102272, # las jus

    250001: 201694, # diana
    250002: 201696, # francois
    250003: 201703, # modius
    250004: 201702, # marcos
    250005: 201706, # silvian
    250006: 201707, # valentina
    250007: 201699, # kazuki

    250011: 201700, # lucinde
    250012: 201704, # molly
    250009: 201697, # ian
    250010: 201698, # juliet
    250008: 201693, # annabelle
    250014: 201695, # donal
    250013: 201705, # nikolaus
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
