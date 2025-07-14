from api import app, db
from models import Deck

with app.app_context():
    for d in Deck.query.all():
        if not d.creation_date:
            d.creation_date = d.timestamp.strftime("%Y-%m-%d")

    db.session.commit()
