import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()


class Config(object):
    # SECRET_KEY is used for cookie session signature.
    # PLAYTEST_KEY is used for playtest access.
    # You should set both in backend/.env file (create it).
    SECRET_KEY = os.environ.get("SECRET_KEY") or "mysecretkey1234567890"
    PLAYTEST_KEY = os.environ.get("PLAYTEST_KEY") or "anothersecretkey1234567890"

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///" + os.path.join(
        basedir, "app.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_SECURE = True
    REMEMBER_COOKIE_HTTPONLY = True
