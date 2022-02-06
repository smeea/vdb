from flask import jsonify, request, abort, Response
from flask_login import current_user
import json
from random import random

from searchPda import searchPda
from searchTwdComponents import matchInventory
from api import app, db, login
from models import Deck, PublicDeck


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({'Not logged in': True}), 401)


@app.route('/api/search/pda', methods=['POST'])
def searchPdaRoute():
    result = searchPda(request)

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


@app.route('/api/pdall', methods=['GET'])
def showPda():
    decks = []
    for d in PublicDeck.query.all():
        decks.append(d.deckid)

    print(decks)
    return (jsonify(decks))


@app.route('/api/pda/<string:deckid>', methods=['GET'])
def showPublicDeck(deckid):
    deck = PublicDeck.query.filter_by(deckid=deckid).first()
    if not deck:
        abort(400)

    crypt = {}
    library = {}
    for k, v in deck.cards.items():
        k = int(k)
        if k > 200000:
            crypt[k] = {'q': v}
        elif k < 200000:
            library[k] = {'q': v}

    deck = {
        'name': deck.name,
        'owner': deck.author.username if deck.author else None,
        'author': deck.author_public_name,
        'description': deck.description,
        'crypt': crypt,
        'library': library,
        'deckid': deck.deckid,
        'timestamp': deck.timestamp,
        'tags': deck.tags,
    }

    return jsonify(deck)


@app.route('/api/pda/create', methods=['POST'])
# @login_required
def newPublicDeck():
    try:
        deck = Deck.query.filter_by(deckid=request.json['deckid']).first()

        d = PublicDeck(deckid=deck.deckid,
                       name=deck.name,
                       author_public_name=deck.author_public_name,
                       description=deck.description,
                       author=deck.author,
                       tags=deck.tags,
                       cards=deck.cards)
        # print(d.deckid, d.name, d.author_public_name, d.description, d.cards,
        #       d.tags, d.timestamp, d.user_id)

        db.session.add(d)
        db.session.commit()

        return jsonify({'new public deck': request.json['deckid']})

    except Exception:
        print(request.json)


@app.route('/api/pda/new/<int:quantity>', methods=['GET'])
def getNewPda(quantity):
    with open("twdDecks.json", "r") as twd_file:
        pda = json.load(twd_file)
        decks = []
        for i in range(quantity):
            decks.append(pda[i])

        return jsonify(decks)


@app.route('/api/pda/random/<int:quantity>', methods=['GET'])
def getRandomPda(quantity):
    with open("twdDecks.json", "r") as twd_file:
        pda = json.load(twd_file)
        decks = []
        max_id = len(pda) - 1
        counter = 0
        while counter < quantity:
            counter += 1
            deck = pda[round(random() * max_id)]

            decks.append(deck)

        return jsonify(decks)
