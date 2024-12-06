from flask import jsonify, request, abort
from flask_login import current_user, login_required
from datetime import date
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
        for u in playtesters:
            cards_reports = (
                len(u.playtest_report["cards"].keys()) if "cards" in u.playtest_report else 0
            )
            precons_reports = (
                len(u.playtest_report["precons"].keys()) if "precons" in u.playtest_report else 0
            )
            total_reports = cards_reports + precons_reports

            result[u.username] = {
                "lang": (u.playtest_profile["lang"] if "lang" in u.playtest_profile else None),
                "added_by": (
                    u.playtest_profile["added_by"] if "added_by" in u.playtest_profile else None
                ),
                "added_date": (
                    u.playtest_profile["added_date"] if "added_date" in u.playtest_profile else None
                ),
                "timestamp": (
                    u.playtest_profile["timestamp"] if "timestamp" in u.playtest_profile else None
                ),
                "liaison": (
                    u.playtest_profile["liaison"] if "liaison" in u.playtest_profile else None
                ),
                "games": (u.playtest_profile["games"] if "games" in u.playtest_profile else None),
                "reports": total_reports,
                "is_admin": u.playtest_admin,
            }

        return jsonify(result)

    if request.method == "PUT" or request.method == "DELETE":
        user = User.query.filter_by(username=request.json["username"].lower()).first()
        if not user:
            abort(400)

        if request.method == "PUT":
            user.playtester = True
            user.playtest_profile = {
                "added_by": current_user.username,
                "added_date": date.today().strftime("%Y-%m-%d"),
            }

        else:
            user.playtester = False

        db.session.commit()
        return jsonify(success=True)


@login_required
@app.route("/api/playtest/export/<string:target>/<string:id>", methods=["GET"])
def report_export_route(target, id):
    if target not in ["crypt", "library", "cards", "precons", "general"]:
        abort(400)
    if not current_user.playtest_admin:
        abort(401)

    lang = (
        current_user.playtest_profile["lang"]
        if "lang" in current_user.playtest_profile
        else "en-EN"
    )

    reports = {}
    playtesters = User.query.filter_by(playtester=True).all()
    # targets = ['general', 'cards', 'precons'] if target == 'all' else [target]

    for p in playtesters:
        # defaulting lang to English if not specified
        user_lang = p.playtest_profile["lang"] if "lang" in p.playtest_profile else "en-EN"
        if user_lang != lang:
            continue

        report = copy.deepcopy(p.playtest_report)

        if target == "general":
            general = p.playtest_profile["general"] if "general" in p.playtest_profile else None
            if not general:
                continue

            if "general" in reports:
                reports[p.username] = general
            else:
                reports = {p.username: general}

        else:
            t = "cards" if target in ["crypt", "library"] else target
            if t in report:
                if id == "all":
                    for k, v in report[t].items():
                        if v["score"] == 0 and v["text"] == "":
                            continue
                        if (
                            target == "crypt"
                            and int(k) < 200000
                            or target == "library"
                            and int(k) > 200000
                        ):
                            continue

                        if k in reports:
                            reports[k][p.username] = v
                        else:
                            reports[k] = {p.username: v}

                elif id in report[target]:
                    if report[target][id]["score"] == 0 and report[target][id]["text"] == "":
                        continue
                    reports[p.username] = report[target][id]

    return jsonify(reports)


@login_required
@app.route("/api/playtest/<string:target>/<string:id>", methods=["GET", "PUT"])
def report_route(target, id):
    if not current_user.playtester:
        abort(401)

    if request.method == "GET":
        if (
            not target in current_user.playtest_report
            or not id in current_user.playtest_report[target]
        ):
            return {"text": "", "score": 0, "isPlayed": False}
        return current_user.playtest_report[target][id]

    if request.method == "PUT":
        report = copy.deepcopy(current_user.playtest_report)
        if target not in report:
            report[target] = {}

        report[target][id] = {
            "text": request.json["text"],
            "score": request.json["score"],
            "isPlayed": request.json["isPlayed"],
        }

        current_user.playtest_report = report

        profile = copy.deepcopy(current_user.playtest_profile)
        profile["timestamp"] = date.today().strftime("%Y-%m-%d")
        current_user.playtest_profile = profile

        db.session.commit()
        return jsonify(success=True)


@login_required
@app.route("/api/playtest/profile", methods=["PUT"])
def update_profile_route():
    if not current_user.playtester:
        abort(401)

    profile = copy.deepcopy(current_user.playtest_profile)
    if "liaison" in request.json:
        profile["liaison"] = request.json["liaison"]
    if "lang" in request.json:
        profile["lang"] = request.json["lang"]
    if "games" in request.json:
        profile["games"] = request.json["games"]
    if "general" in request.json:
        profile["general"] = request.json["general"]
    current_user.playtest_profile = profile
    db.session.commit()
    return jsonify(success=True)
