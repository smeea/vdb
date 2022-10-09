from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
from datetime import date, datetime, timedelta
import uuid
import json

from deck_export import deck_export
from deck_import import deck_import
from deck_recommendation import deck_recommendation
from api import app, db, login
from models import Deck


def parse_user_decks(user_decks):
    decks = {}
    for deck in user_decks:
        if deck.public_parent:
            continue

        # Fix masters / branches
        if deck.master:
            d = Deck.query.get(deck.master)
            if not d:
                print(deck.deckid, "delete branch without master")
                db.session.delete(deck)
                db.session.commit()

        if deck.branches:
            for b in deck.branches:
                d = Deck.query.get(b)

                if not d:
                    print(b, "delete not-existing branch")
                    old_branches = deck.branches.copy()
                    old_branches.remove(b)
                    deck.branches = old_branches
                    db.session.commit()

            for b in deck.branches:
                d = Deck.query.get(b)

                if not d.master:
                    print(b, "add master to branch without master")
                    d.master = deck.deckid
                    db.session.commit()

                if d.master and d.master != deck.deckid:
                    print(b, "delete branch with other master")
                    old_branches = deck.branches.copy()
                    old_branches.remove(b)
                    deck.branches = old_branches
                    db.session.commit()

        # Return decks
        decks[deck.deckid] = {
            "name": deck.name,
            "branchName": deck.branch_name,
            "author": deck.author_public_name,
            "description": deck.description,
            "cards": deck.cards,
            "used_in_inventory": deck.used_in_inventory,
            "deckid": deck.deckid,
            "hidden": deck.hidden,
            "frozen": deck.frozen,
            "inventory_type": deck.inventory_type,
            "timestamp": deck.timestamp,
            "master": deck.master,
            "branches": deck.branches,
            "tags": deck.tags,
            "public_child": deck.public_child,
        }

    return decks


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({"Not logged in": True}), 401)


@app.route("/api/deck", methods=["POST"])
@login_required
def new_deck_route():
    deckid = uuid.uuid4().hex
    author = (
        request.json["author"] if "author" in request.json else current_user.public_name
    )
    description = request.json["description"] if "description" in request.json else ""
    input_cards = request.json["cards"] if "cards" in request.json else {}
    cards = {}

    for k, v in input_cards.items():
        cards[int(k)] = v

    d = Deck(
        deckid=deckid,
        name=request.json["deckname"],
        author_public_name=author,
        creation_date=date.today().strftime("%Y-%m-%d"),
        description=description,
        author=current_user,
        cards=cards,
    )

    db.session.add(d)
    db.session.commit()

    return jsonify(
        {
            "timestamp": d.timestamp,
            "deckid": d.deckid,
            "name": d.name,
            "author": d.author_public_name,
            "description": d.description,
            "cards": d.cards,
        }
    )


@app.route("/api/deck/<string:deckid>", methods=["GET"])
def get_deck_route(deckid):
    if len(deckid) == 32:
        deck = Deck.query.get(deckid)
        if not deck:
            abort(400)

        public_child = (
            deck.public_child
            if deck.author == current_user
            else bool(deck.public_child)
        )

        public_parent = (
            deck.public_parent
            if deck.author == current_user
            else bool(deck.public_parent)
        )

        deck = {
            "name": deck.name,
            "author": deck.author_public_name,
            "description": deck.description,
            "cards": deck.cards,
            "deckid": deck.deckid,
            "timestamp": deck.timestamp,
            "tags": deck.tags,
            "favorited": deck.favorited,
            "is_yours": current_user == deck.author,
            "non_editable": bool(not deck.author),
            "public_child": public_child,
            "public_parent": public_parent,
        }

        return jsonify(deck)

    else:
        with open("twd_decks.json", "r") as twd_decks_file:
            twd_decks = json.load(twd_decks_file)

            try:
                deck = twd_decks[deckid]
                comments = (
                    deck["description"] if deck["description"] != "Unknown" else ""
                )
                deck["description"] = "Date: " + deck["creation_date"] + "\n"
                deck["description"] += "Players: " + str(deck["players"]) + "\n"
                deck["description"] += "Event: " + deck["event"] + "\n"
                deck["description"] += "Location: " + deck["location"] + "\n"
                if comments:
                    deck["description"] += "\n" + comments

                del deck["disciplines"]
                del deck["format"]
                del deck["event"]
                del deck["link"]
                del deck["location"]
                del deck["players"]
                del deck["score"]
                del deck["traits"]
                del deck["clan"]
                del deck["capacity"]
                del deck["cardtypes_ratio"]
                del deck["crypt_total"]
                del deck["library_total"]

                return jsonify(deck)

            except KeyError:
                abort(400)


