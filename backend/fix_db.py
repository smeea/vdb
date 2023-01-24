from api import app, db
from models import Deck
import json

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES
with app.app_context():
    for deck in Deck.query.filter(Deck.public_parent != None).all():
        deck.sect = None
        sects = {}
        for id, q in deck.cards.items():
            if id < 200000:
                continue

            if (sect := crypt_db[str(id)]["Sect"]) in sects:
                sects[sect] += q
            else:
                sects[sect] = q

        for sect, q in sects.items():
            if q / deck.crypt_total > 0.65:
                deck.sect = sect
                continue

    db.session.commit()
