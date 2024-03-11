from api import app, db
from models import User

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

with app.app_context():
    for user in User.query.all():
        user.playtest_report = {
            'cards': {},
            'precons': {},
        }

    db.session.commit()
