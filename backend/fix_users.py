from api import app, db
from models import User

with app.app_context():
    for u in User.query.all():
        u.inventory_wishlist = {}

    db.session.commit()
