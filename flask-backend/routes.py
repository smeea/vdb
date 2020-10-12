from flask import jsonify, request, abort
from flask_login import current_user, login_user, logout_user
from datetime import datetime
import uuid
import re

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
from deck_parse_import import deck_parse_import
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
                new_cards = request.json['add']
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
            cards = deck_parse_import(request.json['deckText'])
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
def exportDeck():
    try:
        d = Deck.query.filter_by(deckid=request.json['deckid']).first()
        crypt = {}
        library = {}
        for k, v in d.cards.items():
            k = int(k)
            if k > 200000 and v > 0:
                crypt[k] = {'c': get_crypt_by_id(k), 'q': v}
            elif k < 200000 and v > 0:
                library[k] = {'c': get_library_by_id(k), 'q': v}

        deck = ''

        if request.json['format'] == 'lackey':
            for k, v in library.items():
                deck += str(v['q'])
                if v['q'] < 10:
                    deck += '       '
                else:
                    deck += '      '

                deck += v['c']['Name'] + '\n'

            deck += 'Crypt:\n'

            for k, v in crypt.items():
                deck += str(v['q'])
                if v['q'] < 10:
                    deck += '       '
                else:
                    deck += '      '

                deck += v['c']['Name'] + '\n'

        elif request.json['format'] == 'text' or request.json[
                'format'] == 'twd':
            format = request.json['format']

            disciplinesList = {
                'Auspex': 'aus',
                'Abombwe': 'abo',
                'Animalism': 'ani',
                'Celerity': 'cel',
                'Chimerstry': 'chi',
                'Daimoinon': 'dai',
                'Dementation': 'dem',
                'Dominate': 'dom',
                'Fortitude': 'for',
                'Melpominee': 'mel',
                'Mytherceria': 'myt',
                'Necromancy': 'nec',
                'Obeah': 'obe',
                'Obfuscate': 'obf',
                'Obtenebration': 'obt',
                'Potence': 'pot',
                'Presence': 'pre',
                'Protean': 'pro',
                'Serpentis': 'ser',
                'Sanguinus': 'san',
                'Spiritus': 'spi',
                'Temporis': 'tem',
                'Thanatosis': 'thn',
                'Thaumaturgy': 'tha',
                'Quietus': 'qui',
                'Valeren': 'val',
                'Vicissitude': 'vic',
                'Visceratika': 'vis',
                'Defense': 'def',
                'Innocence': 'inn',
                'Judgment': 'jud',
                'Martyrdom': 'mar',
                'Redemption': 'red',
                'Vengeance': 'ven',
                'Vision': 'vis',
            }

            byType = {}
            byTypeTotal = {}

            libraryTotal = 0

            for k, v in library.items():
                libraryTotal += v['q']
                cardType = v['c']['Type']
                cardName = v['c']['Name']
                if cardType not in byType:
                    byType[cardType] = {}
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] = v['q']
                else:
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] += v['q']

            cryptTotalCap = 0
            capacityList = []

            for k, v in crypt.items():
                cryptTotalCap += v['c']['Capacity'] * v['q']
                for x in range(v['q']):
                    capacityList.append(v['c']['Capacity'])

            cryptTotalCards = len(capacityList)
            cryptAvg = cryptTotalCap / cryptTotalCards

            cryptMin = 0
            cryptMax = 0
            capacityList.sort()
            for i in range(4):
                cryptMin += capacityList[i]
                cryptMax += capacityList[-i - 1]

            deck += 'Deck Name: ' + d.name + '\n'
            deck += 'Author: ' + d.author.public_name + '\n'
            deck += 'Description: ' + d.description + '\n'
            deck += '\n'

            cryptTitle = 'Crypt (' + str(
                cryptTotalCards) + ' cards, min=' + str(
                    cryptMin) + ' max=' + str(cryptMax) + ' avg=' + str(
                        round(cryptAvg, 2)) + ')\n'

            if format == 'twd':
                cryptSub = re.sub('.', '-', cryptTitle)
            elif format == 'text':
                cryptSub = re.sub('.', '=', cryptTitle)

            deck += cryptTitle
            deck += cryptSub

            cryptExport = {}
            longestQuantity = 0
            longestName = 0
            longestTitle = 0
            longestCapacity = 0
            longestDisciplines = 0

            for k, v in crypt.items():
                baseDisciplines = []
                supDisciplines = []
                for i, j in v['c']['Disciplines'].items():
                    if j == 1:
                        baseDisciplines.append(disciplinesList[i].lower())
                    elif j == 2:
                        supDisciplines.append(disciplinesList[i].upper())

                disciplines = ' '.join(baseDisciplines + supDisciplines)

                cryptExport[v['c']['Name']] = {
                    'Quantity': v['q'],
                    'Disciplines': disciplines,
                    'Title': v['c']['Title'],
                    'Clan': v['c']['Clan'],
                    'Capacity': v['c']['Capacity'],
                    'Group': v['c']['Group']
                }

                if len(str(v['q'])) > longestQuantity:
                    longestQuantity = len(str(v['q']))
                if len(v['c']['Name']) > longestName:
                    longestName = len(v['c']['Name'])
                if len(v['c']['Title']) > longestTitle:
                    longestTitle = len(v['c']['Title'])
                if len(str(v['c']['Capacity'])) > longestCapacity:
                    longestCapacity = len(str(v['c']['Capacity']))
                if len(disciplines) > longestDisciplines:
                    longestDisciplines = len(disciplines)

            for k, v in cryptExport.items():
                quantitySpaces = longestQuantity - len(str(v['Quantity']))

                nameSpaces = longestName - len(k) + 2
                disSpaces = longestDisciplines - len(v['Disciplines']) + 2

                capacitySpaces = longestCapacity - len(str(v['Capacity']))
                titleSpaces = longestTitle - len(v['Title']) + 2

                deck += ' ' * quantitySpaces + str(v['Quantity']) + 'x '
                deck += k + ' ' * nameSpaces
                deck += ' ' * capacitySpaces + str(v['Capacity']) + '  '
                deck += v['Disciplines'] + ' ' * disSpaces
                deck += v['Title'] + ' ' * titleSpaces
                deck += v['Clan'] + ':' + v['Group'] + '\n'

            deck += '\n'

            byTypeOrder = [
                'Master',
                'Conviction',
                'Action',
                'Action/Reaction',
                'Action/Combat',
                'Ally',
                'Equipment',
                'Political Action',
                'Retainer',
                'Power',
                'Action Modifier',
                'Action Modifier/Combat',
                'Action Modifier/Reaction',
                'Reaction',
                'Reaction/Action Modifier',
                'Reaction/Combat',
                'Combat',
                'Combat/Action Modifier',
                'Combat/Reaction',
                'Event',
            ]

            libraryTitle = 'Library (' + str(libraryTotal) + ' cards)\n'
            deck += libraryTitle

            if format == 'text':
                librarySub = re.sub('.', '=', libraryTitle)
                deck += librarySub

            for i in byTypeOrder:
                if i in byType:
                    typeTitle = i + ' (' + str(byTypeTotal[i]) + ')\n'
                    deck += typeTitle
                    if format == 'text':
                        typeSub = re.sub('.', '-', typeTitle)
                        deck += typeSub

                    for k, v in byType[i].items():
                        deck += str(v) + 'x ' + k + '\n'

                    deck += '\n'

        return jsonify({
            'name': d.name,
            'format': request.json['format'],
            'deck': deck
        })

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
