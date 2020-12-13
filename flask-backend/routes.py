from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user
from datetime import datetime
import uuid

from searchCrypt import searchCrypt
from searchLibrary import searchLibrary
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id
from deckExport import deckExport
from deckExportAll import deckExportAll
from deckImport import deckImport
from deckProxy import deckProxy
from api import app
from api import db
from models import User
from models import Deck


@app.route('/api/deck/<string:deckid>', methods=['GET'])
def showDeck(deckid):
    decks = {}
    deck = Deck.query.filter_by(deckid=deckid).first()
    crypt = {}
    library = {}
    for k, v in deck.cards.items():
        k = int(k)
        if k > 200000:
            crypt[k] = {'c': get_crypt_by_id(k), 'q': v}
        elif k < 200000:
            library[k] = {'c': get_library_by_id(k), 'q': v}

    decks[deckid] = {
        'name': deck.name,
        'owner': deck.author.username,
        'author': deck.author_public_name,
        'description': deck.description,
        'crypt': crypt,
        'library': library,
        'deckid': deck.deckid,
        'timestamp': deck.timestamp,
    }
    return jsonify(decks)


@app.route('/api/deck/<string:deckid>', methods=['PUT'])
def updateDeck(deckid):
    if current_user.is_authenticated:
        d = Deck.query.filter_by(author=current_user, deckid=deckid).first()
        d.timestamp = datetime.utcnow()
        try:
            if request.json['cardChange']:
                new_cards = request.json['cardChange']
                merged_cards = d.cards.copy()
                for k, v in new_cards.items():
                    if v < 0:
                        del merged_cards[k]
                    else:
                        merged_cards[k] = v

                d.cards = merged_cards.copy()
        except Exception:
            pass
        try:
            if request.json['name']:
                d.name = request.json['name']
        except Exception:
            pass
        try:
            if request.json['cardAdd']:
                new_cards = request.json['cardAdd']
                merged_cards = d.cards.copy()
                for k, v in new_cards.items():
                    if k not in merged_cards:
                        merged_cards[k] = v

                d.cards = merged_cards.copy()
        except Exception:
            pass
        try:
            if request.json['description']:
                d.description = request.json['description']
        except Exception:
            pass
        try:
            if request.json['author']:
                d.author_public_name = request.json['author']
        except Exception:
            pass

        db.session.commit()
        return jsonify({'updated deck': d.deckid})
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/decks', methods=['GET'])
def listDecks():
    try:
        decks = {}
        for deck in current_user.decks.all():
            crypt = {}
            library = {}
            for k, v in deck.cards.items():
                k = int(k)
                if k > 200000:
                    crypt[k] = {'c': get_crypt_by_id(k), 'q': v}
                elif k < 200000:
                    library[k] = {'c': get_library_by_id(k), 'q': v}

            decks[deck.deckid] = {
                'name': deck.name,
                'owner': deck.author.username,
                'author': deck.author_public_name,
                'description': deck.description,
                'crypt': crypt,
                'library': library,
                'deckid': deck.deckid,
                'timestamp': deck.timestamp,
            }
        return jsonify(decks)
    except AttributeError:
        return jsonify({'error': 'not logged'})


@app.route('/api/decks/create', methods=['POST'])
def newDeck():
    if current_user.is_authenticated:
        try:
            deckid = uuid.uuid4().hex
            d = Deck(deckid=deckid,
                     name=request.json['deckname'],
                     author_public_name=current_user.public_name,
                     description='',
                     author=current_user,
                     cards={})
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'new deck created': request.json['deckname'],
                'deckid': deckid,
            })
        except Exception:
            pass
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/decks/clone', methods=['POST'])
def cloneDeck():
    if current_user.is_authenticated:
        try:
            targetDeck = Deck.query.filter_by(
                deckid=request.json['target']).first()
            deckid = uuid.uuid4().hex
            d = Deck(deckid=deckid,
                     name=request.json['deckname'],
                     author_public_name=request.json['author'],
                     description='',
                     author=current_user,
                     cards=targetDeck.cards)
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'deck cloned': request.json['deckname'],
                'deckid': deckid,
            })
        except Exception:
            pass
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/decks/import', methods=['POST'])
def importDeck():
    if current_user.is_authenticated:
        try:
            cards = deckImport(request.json['deckText'])
            if len(cards) > 0:
                deckid = uuid.uuid4().hex
                deckname = 'New imported deck'
                d = Deck(deckid=deckid,
                         name=deckname,
                         author_public_name=current_user.public_name,
                         description='',
                         author=current_user,
                         cards=cards)
                db.session.add(d)
                db.session.commit()
                return jsonify({'deckid': deckid})
            return jsonify({'Cannot import this deck.'})

        except Exception:
            pass
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/decks/export', methods=['POST'])
def deckExportRoute():
    try:
        if request.json['deckid'] == 'all' and current_user.is_authenticated:
            decks = Deck.query.filter_by(author=current_user).all()
            result = deckExportAll(decks, request.json['format'])
            return jsonify(result)
        else:
            deck = Deck.query.filter_by(deckid=request.json['deckid']).first()
            result = deckExport(deck, request.json['format'])
            return jsonify(result)

    except Exception:
        pass

