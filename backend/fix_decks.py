from api import app, db
from models import Deck
import json

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("../frontend/public/data/cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)

with app.app_context():
    # for d in Deck.query.all():
    for d in Deck.query.filter(Deck.public_parent != None).all():
        crypt_total = 0
        library_total = 0
        crypt_v5_total = 0
        library_v5_total = 0

        for id, q in d.cards.items():
            if id > 200000:
                card = crypt_db[str(id)]
                crypt_total += q
                if card["v5"]:
                    crypt_v5_total += q
            else:
                card = library_db[str(id)]
                library_total += q
                if card["v5"]:
                    library_v5_total += q

        d.v5_crypt = round(crypt_v5_total / crypt_total, 2)
        d.v5_library = round(library_v5_total / library_total, 2)

    db.session.commit()