@app.route("/api/deck/<string:deckid>", methods=["DELETE"])
@login_required
def remove_deck_route(deckid):
    d = Deck.query.get(deckid)
    if d.author != current_user:
        abort(401)

    if d.master:
        m = Deck.query.get(d.master)
        for i in m.branches:
            j = Deck.query.get(i)
            db.session.delete(j)

        db.session.delete(m)

    else:
        if d.branches:
            for i in d.branches:
                j = Deck.query.get(i)
                db.session.delete(j)

        db.session.delete(d)

    db.session.commit()
    return jsonify({"deck removed": deckid})


@app.route("/api/deck/<string:deckid>", methods=["PUT"])
@login_required
def update_deck_route(deckid):
    d = Deck.query.get(deckid)
    if not d:
        print("bad deck request\n", deckid, current_user.username, request.json)
        return jsonify({"error": "no deck"})
    elif not d.author:
        # For newly anonymous imported decks to fix bad imports
        accepted_past = datetime.utcnow() - timedelta(minutes=5)
        if d.timestamp < accepted_past:
            abort(401)
    elif d.author != current_user:
        abort(401)

    if "hidden" in request.json:
        d.hidden = request.json["hidden"]
    elif "frozen" in request.json:
        d.frozen = request.json["frozen"]
    elif d.frozen:
        return jsonify({"error": "deck is non-editable"})
    else:
        d.timestamp = datetime.utcnow()

    if "cardChange" in request.json:
        new_cards = request.json["cardChange"]
        merged_cards = d.cards.copy()

        for k, v in new_cards.items():
            k = int(k)
            if v < 0:
                del merged_cards[k]
                if k in d.used_in_inventory:
                    used_cards = d.used_in_inventory.copy()
                    del used_cards[k]
                    d.used_in_inventory = used_cards.copy()
            else:
                merged_cards[k] = v

        d.cards = merged_cards.copy()

    if "cardAdd" in request.json:
        new_cards = request.json["cardAdd"]
        merged_cards = d.cards.copy()
        for k, v in new_cards.items():
            k = int(k)
            if k not in merged_cards:
                merged_cards[k] = v

        d.cards = merged_cards.copy()

    if "name" in request.json:
        d.name = request.json["name"]

        if d.master:
            master = Deck.query.get(d.master)
            master.name = request.json["name"]

            for i in master.branches:
                j = Deck.query.get(i)
                j.name = request.json["name"]

        elif d.branches:
            for i in d.branches:
                j = Deck.query.get(i)
                j.name = request.json["name"]

    if "description" in request.json:
        d.description = request.json["description"]

    if "author" in request.json:
        d.author_public_name = request.json["author"] or ""

        if d.master:
            master = Deck.query.get(d.master)
            master.author_public_name = request.json["author"]

            for i in master.branches:
                j = Deck.query.get(i)
                j.author_public_name = request.json["author"]

        elif d.branches:
            for i in d.branches:
                j = Deck.query.get(i)
                j.author_public_name = request.json["author"]

    if "branchName" in request.json:
        d.branch_name = request.json["branchName"] or ""

    if "inventory_type" in request.json:
        d.used_in_inventory = {}
        d.inventory_type = request.json["inventory_type"]

    if "used_in_inventory" in request.json:
        used = d.used_in_inventory.copy()
        for k, v in request.json["used_in_inventory"].items():
            used[int(k)] = v

        d.used_in_inventory = used

    if "tags" in request.json:
        d.tags = request.json["tags"]

    if d.master:
        old_master = Deck.query.get(d.master)
        branches = old_master.branches.copy()
        branches.remove(d.deckid)
        branches.append(old_master.deckid)
        d.branches = branches
        d.master = None
        old_master.branches = None
        for b in branches:
            branch_deck = Deck.query.get(b)
            branch_deck.master = d.deckid

    db.session.commit()

    return jsonify({"updated deck": d.deckid})


