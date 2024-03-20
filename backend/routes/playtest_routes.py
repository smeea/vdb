from flask import jsonify, request, abort
from flask_login import current_user, login_required
from api import app, db, login
from models import User
import copy


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


@app.route("/api/playtest/users", methods=["GET", "PUT", "DELETE"])
@login_required
def playtesters_route():
    if not current_user.playtest_admin:
        abort(401)

    if request.method == "GET":
        playtesters = User.query.filter_by(playtester=True).all()
        result = {}
        for i in playtesters:
            lang = i.playtest_report['lang'] if 'lang' in i.playtest_report else None
            result[i.username] = lang

        return jsonify(result)

    if request.method == "PUT" or request.method == "DELETE":
        user = User.query.filter_by(username=request.json["username"].lower()).one()
        user.playtester = True if request.method == "PUT" else False
        db.session.commit()
        return jsonify(success=True)

@login_required
@app.route("/api/playtest/export/<string:target>/<string:id>", methods=["GET"])
def report_export_route(target, id):
    if target not in ['cards', 'precons']:
        abort(400)
    if not current_user.playtest_admin:
        abort(401)

    lang = current_user.playtest_report['lang']
    reports = {}
    playtesters = User.query.filter_by(playtester=True).all()

    for p in playtesters:
        # defaulting lang to English if not specified
        report_lang = p.playtest_report['lang'] if 'lang' in p.playtest_report else 'en-EN'
        if report_lang != lang:
            continue

        try:
            reports[p.username] = p.playtest_report[target][id]
        except Exception:
            pass

    return jsonify(reports)

@login_required
@app.route("/api/playtest/<string:target>/<string:id>", methods=["GET", "PUT"])
def report_route(target, id):
    if target not in ['cards', 'precons']:
        abort(400)
    if not current_user.playtester:
        abort(401)

    if not 'precons' in current_user.playtest_report and not 'cards' in current_user.playtest_report:
        report = copy.deepcopy(current_user.playtest_report)
        report['precons'] = {}
        report['cards'] = {}
        current_user.playtest_report = report
        db.session.commit()

    if request.method == "GET":
            if not id in current_user.playtest_report[target]:
                return {'text': '', 'score': 0}
            return current_user.playtest_report[target][id]

    if request.method == "PUT":
        report = copy.deepcopy(current_user.playtest_report)
        report[target][id] = {
            'text': request.json["text"],
            'score': request.json["score"],
        }
        current_user.playtest_report = report
        db.session.commit()
        return jsonify(success=True)


@login_required
@app.route("/api/playtest/lang", methods=["GET", "PUT"])
def report_lang_route():
    if not current_user.playtester:
        abort(401)

    if not 'lang' in current_user.playtest_report:
        report = copy.deepcopy(current_user.playtest_report)
        report['lang'] = None
        current_user.playtest_report = report
        db.session.commit()

    if request.method == "GET":
        return jsonify({'value': current_user.playtest_report['lang']})

    if request.method == "PUT":
        report = copy.deepcopy(current_user.playtest_report)
        report['lang'] = request.json["lang"]
        current_user.playtest_report = report
        db.session.commit()
        return jsonify(success=True)
