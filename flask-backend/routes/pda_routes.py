from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
import json
from random import random

from searchPda import searchPda
from searchPdaComponents import get_deck_for_frontend, get_missing_fields
from searchTwdComponents import matchInventory
from api import app, db, login
from models import Deck, PublicDeck


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({'Not logged in': True}), 401)


@app.route('/api/pda/authors', methods=['GET'])
def getAuthors():
    authors = []
    for d in PublicDeck.query.all():
        if d.author_public_name not in authors:
            authors.append(d.author_public_name)

    def get_entry(author):
        return {'label': author, 'value': author}

    return jsonify([get_entry(a) for a in authors])


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
    deck = get_deck_for_frontend(deckid)
    if not deck:
        abort(400)

    return jsonify(deck)


@app.route('/api/pda/<string:deckid>', methods=['POST'])
@login_required
def newPublicDeck(deckid):
    try:
        source = Deck.query.get(deckid)
        if (source.author != current_user):
            abort(401)

        m = get_missing_fields(source)

        d = PublicDeck(deckid=source.deckid,
                       name=source.name,
                       author=source.author,
                       author_public_name=source.author_public_name,
                       description=source.description,
                       date=source.timestamp.strftime('%Y-%m-%d'),
                       tags=source.tags,
                       crypt=m['crypt'],
                       library=m['library'],
                       crypt_total=m['crypt_total'],
                       library_total=m['library_total'],
                       capacity=m['capacity'],
                       cardtypes_ratio=m['cardtypes_ratio'],
                       clan=m['clan'],
                       disciplines=m['disciplines'],
                       traits=m['traits']
                       )

        db.session.add(d)
        db.session.commit()

        return jsonify({'new public deck': deckid})

    except Exception:
        print('Error new PDA', current_user.username, deckid)


@app.route('/api/pda/<string:deckid>', methods=['DELETE'])
@login_required
def deletePublicDeck(deckid):
    try:
        d = PublicDeck.query.get(deckid)
        if (d.author != current_user):
            abort(401)

        db.session.delete(d)
        db.session.commit()

        return jsonify({'delete public deck': deckid})

    except Exception:
        print('Error delete PDA', current_user.username, deckid)



@app.route('/api/pda/new/<int:quantity>', methods=['GET'])
def getNewPda(quantity):
    decks = []

    counter = 0
    for d in PublicDeck.query.order_by(PublicDeck.date).all():
        if counter == quantity:
            break

        counter += 1
        decks.append(get_deck_for_frontend(d.deckid))

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
            decks.append(get_deck_for_frontend(all_decks[id].deckid))

    return jsonify(decks)


@app.route('/api/pda', methods=['GET'])
def showAll():
    decks = []
    for d in PublicDeck.query.all():
        decks.append(d.name)

    return jsonify(decks)
