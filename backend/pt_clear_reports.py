from api import app, db
from models import User
import copy

with app.app_context():
    for u in User.query.filter_by(playtester=True).all():
        # if "cards" in u.playtest_report:
        #     cards = copy.deepcopy(u.playtest_report["cards"])
        #     for id in u.playtest_report["cards"].keys():
        #         if not id.startswith("16") and not id.startswith("25"):
        #             del cards[id]
        #     u.playtest_report["cards"] = copy.deepcopy(cards)
        u.playtest_report = {}
        profile = copy.deepcopy(u.playtest_profile)
        if "games" in profile:
            del profile["games"]
        if "general" in profile:
            del profile["general"]
        u.playtest_profile = profile

    db.session.commit()
