from flask import jsonify, request, abort
from flask_login import current_user, login_required
from datetime import date, datetime
import json
from nanoid import non_secure_generate
from random import random
from search_decks import search_decks
from search_decks_components import match_inventory
from api import app, db, login
from models import Deck

CRYPT_LIMIT = 35
LIBRARY_LIMIT = 90

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("../frontend/public/data/cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


def get_missing_fields(source):
    deck = {
        "capacity": None,
        "cardtypes_ratio": {},
        "clan": None,
        "crypt_total": 0,
        "disciplines": [],
        "library_total": 0,
        "sect": None,
        "traits": [],
    }

    crypt = {}
    library = {}
    clans = {}
    sects = {}
    disciplines = set()
    crypt_disciplines = set()
    total_capacity = 0
    total_crypt_ex_ac = 0

    for id, q in source.cards.items():
        if id > 200000:
            crypt[id] = crypt_db[str(id)]
            crypt[id]["q"] = q
            deck["crypt_total"] += q
            if id != 200076:
                total_crypt_ex_ac += q

        else:
            library[id] = library_db[str(id)]
            library[id]["q"] = q
            deck["library_total"] += q

    for id, c in crypt.items():
        # Skip Anarch Convert
        if id != 200076:
            total_capacity += c["q"] * c["capacity"]

            if (clan := c["clan"]) in clans:
                clans[clan] += c["q"]
            else:
                clans[clan] = c["q"]

        if (sect := c["sect"]) in sects:
            sects[sect] += c["q"]
        else:
            sects[sect] = c["q"]

        if "star" not in deck["traits"] and id != 200076:
            adv = c["adv"]
            if adv and adv[1] in crypt:
                if (c["q"] + crypt[adv[1]]["q"]) / total_crypt_ex_ac > 0.33:
                    deck["traits"].append("star")
            else:
                if c["q"] / total_crypt_ex_ac > 0.33:
                    deck["traits"].append("star")

        for d in c["disciplines"].keys():
            crypt_disciplines.add(d)

    for clan, q in clans.items():
        if q / total_crypt_ex_ac > 0.65:
            deck["clan"] = clan

    if len(clans) <= 1 and "monoclan" not in deck["traits"]:
        deck["traits"].append("monoclan")

    for sect, q in sects.items():
        if q / deck["crypt_total"] > 0.65:
            deck["sect"] = sect

    deck["capacity"] = total_capacity / total_crypt_ex_ac

    card_types = {}

    for id, c in library.items():
        if c["type"] in card_types:
            card_types[c["type"]] += c["q"]
        else:
            card_types[c["type"]] = c["q"]

        if "&" in c["discipline"]:
            for d in c["discipline"].split(" & "):
                if d in [*crypt_disciplines, "Flight", "Maleficia", "Striga"]:
                    disciplines.add(d)

        elif "/" in c["discipline"]:
            for d in c["discipline"].split("/"):
                if d in [*crypt_disciplines, "Flight", "Maleficia", "Striga"]:
                    disciplines.add(d)

        elif c["discipline"] in [*crypt_disciplines, "Flight", "Maleficia", "Striga"]:
            disciplines.add(c["discipline"])

    for ct, q in card_types.items():
        deck["cardtypes_ratio"][ct.lower()] = q / deck["library_total"]

    deck["disciplines"] = sorted(list(disciplines))

    return deck


def sanitize_pda(d):
    tags = d.tags if isinstance(d.tags, dict) else {"superior": [], "base": d.tags}

    deck = {
        "deckid": d.deckid,
        "name": d.name,
        "author": d.author_public_name,
        "isFavorited": False,
        "favoritedBy": len(d.favorited),
        "creation_date": d.creation_date,
        "timestamp": d.timestamp,
        "cards": d.cards,
        "tags": tags,
    }

    if current_user.is_authenticated and current_user.id in d.favorited:
        deck["isFavorited"] = True

    return deck


def minify_pda(d):
    deck = {"deckid": d.deckid, "creation_date": d.creation_date}

    if current_user.is_authenticated and current_user.id in d.favorited:
        deck["isFavorited"] = True

    return deck


@app.route("/api/pda/<string:deckid>", methods=["GET"])
def get_pda(deckid):
    d = Deck.query.get(deckid)
    if not d:
        abort(400)

    is_author = current_user == d.author
    tags = d.tags if isinstance(d.tags, dict) else {"superior": [], "base": d.tags}

    deck = {
        "author": d.author_public_name,
        "cards": d.cards,
        "creation_date": d.creation_date,
        "deckid": d.deckid,
        "description": d.description,
        "favorited": d.favorited,
        "isAuthor": is_author,
        "isNonEditable": bool(not d.author),
        "name": d.name,
        "publicChild": d.public_child if is_author else bool(d.public_child),
        "publicParent": d.public_parent if is_author else bool(d.public_parent),
        "tags": tags,
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


@app.route("/api/pda/authors", methods=["GET"])
def get_pda_authors_route():
    authors = []
    for d in Deck.query.filter(Deck.public_parent != None).all():
        if d.author_public_name not in authors:
            authors.append(d.author_public_name)

    return jsonify(authors)


@app.route("/api/search/pda", methods=["POST"])
def search_pda_route():
    pda_decks = []
    decks = []
    if request.json.get("src") in ["my-nonpublic", "my"]:
        decks = (
            Deck.query.filter(Deck.author == current_user)
            .order_by(Deck.creation_date.desc())
            .all()
        )

    else:
        decks = (
            Deck.query.filter(Deck.public_parent != None)
            .order_by(Deck.creation_date.desc())
            .all()
        )

    for d in decks:
        tags = d.tags if isinstance(d.tags, dict) else {"superior": [], "base": d.tags}

        deck = {
            "deckid": d.deckid,
            "capacity": d.capacity,
            "cardtypes_ratio": d.cardtypes_ratio,
            "clan": d.clan,
            "sect": d.sect,
            "tags": tags,
            "crypt": {},
            "crypt_total": d.crypt_total,
            "creation_date": d.creation_date,
            "disciplines": d.disciplines,
            "library": {},
            "library_total": d.library_total,
            "author": d.author_public_name,
            "traits": d.traits,
            "public_parent": d.public_parent,
            "owner": d.author,
        }

        for id, q in d.cards.items():
            if id > 200000:
                deck["crypt"][id] = q
            else:
                deck["library"][id] = q

        pda_decks.append(deck)

    query_priority = [
        "src",
        "owner",
        "author",
        "date",
        "libraryTotal",
        "crypt",
        "library",
        "clan",
        "sect",
        "tags",
        "traits",
        "capacity",
        "disciplines",
        "cardtypes",
        "similar",
    ]

    queries = [
        {"option": q, "value": request.json[q]}
        for q in query_priority
        if q in request.json
    ]
    result = search_decks(queries, pda_decks)

    matchInventory = request.json.get("matchInventory")
    if matchInventory:
        result = match_inventory(
            matchInventory, current_user.inventory, result or pda_decks
        )

    if not result:
        abort(400)

    return jsonify(
        [sanitize_pda(Deck.query.get(d["deckid"])) for d in result[0:10]]
        + [minify_pda(Deck.query.get(d["deckid"])) for d in result[10:]]
    )


@app.route("/api/pda/<string:parent_id>", methods=["POST"])
@login_required
def new_public_deck_route(parent_id):
    parent = Deck.query.get(parent_id)
    if parent.author != current_user:
        abort(401)
    if parent.public_child:
        abort(400)

    new_child_id = non_secure_generate("1234567890abcdef", 9)
    while Deck.query.get(new_child_id):
        new_child_id = non_secure_generate("1234567890abcdef", 9)

    m = get_missing_fields(parent)
    if m["crypt_total"] > CRYPT_LIMIT or m["library_total"] > LIBRARY_LIMIT:
        abort(400)

    child = Deck(
        deckid=new_child_id,
        public_parent=parent.deckid,
        name=parent.name,
        author=parent.author,
        author_public_name=parent.author_public_name,
        description=parent.description,
        cards=parent.cards,
        tags=request.json["tags"],
        creation_date=date.today().strftime("%Y-%m-%d"),
        crypt_total=m["crypt_total"],
        library_total=m["library_total"],
        capacity=m["capacity"],
        cardtypes_ratio=m["cardtypes_ratio"],
        clan=m["clan"],
        sect=m["sect"],
        disciplines=m["disciplines"],
        traits=m["traits"],
    )

    parent.public_child = new_child_id

    db.session.add(child)
    db.session.commit()

    return jsonify({"deckid": new_child_id})


@app.route("/api/pda/<string:child_id>", methods=["PUT"])
@login_required
def update_public_deck(child_id):
    child = Deck.query.get(child_id)
    if not child:
        abort(400)

    elif child.author != current_user:
        abort(401)

    parent = Deck.query.get(child.public_parent)
    m = get_missing_fields(parent)
    if m["crypt_total"] > CRYPT_LIMIT or m["library_total"] > LIBRARY_LIMIT:
        abort(400)

    child.name = parent.name
    child.timestamp = datetime.now()
    child.tags = request.json["tags"]
    child.cards = parent.cards
    child.author_public_name = parent.author_public_name
    child.description = parent.description
    child.crypt_total = m["crypt_total"]
    child.library_total = m["library_total"]
    child.capacity = m["capacity"]
    child.cardtypes_ratio = m["cardtypes_ratio"]
    child.clan = m["clan"]
    child.sect = m["sect"]
    child.disciplines = m["disciplines"]
    child.traits = m["traits"]

    db.session.commit()
    return jsonify(success=True)


@app.route("/api/pda/<string:child_id>", methods=["DELETE"])
@login_required
def delete_public_deck_route(child_id):
    d = Deck.query.get(child_id)
    if d.author != current_user:
        abort(401)

    parent = Deck.query.get(d.public_parent)
    if parent:
        parent.public_child = None

    db.session.delete(d)
    db.session.commit()
    return jsonify(success=True)


@app.route("/api/pda/new/<int:quantity>", methods=["GET"])
def get_new_pda_route(quantity):
    decks = []

    counter = 0
    for d in (
        Deck.query.filter(Deck.public_parent != None)
        .order_by(Deck.creation_date.desc())
        .all()
    ):
        if counter == quantity:
            break

        counter += 1
        decks.append(sanitize_pda(d))

    return jsonify(decks)


@app.route("/api/pda/random/<int:quantity>", methods=["GET"])
def get_random_pda_route(quantity):
    all_decks = Deck.query.filter(Deck.public_parent != None).all()
    max_id = len(all_decks) - 1
    decks = []
    decks_id = []

    while len(decks_id) < quantity:
        id = round(random() * max_id)
        if id not in decks_id:
            decks_id.append(id)

    for idx, id in enumerate(decks_id):
        decks.append(
            minify_pda(all_decks[id]) if idx > 9 else sanitize_pda(all_decks[id])
        )

    return jsonify(decks)


@app.route("/api/pda/favorite/<string:deckid>", methods=["POST"])
@login_required
def add_favorite_route(deckid):
    d = Deck.query.get(deckid)
    deck_favorited = d.favorited.copy()
    deck_favorited.append(current_user.id)
    d.favorited = deck_favorited

    user_favorites = current_user.favorites.copy()
    user_favorites.append(deckid)
    current_user.favorites = user_favorites

    db.session.commit()
    return jsonify(success=True)


@app.route("/api/pda/favorite/<string:deckid>", methods=["DELETE"])
@login_required
def delete_favorite_route(deckid):
    d = Deck.query.get(deckid)
    deck_favorited = d.favorited.copy()
    deck_favorited.remove(current_user.id)
    d.favorited = deck_favorited

    user_favorites = current_user.favorites.copy()
    user_favorites.remove(deckid)
    current_user.favorites = user_favorites

    db.session.commit()
    return jsonify(success=True)
