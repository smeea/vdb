from api import app, db
from models import User
import copy

with app.app_context():
    for u in User.query.all():
        w = copy.deepcopy(u.inventory_wishlist)

        for k in w.keys():
            if w[k].get('logic') == 'urplusFixed':
                w[k]['logic'] = 'surplusFixed'

        u.inventory_wishlist = w

    db.session.commit()
