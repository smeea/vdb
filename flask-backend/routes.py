from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user
from datetime import datetime
import uuid

from search_crypt import get_crypt_by_cardtext
from search_crypt import get_crypt_by_cardname
from search_crypt import get_crypt_by_trait
from search_crypt import get_crypt_by_disciplines
from search_crypt import get_crypt_by_title
from search_crypt import get_crypt_by_votes
from search_crypt import get_crypt_by_capacity
from search_crypt import get_crypt_by_group
from search_crypt import get_crypt_by_sect
from search_crypt import get_crypt_by_clan
from search_crypt import get_crypt_by_set
from search_crypt import get_crypt_by_id
from search_crypt import get_overall_crypt
from search_library import get_library_by_cardtext
from search_library import get_library_by_cardname
from search_library import get_library_by_trait
from search_library import get_library_by_discipline
from search_library import get_library_by_title
from search_library import get_library_by_sect
from search_library import get_library_by_clan
from search_library import get_library_by_cardtype
from search_library import get_library_by_blood
from search_library import get_library_by_pool
from search_library import get_library_by_id
from search_library import get_library_by_set
from search_library import get_overall_library
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
        try:
            if request.json['update']:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deckid).first()
                new_cards = request.json['update']
                merged_cards = d.cards.copy()
                for k, v in new_cards.items():
                    if v < 0:
                        del merged_cards[k]
                    else:
                        merged_cards[k] = v

                d.cards = merged_cards.copy()
                d.timestamp = datetime.utcnow()
                db.session.commit()
                return jsonify({'updated deck': d.deckid, 'cards': d.cards})
        except Exception:
            pass
        try:
            if request.json['name']:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deckid).first()
                d.name = request.json['name']
                d.timestamp = datetime.utcnow()
                db.session.commit()
                return jsonify({'updated deck': d.deckid, 'name': d.name})
        except Exception:
            pass
        try:
            if request.json['add']:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deckid).first()
                new_cards = request.json['add']
                merged_cards = d.cards.copy()
                for k, v in new_cards.items():
                    if k not in merged_cards:
                        merged_cards[k] = v

                d.cards = merged_cards.copy()
                d.timestamp = datetime.utcnow()
                db.session.commit()
                return jsonify({'updated deck': d.deckid, 'cards': d.cards})
        except Exception:
            pass
        try:
            if request.json['description']:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deckid).first()
                d.description = request.json['description']
                d.timestamp = datetime.utcnow()
                db.session.commit()
                return jsonify({
                    'updated deck': d.deckid,
                    'description': d.description
                })
        except Exception:
            pass
        try:
            if request.json['author']:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deckid).first()
                d.author_public_name = request.json['author']
                d.timestamp = datetime.utcnow()
                db.session.commit()
                return jsonify({
                    'updated deck': d.deckid,
                    'author': d.author_public_name
                })
        except Exception:
            pass
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
                     author_public_name=current_user.username,
                     description='',
                     author=current_user,
                     cards={})
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'FLASK new deck created': request.json['deckname'],
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
                     author_public_name=current_user.username,
                     description='',
                     author=current_user,
                     cards=targetDeck.cards)
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'FLASK deck cloned': request.json['deckname'],
                'deckid': deckid,
            })
        except Exception:
            pass
    else:
        return jsonify({'Not logged in.'})


@app.route('/api/decks/remove', methods=['POST'])
def removeDeck():
    if current_user.is_authenticated:
        try:
            d = Deck.query.filter_by(author=current_user,
                                     deckid=request.json['deckid']).first()
            db.session.delete(d)
            db.session.commit()
            return jsonify({'FLASK deck removed': request.json['deckid']})
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
        user = User(username=request.json['username'])
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
            return jsonify({'username': current_user.username})
        else:
            return jsonify({'username': ''})
    elif request.method == 'POST':
        try:
            user = User.query.filter_by(
                username=request.json['username']).first()
            if user is None or not user.check_password(
                    request.json['password']):
                return jsonify({'error': 'invalid username or password'})
            login_user(user, remember=request.json['remember'])
            return jsonify({'logged in as': current_user.username})
        except KeyError:
            pass


@app.route('/api/account', methods=['POST'])
def account():
    if current_user.is_authenticated and current_user.check_password(
            request.json['password']):
        try:
            if (request.json['newEmail']):
                current_user.email = request.json['newEmail']
                db.session.commit()
                return jsonify('email changed')
        except Exception:
            pass
        try:
            if (request.json['newPassword']):
                current_user.set_password(request.json['newPassword'])
                db.session.commit()
                return jsonify('password changed')
        except Exception:
            pass
    else:
        return jsonify({'error': 'invalid password'})


@app.route('/api/logout')
def logout():
    try:
        user = current_user.username
        logout_user()
        return jsonify({'logged out from': user})
    except AttributeError:
        return jsonify({'error': 'not logged'})


