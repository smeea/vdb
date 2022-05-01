from flask import jsonify, request, Response
from flask_login import current_user, login_required
import json

from inventory_export import inventory_export
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


# DEPRECATED (LEFT FOR BACKWARD COMPATIBILITY AND 3RD PARTY TOOLS)
@app.route("/api/inventory", methods=["GET"])
@login_required
def listInventory():
    return jsonify(parse_user_inventory(current_user.inventory))


@app.route("/api/inventory/export", methods=["POST"])
def inventoryExportRoute():
    try:
        inventory = {
            "cards": current_user.inventory,
            "author": current_user.public_name,
        }
        result = inventory_export(inventory, request.json["format"])

        if request.json["format"] == "xlsx" or request.json["format"] == "csv":
            return result
        else:
            return jsonify(result)

    except Exception:
        pass


@app.route("/api/inventory/import", methods=["POST"])
@login_required
def inventoryImportRoute():
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
        return jsonify("error")


@app.route("/api/inventory/delete", methods=["GET"])
@login_required
def deleteInventory():
    current_user.inventory = {}
    db.session.commit()
    return jsonify({"delete inventory": "success"})


@app.route("/api/inventory/add", methods=["POST"])
@login_required
def inventoryAddCard():
    i = current_user.inventory
    try:
        new_cards = request.json
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            k = int(k)
            if k not in merged_cards:
                merged_cards[k] = v
            else:
                merged_cards[k] = merged_cards[k] + v

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify({"inventory card added": "success"})

    except Exception:
        pass


@app.route("/api/inventory/del", methods=["POST"])
@login_required
def inventoryDelCard():
    i = current_user.inventory
    try:
        new_cards = request.json
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            k = int(k)
            if k in merged_cards:
                if merged_cards[k] > v:
                    merged_cards[k] = merged_cards[k] - v
                else:
                    del merged_cards[k]

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify({"inventory card deleted": "success"})

    except Exception:
        pass


@app.route("/api/inventory/change", methods=["POST"])
@login_required
def inventoryChangeCard():
    i = current_user.inventory
    try:
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

    except Exception:
        pass
