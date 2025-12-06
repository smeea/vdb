from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from api import app, db, login
from models import User
from routes.decks_routes import parse_user_decks
from routes.inventory_routes import parse_user_inventory
import os
from dotenv import load_dotenv

load_dotenv()
PLAYTEST_KEY = os.environ.get("PLAYTEST_KEY")


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


@app.route("/api/login", methods=["POST"])
def login_route():
    user = User.query.filter_by(username=request.json["username"].lower()).first()
    if not user:
        abort(400)

    if not user.check_password(request.json["password"]):
        abort(401)

    remember = bool(request.json.get("remember"))
    login_user(user, remember=remember)
    cards_reports = (
        len(current_user.playtest_report["cards"].keys())
        if "cards" in current_user.playtest_report
        else 0
    )
    precons_reports = (
        len(current_user.playtest_report["precons"].keys())
        if "precons" in current_user.playtest_report
        else 0
    )
    total_reports = cards_reports + precons_reports
    playtest = {
        "is_playtester": current_user.playtester,
        "is_admin": current_user.playtest_admin,
        "profile": {**current_user.playtest_profile, "reports": total_reports},
        "secret": os.environ.get("PLAYTEST_KEY") if current_user.playtester else None,
    }
    if "added_by" in playtest["profile"]:
        del playtest["profile"]["added_by"]

    return jsonify(
        {
            "username": current_user.username,
            "email": current_user.email,
            "playtest": playtest,
            "public_name": current_user.public_name,
            "decks": parse_user_decks(current_user.decks.all()),
            "inventory": parse_user_inventory(current_user.inventory),
            "inventory_key": current_user.inventory_key,
            "inventory_wishlist": current_user.inventory_wishlist,
        }
    )


@app.route("/api/login", methods=["DELETE"])
def logout_route():
    logout_user()
    return jsonify(success=True)


@app.route("/api/account", methods=["GET"])
def who_am_i_route():
    if not current_user.is_authenticated:
        return jsonify(success=False)

    cards_reports = (
        len(current_user.playtest_report["cards"].keys())
        if "cards" in current_user.playtest_report
        else 0
    )
    precons_reports = (
        len(current_user.playtest_report["precons"].keys())
        if "precons" in current_user.playtest_report
        else 0
    )
    total_reports = cards_reports + precons_reports

    playtest = {
        "is_playtester": current_user.playtester,
        "is_admin": current_user.playtest_admin,
        "profile": {**current_user.playtest_profile, "reports": total_reports},
        "secret": os.environ.get("PLAYTEST_KEY") if current_user.playtester else None,
    }
    if "added_by" in playtest["profile"]:
        del playtest["profile"]["added_by"]

    return jsonify(
        {
            "username": current_user.username,
            "email": current_user.email,
            "playtest": playtest,
            "public_name": current_user.public_name,
            "decks": parse_user_decks(current_user.decks.all()),
            "inventory": parse_user_inventory(current_user.inventory),
            "inventory_wishlist": current_user.inventory_wishlist,
            "inventory_key": current_user.inventory_key,
        }
    )


@app.route("/api/account", methods=["POST"])
def account_create_route():
    if current_user.is_authenticated:
        return jsonify({"already logged as:": current_user.username})

    if not request.json["password"] or not request.json["username"]:
        abort(400)

    if User.query.filter_by(username=request.json["username"].lower()).first():
        abort(409)

    user = User(
        username=request.json["username"].lower(),
        email=request.json["email"],
        public_name=request.json["username"],
    )
    user.set_password(request.json["password"])
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return jsonify({"username": user.username, "email": user.email})


@app.route("/api/account", methods=["PUT"])
@login_required
def account_update_route():
    for k, v in request.json.items():
        match k:
            case "publicName":
                current_user.public_name = request.json["publicName"]
                db.session.commit()
                return jsonify(success=True)

            case "email":
                if not current_user.check_password(request.json["password"]):
                    abort(401)

                current_user.email = request.json["email"]
                db.session.commit()
                return jsonify(success=True)

            case "inventoryKey":
                current_user.inventory_key = request.json["inventoryKey"]
                db.session.commit()
                return jsonify(success=True)

            case "newPassword":
                if not current_user.check_password(request.json["password"]):
                    abort(401)

                current_user.set_password(request.json["newPassword"])
                db.session.commit()
                return jsonify(success=True)


@app.route("/api/account", methods=["DELETE"])
@login_required
def delete_account_route():
    if not current_user.check_password(request.json["password"]):
        abort(401)

    db.session.delete(current_user)
    db.session.commit()
    return jsonify({"account deleted": current_user.username})
