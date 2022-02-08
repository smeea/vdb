from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
from datetime import date
import json
import uuid
from random import random

from search_decks import search_decks
from pda_components import get_deck_for_frontend, get_missing_fields
from search_decks_components import match_inventory
from api import app, db, login
from models import Deck


pda_decks = []
for d in (
    Deck.query.filter(Deck.public_parent != None).order_by(Deck.creation_date).all()
):
    deck = {
        "deckid": d.deckid,
        "capacity": d.capacity,
        "cardtypes_ratio": d.cardtypes_ratio,
        "clan": d.clan,
        "crypt": {},
        "crypt_total": d.crypt_total,
        "date": d.creation_date,
        "disciplines": d.disciplines,
        "library": {},
        "library_total": d.library_total,
        "author": d.author_public_name,
        "traits": d.traits,
    }

    for id, q in d.cards.items():
        if id > 200000:
            deck["crypt"][id] = q
        else:
            deck["library"][id] = q

    pda_decks.append(deck)


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({"Not logged in": True}), 401)


@app.route("/api/pda/authors", methods=["GET"])
def getPdaAuthors():
    authors = []
    for d in Deck.query.filter(Deck.public_parent != None).all():
        if d.author_public_name not in authors:
            authors.append(d.author_public_name)

    return jsonify([{"label": a, "value": a} for a in authors])


@app.route("/api/search/pda", methods=["POST"])
def searchPdaRoute():
    query_priority = [
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
        return jsonify([get_deck_for_frontend(d["deckid"]) for d in result])
    else:
        abort(400)


@app.route("/api/pda/<string:deckid>", methods=["GET"])
def showPublicDeck(deckid):
    deck = get_deck_for_frontend(deckid)
    if not deck:
        abort(400)

    return jsonify(deck)


@app.route("/api/pda/<string:src_deckid>", methods=["POST"])
@login_required
def newPublicDeck(src_deckid):
    try:
        parent = Deck.query.get(src_deckid)
        if parent.author != current_user:
            abort(401)
        if parent.public_child:
            return jsonify({"PDA already exist for": src_deckid})

        deckid = uuid.uuid4().hex
        m = get_missing_fields(parent)

        child = Deck(
            deckid=deckid,
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

        parent.public_child = deckid

        db.session.add(child)
        db.session.commit()

        return jsonify(
            {
                "new public deck": "success",
                "parent": parent.deckid,
                "child": child.deckid,
            }
        )

    except Exception:
        print("Error new PDA", current_user.username, src_deckid)


@app.route("/api/pda/<string:deckid>", methods=["DELETE"])
@login_required
def deletePublicDeck(deckid):
    try:
        d = Deck.query.get(deckid)
        if d.author != current_user:
            abort(401)

        child_id = None
        parent_id = None

        if d.public_child:
            parent_id = d.deckid
            child_id = d.public_child

            child = Deck.query.get(child_id)
            d.public_child = None
            db.session.delete(child)

        elif d.public_parent:
            parent_id = d.public_parent
            child_id = d.deckid

            parent = Deck.query.get(parent_id)
            parent.public_child = None
            db.session.delete(d)

        db.session.commit()

        return jsonify(
            {
                "delete public deck": "success",
                "parent": parent_id,
                "child": child_id,
            }
        )

    except Exception:
        print("Error delete PDA", current_user.username, deckid)


@app.route("/api/pda/new/<int:quantity>", methods=["GET"])
def getNewPda(quantity):
    decks = []

    counter = 0
    for d in (
        Deck.query.filter(Deck.public_parent != None).order_by(Deck.creation_date).all()
    ):
        if counter == quantity:
            break

        counter += 1
        decks.append(get_deck_for_frontend(d.deckid))

    return jsonify(decks)


@app.route("/api/pda/random/<int:quantity>", methods=["GET"])
def getRandomPda(quantity):
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
            decks.append(get_deck_for_frontend(all_decks[id].deckid))

    return jsonify(decks)
