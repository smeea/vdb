from flask import jsonify, request, abort
from flask_login import current_user, login_required
from datetime import date, datetime, timedelta
from nanoid import non_secure_generate
import json
from deck_recommendation import deck_recommendation
from api import app, db, login
from models import Deck

def get_twd_deck(deckid):
    with open("twd_decks.json", "r") as twd_decks_file:
        twd_decks = json.load(twd_decks_file)

        if deckid in twd_decks:
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

            return deck

        else:
            return None

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
            "author": deck.author_public_name,
            "branchName": deck.branch_name,
            "branches": deck.branches,
            "cards": deck.cards,
            "deckid": deck.deckid,
            "description": deck.description,
            "inventoryType": deck.inventory_type,
            "isFrozen": deck.frozen,
            "isHidden": deck.hidden,
            "master": deck.master,
            "name": deck.name,
            "publicChild": deck.public_child,
            "tags": deck.tags,
            "timestamp": deck.timestamp,
            "usedInInventory": deck.used_in_inventory,
        }

    return decks


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


@app.route("/api/deck", methods=["POST"])
def new_deck_route():
    is_anonymous = request.json.get("isAnonymous")
    if not current_user.is_authenticated and not is_anonymous:
        return abort(401)

    new_deckid = non_secure_generate('1234567890abcdef', 9)
    while Deck.query.get(new_deckid):
        new_deckid = non_secure_generate('1234567890abcdef', 9)

    name = request.json["name"] if "name" in request.json else "New deck"
    author_public_name = request.json["author"] if "author" in request.json else ""
    description = request.json["description"] if "description" in request.json else ""
    tags = request.json["tags"] if "tags" in request.json else []
    input_cards = request.json["cards"] if "cards" in request.json else {}

    cards = {}
    for k, v in input_cards.items():
        cards[int(k)] = v

    d = Deck(
        deckid=new_deckid,
        name=name,
        author_public_name=author_public_name,
        creation_date=date.today().strftime("%Y-%m-%d"),
        description=description,
        author=current_user if not is_anonymous else None,
        cards=cards,
        tags=tags,
    )

    db.session.add(d)
    db.session.commit()

    return jsonify({"deckid": new_deckid})


@app.route("/api/deck/<string:deckid>", methods=["GET"])
def get_deck_route(deckid):
    d = Deck.query.get(deckid)
    if not d:
        # fallback for old twd urls length of 0
        # now twd deckids of length 9 have trailing 0 to avoid collision with user deck ids
        d = get_twd_deck(deckid)
        if not d:
            d = get_twd_deck(f"{deckid}0")
            if not d:
                abort(400)

        return jsonify(d)

    is_author = current_user == d.author

    deck = {
        "author": d.author_public_name,
        "cards": d.cards,
        "deckid": d.deckid,
        "description": d.description,
        "favorited": d.favorited,
        "isAuthor": is_author,
        "isNonEditable": bool(not d.author),
        "name": d.name,
        "publicChild": d.public_child if is_author else bool(d.public_child),
        "publicParent": d.public_parent if is_author else bool(d.public_parent),
        "tags": d.tags,
        "timestamp": d.timestamp,
    }

    if is_author:
        deck = {
            **deck,
            "branches": d.branches,
            "master": d.master,
            "branchName": d.branch_name,
            "inventoryType": d.inventory_type,
            "isFrozen": d.frozen,
            "isHidden": d.hidden,
        }

    return jsonify(deck)

@app.route("/api/deck/<string:deckid>", methods=["DELETE"])
@login_required
def remove_deck_route(deckid):
    d = Deck.query.get(deckid)
    if not d:
        abort(400)
    elif d.author != current_user:
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
    return jsonify(success=True)


@app.route("/api/deck/<string:deckid>", methods=["PUT"])
@login_required
def update_deck_route(deckid):
    d = Deck.query.get(deckid)
    if not d:
        abort(400)
    elif not d.author:
        # For newly anonymous imported decks to fix bad imports
        accepted_past = datetime.utcnow() - timedelta(minutes=15)
        if d.timestamp < accepted_past:
            abort(401)
    elif d.author != current_user:
        abort(401)

    if "isHidden" in request.json:
        d.hidden = request.json["isHidden"]
    elif "isFrozen" in request.json:
        d.frozen = request.json["isFrozen"]
    elif d.frozen:
        abort(409)
    else:
        d.timestamp = datetime.utcnow()

    if "cardChange" in request.json:
        new_cards = request.json["cardChange"]
        merged_cards = d.cards.copy()

        for k, v in new_cards.items():
            k = int(k)
            if v < 0:
                if k in merged_cards:
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

    if "inventoryType" in request.json:
        d.used_in_inventory = {}
        d.inventory_type = request.json["inventoryType"]

    if "usedInInventory" in request.json:
        used = d.used_in_inventory.copy()
        for k, v in request.json["usedInInventory"].items():
            used[int(k)] = v

        d.used_in_inventory = used

    if "tags" in request.json:
        d.tags = request.json["tags"]

    if "cards" in request.json:
        cards = {}
        for k, v in request.json["cards"].items():
            cards[int(k)] = v

        d.cards = cards

    if "library" in request.json:
        cards = {}
        for k, v in d.cards.items():
            if k > 200000:
                cards[k] = v

        for k, v in request.json["library"].items():
            cards[int(k)] = v

        d.cards = cards

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
    return jsonify(success=True)


@app.route("/api/deck/recommendation", methods=["POST"])
def get_recommendation_route():
    cards = {}
    for k, v in request.json["cards"].items():
        cards[int(k)] = v
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
            "description": f"[{datetime.utcnow().strftime('%Y-%m-%d')}] \n{d.description}",
            "tags": d.tags,
            "cards": d.cards,
        }
        new_branches = [source]

    branches = []
    branches_deckids = master.branches.copy() if master.branches else []

    for i, b in enumerate(new_branches):
        branch_name = (
            f"#{len(master.branches) + 1}"
            if master.branches
            else f"#{len(new_branches) - i}"
        )
        new_deckid = non_secure_generate('1234567890abcdef', 9)
        while Deck.query.get(new_deckid):
            new_deckid = non_secure_generate('1234567890abcdef', 9)

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

        branches.append({"deckid": new_deckid, "branchName": branch_name})
        branches_deckids.append(new_deckid)

    master.branches = branches_deckids
    db.session.commit()
    return jsonify(branches)


@app.route("/api/deck/<string:deckid>/branch", methods=["DELETE"])
@login_required
def remove_branch_route(deckid):
    d = Deck.query.get(deckid)
    if d.author != current_user:
        return abort(401)

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
    return jsonify(success=True)
