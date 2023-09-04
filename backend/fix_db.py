from api import app, db
from models import Deck, User
import json

# with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file:
#     crypt_db = json.load(crypt_file)

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES
with app.app_context():
    for user in User.query.filter(User.inventory != {}).all():
        new_inventory = {}
        for k, v in user.inventory.items():
            new_inventory[k] = {
                'q': v,
                't': '',
            }

        user.inventory = new_inventory

    # for deck in Deck.query.filter(Deck.public_parent != None).all():

    db.session.commit()
