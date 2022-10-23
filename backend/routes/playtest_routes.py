from flask import jsonify, request, abort
from flask_login import current_user, login_required
from api import app, db, login
from models import User


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


@app.route("/api/playtest", methods=["GET", "PUT", "DELETE"])
@login_required
def playtesters_route():
    if not current_user.playtest_admin:
        abort(401)

    if request.method == "GET":
        playtesters = User.query.filter_by(playtester=True).all()
        return jsonify([x.username for x in playtesters])

    if request.method == "PUT" or request.method == "DELETE":
        user = User.query.filter_by(username=request.json["username"].lower()).one()
        user.playtester = True if request.method == "PUT" else False
        db.session.commit()
        return jsonify(success=True)
