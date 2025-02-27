from api import app, db
from models import Deck, User
import json
import copy
import os
from dotenv import load_dotenv

# TEMPLATE FOR FUTURE FIXES DB FIXES

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open(
    "../frontend/public/data/cardbase_lib.json", "r"
) as library_file, open(
    f'../frontend/public/data/cardbase_lib_playtest_{os.environ.get("PLAYTEST_KEY")}.json', "r"
) as library_playtest_file, open(
    f'../frontend/public/data/cardbase_crypt_playtest_{os.environ.get("PLAYTEST_KEY")}.json', "r"
) as crypt_playtest_file:
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
        220013: 201727,  # Peter
        220014: 201717,  # Alek
        220015: 201719,  # Hiro
        220016: 201720,  # Holi
        220017: 201718,  # Gebe
        220018: 201723,  # Moni
        220019: 201721,  # Lene
        220020: 201724,  # Mora
        220021: 201728,  # Toma
        220022: 201725,  # Moth
        220023: 201726,  # Eat
        220024: 201722,  # Marc
        120001: 102287,  # Biot
        120002: 102289,  # Fami
        120003: 102286,  # Aggr
        120004: 102292,  # Scre
        120005: 102288,  # Cons
        120006: 102290,  # Gate
        120007: 102291,  # Pito
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
    for u in User.query.filter_by(playtester=True).all():
        u.playtest_report = {}
        profile = copy.deepcopy(u.playtest_profile)
        if "games" in profile:
            del profile["games"]
        if "general" in profile:
            del profile["general"]
        u.playtest_profile = profile

    db.session.commit()
