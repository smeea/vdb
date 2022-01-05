from api import db
from models import User, Deck

total_decks = len(Deck.query.all())
for i, deck in enumerate(Deck.query.all()):
    print(f"{i} of {total_decks} decks")
    old_cards = deck.cards.copy()
    new_cards = {}

    for k, v in old_cards.items():
        new_cards[int(k)] = int(v)

    deck.cards = new_cards
    db.session.commit()

total_users = len(User.query.all())
for i, user in enumerate(User.query.all()):
    print(f"{i} of {total_users} users")
    old_inventory = user.inventory.copy()
    new_inventory = {}

    for k, v in old_inventory.items():
        new_inventory[int(k)] = int(v)

    user.inventory = new_inventory
    db.session.commit()
