from api import db
from models import User, Deck
from sys import argv
import random
import string

name = argv[1].lower()
user = User.query.filter_by(username=name).first()

if len(argv) == 3:
    password = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))
    user.set_password(password)
    db.session.commit()
    print('new password:', password)
else:
    print('name:', user.username)
    print('email:', user.email)
    print('decks: ', user.decks.all())
    print('inventory: ', len(user.inventory))
