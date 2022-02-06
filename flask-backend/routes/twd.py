from flask import jsonify, request
from flask_login import current_user
import json
from random import random

from searchTwd import searchTwd
from searchTwdComponents import sanitizeTwd, matchInventory
from api import app


@app.route('/api/twd/locations', methods=['GET'])
def getLocations():
    with open("twdLocations.json", "r") as twdLocations_file:
        return jsonify(json.load(twdLocations_file))


@app.route('/api/twd/players', methods=['GET'])
def getPlayers():
    with open("twdPlayers.json", "r") as twdPlayers_file:
        return jsonify(json.load(twdPlayers_file))


@app.route('/api/twd/new/<int:quantity>', methods=['GET'])
def getNewTwd(quantity):
    with open("twdDecks.json", "r") as twd_file:
        twda = json.load(twd_file)
        decks = []
        for i in range(quantity):
            deck = sanitizeTwd(twda[i])

            decks.append(deck)

        return jsonify(decks)


@app.route('/api/twd/random/<int:quantity>', methods=['GET'])
def getRandomTwd(quantity):
    with open("twdDecks.json", "r") as twd_file:
        twda = json.load(twd_file)
        decks = []
        max_id = len(twda) - 1
        counter = 0
        while counter < quantity:
            counter += 1
            deck = twda[round(random() * max_id)]

            decks.append(sanitizeTwd(deck))

        return jsonify(decks)

@app.route('/api/search/twd', methods=['POST'])
def searchTwdRoute():
    result = searchTwd(request)

    if 'matchInventory' in request.json:
        if result != 400:
            result = matchInventory(request.json['matchInventory'],
                                    current_user.inventory, result)
        else:
            result = matchInventory(request.json['matchInventory'],
                                    current_user.inventory)

    if result != 400:
        return jsonify(result)
    else:
        abort(400)
