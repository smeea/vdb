from flask import jsonify, request, abort
from flask_login import current_user, login_required
from datetime import date, datetime, timedelta
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
            result[i.username] = {
                'lang': i.playtest_profile['lang'] if 'lang' in i.playtest_profile else None,
                'added_by': i.playtest_profile['added_by'] if 'added_by' in i.playtest_profile else None,
                'timestamp': i.playtest_profile['timestamp'] if 'timestamp' in i.playtest_profile else None,
                'liaison': i.playtest_profile['liaison'] if 'liaison' in i.playtest_profile else None,
                'is_admin': i.playtest_admin,
            }

        return jsonify(result)

    if request.method == "PUT" or request.method == "DELETE":
        user = User.query.filter_by(username=request.json["username"].lower()).first()
        if not user:
            abort(400)

        if request.method == "PUT":
            user.playtester = True
            user.playtest_profile = { 'added_by': current_user.username }
        else:
            user.playtester = False

        db.session.commit()
        return jsonify(success=True)

@login_required
@app.route("/api/playtest/export/<string:target>/<string:id>", methods=["GET"])
def report_export_route(target, id):
    if target not in ['cards', 'precons', 'all']:
        abort(400)
    if not current_user.playtest_admin:
        abort(401)

    lang = current_user.playtest_profile['lang'] if 'lang' in current_user.playtest_profile else 'en-EN'
    reports = {}
    playtesters = User.query.filter_by(playtester=True).all()
    targets = ['cards', 'precons'] if target == 'all' else [target]

    for p in playtesters:
        # defaulting lang to English if not specified
        user_lang = p.playtest_profile['lang'] if 'lang' in p.playtest_profile else 'en-EN'
        if user_lang != lang:
            continue

        report = copy.deepcopy(p.playtest_report)

        for t in targets:
            if t in report:
                if id == 'all':
                    for k, v in report[t].items():
                        if v['score'] == 0 and v['text'] == '':
                            continue

                        if k in reports:
                            reports[k][p.username] = v
                        else:
                            reports[k] = {
                                p.username: v
                            }

                elif id in report[t]:
                    if report[t][id]['score'] == 0 and report[t][id]['text'] == '':
                        continue
                    reports[p.username] = report[t][id]

    return jsonify(reports)

@login_required
@app.route("/api/playtest/<string:target>/<string:id>", methods=["GET", "PUT"])
def report_route(target, id):
    if not current_user.playtester:
        abort(401)

    if request.method == "GET":
        if not id in current_user.playtest_report[target]:
            return {'text': '', 'score': 0, 'isPlayed': False}
        return current_user.playtest_report[target][id]

    if request.method == "PUT":
        report = copy.deepcopy(current_user.playtest_report)
        if target not in report:
            report[target] = {}

        report[target][id] = {
            'text': request.json["text"],
            'score': request.json["score"],
            'isPlayed': request.json["isPlayed"],
        }

        current_user.playtest_report = report

        profile = copy.deepcopy(current_user.playtest_profile)
        profile['timestamp'] = date.today().strftime("%Y-%m-%d"),
        current_user.playtest_profile = profile

        db.session.commit()
        return jsonify(success=True)

@login_required
@app.route("/api/playtest/profile", methods=["PUT"])
def update_profile_route():
    if not current_user.playtester:
        abort(401)

    profile = copy.deepcopy(current_user.playtest_profile)
    if 'liaison' in request.json:
        profile['liaison'] = request.json['liaison']
    if 'lang' in request.json:
        profile['lang'] = request.json['lang']
    if 'games' in request.json:
        profile['games'] = request.json['games']
    current_user.playtest_profile = profile
    db.session.commit()
    return jsonify(success=True)
