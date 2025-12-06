from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
import json
import copy
from models import User
from api import app, db, login


def parse_user_inventory(user_inventory):
    crypt = {}
    library = {}

    if user_inventory:
        for k, v in user_inventory.items():
            if k == "frozen":
                continue
            k = int(k)
            if k > 200000:
                crypt[k] = v
            else:
                library[k] = v

    return {
        "crypt": crypt,
        "library": library,
        "isFrozen": user_inventory.get("frozen"),
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
    new_cards = request.json
    merged_cards = copy.deepcopy(current_user.inventory)
    for k, v in new_cards.items():
        if k == "frozen":
            continue
        k = int(k)
        if k in merged_cards:
            if merged_cards[k]["q"] + v <= 0:
                del merged_cards[k]
            else:
                merged_cards[k]["q"] = merged_cards[k]["q"] + v
        elif v >= 0:
            merged_cards[k] = {"q": v}

    current_user.inventory = merged_cards
    db.session.commit()
    return jsonify(success=True)


@app.route("/api/inventory", methods=["PUT"])
@login_required
def inventory_update_route():
    if "isFrozen" in request.json:
        merged_cards = copy.deepcopy(current_user.inventory)
        merged_cards["frozen"] = request.json["isFrozen"]
        current_user.inventory = merged_cards

    elif current_user.inventory.get("frozen"):
        abort(409)

    else:
        new_cards = request.json
        merged_cards = copy.deepcopy(current_user.inventory)
        for k, v in new_cards.items():
            if k == "frozen":
                continue
            k = int(k)
            if "q" in v:
                if v["q"] >= 0:
                    if k in merged_cards:
                        merged_cards[k]["q"] = v["q"]
                    else:
                        merged_cards[k] = v
                elif k in merged_cards:
                    del merged_cards[k]

            if "t" in v:
                if k in merged_cards:
                    merged_cards[k]["t"] = v["t"]
                else:
                    merged_cards[k] = {"q": 0, "t": v["t"]}

        current_user.inventory = merged_cards

    db.session.commit()
    return jsonify(success=True)


@app.route("/api/inventory_wishlist", methods=["PUT"])
@login_required
def inventory_wishlist_update_route():
    if current_user.inventory.get("frozen"):
        abort(409)

    else:
        new_cards = request.json
        merged_cards = copy.deepcopy(current_user.inventory_wishlist)
        for k, v in new_cards.items():
            k = int(k)
            payload = {}
            target = merged_cards[k] if k in merged_cards else payload
            if "value" in v:
                target["value"] = v["value"]
            if "logic" in v:
                target["logic"] = v["logic"]

            if k not in merged_cards:
                merged_cards[k] = payload

        current_user.inventory_wishlist = merged_cards

    db.session.commit()
    return jsonify(success=True)
