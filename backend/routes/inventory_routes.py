from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
import json
from models import User
from api import app, db, login


def parse_user_inventory(user_inventory):
    crypt = {}
    library = {}

    if user_inventory:
        for k, v in user_inventory.items():
            k = int(k)
            if k > 200000:
                crypt[k] = {"q": v}
            elif k < 200000:
                library[k] = {"q": v}

    return {
        "crypt": crypt,
        "library": library,
    }


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({"Not logged in": True}), 401)


@app.route("/api/inventory/<string:key>", methods=["GET"])
def get_shared_inventory(key):
    try:
        inventory = User.query.filter_by(inventory_key=key).one().inventory
        return jsonify(parse_user_inventory(inventory))

    except Exception:
        abort(401)


@app.route("/api/inventory", methods=["DELETE"])
@login_required
def delete_inventory_route():
    current_user.inventory = {}
    db.session.commit()
    return jsonify(success=True)


@app.route("/api/inventory", methods=["PATCH"])
@login_required
def inventory_add_cards_route():
    i = current_user.inventory
    new_cards = request.json
    merged_cards = i.copy()
    for k, v in new_cards.items():
        k = int(k)
        if k in merged_cards:
            if merged_cards[k] + v <= 0:
                del merged_cards[k]
            else:
                merged_cards[k] = merged_cards[k] + v
        elif v >= 0:
            merged_cards[k] = v

    current_user.inventory = merged_cards.copy()
    db.session.commit()
    return jsonify(success=True)


@app.route("/api/inventory", methods=["PUT"])
@login_required
def inventory_change_card_route():
    i = current_user.inventory
    new_cards = request.json
    merged_cards = i.copy()
    for k, v in new_cards.items():
        k = int(k)
        if v >= 0:
            merged_cards[k] = v
        elif k in merged_cards:
            del merged_cards[k]

    current_user.inventory = merged_cards.copy()
    db.session.commit()
    return jsonify(success=True)
