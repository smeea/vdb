from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
from datetime import date, datetime, timedelta
import uuid
import json

from deck_export import deck_export
from deck_export_all import deck_export_all
from deck_import import deck_import
from deck_proxy import deck_proxy
from deck_recommendation import deck_recommendation
from api import app, db, login
from models import Deck


def parse_user_decks(user_decks):
    decks = {}
    for deck in user_decks:
        if deck.public_parent:
            continue

        # Fix bad imports
        if "undefined" in deck.cards:
            print(deck.deckid, "del undefined cards")
            new_cards = deck.cards.copy()
            del new_cards["undefined"]
            deck.cards = new_cards
            db.session.commit()

        # Fix masters / branches
        if deck.master:
            d = Deck.query.get(deck.master)
            if not d:
                print(deck.deckid, "delete branch without master")
                db.session.delete(deck)
                db.session.commit()

        if deck.branches:
            for b in deck.branches:
                d = Deck.query.get(b)

                if not d:
                    print(b, "delete not-existing branch")
                    old_branches = deck.branches.copy()
                    old_branches.remove(b)
                    deck.branches = old_branches
                    db.session.commit()

            for b in deck.branches:
                d = Deck.query.get(b)

                if not d.master:
                    print(b, "add master to branch without master")
                    d.master = deck.deckid
                    db.session.commit()

                if d.master and d.master != deck.deckid:
                    print(b, "delete branch with other master")
                    old_branches = deck.branches.copy()
                    old_branches.remove(b)
                    deck.branches = old_branches
                    db.session.commit()

        # Return decks

        decks[deck.deckid] = {
            "name": deck.name,
            "branchName": deck.branch_name,
            "owner": deck.author.username,
            "author": deck.author_public_name,
            "description": deck.description,
            "cards": deck.cards,
            "used_in_inventory": deck.used_in_inventory,
            "deckid": deck.deckid,
            "hidden": deck.hidden,
            "inventory_type": deck.inventory_type,
            "timestamp": deck.timestamp,
            "master": deck.master,
            "branches": deck.branches,
            "tags": deck.tags,
            "public_child": deck.public_child,
        }

    return decks


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({"Not logged in": True}), 401)


@app.route("/api/deck/<string:deckid>", methods=["GET"])
def showDeck(deckid):
    if len(deckid) == 32:
        deck = Deck.query.get(deckid)
        if not deck:
            abort(400)

        deck = {
            "name": deck.name,
            "owner": deck.author.username if deck.author else None,
            "author": deck.author_public_name,
            "description": deck.description,
            "cards": deck.cards,
            "deckid": deck.deckid,
            "timestamp": deck.timestamp,
            "tags": deck.tags,
            "public_child": deck.public_child,
            "public_parent": deck.public_parent,
            "favorited": deck.favorited,
        }

        return jsonify(deck)

    else:
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            try:
                deck = twdDecks[deckid]
                comments = deck["description"]
                deck["description"] = "Date: " + deck["creation_date"] + "\n"
                deck["description"] += "Players: " + str(deck["players"]) + "\n"
                deck["description"] += "Event: " + deck["event"] + "\n"
                deck["description"] += "Location: " + deck["location"] + "\n"
                if comments:
                    deck["description"] += "\n" + comments

                del deck["disciplines"]
                del deck["format"]
                del deck["event"]
                del deck["link"]
                del deck["location"]
                del deck["players"]
                del deck["score"]
                del deck["traits"]
                del deck["clan"]
                del deck["capacity"]
                del deck["cardtypes_ratio"]
                del deck["crypt_total"]
                del deck["library_total"]

                return jsonify(deck)

            except KeyError:
                abort(400)


