from api import app, db
from models import Deck, User
import json
import copy

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open("../frontend/public/data/cardbase_lib.json", "r") as library_file, open("../frontend/public/data/cardbase_lib_playtest.json", "r") as library_playtest_file, open("../frontend/public/data/cardbase_crypt_playtest.json", "r") as crypt_playtest_file:
    cardlist = sorted([*json.load(crypt_file).keys(), *json.load(library_file).keys(), *json.load(crypt_playtest_file).keys(),*json.load(library_playtest_file).keys(),])


with app.app_context():
    # REMOVE OLD PLAYTEST CARDS FROM DECKS
    # REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
    changes = {
        220005: 201708, #Aintz
        220001: 201709, #Arace
        220004: 201710, #Azuce
        220002: 201711, #Brad
        220012: 201712, #Graeu
        220006: 201713, #Kamal
        220009: 201714, #Maria
        220008: 201715, #Rinal
        220011: 201716, #Yewon
        120016: 102274, #Amici
        120017: 102275, #Arms
        120019: 102276, #Expul
        120572: 102277, #Obliv
        120020: 102278, #Omino
        120015: 102279, #Pass
        120010: 102280, #ShadCa
        120011: 102281, #ShadCl
        120012: 102282, #Styg
        120021: 102283, #Touch
        120014: 102284, #Truth
        120013: 102285, #Where
    }
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

    # CLEAR PLAYTEST REPORTS
    # for u in User.query.filter_by(playtester=True).all():
    #     u.playtest_report = {}
    #     profile = copy.deepcopy(u.playtest_prfile)
    #     del profile['games']
    #     u.playtest_profile = profile

    # UPDATE PLAYTEST PROFILE
    # for u in User.query.all():
    #     if 'lang' in u.playtest_report:
    #         u.playtest_profile = {
    #             'lang': u.playtest_report['lang']
    #         }

    #         report = copy.deepcopy(u.playtest_report)
    #         del report['lang']
    #         u.playtest_report = report
    #     else:
    #         u.playtest_profile = {}

    db.session.commit()
