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
    username = db.Column(db.String(64), index=True, unique=True)
    public_name = db.Column(db.String(64))
    email = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    inventory = db.Column(db.PickleType, default={})
    decks = db.relationship('Deck', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Deck(db.Model):
    deckid = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(64), default='New Deck')
    branch_name = db.Column(db.String(32), default='#0')
    author_public_name = db.Column(db.String(64))
    description = db.Column(db.String(8192), default='')
    cards = db.Column(db.PickleType, default={})
    inventory_type = db.Column(db.String(1), default='')
    master = db.Column(db.String(32))
    branches = db.Column(db.PickleType, default=[])
    tags = db.Column(db.PickleType, default=[])
    used_in_inventory = db.Column(db.PickleType, default={})
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Deck {}>'.format(self.name)
