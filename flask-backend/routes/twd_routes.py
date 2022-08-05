from flask import jsonify, request, abort
from flask_login import current_user
import json
from random import random

from search_decks import search_decks
from search_decks_components import match_inventory
from hall_of_fame import get_hof_players
from api import app
from models import Deck


with open("twd_locations.json", "r") as twd_locations_file:
    twd_locations = json.load(twd_locations_file)

with open("twd_players.json", "r") as twd_players_file:
    twd_players = json.load(twd_players_file)

with open("twd_decks.json", "r") as twd_file:
    twd_decks = json.load(twd_file)
    for deck in twd_decks:
        deck["crypt"] = {}
        deck["library"] = {}
        for id, q in deck["cards"].items():
            id = int(id)
            if id > 200000:
                deck["crypt"][id] = q
            else:
                deck["library"][id] = q


def sanitize_twd(d):
    deck = {
        "deckid": d["deckid"],
        "name": d["name"],
        "author": d["author"],
        "event": d["event"],
        "players": d["players"],
        "location": d["location"],
        "creation_date": d["creation_date"],
        "cards": d["cards"],
    }

    return deck


@app.route("/api/twd/locations", methods=["GET"])
def getLocations():
    return jsonify(twd_locations)


@app.route("/api/twd/authors", methods=["GET"])
def getTwdAuthors():
    return jsonify(twd_players)


@app.route("/api/twd/hall_of_fame", methods=["GET"])
def getTwdHoFPlayers():
    return jsonify(get_hof_players(twd_decks))


@app.route("/api/twd/similar", methods=["POST"])
def searchSimilarTwd():
    cards = {}

    if "deckid" in request.json:
        deckid = request.json["deckid"]

        if len(deckid) == 32:
            cards = Deck.query.get(deckid).cards

        else:
            with open("twd_decks_by_id.json", "r") as twd_decks_file:
                twd_decks = json.load(twd_decks_file)
                for cardid, q in twd_decks[deckid]["cards"].items():
                    cards[int(cardid)] = q

    else:
        for cardid, q in request.json["cards"].items():
            cards[int(cardid)] = q

    result = search_decks([{"option": "similar", "value": cards}], twd_decks)

    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route("/api/twd/new/<int:quantity>", methods=["GET"])
def getNewTwd(quantity):
    decks = []
    for i in range(quantity):
        deck = twd_decks[i]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route("/api/twd/random/<int:quantity>", methods=["GET"])
def getRandomTwd(quantity):
    decks = []
    max_id = len(twd_decks) - 1
    counter = 0
    while counter < quantity:
        counter += 1
        deck = twd_decks[round(random() * max_id)]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route("/api/search/twd", methods=["POST"])
def searchTwdRoute():
    query_priority = [
        "author",
        "location",
        "event",
        "date",
        "players",
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

    result = search_decks(queries, twd_decks)

    if "matchInventory" in request.json:
        if result != 400:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, result
            )
        else:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, twd_decks
            )

    if result != 400:
        return jsonify([sanitize_twd(d) for d in result])
    else:
        abort(400)