@app.route("/api/deck/<string:deckid>/recommendation", methods=["GET"])
def getRecommendation(deckid):
    cards = {}

    if len(deckid) == 32:
        deck = Deck.query.get(deckid)
        cards = deck.cards

    elif ":" in deckid:
        set, precon = deckid.split(":")

        with open("preconDecks.json", "r") as precons_file:
            precon_decks = json.load(precons_file)
            cards = precon_decks[set][precon]

    else:
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)
            cards = twdDecks[deckid]["cards"]

    recommends = deck_recommendation(cards)

    return {"crypt": recommends["crypt"], "library": recommends["library"]}


@app.route("/api/deck/<string:deckid>", methods=["PUT"])
@login_required
def updateDeck(deckid):
    d = Deck.query.get(deckid)
    if not d:
        print("bad deck request\n", deckid, current_user.username, request.json)
        return jsonify({"error": "no deck"})
    elif not d.author:
        # For newly anonymous imported decks to fix bad imports
        accepted_past = datetime.utcnow() - timedelta(minutes=5)
        if d.timestamp < accepted_past:
            abort(401)
    elif d.author != current_user:
        abort(401)

    if "hidden" in request.json:
        d.hidden = request.json["hidden"]
    else:
        d.timestamp = datetime.utcnow()

    if "cardChange" in request.json:
        new_cards = request.json["cardChange"]
        merged_cards = d.cards.copy()

        for k, v in new_cards.items():
            k = int(k)
            if v < 0:
                del merged_cards[k]
            else:
                merged_cards[k] = v

        d.cards = merged_cards.copy()

    if "cardAdd" in request.json:
        new_cards = request.json["cardAdd"]
        merged_cards = d.cards.copy()
        for k, v in new_cards.items():
            k = int(k)
            if k not in merged_cards:
                merged_cards[k] = v

        d.cards = merged_cards.copy()

    if "name" in request.json:
        d.name = request.json["name"]

        if d.master:
            master = Deck.query.get(d.master)
            master.name = request.json["name"]

            for i in master.branches:
                j = Deck.query.get(i)
                j.name = request.json["name"]

        elif d.branches:
            for i in d.branches:
                j = Deck.query.get(i)
                j.name = request.json["name"]

    if "description" in request.json:
        d.description = request.json["description"]

    if "author" in request.json:
        d.author_public_name = request.json["author"] or ""

        if d.master:
            master = Deck.query.get(d.master)
            master.author_public_name = request.json["author"]

            for i in master.branches:
                j = Deck.query.get(i)
                j.author_public_name = request.json["author"]

        elif d.branches:
            for i in d.branches:
                j = Deck.query.get(i)
                j.author_public_name = request.json["author"]

    if "branchName" in request.json:
        d.branch_name = request.json["branchName"] or ""

    if "inventory_type" in request.json:
        d.used_in_inventory = {}
        d.inventory_type = request.json["inventory_type"]

    if "used_in_inventory" in request.json:
        used = d.used_in_inventory.copy()
        for k, v in request.json["used_in_inventory"].items():
            used[int(k)] = v

        d.used_in_inventory = used

    if "tags" in request.json:
        d.tags = request.json["tags"]

    if d.master:
        old_master = Deck.query.get(d.master)
        branches = old_master.branches.copy()
        branches.remove(d.deckid)
        branches.append(old_master.deckid)
        d.branches = branches
        d.master = None
        old_master.branches = None
        for b in branches:
            branch_deck = Deck.query.get(b)
            branch_deck.master = d.deckid

    db.session.commit()

    return jsonify({"updated deck": d.deckid})


# DEPRECATED (LEFT FOR BACKWARD COMPATIBILITY AND 3RD PARTY TOOLS)
@app.route("/api/decks", methods=["GET"])
def listDecks():
    try:
        decks = parse_user_decks(current_user.decks.all())
        return jsonify(decks)

    except AttributeError:
        return jsonify({"error": "not logged"})


