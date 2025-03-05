from api import app, db
from models import Deck
import json
import os
from dotenv import load_dotenv

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
        140109: 102295,  # Shroud
        140025: 102296,  # Spectral
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

    db.session.commit()
