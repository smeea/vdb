from api import db
from models import User, Deck

## NOT REQUIRED TO RUN ANYMORE, USE ONLY AS TEMPLATE IF NEED TO CHANGE DB

def find_double_case():
    users = User.query.all()
    users_lower = set()
    for u in users:
        name = u.username
        if name.lower() not in users_lower:
            users_lower.add(name.lower())
        else:
            d = len(u.decks.all())
            i = len(u.inventory) if u.inventory else None
            print(u.username, d, i)
    print(len(users), len(users_lower))


def remove_double_case():
    usernames = []
    for username in usernames:
        u = User.query.filter_by(username=username).first()
        db.session.delete(u)
        db.session.commit()


def change_to_lowercase():
    users = User.query.all()
    for u in users:
        u.username = u.username.lower()
        db.session.commit()
        print(u.username)


def fix_users():
    users = User.query.all()
    for u in users:
        if u.inventory is None:
            u.inventory = {}
            db.session.commit()
            print(u.username)


def fix_decks():
    decks = Deck.query.all()
    for d in decks:
        if d.inventory_type is None:
            d.inventory_type = ''
            db.session.commit()
            print(d.deckid)
        if d.tags is None:
            d.tags = []
            db.session.commit()
            print(d.deckid)
        if d.used_in_inventory is None:
            d.used_in_inventory = {}
            db.session.commit()
            print(d.deckid)
        if d.branches is None:
            d.branches = []
            db.session.commit()
            print(d.deckid)
        if d.cards is None:
            d.cards = {}
            db.session.commit()
            print(d.deckid)
        if d.description is None:
            d.description = ''
            db.session.commit()
            print(d.deckid)
        if d.branch_name is None:
            d.branch_name = 'Original'
            db.session.commit()
            print(d.deckid)


if __name__ == '__main__':
    remove_double_case()
    change_to_lowercase()
    fix_users()
    fix_decks()
