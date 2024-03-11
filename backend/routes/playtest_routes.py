from flask import jsonify, request, abort
from flask_login import current_user, login_required
from api import app, db, login
from models import User
import copy


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

@login_required
@app.route("/api/playtest/cards/<string:cardid>", methods=["GET", "PUT"])
def report_route(cardid):
    if not current_user.playtester:
        abort(401)


    if request.method == "GET":
            if not cardid in current_user.playtest_report['cards']:
                return {'text': '', 'score': 0}
            return current_user.playtest_report['cards'][cardid]

    if request.method == "PUT":
        report = copy.deepcopy(current_user.playtest_report)
        report['cards'][cardid] = {
            'text': request.json["text"],
            'score': request.json["score"],
        }
        current_user.playtest_report = report
        db.session.commit()
        return jsonify(success=True)
