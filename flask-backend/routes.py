from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user
from datetime import datetime
import uuid
import json
from random import random

from searchTwd import searchTwd
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


@app.route('/api/inventory', methods=['GET'])
def listInventory():
    try:
        if current_user.is_authenticated:
            crypt = {}
            library = {}
            for k, v in current_user.inventory.items():
                k = int(k)
                if k > 200000:
                    crypt[k] = {'q': v}
                elif k < 200000:
                    library[k] = {'q': v}
            return jsonify({
                "crypt": crypt,
                "library": library,
            })

    except AttributeError:
        return jsonify({'error': 'not logged'})

@app.route('/api/inventory/add', methods=['POST'])
def inventoryAddCard():
    if current_user.is_authenticated:
        i = current_user.inventory
        try:
            new_cards = request.json
            merged_cards = i.copy() if i else {}
            for k, v in new_cards.items():
                if k not in merged_cards:
                    merged_cards[k] = v

            current_user.inventory = merged_cards.copy()
        except Exception:
            pass

        db.session.commit()
        return jsonify({'inventory card added': 'success'})

    else:
        return jsonify({'Not logged in.'})

@app.route('/api/inventory/consumers', methods=['GET'])
def listConsumers():
    if current_user.is_authenticated:
        try:
            return jsonify(current_user.inventory_consumers)

        except Exception:
            pass

    else:
        return jsonify({'Not logged in.'})


@app.route('/api/inventory/consumers/<string:deckid>', methods=['POST'])
def changeConsumer(deckid):
    if current_user.is_authenticated:
        try:
            c = current_user.inventory_consumers.copy()
            c[deckid] = request.json
            current_user.inventory_consumers = c
            db.session.commit()
            return jsonify({'success change': deckid})

        except Exception:
            return jsonify({'error': 'error'})

    else:
        return jsonify({'Not logged in.'})

@app.route('/api/inventory/consumers/<string:deckid>', methods=['DELETE'])
def removeConsumer(deckid):
    if current_user.is_authenticated:
        try:
            c = current_user.inventory_consumers.copy()
            del c[deckid]
            current_user.inventory_consumers = c
            db.session.commit()
            return jsonify({'success delete': deckid})

        except Exception:
            return jsonify({'error': 'error'})

    else:
        return jsonify({'Not logged in.'})

@app.route('/api/inventory/change', methods=['POST'])
def inventoryChangeCard():
    if current_user.is_authenticated:
        i = current_user.inventory
        try:
            new_cards = request.json
            merged_cards = i.copy() if i else {}
            for k, v in new_cards.items():
                if v < 0:
                    del merged_cards[k]
                else:
                    merged_cards[k] = v

            current_user.inventory = merged_cards.copy()
        except Exception:
            pass

        db.session.commit()
        return jsonify({'inventory card change': 'success'})

    else:
        return jsonify({'Not logged in.'})


@app.route('/api/deck/<string:deckid>', methods=['GET'])
def showDeck(deckid):
    if len(deckid) == 32:
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

    else:
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            deck = twdDecks[deckid]
            for i in deck['crypt']:
                deck['crypt'][i]['c'] = get_crypt_by_id(i)
            for i in deck['library']:
                deck['library'][i]['c'] = get_library_by_id(i)

            comments = deck['description']
            deck['description'] = 'Date: ' + deck['date'] + '\n'
            deck['description'] += 'Players: ' + str(deck['players']) + '\n'
            deck['description'] += 'Event: ' + deck['event'] + '\n'
            deck['description'] += 'Location: ' + deck['location'] + '\n'
            if comments:
                deck['description'] += '\n' + comments
            deck['author'] = deck['player']

            decks = { deckid: deck }
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
            if request.json['name']:
                d.name = request.json['name']
        except Exception:
            pass
        try:
            if 'description' in request.json:
                d.description = request.json['description']
        except Exception:
            pass
        try:
            if 'author' in request.json:
                d.author_public_name = request.json['author'] or ''
        except Exception:
            pass

        db.session.commit()
        return jsonify({'updated deck': d.deckid})
    else:
        return jsonify({'Not logged in.'})

