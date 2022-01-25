from api import db
from models import User, Deck
from sys import argv

user = User.query.filter_by(username=argv[1]).first()

if len(argv) == 3:
    user.set_password(argv[2])
    db.session.commit()
    print('new password:', argv[2])
else:
    print('name:', user.username)
    print('email:', user.email)
    print('decks: ', user.decks.all())
    print('inventory: ', len(user.inventory))
