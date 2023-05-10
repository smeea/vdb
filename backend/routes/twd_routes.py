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
    base_url = 'https://www.vekn.net/api/vekn'
    token_valid = None
    if 'vekn_timestamp' in session and 'vekn_token' in session:
        token_age = datetime.now().timestamp() - session['vekn_timestamp'].timestamp() - 18000
        if token_age > (60 * 4):
            token_valid = True

    if not token_valid:
        login_url = f"{base_url}/login"
        credentials = {'username': 'vdb.vtes', 'password': 'Vdbpassword123'}
        r = requests.post(login_url, data=credentials)
        token = r.json()['data']['auth']
        session['vekn_token'] = token
        session['vekn_timestamp'] = datetime.now()

    event_url = f"{base_url}/event/{event_id}"
    r = requests.get(event_url, headers={'Authorization': f"Bearer {session['vekn_token']}"})
    data = r.json()['data']['events'][0]

    return(data)

@app.route("/api/twd/cities", methods=["GET"])
def get_cities():
    return jsonify(twd_locations['cities'])

@app.route("/api/twd/countries", methods=["GET"])
def get_countries():
    return jsonify(twd_locations['countries'])


@app.route("/api/twd/authors", methods=["GET"])
def get_twd_authors():
    return jsonify(twd_players)


@app.route("/api/twd/hall_of_fame", methods=["GET"])
def get_twd_hof_players():
    return jsonify(get_hof_players(twd_decks.values()))


@app.route("/api/twd/new/<int:quantity>", methods=["GET"])
def get_new_twd_route(quantity):
    decks = []
    for i in range(quantity):
        deck = list(twd_decks.values())[i]
        decks.append(minify_twd(deck))

    return jsonify(decks)


@app.route("/api/twd/random/<int:quantity>", methods=["GET"])
def get_random_twd_route(quantity):
    all_decks = list(twd_decks.values())
    decks = []
    max_id = len(all_decks) - 1
    counter = 0
    while counter < quantity:
        counter += 1
        deck = all_decks[round(random() * max_id)]
        decks.append(minify_twd(deck))

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

    if "matchInventory" in request.json:
        if result:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, result
            )
        else:
            result = match_inventory(
                request.json["matchInventory"],
                current_user.inventory,
                twd_decks.values(),
            )

    if not result:
        abort(400)

    return jsonify([minify_twd(d) for d in result])
