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


with open("tda.json", "r") as tda_file:
    tda = json.load(tda_file)

# with open("twd_locations.json", "r") as twd_locations_file:
#     twd_locations = json.load(twd_locations_file)

# with open("twd_players.json", "r") as twd_players_file:
#     twd_players = json.load(twd_players_file)

# with open("twd_decks.json", "r") as twd_decks_file:
#     twd_decks = json.load(twd_decks_file)
#     for deck in twd_decks.values():
#         deck["crypt"] = {}
#         deck["library"] = {}
#         for id, q in deck["cards"].items():
#             id = int(id)
#             if id > 200000:
#                 deck["crypt"][id] = q
#             else:
#                 deck["library"][id] = q


# def sanitize_twd(d):
#     deck = {
#         "deckid": d["deckid"],
#         "name": d["name"],
#         "author": d["author"],
#         "event": d["event"],
#         "players": d["players"],
#         "location": d["location"],
#         "creation_date": d["creation_date"],
#         "cards": d["cards"],
#         "tags": d["tags"],
#     }

#     return deck


# def minify_twd(d):
#     deck = {
#         "deckid": d["deckid"],
#         "players": d["players"],
#         "creation_date": d["creation_date"],
#     }

#     return deck


@app.route("/api/tda/decks", methods=["GET"])
def get_all_tda_events():
    events = {}
    for i in tda.values():
        id = i["info"]["id"]
        events[id] = i["info"]

    return jsonify(events)
    # with open("twd_decks.json", "r") as twd_decks_file:
    #     twd_decks = json.load(twd_decks_file)
    #     deck = sanitize_twd(twd_decks[deckid])

    #     return jsonify(deck)


# @app.route("/api/tda/<string:deckid>", methods=["GET"])
# def get_tda_event(eventid):
#     with open("twd_decks.json", "r") as twd_decks_file:
#         twd_decks = json.load(twd_decks_file)
#         deck = sanitize_twd(twd_decks[deckid])

#         return jsonify(deck)
