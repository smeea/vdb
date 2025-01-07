from api import app, db
from models import Deck, User
import json
import copy

# TEMPLATE FOR FUTURE FIXES DB FIXES

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open(
    "../frontend/public/data/cardbase_lib.json", "r"
) as library_file, open(
    "../frontend/public/data/cardbase_lib_playtest.json", "r"
) as library_playtest_file, open(
    "../frontend/public/data/cardbase_crypt_playtest.json", "r"
) as crypt_playtest_file:
    cardlist = sorted(
        [
            *json.load(crypt_file).keys(),
            *json.load(library_file).keys(),
            *json.load(crypt_playtest_file).keys(),
            *json.load(library_playtest_file).keys(),
        ]
    )

with open("../misc/cards-update/pda_tags.json", "r") as pda_tags_file:
    pda_tags = json.load(pda_tags_file)


with app.app_context():
    # REMOVE OLD PLAYTEST CARDS FROM DECKS
    # REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
    # changes = {
    #     # 220005: 201708, #Aintz
    # }
    # for deck in Deck.query.all():
    #     new_cards = {}
    #     new_used_cards = {}

    #     for k, v in deck.cards.items():
    #         if k in changes.keys():
    #             new_cards[changes[k]] = v
    #             print(f"{k} to {changes[k]} in deck")
    #             if k in deck.used_in_inventory:
    #                 print(f"{k} to {changes[k]} in used")
    #                 new_used_cards[changes[k]] = deck.used_in_inventory[k]

    #         elif str(k) not in cardlist:
    #             print(f"{k} deleted from deck")
    #             continue

    #         else:
    #             new_cards[k] = v
    #             if k in deck.used_in_inventory:
    #                 new_used_cards[k] = deck.used_in_inventory[k]

    #     deck.used_in_inventory = new_used_cards
    #     deck.cards = new_cards

    # CLEAR PLAYTEST REPORTS
    # for u in User.query.filter_by(playtester=True).all():
    #     u.playtest_report = {}
    #     profile = copy.deepcopy(u.playtest_profile)
    #     if "games" in profile:
    #         del profile["games"]
    #     if "general" in profile:
    #         del profile["general"]
    #     u.playtest_profile = profile

    # SET PDA DECKS TAGS
    for deck in Deck.query.filter(Deck.public_parent != None):
        deck.tags = pda_tags[deck.deckid]

    db.session.commit()