@app.route("/api/deck/<string:deckid>/recommendation", methods=["GET"])
def get_recommendation_route(deckid):
    cards = {}

    if len(deckid) == 32:
        deck = Deck.query.get(deckid)
        cards = deck.cards

    elif ":" in deckid:
        set, precon = deckid.split(":")

        with open("../frontend/src/assets/data/preconDecks.json", "r") as precons_file:
            precon_decks = json.load(precons_file)
            cards = precon_decks[set][precon]

    else:
        with open("twd_decks.json", "r") as twd_decks_file:
            twd_decks = json.load(twd_decks_file)
            cards = twd_decks[deckid]["cards"]

    recommends = deck_recommendation(cards)

    return {"crypt": recommends["crypt"], "library": recommends["library"]}


@app.route("/api/deck/<string:deckid>/branch", methods=["POST"])
@login_required
def create_branch_route(deckid):
    master = Deck.query.get(deckid)
    if master.author != current_user:
        abort(401)

    new_branches = []
    if "branches" in request.json:
        new_branches = request.json["branches"]
    elif "deckid" in request.json:
        d = Deck.query.get(request.json["deckid"])
        source = {
            "author": d.author_public_name,
            "description": d.description,
            "tags": d.tags,
            "cards": d.cards,
        }
        new_branches = [source]

    branches = []
    branches_deckids = master.branches.copy() if master.branches else []

    for i, b in enumerate(new_branches):
        branch_name = (
            f"y{len(master.branches) + 1}"
            if master.branches
            else f"#{len(new_branches) - i}"
        )
        new_deckid = uuid.uuid4().hex

        cards = {}
        for k, v in b["cards"].items():
            cards[int(k)] = v

        branch = Deck(
            deckid=new_deckid,
            name=master.name,
            branch_name=branch_name,
            author_public_name=b["author"],
            description=b["description"],
            author=current_user,
            tags=b["tags"] if "tags" in b else [],
            master=deckid,
            cards=cards,
        )
        db.session.add(branch)

        branches.append({"deckid": new_deckid, "branch_name": branch_name})
        branches_deckids.append(new_deckid)

    master.branches = branches_deckids
    db.session.commit()

    return jsonify(branches)


@app.route("/api/deck/<string:deckid>/branch", methods=["DELETE"])
@login_required
def remove_branch_route(deckid):
    d = Deck.query.get(deckid)
    if d.author != current_user:
        abort(401)

    if d.master:
        master = Deck.query.get(d.master)

        branches = master.branches.copy()
        branches.remove(d.deckid)
        master.branches = branches

    else:
        j = Deck.query.get(d.branches[-1])

        branches = d.branches.copy()
        branches.remove(j.deckid)
        j.branches = branches
        for i in branches:
            k = Deck.query.get(i)
            k.master = j.deckid

        j.master = ""

    db.session.delete(d)
    db.session.commit()
    return jsonify({"deckid": request.json["deckid"]})


@app.route("/api/deck/<string:deckid>/snapshot", methods=["GET"])
def url_snapshot_route(deckid):
    target_deck = Deck.query.get(deckid)
    new_deckid = uuid.uuid4().hex
    d = Deck(
        deckid=new_deckid,
        name=target_deck.name,
        author_public_name=target_deck.author_public_name,
        description=target_deck.description,
        cards=target_deck.cards,
    )
    db.session.add(d)
    db.session.commit()
    return jsonify(
        {
            "deckid": new_deckid,
        }
    )


