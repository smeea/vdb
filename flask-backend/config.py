import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # SECRET_KEY is used for cookie session signature.
    # You should change it to some random string.
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'mysecretkey1234567890'

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
