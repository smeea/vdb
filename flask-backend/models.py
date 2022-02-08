from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

from api import db
from api import login


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    decks = db.relationship('Deck', backref='author', lazy='dynamic')
    email = db.Column(db.String(64))
    inventory = db.Column(db.PickleType, default={})
    password_hash = db.Column(db.String(128))
    public_name = db.Column(db.String(64))
    username = db.Column(db.String(64), index=True, unique=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Deck(db.Model):
    author_public_name = db.Column(db.String(64))
    branch_name = db.Column(db.String(32), default='#0')
    branches = db.Column(db.PickleType, default=[])
    cards = db.Column(db.PickleType, default={})
    deckid = db.Column(db.String(32), primary_key=True)
    description = db.Column(db.String(32768), default='')
    hidden = db.Column(db.Boolean, default=False)
    inventory_type = db.Column(db.String(1), default='')
    master = db.Column(db.String(32))
    name = db.Column(db.String(64), default='New Deck')
    tags = db.Column(db.PickleType, default=[])
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    used_in_inventory = db.Column(db.PickleType, default={})
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Used only for Public Deck Archive
    public_child = db.Column(db.String(32))
    public_parent = db.Column(db.String(32))
    capacity = db.Column(db.Integer)
    cardtypes_ratio = db.Column(db.PickleType)
    clan = db.Column(db.String(32))
    creation_date = db.Column(db.String(10))
    disciplines = db.Column(db.PickleType, default=[])
    crypt_total = db.Column(db.Integer)
    library_total = db.Column(db.Integer)
    traits = db.Column(db.PickleType, default=[])

    def __repr__(self):
        return '<Deck {}>'.format(self.name)
