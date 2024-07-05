from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from sqlalchemy import MetaData

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
db = SQLAlchemy(app, metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate(app, db)
login = LoginManager(app)
from routes import (
    account_routes,
    decks_routes,
    inventory_routes,
    misc_routes,
    pda_routes,
    playtest_routes,
    twd_routes,
)
