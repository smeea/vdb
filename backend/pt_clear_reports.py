from api import app, db
from models import User
import copy

with app.app_context():
    for u in User.query.filter_by(playtester=True).all():
        u.playtest_report = {}
        profile = copy.deepcopy(u.playtest_profile)
        if "games" in profile:
            del profile["games"]
        if "general" in profile:
            del profile["general"]
        u.playtest_profile = profile

    db.session.commit()
