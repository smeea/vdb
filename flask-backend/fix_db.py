from api import db
from models import Deck

for deck in Deck.query.all():
    if deck.public_parent:
        crypt_total = 0
        library_total = 0
        for id, q in deck.cards.items():
            if id > 200000:
                crypt_total += 1
            else:
                library_total += 1

        if crypt_total > 35 or library_total > 90:
            parent = Deck.query.get(deck.public_parent)
            parent.public_child = None

            db.session.delete(deck)
            db.session.commit()