@app.route("/api/decks/create", methods=["POST"])
@login_required
def newDeck():
    try:
        deckid = uuid.uuid4().hex
        author = (
            request.json["author"]
            if "author" in request.json
            else current_user.public_name
        )
        description = (
            request.json["description"] if "description" in request.json else ""
        )
        input_cards = request.json["cards"] if "cards" in request.json else {}
        cards = {}

        for k, v in input_cards.items():
            cards[int(k)] = v

        d = Deck(
            deckid=deckid,
            name=request.json["deckname"],
            author_public_name=author,
            creation_date=date.today().strftime("%Y-%m-%d"),
            description=description,
            author=current_user,
            cards=cards,
        )

        db.session.add(d)
        db.session.commit()

        return jsonify(
            {
                "timestamp": d.timestamp,
                "deckid": d.deckid,
                "name": d.name,
                "owner": d.author.username,
                "author": d.author_public_name,
                "description": d.description,
                "cards": d.cards,
            }
        )

    except Exception:
        print(request.json)


@app.route("/api/branch/create", methods=["POST"])
@login_required
def createBranch():
    master = Deck.query.get(request.json["master"])
    if master.author != current_user:
        abort(401)

    source = Deck.query.get(request.json["source"])
    branch_name = f"#{len(master.branches) + 1}" if master.branches else "#1"

    deckid = uuid.uuid4().hex
    branch = Deck(
        deckid=deckid,
        name=master.name,
        branch_name=branch_name,
        author_public_name=source.author_public_name,
        description=source.description,
        author=current_user,
        tags=source.tags,
        master=master.deckid,
        cards=source.cards,
    )

    branches = master.branches.copy() if master.branches else []
    branches.append(deckid)
    master.branches = branches

    db.session.add(branch)
    db.session.commit()
    return jsonify(
        {
            "master": master.deckid,
            "source": source.deckid,
            "deckid": deckid,
            "branch_name": branch_name,
        }
    )


@app.route("/api/branch/import", methods=["POST"])
@login_required
def importBranch():
    master = Deck.query.get(request.json["master"])
    if master.author != current_user:
        abort(401)

    new_branches = request.json["branches"]
    branches = []

    for i, b in enumerate(new_branches):
        deckid = uuid.uuid4().hex
        description = master.description
        if b["comments"]:
            if description:
                description += "\n\n"
            description += f"{b['comments']}"

        input_cards = b["cards"] if "cards" in b else {}
        cards = {}

        for k, v in input_cards.items():
            cards[int(k)] = v

        branch = Deck(
            deckid=deckid,
            name=master.name,
            branch_name=f"#{len(new_branches) - 1 - i}",
            author_public_name=master.author_public_name,
            description=description,
            author=current_user,
            tags=master.tags,
            master=master.deckid,
            cards=cards,
        )

        branches.append(deckid)

        db.session.add(branch)

    master.branch_name = f"#{len(new_branches)}"
    master.branches = branches
    db.session.commit()

    return jsonify(
        {
            "deckids": master.branches,
        }
    )


@app.route("/api/branch/remove", methods=["POST"])
@login_required
def removeBranch():
    d = Deck.query.get(request.json["deckid"])
    if d.author != current_user:
        abort(401)

    if d.master:
        master = Deck.query.get(d.master)

        branches = master.branches.copy()
        branches.remove(d.deckid)
        master.branches = branches

    else:
        j = Deck.query.get(d.branches[-1])

        branches = d.branches.copy()
        branches.remove(j.deckid)
        j.branches = branches
        for i in branches:
            k = Deck.query.get(i)
            k.master = j.deckid

        j.master = ""

    db.session.delete(d)
    db.session.commit()
    return jsonify({"deckid": request.json["deckid"]})