@app.route('/api/decks/proxy', methods=['POST'])
def deckProxyRoute():
    try:
        return deckProxy(request.json['cards'])

    except Exception:
        pass


@app.route('/api/decks/remove', methods=['POST'])
def removeDeck():
    if current_user.is_authenticated:
        try:
            d = Deck.query.filter_by(author=current_user,
                                     deckid=request.json['deckid']).first()
            db.session.delete(d)
            db.session.commit()
            return jsonify({'deck removed': request.json['deckid']})
        except Exception:
            return jsonify({'error': 'idk'})
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/cards/<int:card_id>', methods=['GET'])
def showCard(card_id):
    if card_id >= 200000:
        card = get_crypt_by_id(card_id)
        return jsonify(card)
    elif card_id < 200000:
        card = get_library_by_id(card_id)
        return jsonify(card)


@app.route('/api/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return jsonify({'already logged as:': current_user.username})

    try:
        user = User(username=request.json['username'],
                    public_name=request.json['username'])
        user.set_password(request.json['password'])
        db.session.add(user)
        db.session.commit()
        return jsonify({'registered as': user.username})
    except KeyError:
        pass


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        if current_user.is_authenticated:
            return jsonify({
                'username': current_user.username,
                'email': current_user.email,
                'public_name': current_user.public_name,
            })
        else:
            return jsonify({'username': ''})
    elif request.method == 'POST':
        try:
            user = User.query.filter_by(
                username=request.json['username']).first()
            if user is None or not user.check_password(
                    request.json['password']):
                return jsonify({'error': 'invalid username or password'}), 401
            login_user(user, remember=request.json['remember'])
            return jsonify({'logged in as': current_user.username})
        except KeyError:
            pass


@app.route('/api/account', methods=['POST'])
def account():
    if current_user.is_authenticated:
        try:
            if (request.json['publicName']):
                current_user.public_name = request.json['publicName']
                db.session.commit()
                return jsonify('public name changed')
        except Exception:
            pass
        try:

            if (request.json['email']) and current_user.check_password(
                    request.json['password']):
                current_user.email = request.json['email']
                db.session.commit()
                return jsonify('email changed')
        except Exception:
            pass
        try:
            if (request.json['newPassword']) and current_user.check_password(
                    request.json['password']):
                current_user.set_password(request.json['newPassword'])
                db.session.commit()
                return jsonify('password changed')
        except Exception:
            pass
    else:
        return jsonify({'error': 'Not logged in'})


@app.route('/api/account/remove', methods=['POST'])
def removeAccount():
    if current_user.is_authenticated and current_user.check_password(
            request.json['password']):
        try:
            db.session.delete(current_user)
            db.session.commit()
            return jsonify({'account removed': current_user.username})
        except Exception:
            pass
    else:
        return jsonify({'Not logged in or wrong password.'})


@app.route('/api/logout')
def logout():
    try:
        user = current_user.username
        logout_user()
        return jsonify({'logged out from': user})
    except AttributeError:
        return jsonify({'error': 'not logged'})


@app.route('/api/search/crypt', methods=['POST'])
def searchCryptRoute():
    result = searchCrypt(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route('/api/search/library', methods=['POST'])
def searchLibraryRoute():
    result = searchLibrary(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)
