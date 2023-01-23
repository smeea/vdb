from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from api import app, db, login
from models import User
from routes.decks_routes import parse_user_decks
from routes.inventory_routes import parse_user_inventory


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)

@app.route("/api/login", methods=["POST"])
def login_route():
    try:
        user = User.query.filter_by(username=request.json["username"].lower()).one()
        if not user.check_password(request.json["password"]):
            abort(401)

        login_user(user, remember=request.json["remember"])

        return jsonify(
            {
                "username": current_user.username,
                "email": current_user.email,
                "playtester": current_user.playtester,
                "playtest_admin": current_user.playtest_admin,
                "public_name": current_user.public_name,
                "decks": parse_user_decks(current_user.decks.all()),
                "inventory": parse_user_inventory(current_user.inventory),
                "inventory_key": current_user.inventory_key,
            }
        )

    except Exception as e:
        if e.code:
            abort(e.code)
        else:
            abort(400)


@app.route("/api/login", methods=["DELETE"])
def logout_route():
    logout_user()
    return jsonify(success=True)


@app.route("/api/account", methods=["GET"])
def who_am_i_route():
    if current_user.is_authenticated:
        return jsonify(
            {
                "username": current_user.username,
                "email": current_user.email,
                "playtester": current_user.playtester,
                "playtest_admin": current_user.playtest_admin,
                "public_name": current_user.public_name,
                "decks": parse_user_decks(current_user.decks.all()),
                "inventory": parse_user_inventory(current_user.inventory),
                "inventory_key": current_user.inventory_key,
            }
        )
    else:
        return jsonify(success=False)


@app.route("/api/account", methods=["POST"])
def account_create_route():
    if current_user.is_authenticated:
        return jsonify({"already logged as:": current_user.username})
    if not request.json["password"] or not request.json["username"]:
        abort(400)
    if User.query.filter_by(username=request.json["username"].lower()).first():
        abort(409)
    else:
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
    if "publicName" in request.json:
        current_user.public_name = request.json["publicName"]
        db.session.commit()
        return jsonify(success=True)

    elif "email" in request.json:
        if not current_user.check_password(request.json["password"]):
            abort(401)

        current_user.email = request.json["email"]
        db.session.commit()
        return jsonify("email changed")

    elif "inventoryKey" in request.json:
        current_user.inventory_key = request.json["inventoryKey"]
        db.session.commit()
        return jsonify("inventory key changed")

    elif "newPassword" in request.json:
        if not current_user.check_password(request.json["password"]):
            abort(401)

        current_user.set_password(request.json["newPassword"])
        db.session.commit()
        return jsonify("password changed")


@app.route("/api/account", methods=["DELETE"])
@login_required
def delete_account_route():
    if current_user.check_password(request.json["password"]):
        try:
            db.session.delete(current_user)
            db.session.commit()
            return jsonify({"account deleted": current_user.username})
        except Exception:
            pass
    else:
        abort(401)
