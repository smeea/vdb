from api import app, db
from models import User
import copy

with app.app_context():
    for u in User.query.all():
        w = copy.deepcopy(u.inventory_wishlist)

        for cardid in w.keys():
            if w[cardid].get('logic') == 'urplusFixed':
                w[cardid]['logic'] = 'surplusFixed'

            if 'value' in w[cardid]:
                w[cardid]['q'] = w[cardid]['value']
                del w[cardid]['value']

            print(w[cardid])

        u.inventory_wishlist = w

    db.session.commit()