@app.route("/api/decks/clone", methods=["POST"])
def cloneDeck():
    if "deck" in request.json:
        deck = request.json["deck"]
        cards = {}

        for i in deck["crypt"]:
            cards[int(i)] = deck["crypt"][i]["q"]
        for i in deck["library"]:
            cards[int(i)] = deck["library"][i]["q"]

        deckid = uuid.uuid4().hex
        d = Deck(
            deckid=deckid,
            name=f"{deck['name']} [by {deck['author']}]",
            author_public_name=deck["author"],
            description=deck["description"],
            author=current_user,
            cards=cards,
        )
        db.session.add(d)
        db.session.commit()
        return jsonify({"deck cloned": request.json["deckname"], "deckid": deckid})

    elif request.json["src"] == "twd":
        with open("twdDecksById.json", "r") as twdDecks_file:
            twdDecks = json.load(twdDecks_file)

            deck = twdDecks[request.json["target"]]
            cards = {}
            for i, q in deck["cards"].items():
                cards[int(i)] = q

            description = "Date: " + deck["creation_date"] + "\n"
            description += "Players: " + str(deck["players"]) + "\n"
            description += "Event: " + deck["event"] + "\n"
            description += "Location: " + deck["location"] + "\n"
            if deck["description"]:
                description += "\n" + deck["description"]

            deckid = uuid.uuid4().hex
            d = Deck(
                deckid=deckid,
                name=f"{deck['name']} [by {deck['author']}]",
                author_public_name=deck["author"],
                description=description,
                author=current_user,
                tags=["twd"],
                cards=cards,
            )
            db.session.add(d)
            db.session.commit()
            return jsonify({"deck cloned": request.json["deckname"], "deckid": deckid})

    elif request.json["src"] == "precons":
        set, precon = request.json["target"].split(":")

        with open("preconDecks.json", "r") as precons_cards_file, open(
            "setsAndPrecons.json", "r"
        ) as precons_data_file:
            precon_cards = json.load(precons_cards_file)
            precon_data = json.load(precons_data_file)

            name = f"{precon_data[set]['precons'][precon]['name']} [PRECON]"
            description = f"Preconstructed from \"{precon_data[set]['name']}\" [{precon_data[set]['date']}]"
            cards = {}
            for i, q in precon_cards[set][precon].items():
                cards[int(i)] = q

            deckid = uuid.uuid4().hex
            d = Deck(
                deckid=deckid,
                name=name,
                author_public_name="VTES Team",
                description=description,
                author=current_user,
                tags=["precon"],
                cards=cards,
            )
            db.session.add(d)
            db.session.commit()
            return jsonify({"deck cloned": request.json["deckname"], "deckid": deckid})

    else:
        targetDeck = Deck.query.get(request.json["target"])
        deckid = uuid.uuid4().hex
        d = Deck(
            deckid=deckid,
            name=request.json["deckname"],
            author_public_name=request.json["author"],
            description="",
            author=current_user,
            tags=targetDeck.tags,
            cards=targetDeck.cards,
        )
        db.session.add(d)
        db.session.commit()
        return jsonify(
            {
                "deck cloned": request.json["deckname"],
                "deckid": deckid,
            }
        )


@app.route("/api/decks/urlclone", methods=["POST"])
def urlCloneDeck():
    targetDeck = Deck.query.get(request.json["target"])
    deckid = uuid.uuid4().hex
    d = Deck(
        deckid=deckid,
        name=targetDeck.name,
        author_public_name=targetDeck.author_public_name,
        description=targetDeck.description,
        cards=targetDeck.cards,
    )
    db.session.add(d)
    db.session.commit()
    return jsonify(
        {
            "deckid": deckid,
        }
    )


@app.route("/api/decks/import", methods=["POST"])
@login_required
def importDeck():
    deck = deck_import(request.json["deckText"])

    deckid = uuid.uuid4().hex
    d = Deck(
        deckid=deckid,
        name=deck["name"],
        author_public_name=deck["author"],
        description=deck["description"],
        author=current_user,
        cards=deck["cards"],
    )
    db.session.add(d)
    db.session.commit()

    return jsonify(
        {
            "deckid": deckid,
            "bad_cards": deck["bad_cards"],
            "cards": deck["cards"],
            "name": deck["name"],
            "author": deck["author"],
            "description": deck["description"],
        }
    )


