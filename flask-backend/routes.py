from flask import jsonify, request, abort, Response
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
import uuid
import json
from random import random

from searchTwd import searchTwd
from searchTwdComponents import sanitizeTwd
from searchTwdComponents import matchInventory
from searchCrypt import searchCrypt
from searchLibrary import searchLibrary
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id
from deckExport import deckExport
from deckExportAll import deckExportAll
from deckImport import deckImport
from deckProxy import deckProxy
from inventoryExport import inventoryExport
from inventoryImport import inventoryImport
from api import app
from api import login
from api import db
from models import User
from models import Deck

@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({'Not logged in': True}), 401)

@app.route('/api/inventory', methods=['GET'])
@login_required
def listInventory():
    crypt = {}
    library = {}
    if current_user.inventory:
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


@app.route('/api/inventory/export', methods=['POST'])
def inventoryExportRoute():
    try:
        inventory = {
            'cards': current_user.inventory,
            'author': current_user.public_name,
        }
        result = inventoryExport(inventory, request.json['format'])

        if request.json['format'] == 'xlsx' or request.json['format'] == 'csv':
            return result
        else:
            return jsonify(result)

    except Exception:
        pass


@app.route('/api/inventory/import', methods=['POST'])
@login_required
def inventoryImportRoute():
    i = current_user.inventory
    try:
        new_cards = inventoryImport(request.json)
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            if k not in merged_cards:
                merged_cards[k] = v
            else:
                merged_cards[k] = merged_cards[k] + v

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify(new_cards)

    except Exception:
        return jsonify("error")


@app.route('/api/inventory/delete', methods=['GET'])
@login_required
def deleteInventory():
    current_user.inventory = {}
    db.session.commit()
    return jsonify({'delete inventory': 'success'})


@app.route('/api/inventory/add', methods=['POST'])
@login_required
def inventoryAddCard():
    i = current_user.inventory
    try:
        new_cards = request.json
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            if k not in merged_cards:
                merged_cards[k] = v
            else:
                merged_cards[k] = merged_cards[k] + v

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify({'inventory card added': 'success'})

    except Exception:
        pass


@app.route('/api/inventory/del', methods=['POST'])
@login_required
def inventoryDelCard():
    i = current_user.inventory
    try:
        new_cards = request.json
        merged_cards = i.copy() if i else {}
        for k, v in new_cards.items():
            if k in merged_cards:
                if merged_cards[k] > v:
                    merged_cards[k] = merged_cards[k] - v
                else:
                    del merged_cards[k]

        current_user.inventory = merged_cards.copy()
        db.session.commit()
        return jsonify({'inventory card deleted': 'success'})

    except Exception:
        pass


@app.route('/api/inventory/change', methods=['POST'])
@login_required
def inventoryChangeCard():
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
        db.session.commit()
        return jsonify({'inventory card change': 'success'})

    except Exception:
        pass


@app.route('/api/deck/<string:deckid>', methods=['GET'])
def showDeck(deckid):
    if len(deckid) == 32:
        decks = {}

        deck = Deck.query.filter_by(deckid=deckid).first()
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

    else:
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            try:
                deck = twdDecks[deckid]
                comments = deck['description']
                deck['description'] = 'Date: ' + deck['date'] + '\n'
                deck['description'] += 'Players: ' + str(
                    deck['players']) + '\n'
                deck['description'] += 'Event: ' + deck['event'] + '\n'
                deck['description'] += 'Location: ' + deck['location'] + '\n'
                if comments:
                    deck['description'] += '\n' + comments

                deck['author'] = deck['player']
                del (deck['player'])
                del (deck['disciplines'])
                del (deck['format'])
                del (deck['event'])
                del (deck['link'])
                del (deck['location'])
                del (deck['players'])
                del (deck['timestamp'])
                del (deck['score'])
                del (deck['cardtypes_ratio'])
                del (deck['libraryTotal'])

                return jsonify(deck)

            except KeyError:
                abort(400)