@app.route('/api/deck/parse', methods=['POST'])
def parseDeck():
    try:
        crypt = {}
        library = {}
        cards = request.json['cards']
        for k, v in cards.items():
            k = int(k)
            if k > 200000:
                crypt[k] = {'c': get_crypt_by_id(k), 'q': v}
            elif k < 200000:
                library[k] = {'c': get_library_by_id(k), 'q': v}

        decks = { }
        decks['deckInUrl'] = {
            'name': '',
            'owner': '',
            'author': '',
            'description': '',
            'deckid': '',
            'crypt': crypt,
            'library': library,
            'timestamp': datetime.utcnow()
        }
        if 'name' in request.json:
            decks['deckInUrl']['name']= request.json['name']
        if 'author' in request.json:
            decks['deckInUrl']['author']= request.json['author']
        if 'description' in request.json:
            decks['deckInUrl']['description']= request.json['description']

        return jsonify(decks)

    except AttributeError:
        return jsonify({'error': 'not logged'})

@app.route('/api/decks', methods=['GET'])
def listDecks():
    try:
        decks = {}
        for deck in current_user.decks.all():
            crypt = {}
            library = {}
            for k, v in deck.cards.items():
                # try:
                #     k = int(k)

                # except:
                #     merged_cards = deck.cards.copy()
                #     del merged_cards[k]
                #     deck.cards = merged_cards.copy()
                #     break

                k = int(k)

                if k > 200000:
                    crypt[k] = {'q': v}
                elif k < 200000:
                    library[k] = {'q': v}

            # db.session.commit()

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
                     author_public_name=request.json['author'] if 'author' in request.json else current_user.public_name,
                     description=request.json['description'] if 'description' in request.json else '',
                     author=current_user,
                     cards=request.json['cards'] if 'cards' in request.json else {})
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
    if 'deck' in request.json:
        deck = request.json['deck']
        cards = {}

        for i in deck['crypt']:
            cards[i] = deck['crypt'][i]['q']
        for i in deck['library']:
            cards[i] = deck['library'][i]['q']

        deckid = uuid.uuid4().hex
        d = Deck(deckid=deckid,
                    name=f"{deck['name']} [by {deck['author']}]",
                    author_public_name=deck['author'],
                    description=deck['description'],
                    author=current_user,
                    cards=cards)
        db.session.add(d)
        db.session.commit()
        return jsonify({
            'deck cloned': request.json['deckname'],
            'deckid': deckid
        })

    elif len(request.json['target']) != 32:
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            deck = twdDecks[request.json['target']]
            cards = {}
            for i in deck['crypt']:
                cards[i] = deck['crypt'][i]['q']
            for i in deck['library']:
                cards[i] = deck['library'][i]['q']

            deckid = uuid.uuid4().hex
            d = Deck(deckid=deckid,
                     name=f"{deck['name']} [by {deck['player']}]",
                     author_public_name=deck['player'],
                     description=deck['description'],
                     author=current_user,
                     cards=cards)
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'deck cloned': request.json['deckname'],
                'deckid': deckid
            })
    elif current_user.is_authenticated:
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
            [name, author, description, cards] = deckImport(request.json['deckText'])
            if len(cards) > 0:
                deckid = uuid.uuid4().hex
                d = Deck(deckid=deckid,
                         name=name,
                         author_public_name=author,
                         description=description,
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
        login_user(user)
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


@app.route('/api/search/twd', methods=['POST'])
def searchTwdRoute():
    result = searchTwd(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


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
    with open("twdNewDecks.json", "r") as twd_file:
        twda = json.load(twd_file)
        decks = []
        for i in range(quantity):
            decks.append(twda[i])

        return jsonify(decks)

@app.route('/api/twd/random/<int:quantity>', methods=['GET'])
def getRandomTwd(quantity):
    with open("twdDecks.json", "r") as twd_file:
        twda = json.load(twd_file)
        decks = []
        length = len(twda)
        counter = quantity
        while counter > 0:
            counter -= 1
            decks.append(twda[round(random()*length)])

        return jsonify(decks)


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


@app.route('/api/search/inventory/crypt', methods=['POST'])
def searchCryptInventoryRoute():
    try:
        crypt = []
        for k, v in current_user.inventory.items():
            k = int(k)
            if k > 200000:
                crypt.append(get_crypt_by_id(k))

        result = searchCrypt(request, crypt)

        if result != 400:
            return jsonify(result)
        else:
            abort(400)

    except AttributeError:
        return jsonify({'error': 'not logged'})

@app.route('/api/search/inventory/library', methods=['POST'])
def searchLibraryInventoryRoute():
    try:
        library = []
        for k, v in current_user.inventory.items():
            k = int(k)
            if k < 200000:
                library.append(get_library_by_id(k))

        result = searchLibrary(request, library)

        if result != 400:
            return jsonify(result)
        else:
            abort(400)

    except AttributeError:
        return jsonify({'error': 'not logged'})