@app.route('/api/search/crypt', methods=['POST'])
def searchCryptCards():
    match_by_category = []
    good_crypt_cards = []
    parameters = 0

    try:
        if request.json['name']:
            parameters += 1
            cards_by_cardname = get_crypt_by_cardname(request.json['name'])
            match_by_category.append(cards_by_cardname)
    except KeyError:
        pass

    try:
        if request.json['text']:
            parameters += 1
            cards_by_cardtext = get_crypt_by_cardtext(request.json['text'])
            match_by_category.append(cards_by_cardtext)
    except KeyError:
        pass

    try:
        if request.json['sect']:
            parameters += 1
            cards_by_sect = get_crypt_by_sect(request.json['sect'])
            match_by_category.append(cards_by_sect)
    except KeyError:
        pass

    try:
        if request.json['clan']:
            parameters += 1
            cards_by_clan = get_crypt_by_clan(request.json['clan'])
            match_by_category.append(cards_by_clan)
    except KeyError:
        pass

    try:
        if request.json['traits']:
            parameters += 1
            cards_by_trait = get_crypt_by_trait(request.json['traits'])
            match_by_category.append(cards_by_trait)
    except KeyError:
        pass

    try:
        if request.json['disciplines'] or request.json['virtues']:
            parameters += 1
            cards_by_disciplines = get_crypt_by_disciplines(
                request.json['disciplines'])
            match_by_category.append(cards_by_disciplines)
    except KeyError:
        pass

    try:
        if request.json['virtues']:
            parameters += 1
            cards_by_virtues = get_crypt_by_disciplines(
                request.json['virtues'])
            match_by_category.append(cards_by_virtues)
    except KeyError:
        pass

    try:
        if request.json['titles']:
            parameters += 1
            cards_by_titles = get_crypt_by_title(request.json['titles'])
            match_by_category.append(cards_by_titles)
    except KeyError:
        pass

    try:
        if request.json['votes']:
            parameters += 1
            cards_by_votes = get_crypt_by_votes(int(request.json['votes']))
            match_by_category.append(cards_by_votes)
    except KeyError:
        pass

    try:
        if request.json['capacity']:
            capacity = int(request.json['capacity'])
            capacitymoreless = request.json['capacitymoreless']
            parameters += 1
            cards_by_capacity = get_crypt_by_capacity(capacity,
                                                      capacitymoreless)
            match_by_category.append(cards_by_capacity)
    except KeyError:
        pass

    try:
        if request.json['group']:
            parameters += 1
            cards_by_group = get_crypt_by_group(request.json['group'])
            match_by_category.append(cards_by_group)
    except KeyError:
        pass

    try:
        if request.json['set']:
            parameters += 1
            cards_by_set = get_crypt_by_set(request.json['set'])
            match_by_category.append(cards_by_set)
    except KeyError:
        pass

    if parameters == 0:
        abort(400)
    else:
        good_crypt_cards = get_overall_crypt(match_by_category)
        if good_crypt_cards:
            return jsonify(good_crypt_cards)
        else:
            abort(400)


@app.route('/api/search/library', methods=['POST'])
def searchLibraryCards():
    match_by_category = []
    good_library_cards = []
    parameters = 0

    try:
        if request.json['name']:
            parameters += 1
            cards_by_cardname = get_library_by_cardname(request.json['name'])
            match_by_category.append(cards_by_cardname)
    except KeyError:
        pass

    try:
        if request.json['text']:
            parameters += 1
            cards_by_cardtext = get_library_by_cardtext(request.json['text'])
            match_by_category.append(cards_by_cardtext)
    except KeyError:
        pass

    try:
        if request.json['traits']:
            parameters += 1
            cards_by_trait = get_library_by_trait(request.json['traits'])
            match_by_category.append(cards_by_trait)
    except KeyError:
        pass

    try:
        if request.json['type']:
            parameters += 1
            cards_by_cardtype = get_library_by_cardtype(request.json['type'])
            match_by_category.append(cards_by_cardtype)
    except KeyError:
        pass

    try:
        if request.json['discipline']:
            parameters += 1
            cards_by_discipline = get_library_by_discipline(
                request.json['discipline'])
            match_by_category.append(cards_by_discipline)
    except KeyError:
        pass

    try:
        if request.json['title']:
            parameters += 1
            cards_by_title = get_library_by_title(request.json['title'])
            match_by_category.append(cards_by_title)
    except KeyError:
        pass

    try:
        if request.json['sect']:
            parameters += 1
            cards_by_sect = get_library_by_sect(request.json['sect'])
            match_by_category.append(cards_by_sect)
    except KeyError:
        pass

    try:
        if request.json['clan']:
            parameters += 1
            cards_by_clan = get_library_by_clan(request.json['clan'])
            match_by_category.append(cards_by_clan)
    except KeyError:
        pass

    try:
        if request.json['blood']:
            blood = request.json['blood']
            bloodmoreless = request.json['bloodmoreless']
            parameters += 1
            cards_by_blood = get_library_by_blood(blood, bloodmoreless)
            match_by_category.append(cards_by_blood)
    except KeyError:
        pass

    try:
        if request.json['pool']:
            parameters += 1
            pool = request.json['pool']
            poolmoreless = request.json['poolmoreless']
            cards_by_pool = get_library_by_pool(pool, poolmoreless)
            match_by_category.append(cards_by_pool)
    except KeyError:
        pass

    try:
        if request.json['set']:
            parameters += 1
            cards_by_set = get_library_by_set(request.json['set'])
            match_by_category.append(cards_by_set)
    except KeyError:
        pass

    if parameters == 0:
        abort(400)
    else:
        good_library_cards = get_overall_library(match_by_category)
        if good_library_cards:
            return jsonify(good_library_cards)
        else:
            abort(400)
