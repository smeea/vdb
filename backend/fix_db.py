from api import app, db
from models import Deck
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

# REMOVE OLD PLAYTEST CARDS FROM DECKS
# REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
changes = {
}

# with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open("../frontend/public/data/cardbase_lib.json", "r") as library_file, open("../frontend/public/data/cardbase_lib_playtest.json", "r") as library_playtest_file, open("../frontend/public/data/cardbase_crypt_playtest.json", "r") as crypt_playtest_file:
#     cardlist = sorted([*json.load(crypt_file).keys(), *json.load(library_file).keys(), *json.load(crypt_playtest_file).keys(),*json.load(library_playtest_file).keys(),])


with app.app_context():
    for deck in Deck.query.all():
        short_deckid = deck.deckid[:9]
        d = Deck.query.get(short_deckid)
        if d:
            print('COLLISION: ', deck.deckid, d.deckid)
        deck.deckid = short_deckid

        if deck.master:
            deck.master = deck.master[:9]
        if deck.public_child:
            deck.public_child = deck.public_child[:9]
        if deck.public_parent:
            deck.public_parent = deck.public_parent[:9]

        if deck.branches:
            branches = deck.branches.copy()
            for idx, i in enumerate(branches):
                branches[idx] = i[:9]
            deck.branches = branches

        # new_cards = {}
        # new_used_cards = {}

        # for k, v in deck.cards.items():
        #     if k in changes.keys():
        #         new_cards[changes[k]] = v
        #         print(f"{k} to {changes[k]} in deck")
        #         if k in deck.used_in_inventory:
        #             print(f"{k} to {changes[k]} in used")
        #             new_used_cards[changes[k]] = deck.used_in_inventory[k]

        #     elif str(k) not in cardlist:
        #         print(f"{k} deleted from deck")
        #         continue

        #     else:
        #         new_cards[k] = v
        #         if k in deck.used_in_inventory:
        #             new_used_cards[k] = deck.used_in_inventory[k]


        # deck.used_in_inventory = new_used_cards
        # deck.cards = new_cards

    db.session.commit()
