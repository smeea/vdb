from api import app, db
from models import Deck, User

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

changes = {
    210001: 000000,
}
removes = [ ]
with app.app_context():
    for deck in Deck.query.all():
        new_cards = {}
        for k, v in deck.cards.items():
            if k in changes:
                new_cards[changes[k]] = v
                print(f"{k} to {changes[k]}")
            else:
                new_cards[k] = v

        for k in removes:
            if k in new_cards:
                del new_cards[k]
            if k in deck.used_in_inventory:
                used_cards = deck.used_in_inventory.copy()
                del used_cards[k]
                deck.used_in_inventory = used_cards.copy()

        deck.cards = new_cards

    db.session.commit()