@app.route("/api/decks/anonymous_import", methods=["POST"])
def anonymousImportDeck():
    deck = deck_import(request.json["deckText"])

    deckid = uuid.uuid4().hex
    d = Deck(
        deckid=deckid,
        name=deck["name"],
        author_public_name=deck["author"],
        description=deck["description"],
        cards=deck["cards"],
    )
    db.session.add(d)
    db.session.commit()

    return jsonify(
        {
            "deckid": deckid,
            "bad_cards": deck["bad_cards"],
            "cards": deck["cards"],
            "name": deck["name"],
            "author": deck["author"],
            "description": deck["description"],
        }
    )


@app.route("/api/decks/export", methods=["POST"])
def deckExportRoute():
    try:
        result = None
        if request.json["deckid"] == "all" and current_user.is_authenticated:
            decks = Deck.query.filter_by(author=current_user).all()
            result = deck_export_all(decks, request.json["format"])

        elif request.json["src"] == "twd":

            deckid = request.json["deckid"]
            with open("twdDecksById.json", "r") as twdDecks_file:
                twdDecks = json.load(twdDecks_file)
                deck = twdDecks[deckid]
                comments = deck["description"]
                deck["description"] = "Date: " + deck["creation_date"] + "\n"
                deck["description"] += "Players: " + str(deck["players"]) + "\n"
                deck["description"] += "Event: " + deck["event"] + "\n"
                deck["description"] += "Location: " + deck["location"] + "\n"
                if comments:
                    deck["description"] += "\n" + comments
                result = deck_export(deck, request.json["format"])

        elif request.json["src"] == "precons":
            set, precon = request.json["deckid"].split(":")
            with open("preconDecks.json", "r") as precons_file:
                precon_decks = json.load(precons_file)
                d = precon_decks[set][precon]
                deck = {
                    "cards": d,
                    "name": f"Preconstructed {set}:{precon}",
                    "author": "VTES Publisher",
                    "description": "Preconstructed deck",
                }
                result = deck_export(deck, request.json["format"])

        elif request.json["deckid"] == "deckInUrl":
            deck = request.json["deck"]
            result = deck_export(deck, request.json["format"])

        elif request.json["src"] == "shared" or request.json["src"] == "my":
            d = Deck.query.get(request.json["deckid"])
            has_branches = d.master or d.branches

            deck = {
                "cards": d.cards,
                "name": d.name,
                "author": d.author_public_name,
                "branch_name": d.branch_name if has_branches else None,
                "description": d.description,
            }
            result = deck_export(deck, request.json["format"])

        if request.json["format"] == "xlsx" or request.json["format"] == "csv":
            return result
        else:
            return jsonify(result)

    except Exception:
        print(request.json)


@app.route("/api/decks/proxy", methods=["POST"])
def deckProxyRoute():
    cards = request.json["cards"]
    lang = request.json["lang"] if "lang" in request.json else "en-EN"
    pdf = deck_proxy(cards, lang)
    if pdf:
        return pdf
    else:
        print("bad proxy: ", request.json)
        abort(400)


@app.route("/api/decks/remove", methods=["POST"])
@login_required
def removeDeck():
    try:
        d = Deck.query.get(request.json["deckid"])
        if d.author != current_user:
            abort(401)

        if d.master:
            m = Deck.query.get(d.master)
            for i in m.branches:
                j = Deck.query.get(i)
                db.session.delete(j)

            db.session.delete(m)

        else:
            if d.branches:
                for i in d.branches:
                    j = Deck.query.get(i)
                    db.session.delete(j)

            db.session.delete(d)

        db.session.commit()

        return jsonify({"deck removed": request.json["deckid"]})
    except Exception:
        return jsonify({"error": "idk"})
