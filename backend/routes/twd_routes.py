from flask import jsonify, request, abort, session
from flask_login import current_user
from datetime import datetime
import json
import requests
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

with open("twd_decks.json", "r") as twd_decks_file:
    twd_decks = json.load(twd_decks_file)
    for deck in twd_decks.values():
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
        "tags": d["tags"],
    }

    return deck


def minify_twd(d):
    deck = {
        "deckid": d["deckid"],
        "players": d["players"],
        "creation_date": d["creation_date"],
    }

    return deck


@app.route("/api/twd/event/<string:event_id>", methods=["GET"])
def get_event(event_id):
    base_url = "https://www.vekn.net/api/vekn"
    token_valid = None
    if "vekn_timestamp" in session and "vekn_token" in session:
        token_age = (
            datetime.now().timestamp() - session["vekn_timestamp"].timestamp() - 18000
        )
        if token_age > (60 * 4):
            token_valid = True

    if not token_valid:
        login_url = f"{base_url}/login"
        credentials = {"username": "vdb.vtes", "password": "Vdbpassword123"}
        r = requests.post(login_url, data=credentials)
        token = r.json()["data"]["auth"]
        session["vekn_token"] = token
        session["vekn_timestamp"] = datetime.now()

    event_url = f"{base_url}/event/{event_id}"
    r = requests.get(
        event_url, headers={"Authorization": f"Bearer {session['vekn_token']}"}
    )
    data = r.json()["data"]["events"][0]

    return data


@app.route("/api/twd/cities", methods=["GET"])
def get_cities():
    return jsonify(twd_locations["cities"])


@app.route("/api/twd/countries", methods=["GET"])
def get_countries():
    return jsonify(twd_locations["countries"])


@app.route("/api/twd/authors", methods=["GET"])
def get_twd_authors():
    return jsonify(twd_players)


@app.route("/api/twd/hall_of_fame", methods=["GET"])
def get_twd_hof_players():
    return jsonify(get_hof_players(twd_decks.values()))


@app.route("/api/twd/new/<int:quantity>", methods=["GET"])
def get_new_twd_route(quantity):
    decks = []
    sorted_decks = sorted(
        list(twd_decks.values()), key=lambda x: x["creation_date"], reverse=True
    )
    for i in range(quantity):
        deck = sorted_decks[i]
        decks.append(minify_twd(deck) if i > 9 else sanitize_twd(deck))

    return jsonify(decks)


@app.route("/api/twd/random/<int:quantity>", methods=["GET"])
def get_random_twd_route(quantity):
    all_decks = list(twd_decks.values())
    max_id = len(all_decks) - 1
    decks = []
    decks_id = []
    while len(decks_id) < quantity:
        id = round(random() * max_id)
        if id not in decks_id:
            decks_id.append(id)

    for idx, id in enumerate(decks_id):
        decks.append(
            minify_twd(all_decks[id]) if idx > 9 else sanitize_twd(all_decks[id])
        )

    return jsonify(decks)


@app.route("/api/twd/<string:deckid>", methods=["GET"])
def get_twd(deckid):
    with open("twd_decks.json", "r") as twd_decks_file:
        twd_decks = json.load(twd_decks_file)
        deck = sanitize_twd(twd_decks[deckid])

        return jsonify(deck)


@app.route("/api/search/twd", methods=["POST"])
def search_twd_route():
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

    result = search_decks(queries, twd_decks.values())

    matchInventory = request.json.get("matchInventory")
    if matchInventory:
        result = match_inventory(
            matchInventory, current_user.inventory, result or twd_decks.values()
        )

    if not result:
        abort(400)

    result.sort(key=lambda x: x["creation_date"], reverse=True)

    return jsonify(
        [sanitize_twd(d) for d in result[0:10]] + [minify_twd(d) for d in result[10:]]
    )
