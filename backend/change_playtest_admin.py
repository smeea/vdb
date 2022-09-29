from api import db
from models import User
from sys import argv, exit

if len(argv) <= 1:
    exit("need username as argument")

q = argv[1].lower()
user = User.query.filter_by(username=q).one()

user.playtest_admin = not user.playtest_admin
db.session.commit()
print(f"Username: '{user.username}'")
print(f"Admin: {user.playtest_admin}")