@app.route('/api/deck/<string:deckid>', methods=['PUT'])
@login_required
def updateDeck(deckid):
    d = Deck.query.filter_by(author=current_user, deckid=deckid).first()
    d.timestamp = datetime.utcnow()
    try:
        if 'cardChange' in request.json:
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
        if 'cardAdd' in request.json:
            new_cards = request.json['cardAdd']
            merged_cards = d.cards.copy()
            for k, v in new_cards.items():
                if k not in merged_cards:
                    merged_cards[k] = v

            d.cards = merged_cards.copy()
    except Exception:
        pass

    try:
        if 'name' in request.json:
            d.name = request.json['name']

            if d.master:
                master = Deck.query.filter_by(author=current_user,
                                                deckid=d.master).first()
                master.name = request.json['name']

                for i in master.branches:
                    j = Deck.query.filter_by(author=current_user,
                                                deckid=i).first()
                    j.name = request.json['name']

            elif d.branches:
                for i in d.branches:
                    j = Deck.query.filter_by(author=current_user,
                                                deckid=i).first()
                    j.name = request.json['name']

    except Exception:
        pass

    try:
        if 'hidden' in request.json:
            d.hidden = request.json['hidden']

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

            if d.master:
                master = Deck.query.filter_by(author=current_user,
                                                deckid=d.master).first()
                master.author_public_name = request.json['author']

                for i in master.branches:
                    j = Deck.query.filter_by(author=current_user,
                                                deckid=i).first()
                    j.author_public_name = request.json['author']

            elif d.branches:
                for i in d.branches:
                    j = Deck.query.filter_by(author=current_user,
                                                deckid=i).first()
                    j.author_public_name = request.json['author']

    except Exception:
        pass

    try:
        if 'branchName' in request.json:
            d.branch_name = request.json['branchName'] or ''
    except Exception:
        pass

    try:
        if 'makeFlexible' in request.json:
            if request.json['makeFlexible'] == 'all':
                d.used_in_inventory = {}
                d.inventory_type = 's'
            else:
                r = str(request.json['makeFlexible'])
                used = d.used_in_inventory.copy()
                used[r] = 's'
                d.used_in_inventory = used
    except Exception:
        pass

    try:
        if 'makeFixed' in request.json:
            if request.json['makeFixed'] == 'all':
                d.used_in_inventory = {}
                d.inventory_type = 'h'
            else:
                r = str(request.json['makeFixed'])
                used = d.used_in_inventory.copy()
                used[r] = 'h'
                d.used_in_inventory = used
    except Exception:
        pass

    try:
        if 'makeClear' in request.json:
            if request.json['makeClear'] == 'all':
                d.used_in_inventory = {}
                d.inventory_type = ''
            else:
                r = str(request.json['makeClear'])
                used = d.used_in_inventory.copy()
                del (used[r])
                d.used_in_inventory = used
    except Exception:
        pass

    try:
        if 'setTags' in request.json:
            new_tags = request.json['setTags']
            d.tags = new_tags
    except Exception:
        pass

    if d.master:
        old_master = Deck.query.filter_by(author=current_user,
                                            deckid=d.master).first()
        branches = old_master.branches.copy()
        branches.remove(d.deckid)
        branches.append(old_master.deckid)
        d.branches = branches
        d.master = None
        old_master.branches = None
        for b in branches:
            branch_deck = Deck.query.filter_by(author=current_user,
                                                deckid=b).first()
            branch_deck.master = d.deckid

    db.session.commit()

    return jsonify({'updated deck': d.deckid})


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

        decks = {}
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
            decks['deckInUrl']['name'] = request.json['name']
        if 'author' in request.json:
            decks['deckInUrl']['author'] = request.json['author']
        if 'description' in request.json:
            decks['deckInUrl']['description'] = request.json['description']

        return jsonify(decks)

    except AttributeError:
        return jsonify({'error': 'not logged'})


