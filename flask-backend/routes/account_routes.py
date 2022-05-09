from flask import jsonify, request, abort, Response
from flask_login import current_user, login_user, logout_user, login_required
import json

from api import app, db, login
from models import User
from routes.decks_routes import parse_user_decks
from routes.inventory_routes import parse_user_inventory


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


@app.route("/api/register", methods=["POST"])
def register():
    if current_user.is_authenticated:
        return jsonify({"already logged as:": current_user.username})

    if User.query.filter_by(username=request.json["username"].lower()).first():
        abort(409)
    else:
        user = User(
            username=request.json["username"].lower(),
            public_name=request.json["username"],
        )
        user.set_password(request.json["password"])
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify({"registered as": user.username})


@app.route("/api/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        if current_user.is_authenticated:
            return jsonify(
                {
                    "username": current_user.username,
                    "email": current_user.email,
                    "public_name": current_user.public_name,
                    "decks": parse_user_decks(current_user.decks.all()),
                    "inventory": parse_user_inventory(current_user.inventory),
                }
            )
        else:
            return jsonify({"username": ""})

    elif request.method == "POST":
        try:
            user = User.query.filter_by(
                username=request.json["username"].lower()
            ).first()
            if user is None or not user.check_password(request.json["password"]):
                return jsonify({"error": "invalid username or password"}), 401

            login_user(user, remember=request.json["remember"])
            return jsonify(
                {
                    "username": current_user.username,
                    "email": current_user.email,
                    "public_name": current_user.public_name,
                    "decks": parse_user_decks(current_user.decks.all()),
                    "inventory": parse_user_inventory(current_user.inventory),
                }
            )
        except KeyError:
            pass


@app.route("/api/account", methods=["POST"])
@login_required
def account():
    if "publicName" in request.json:
        current_user.public_name = request.json["publicName"]
        db.session.commit()
        return jsonify("public name changed")

    elif "email" in request.json:
        if not current_user.check_password(request.json["password"]):
            abort(401)

        current_user.email = request.json["email"]
        db.session.commit()
        return jsonify("email changed")

    elif "newPassword" in request.json:
        if not current_user.check_password(request.json["password"]):
            abort(401)

        current_user.set_password(request.json["newPassword"])
        db.session.commit()
        return jsonify("password changed")


@app.route("/api/account/remove", methods=["POST"])
@login_required
def removeAccount():
    if current_user.check_password(request.json["password"]):
        try:
            db.session.delete(current_user)
            db.session.commit()
            return jsonify({"account removed": current_user.username})
        except Exception:
            pass
    else:
        abort(401)


@app.route("/api/logout")
def logout():
    try:
        user = current_user.username
        logout_user()
        return jsonify({"logged out from": user})

    except AttributeError:
        return jsonify({"error": "not logged"})
