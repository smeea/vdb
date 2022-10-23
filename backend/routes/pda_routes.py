from flask import jsonify, request, abort
from flask_login import current_user, login_required
from datetime import date, datetime
import json
import uuid
from random import random

from search_decks import search_decks
from search_decks_components import match_inventory
from api import app, db, login
from models import Deck

with open("../frontend/dist/cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("../frontend/dist/cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)


@login.unauthorized_handler
def unauthorized_handler():
    abort(401)


def get_missing_fields(source):
    deck = {
        "crypt_total": 0,
        "library_total": 0,
        "capacity": None,
        "disciplines": [],
        "cardtypes_ratio": {},
        "clan": None,
        "traits": [],
    }

    crypt = {}
    library = {}
    clans = {}
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
            total_capacity += c["q"] * c["Capacity"]

            if (clan := c["Clan"]) in clans:
                clans[clan] += c["q"]
            else:
                clans[clan] = c["q"]

        if "star" not in deck["traits"] and id != 200076:
            adv = c["Adv"]
            if adv and adv[1] in crypt:
                if (c["q"] + crypt[adv[1]]["q"]) / total_crypt_ex_ac > 0.38:
                    deck["traits"].append("star")
            else:
                if c["q"] / total_crypt_ex_ac > 0.38:
                    deck["traits"].append("star")

        for d in c["Disciplines"].keys():
            crypt_disciplines.add(d)

    for clan, q in clans.items():
        if q / deck["crypt_total"] > 0.5:
            deck["clan"] = clan

    if len(clans) <= 1 and "monoclan" not in deck["traits"]:
        deck["traits"].append("monoclan")

    deck["capacity"] = total_capacity / total_crypt_ex_ac

    card_types = {}

    for id, c in library.items():
        if c["Type"] in card_types:
            card_types[c["Type"]] += c["q"]
        else:
            card_types[c["Type"]] = c["q"]

        if "&" in c["Discipline"]:
            for d in c["Discipline"].split(" & "):
                if d in crypt_disciplines:
                    disciplines.add(d)

        elif "/" in c["Discipline"]:
            for d in c["Discipline"].split("/"):
                if d in crypt_disciplines:
                    disciplines.add(d)

        elif c["Discipline"] in crypt_disciplines:
            disciplines.add(c["Discipline"])

    for ct, q in card_types.items():
        deck["cardtypes_ratio"][ct.lower()] = q / deck["library_total"]

    deck["disciplines"] = sorted(list(disciplines))

    return deck


def sanitize_pda(d):
    deck = {
        "deckid": d.deckid,
        "name": d.name,
        "author": d.author_public_name,
        "isFavorited": False,
        "favoritedBy": len(d.favorited),
        "creation_date": d.creation_date,
        "timestamp": d.timestamp,
        "cards": d.cards,
    }

    if current_user.is_authenticated and current_user.id in d.favorited:
        deck["isFavorited"] = True

    return deck


@app.route("/api/pda/authors", methods=["GET"])
def get_pda_authors_route():
    authors = []
    for d in Deck.query.filter(Deck.public_parent != None).all():
        if d.author_public_name not in authors:
            authors.append(d.author_public_name)

    return jsonify([{"label": a, "value": a} for a in authors])


@app.route("/api/search/pda", methods=["POST"])
def search_pda_route():
    pda_decks = []
    for d in (
        Deck.query.filter(Deck.public_parent != None)
        .order_by(Deck.creation_date.desc())
        .all()
    ):
        deck = {
            "deckid": d.deckid,
            "capacity": d.capacity,
            "cardtypes_ratio": d.cardtypes_ratio,
            "clan": d.clan,
            "crypt": {},
            "crypt_total": d.crypt_total,
            "creation_date": d.creation_date,
            "disciplines": d.disciplines,
            "library": {},
            "library_total": d.library_total,
            "author": d.author_public_name,
            "traits": d.traits,
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

    if "matchInventory" in request.json:
        if result != 400:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, result
            )
        else:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, pda_decks
            )

    if result != 400:
        return jsonify([sanitize_pda(Deck.query.get(d["deckid"])) for d in result])
    else:
        abort(400)


@app.route("/api/pda/<string:parent_id>", methods=["POST"])
@login_required
def new_public_deck_route(parent_id):
    parent = Deck.query.get(parent_id)
    if parent.author != current_user:
        abort(401)
    if parent.public_child:
        abort(400)

    new_child_id = uuid.uuid4().hex
    m = get_missing_fields(parent)
    if m["crypt_total"] > 35 or m["library_total"] > 90:
        abort(400)

    child = Deck(
        deckid=new_child_id,
        public_parent=parent.deckid,
        name=parent.name,
        author=parent.author,
        author_public_name=parent.author_public_name,
        description=parent.description,
        cards=parent.cards,
        tags=parent.tags,
        creation_date=date.today().strftime("%Y-%m-%d"),
        crypt_total=m["crypt_total"],
        library_total=m["library_total"],
        capacity=m["capacity"],
        cardtypes_ratio=m["cardtypes_ratio"],
        clan=m["clan"],
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
        print("bad deck request\n", child_id, current_user.username, request.json)
        abort(400)

    elif child.author != current_user:
        abort(401)

    parent = Deck.query.get(child.public_parent)
    m = get_missing_fields(parent)
    if m["crypt_total"] > 30 or m["library_total"] > 90:
        abort(400)

    child.name = parent.name
    child.timestamp = datetime.utcnow()
    child.cards = parent.cards
    child.author_public_name = parent.author_public_name
    child.description = parent.description
    child.tags = parent.tags
    child.crypt_total = m["crypt_total"]
    child.library_total = m["library_total"]
    child.capacity = m["capacity"]
    child.cardtypes_ratio = m["cardtypes_ratio"]
    child.clan = m["clan"]
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
    decks_ids = []

    counter = 0
    while counter < quantity and len(decks_ids) <= max_id:
        id = round(random() * max_id)
        if id not in decks_ids:
            counter += 1
            decks_ids.append(id)
            decks.append(sanitize_pda(all_decks[id]))

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
