from api import app
from models import User
from sys import argv, exit
import json

with open("../frontend/dist/cardbase_crypt.json", "r") as crypt_file:
    cardbase = json.load(crypt_file)

if len(argv) <= 1:
    exit("need username as argument")

u = argv[1].lower()
with app.app_context():
    user = User.query.filter_by(username=u).first()
    if not user:
        user = User.query.filter_by(email=u).first()

    decks = user.decks.all()

    if len(argv) == 2:
        for i, deck in enumerate(decks):
            print(f"{i + 1}: {deck.name}")
    else:
        for i, n in enumerate(argv[2:]):
            deck = decks[int(n) - 1]
            if i > 0:
                print()
            print(f"{deck.name} - https://vdb.im/decks/{deck.deckid}")
            for card, q in deck.cards.items():
                if card > 200000:
                    print(f"{q} - {cardbase[str(card)]['Name']}")
