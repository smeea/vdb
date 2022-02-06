from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
import json
from random import random

from searchPda import searchPda
from searchPdaComponents import sanitize_deck, generate_deck_for_db
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


@app.route('/api/pda/<string:deckid>', methods=['GET'])
def showPublicDeck(deckid):
    d = PublicDeck.query.get(deckid)
    if not d:
        abort(400)

    deck = sanitize_deck(d.__dict__)
    return jsonify(deck)


@app.route('/api/pda/create', methods=['POST'])
@login_required
def newPublicDeck():
    try:
        source = Deck.query.get(request.json['deckid'])
        deck = generate_deck_for_db(source)

        d = PublicDeck(deckid=deck['deckid'],
                       name=deck['name'],
                       author_public_name=deck['author_public_name'],
                       description=deck['description'],
                       author=deck['author'],
                       tags=deck['tags'],
                       crypt=deck['crypt'],
                       library=deck['library'],
                       crypt_total=deck['crypt_total'],
                       library_total=deck['library_total'],
                       capacity=deck['capacity'],
                       cardtypes_ratio=deck['cardtypes_ratio'],
                       clan=deck['clan'],
                       disciplines=deck['disciplines'],
                       traits=deck['traits']
                       )
        db.session.add(d)
        db.session.commit()

        return jsonify({'new public deck': request.json['deckid']})

    except Exception:
        print('Bad request (new PDA):', request.json)


@app.route('/api/pda/new/<int:quantity>', methods=['GET'])
def getNewPda(quantity):
    decks = []

    counter = 0
    for d in PublicDeck.query.order_by(PublicDeck.timestamp).all():
        if counter == quantity:
            break

        counter += 1
        deck = d.__dict__
        decks.append(sanitize_deck(deck))

    return (jsonify(decks))


@app.route('/api/pda/random/<int:quantity>', methods=['GET'])
def getRandomPda(quantity):
    all_decks = PublicDeck.query.all()
    max_id = len(all_decks) - 1
    decks = []
    decks_ids = []

    counter = 0
    while counter < quantity and len(decks_ids) <= max_id:
        id = round(random() * max_id)
        if id not in decks_ids:
            counter += 1
            decks_ids.append(id)
            deck = all_decks[id].__dict__
            decks.append(sanitize_deck(deck))

    return jsonify(decks)
