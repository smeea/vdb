from api import app, db
from models import Deck
import json
import os
from dotenv import load_dotenv

with (
    open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file,
    open("../frontend/public/data/cardbase_lib.json", "r") as library_file,
    open(
        f"../frontend/public/data/cardbase_lib_playtest_{os.environ.get('PLAYTEST_KEY')}.json", "r"
    ) as library_playtest_file,
    open(
        f"../frontend/public/data/cardbase_crypt_playtest_{os.environ.get('PLAYTEST_KEY')}.json",
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
        240005: 201781,  # Bara
        240004: 201782,  # Djen
        240007: 201783,  # Haft
        240001: 201784,  # Madd
        240006: 201785,  # Nolu
        240002: 201786,  # Saan
        140033: 102349,  # Ang Gi
        140009: 102350,  # Antic
        140019: 102351,  # Bl Ma
        140014: 102352,  # Contra
        140018: 102353,  # Dog Pu
        140008: 102354,  # Fle Cha
        140015: 102355,  # Go ge
        140010: 102356,  # Hunti
        140016: 102358,  # Phant
        140011: 102359,  # Rig Bla
        140006: 102360,  # Sz Ass
        140005: 102361,  # Sz Bg
        140013: 102362,  # Tranq
        140002: 102363,  # Voz Gr
        140001: 102364,  # Voz Ju
        140003: 102365,  # Voz Sz
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
