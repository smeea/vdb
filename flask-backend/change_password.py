from api import db
from models import User, Deck
from sys import argv, exit
import random
import string

if len(argv) <= 1:
    exit('need username as argument')

name = argv[1].lower()
user = User.query.filter_by(username=name).first()

if len(argv) == 2:
    print("name:", user.username)
    print("email:", user.email)
    print("decks: ", user.decks.all())
    print("inventory: ", len(user.inventory))

elif argv[2] == 'x':
    password = "".join(
        random.SystemRandom().choice(string.ascii_letters + string.digits)
        for _ in range(10)
    )
    user.set_password(password)
    db.session.commit()
    print("new password:", password)
else:
    password = argv[2]
    user.set_password(password)
    db.session.commit()
    print("new password:", password)