@app.route('/api/decks', methods=['GET'])
def listDecks():
    try:
        decks = {}
        for deck in current_user.decks.all():
            # Fix bad imports
            if 'undefined' in deck.cards:
                print(deck.deckid, 'del undefined cards')
                new_cards = deck.cards.copy()
                del new_cards['undefined']
                deck.cards = new_cards
                db.session.commit()

            # Fix masters / branches
            if deck.master:
                d = Deck.query.filter_by(author=current_user,
                                         deckid=deck.master).first()
                if not d:
                    print(deck.deckid, 'delete branch without master')
                    db.session.delete(deck)
                    db.session.commit()

            if deck.branches:
                for b in deck.branches:
                    d = Deck.query.filter_by(author=current_user,
                                             deckid=b).first()

                    if not d:
                        print(b, 'delete not-existing branch')
                        old_branches = deck.branches.copy()
                        old_branches.remove(b)
                        deck.branches = old_branches
                        db.session.commit()

                for b in deck.branches:
                    d = Deck.query.filter_by(author=current_user,
                                             deckid=b).first()

                    if not d.master:
                        print(b, 'add master to branch without master')
                        d.master = deck.deckid
                        db.session.commit()

                    if d.master and d.master != deck.deckid:
                        print(b, 'delete branch with other master')
                        old_branches = deck.branches.copy()
                        old_branches.remove(b)
                        deck.branches = old_branches
                        db.session.commit()

            # Return decks

            crypt = {}
            library = {}

            for k, v in deck.cards.items():

                int_k = int(k)

                if int_k > 200000:
                    crypt[int_k] = {'q': v}
                    if k in deck.used_in_inventory:
                        crypt[int_k]['i'] = deck.used_in_inventory[k]

                elif int_k < 200000:
                    library[int_k] = {'q': v}
                    if k in deck.used_in_inventory:
                        library[int_k]['i'] = deck.used_in_inventory[k]

            decks[deck.deckid] = {
                'name': deck.name,
                'branchName': deck.branch_name,
                'owner': deck.author.username,
                'author': deck.author_public_name,
                'description': deck.description,
                'crypt': crypt,
                'library': library,
                'deckid': deck.deckid,
                'hidden': deck.hidden,
                'inventory_type': deck.inventory_type,
                'timestamp': deck.timestamp,
                'master': deck.master,
                'branches': deck.branches,
                'tags': deck.tags,
            }

        return jsonify(decks)

    except AttributeError:
        return jsonify({'error': 'not logged'})


@app.route('/api/decks/create', methods=['POST'])
@login_required
def newDeck():
    try:
        deckid = uuid.uuid4().hex
        author = request.json[
            'author'] if 'author' in request.json else current_user.public_name
        description = request.json[
            'description'] if 'description' in request.json else ''
        cards = request.json['cards'] if 'cards' in request.json else {}

        d = Deck(deckid=deckid,
                    name=request.json['deckname'],
                    author_public_name=author,
                    description=description,
                    author=current_user,
                    cards=cards)

        db.session.add(d)
        db.session.commit()

        return jsonify({
            'new deck created': request.json['deckname'],
            'deckid': deckid,
        })
    except Exception:
        pass


@app.route('/api/branch/create', methods=['POST'])
@login_required
def createBranch():
    master = Deck.query.filter_by(author=current_user,
                                    deckid=request.json['master']).first()
    source = Deck.query.filter_by(author=current_user,
                                    deckid=request.json['source']).first()
    branch_name = f"#{len(master.branches) + 1}" if master.branches else "#1"

    deckid = uuid.uuid4().hex
    branch = Deck(deckid=deckid,
                    name=master.name,
                    branch_name=branch_name,
                    author_public_name=source.author_public_name,
                    description=source.description,
                    author=current_user,
                    tags=source.tags,
                    master=master.deckid,
                    cards=source.cards)

    branches = master.branches.copy() if master.branches else []
    branches.append(deckid)
    master.branches = branches

    db.session.add(branch)
    db.session.commit()
    return jsonify({
        'master': master.deckid,
        'source': source.deckid,
        'deckid': deckid,
    })


@app.route('/api/branch/import', methods=['POST'])
@login_required
def importBranch():
    master = Deck.query.filter_by(author=current_user,
                                    deckid=request.json['master']).first()
    new_branches = request.json['branches']
    branches = []

    for i, b in enumerate(new_branches):
        deckid = uuid.uuid4().hex
        description = master.description
        if b['comments']:
            if description:
                description += '\n\n'
            description += f"{b['comments']}"

        branch = Deck(deckid=deckid,
                        name=master.name,
                        branch_name = f"#{len(new_branches) - 1 - i}",
                        author_public_name=master.author_public_name,
                        description=description,
                        author=current_user,
                        tags=master.tags,
                        master=master.deckid,
                        cards=b['cards'])

        branches.append(deckid)

        db.session.add(branch)

    master.branch_name = f"#{len(new_branches)}"
    master.branches = branches
    db.session.commit()

    return jsonify({
        'deckids': master.branches,
    })


