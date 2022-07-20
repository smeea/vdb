from api import db
from models import User
from sys import argv, exit
import random
import string

if len(argv) <= 1:
    exit("need username as argument")

q = argv[1].lower()
user = User.query.filter_by(username=q).first()
if not user:
    user = User.query.filter_by(email=q).first()

if len(argv) == 2:
    print(f"Username: '{user.username}'")
    print(f"Email: '{user.email}'")
    print(f"Decks: {sorted([deck.name for deck in user.decks.all()])}")
    print(f"Inventory: '{len(user.inventory)}'")

elif argv[2] == "x":
    password = "".join(
        random.SystemRandom().choice(string.ascii_letters + string.digits)
        for _ in range(10)
    )
    user.set_password(password)
    db.session.commit()
    print(f"Username: '{user.username}'")
    print(f"New password: '{password}'")
else:
    password = argv[2]
    user.set_password(password)
    db.session.commit()
    print(f"Username: '{user.username}'")
    print(f"New password: '{password}'")
