from flask import jsonify, request, Response
from flask_login import current_user, login_required
import json
from deck_export import deck_export
from inventory_import import inventory_import
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


@app.route("/api/inventory/export", methods=["POST"])
def inventory_export_route():
    return deck_export(current_user.inventory, request.json["format"])


@app.route("/api/inventory/import", methods=["POST"])
@login_required
def inventory_import_route():
    i = current_user.inventory
    try:
        new_cards = inventory_import(request.json)
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            k = int(k)
            if k not in merged_cards:
                merged_cards[k] = v
            else:
                merged_cards[k] = merged_cards[k] + v

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify(new_cards)

    except Exception:
        return Abort(400)


@app.route("/api/inventory", methods=["DELETE"])
@login_required
def delete_inventory_route():
    current_user.inventory = {}
    db.session.commit()
    return jsonify({"delete inventory": "success"})


@app.route("/api/inventory", methods=["PATCH"])
@login_required
def inventory_add_cards_route():
    i = current_user.inventory
    new_cards = request.json
    merged_cards = i.copy() if i else {}
    for k, v in new_cards.items():
        k = int(k)
        if k in merged_cards:
            if merged_cards[k] + v < 0:
                del merged_cards[k]
            else:
                merged_cards[k] = merged_cards[k] + v
        elif v >= 0:
            merged_cards[k] = v

    current_user.inventory = merged_cards.copy()
    db.session.commit()
    return jsonify({"inventory card added": "success"})


@app.route("/api/inventory", methods=["PUT"])
@login_required
def inventory_change_card_route():
    i = current_user.inventory
    new_cards = request.json
    merged_cards = i.copy() if i else {}
    for k, v in new_cards.items():
        k = int(k)
        if v < 0:
            del merged_cards[k]
        else:
            merged_cards[k] = v

    current_user.inventory = merged_cards.copy()
    db.session.commit()
    return jsonify({"inventory card change": "success"})
