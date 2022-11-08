from api import app, db
from models import User
from sys import argv, exit

if len(argv) <= 1:
    exit("need username as argument, second argument '0' is False else is True")

q = argv[1].lower()
with app.app_context():
    user = User.query.filter_by(username=q).one()
    if len(argv) == 3:
        user.playtest_admin = False if argv[2] == "0" else True
        db.session.commit()
    print(f"Username: '{user.username}'")
    print(f"Admin: {user.playtest_admin}")