@app.route('/api/branch/remove', methods=['POST'])
@login_required
def removeBranch():
    try:
        d = Deck.query.filter_by(author=current_user,
                                    deckid=request.json['deckid']).first()
        if d.master:
            master = Deck.query.filter_by(author=current_user,
                                            deckid=d.master).first()

            branches = master.branches.copy()
            branches.remove(d.deckid)
            master.branches = branches

            db.session.delete(d)
            db.session.commit()
            return jsonify({'branch removed': request.json['deckid']})

        else:
            j = Deck.query.filter_by(author=current_user,
                                        deckid=d.branches[-1]).first()

            branches = d.branches.copy()
            branches.remove(j.deckid)
            j.branches = branches
            for i in branches:
                k = Deck.query.filter_by(author=current_user,
                                            deckid=i).first()
                k.master = j.deckid

            j.master = ''

            db.session.delete(d)
            db.session.commit()
            return jsonify({'branch removed': request.json['deckid']})

    except Exception:
        return jsonify({'error': 'idk'})


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

    elif request.json['src'] == 'twd':
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            deck = twdDecks[request.json['target']]
            cards = {}
            for i in deck['crypt']:
                cards[i] = deck['crypt'][i]['q']
            for i in deck['library']:
                cards[i] = deck['library'][i]['q']

            description = 'Date: ' + deck['date'] + '\n'
            description += 'Players: ' + str(deck['players']) + '\n'
            description += 'Event: ' + deck['event'] + '\n'
            description += 'Location: ' + deck['location'] + '\n'
            if deck['description']:
                description += '\n' + deck['description']

            deckid = uuid.uuid4().hex
            d = Deck(deckid=deckid,
                     name=f"{deck['name']} [by {deck['player']}]",
                     author_public_name=deck['player'],
                     description=description,
                     author=current_user,
                     tags=['twd'],
                     cards=cards)
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'deck cloned': request.json['deckname'],
                'deckid': deckid
            })

    elif request.json['src'] == 'precons':
        set, precon = request.json['target'].split(':')

        with open("preconDecks.json", "r") as precons_file:
            precon_decks = json.load(precons_file)
            deck = precon_decks[set][precon]

            cards = {}
            for i in deck:
                cards[i] = deck[i]

            deckid = uuid.uuid4().hex
            d = Deck(deckid=deckid,
                     name=f"Preconstructed {set}:{precon}",
                     author_public_name='VTES Team',
                     description='',
                     author=current_user,
                     tags=['precon'],
                     cards=cards)
            db.session.add(d)
            db.session.commit()
            return jsonify({
                'deck cloned': request.json['deckname'],
                'deckid': deckid
            })

    else:
        targetDeck = Deck.query.filter_by(
            deckid=request.json['target']).first()
        deckid = uuid.uuid4().hex
        d = Deck(deckid=deckid,
                 name=request.json['deckname'],
                 author_public_name=request.json['author'],
                 description='',
                 author=current_user,
                 tags=targetDeck.tags,
                 cards=targetDeck.cards)
        db.session.add(d)
        db.session.commit()
        return jsonify({
            'deck cloned': request.json['deckname'],
            'deckid': deckid,
        })


@app.route('/api/decks/urlclone', methods=['POST'])
def urlCloneDeck():
    print('url clone: ', request.json['target'])
    targetDeck = Deck.query.filter_by(deckid=request.json['target']).first()
    deckid = uuid.uuid4().hex
    d = Deck(deckid=deckid,
             name=targetDeck.name,
             author_public_name=targetDeck.author_public_name,
             description=targetDeck.description,
             cards=targetDeck.cards)
    db.session.add(d)
    db.session.commit()
    return jsonify({
        'deckid': deckid,
    })


@app.route('/api/decks/import', methods=['POST'])
@login_required
def importDeck():
    try:
        [name, author, description,
            cards] = deckImport(request.json['deckText'])
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


