from api import db
from models import User
from sys import argv, exit
import json

with open("../frontend/dist/cardbase_crypt.json", "r") as crypt_file:
    cardbase = json.load(crypt_file)

if len(argv) <= 1:
    exit("need username as argument")

u = argv[1].lower()
user = User.query.filter_by(username=u).first()
if not user:
    user = User.query.filter_by(email=u).first()


decks = user.decks.all()

if len(argv) == 2:
    print(
        user.username + ":", [f"{i + 1}: {deck.name}" for i, deck in enumerate(decks)]
    )
else:
    for i in argv[2:]:
        deck = decks[int(i) - 1]
        print(f"{deck.name} - https://vdb.im/decks/{deck.deckid}")
        for card, q in deck.cards.items():
            if card > 200000:
                print(f"{q} - {cardbase[str(card)]['Name']}")
        print()
