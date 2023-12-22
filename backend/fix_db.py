from api import app, db
from models import Deck, User
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

# fixes = {
#     210001: 000000,
# }
# with app.app_context():
#     for deck in Deck.query.all():
#         new_cards = {}
#         for k, v in deck.cards.items():
#             if k in fixes:
#                 new_cards[fixes[k]] = v
#                 print(f"{k} to {fixes[k]}")
#             else:
#                 new_cards[k] = v

#         deck.cards = new_cards

#     db.session.commit()

removes = [ 220003, 220007 ]
with app.app_context():
    for deck in Deck.query.all():
        merged_cards = deck.cards.copy()
        for k in removes:
            if k in merged_cards:
                del merged_cards[k]
            if k in deck.used_in_inventory:
                used_cards = deck.used_in_inventory.copy()
                del used_cards[k]
                deck.used_in_inventory = used_cards.copy()

        deck.cards = merged_cards

    db.session.commit()
