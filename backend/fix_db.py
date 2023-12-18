from api import app, db
from models import Deck, User
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

fixes = {
    210001: 000000,
}

with app.app_context():
    for deck in Deck.query.all():
        new_cards = {}
        for k, v in deck.cards.items():
            if k in fixes:
                new_cards[fixes[k]] = v
                print(f"{k} to {fixes[k]}")
            else:
                new_cards[k] = v

        deck.cards = new_cards

    db.session.commit()
