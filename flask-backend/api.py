from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
from routes import (
    account_routes,
    decks_routes,
    inventory_routes,
    twd_routes,
    pda_routes,
)

# Everything below only required for `flask shell` to play with database
# from models import User, Deck
# from api import db


# @app.shell_context_processor
# def make_shell_context():
#     return {"db": db, "User": User, "Deck": Deck}
