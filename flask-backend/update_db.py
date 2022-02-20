from api import db
from models import User, Deck

# NOT REQUIRED TO RUN ANYMORE, USE ONLY AS TEMPLATE IF NEED TO CHANGE DB


def fix_users():
    users = User.query.all()
    for u in users:
        if u.favorites is None:
            u.favorites = []
            db.session.commit()
            print(u.username)


def fix_decks():
    decks = Deck.query.all()
    for d in decks:
        if d.favorited is None:
            d.favorited = []
            db.session.commit()
            print(d.deckid)


if __name__ == "__main__":
    fix_users()
    fix_decks()