@app.route('/api/decks/export', methods=['POST'])
def deckExportRoute():
    try:
        result = None
        if request.json['deckid'] == 'all' and current_user.is_authenticated:
            decks = Deck.query.filter_by(author=current_user).all()
            result = deckExportAll(decks, request.json['format'])

        elif request.json['src'] == 'twd':
            deckid = request.json['deckid']
            with open("twdDecksById.json", "r") as twdDecks_file:
                twdDecks = json.load(twdDecks_file)
                deck = twdDecks[deckid]
                comments = deck['description']
                deck['description'] = 'Date: ' + deck['date'] + '\n'
                deck['description'] += 'Players: ' + str(
                    deck['players']) + '\n'
                deck['description'] += 'Event: ' + deck['event'] + '\n'
                deck['description'] += 'Location: ' + deck['location'] + '\n'
                deck['cards'] = {}
                for i in deck['crypt']:
                    deck['cards'][i] = deck['crypt'][i]['q']
                for i in deck['library']:
                    deck['cards'][i] = deck['library'][i]['q']
                if comments:
                    deck['description'] += '\n' + comments
                deck['author'] = deck['player']
                result = deckExport(deck, request.json['format'])

        elif request.json['src'] == 'precons':
            set, precon = request.json['deckid'].split(':')
            with open("preconDecks.json", "r") as precons_file:
                precon_decks = json.load(precons_file)
                d = precon_decks[set][precon]
                deck = {
                    'cards': d,
                    'name': f"Preconstructed {set}:{precon}",
                    'author': 'VTES Publisher',
                    'description': 'Preconstructed deck',
                }
                result = deckExport(deck, request.json['format'])

        elif request.json['src'] == 'shared':
            deck = request.json['deck']
            result = deckExport(deck, request.json['format'])

        elif request.json['src'] == 'my':
            d = Deck.query.filter_by(deckid=request.json['deckid']).first()
            deck = {
                'cards': d.cards,
                'name': d.name,
                'author': d.author_public_name,
                'branch_name': d.branch_name,
                'description': d.description,
            }
            result = deckExport(deck, request.json['format'])

        if (request.json['format'] == 'xlsx'
                or request.json['format'] == 'csv'):
            return result
        else:
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
@login_required
def removeDeck():
    try:
        d = Deck.query.filter_by(author=current_user,
                                    deckid=request.json['deckid']).first()
        if d.branches:
            for i in d.branches:
                j = Deck.query.filter_by(author=current_user,
                                            deckid=i).first()
                db.session.delete(j)

        if d.master:
            j = Deck.query.filter_by(author=current_user,
                                        deckid=d.master).first()
            db.session.delete(j)

        db.session.delete(d)
        db.session.commit()
        return jsonify({'deck removed': request.json['deckid']})
    except Exception:
        return jsonify({'error': 'idk'})


@app.route('/api/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return jsonify({'already logged as:': current_user.username})

    try:
        user = User(
            username=request.json['username'].lower(),
            public_name=request.json['username'],
        )
        user.set_password(request.json['password'])
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify({'registered as': user.username})
    except Exception:
        abort(400)


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
                username=request.json['username'].lower()).first()
            if user is None or not user.check_password(
                    request.json['password']):
                return jsonify({'error': 'invalid username or password'}), 401
            login_user(user, remember=request.json['remember'])
            return jsonify({
                'username': current_user.username,
                'email': current_user.email,
                'public_name': current_user.public_name,
            })
        except KeyError:
            pass


@app.route('/api/account', methods=['POST'])
@login_required
def account():
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


@app.route('/api/account/remove', methods=['POST'])
@login_required
def removeAccount():
    if current_user.check_password(
            request.json['password']):
        try:
            db.session.delete(current_user)
            db.session.commit()
            return jsonify({'account removed': current_user.username})
        except Exception:
            pass
    else:
        return jsonify({'Wrong password.'})


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


@app.route('/api/search/quick', methods=['POST'])
def searchQuickRoute():
    result = []

    crypt = searchCrypt(request)
    if crypt != 400:
        result += crypt

    library = searchLibrary(request)
    if library != 400:
        result += library

    if result:
        return jsonify(result)
    else:
        abort(400)