@app.route("/api/deck/<string:deckid>/clone", methods=["POST"])
def clone_deck_route(deckid):
    if len(deckid) == 32:
        target_deck = Deck.query.get(deckid)
        deckid = uuid.uuid4().hex
        d = Deck(
            deckid=deckid,
            name=f"{target_deck.author_public_name} [by {target_deck.author_public_name}]",
            author_public_name=target_deck.author_public_name,
            description="",
            author=current_user,
            tags=target_deck.tags,
            cards=target_deck.cards,
        )
        db.session.add(d)
        db.session.commit()
        return jsonify({"deckid": deckid})

    elif ":" in deckid:
        set, precon = deckid.split(":")

        with open(
            "../frontend/src/assets/data/preconDecks.json", "r"
        ) as precons_cards_file, open(
            "../frontend/src/assets/data/setsAndPrecons.json", "r"
        ) as precons_data_file:
            precon_cards = json.load(precons_cards_file)
            precon_data = json.load(precons_data_file)

            name = f"{precon_data[set]['precons'][precon]['name']} [PRECON]"
            description = f"Preconstructed from \"{precon_data[set]['name']}\" [{precon_data[set]['date']}]"
            cards = {}
            for i, q in precon_cards[set][precon].items():
                cards[int(i)] = q

            deckid = uuid.uuid4().hex
            d = Deck(
                deckid=deckid,
                name=name,
                author_public_name="VTES Team",
                description=description,
                author=current_user,
                tags=["precon"],
                cards=cards,
            )
            db.session.add(d)
            db.session.commit()
            return jsonify({"deck cloned": request.json["deckname"], "deckid": deckid})

    else:
        with open("twd_decks.json", "r") as twd_decks_file:
            twd_decks = json.load(twd_decks_file)

            deck = twd_decks[deckid]
            cards = {}
            for i, q in deck["cards"].items():
                cards[int(i)] = q

            description = "Date: " + deck["creation_date"] + "\n"
            description += "Players: " + str(deck["players"]) + "\n"
            description += "Event: " + deck["event"] + "\n"
            description += "Location: " + deck["location"] + "\n"
            if deck["description"]:
                description += "\n" + deck["description"]

            deckid = uuid.uuid4().hex
            d = Deck(
                deckid=deckid,
                name=f"{deck['name']} [by {deck['author']}]",
                author_public_name=deck["author"],
                description=description,
                author=current_user,
                tags=["twd"],
                cards=cards,
            )
            db.session.add(d)
            db.session.commit()
            return jsonify({"deck cloned": request.json["deckname"], "deckid": deckid})


@app.route("/api/decks/import", methods=["POST"])
def import_deck_route():
    anonymous = request.json.get("anonymous")
    if not current_user.is_authenticated and not anonymous:
        return Response(json.dumps({"Not logged in": True}), 401)

    deck = deck_import(request.json["deckText"])

    author = current_user if not anonymous else None
    author_public_name = deck["author"]
    if not deck["author"] and not anonymous:
        author_public_name = current_user.username

    deckid = uuid.uuid4().hex
    d = Deck(
        deckid=deckid,
        name=deck["name"],
        author_public_name=author_public_name,
        description=deck["description"],
        author=author,
        cards=deck["cards"],
    )

    db.session.add(d)
    db.session.commit()

    return jsonify(
        {
            "deckid": deckid,
            "bad_cards": deck["bad_cards"],
            "cards": deck["cards"],
            "name": deck["name"],
            "author": author_public_name,
            "is_yours": bool(author),
            "description": deck["description"],
        }
    )


@app.route("/api/decks/export", methods=["POST"])
def deck_export_route():
    result = None

    if "deck" in request.json:
        deck = request.json["deck"]
        result = deck_export(deck["cards"], request.json["format"])

    elif request.json["src"] == "twd":
        deckid = request.json["deckid"]
        with open("twd_decks.json", "r") as twd_decks_file:
            twd_decks = json.load(twd_decks_file)
            deck = twd_decks[deckid]
            result = deck_export(deck["cards"], request.json["format"])

    elif request.json["src"] == "precons":
        set, precon = request.json["deckid"].split(":")
        with open("../frontend/src/assets/data/preconDecks.json", "r") as precons_file:
            precon_decks = json.load(precons_file)
            cards = precon_decks[set][precon]
            result = deck_export(cards, request.json["format"])

    elif request.json["src"] == "shared" or request.json["src"] == "my":
        d = Deck.query.get(request.json["deckid"])
        result = deck_export(d.cards, request.json["format"])

    return result
