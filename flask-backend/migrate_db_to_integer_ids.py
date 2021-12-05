from api import db
from models import User, Deck

for deck in Deck.query.all():
    old_cards = deck.cards.copy()
    new_cards = {}

    for k, v in old_cards.items():
        new_cards[int(k)] = int(v)

    deck.cards = new_cards
    db.session.commit()

for user in User.query.all():
    old_inventory = user.inventory.copy()
    new_inventory = {}

    for k, v in old_inventory.items():
        new_inventory[int(k)] = int(v)

    user.inventory = new_inventory
    db.session.commit()
