from api import db
from models import User
from sys import argv, exit

if len(argv) <= 1:
    exit("need username as argument")

q = argv[1].lower()
user = User.query.filter_by(username=q).one()

user.playtester = not user.playtester
db.session.commit()
print(f"Username: '{user.username}'")
print(f"Playtester: {user.playtester}")
