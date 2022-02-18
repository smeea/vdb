import json
from flask_login import current_user
from models import Deck


def get_decks_by_crypt(crypt_request, decks):
    cards_counter = len(crypt_request)
    match_decks = []
    for deck in decks:
        counter = 0
        for card, v in crypt_request.items():
            card = int(card)
            q, m = v["q"], v["m"]
            if m == "gt":
                if q:
                    if card in deck["crypt"] and deck["crypt"][card] >= q:
                        counter += 1
                else:
                    counter += 1

            elif m == "eq":
                if q:
                    if card in deck["crypt"] and deck["crypt"][card] == q:
                        counter += 1
                elif card not in deck["crypt"]:
                    counter += 1

            elif m == "lt":
                if q:
                    if card in deck["crypt"] and deck["crypt"][card] <= q:
                        counter += 1

            elif m == "lt0":
                if (
                    card in deck["crypt"]
                    and deck["crypt"][card] <= q
                    or card not in deck["crypt"]
                ):
                    counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_library(library_request, decks):
    cards_counter = len(library_request)
    match_decks = []
    for deck in decks:
        counter = 0
        for card, v in library_request.items():
            card = int(card)
            q, m = v["q"], v["m"]
            if m == "gt":
                if q:
                    if card in deck["library"] and deck["library"][card] >= q:
                        counter += 1
                else:
                    counter += 1

            elif m == "eq":
                if q:
                    if card in deck["library"] and deck["library"][card] == q:
                        counter += 1
                elif card not in deck["library"]:
                    counter += 1

            elif m == "lt":
                if q:
                    if card in deck["library"] and deck["library"][card] <= q:
                        counter += 1

            elif m == "lt0":
                if (
                    card in deck["library"]
                    and deck["library"][card] <= q
                    or card not in deck["library"]
                ):
                    counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_author(author, decks):
    match_decks = []
    for deck in decks:
        if author in deck["author"]:
            match_decks.append(deck)

    return match_decks


def get_decks_by_location(location, decks):
    match_decks = []
    for deck in decks:
        if location in deck["location"]:
            match_decks.append(deck)

    return match_decks


def get_decks_by_event(event, decks):
    match_decks = []
    for deck in decks:
        if event.lower() in deck["event"].lower():
            match_decks.append(deck)

    return match_decks


def get_decks_by_date(request, decks):
    date_from = int(request["from"]) if "from" in request else 1997
    date_to = int(request["to"]) if "to" in request else 2077
    match_decks = []

    for deck in decks:
        date = int(deck["date"][0:4])
        if date_from <= date <= date_to:
            match_decks.append(deck)

    return match_decks


def get_decks_by_players(request, decks):
    players_from = int(request["from"]) if "from" in request else 1
    players_to = int(request["to"]) if "to" in request else 1000
    match_decks = []

    for deck in decks:
        if (
            deck["players"] != "Unknown"
            and players_from <= deck["players"] <= players_to
        ):
            match_decks.append(deck)

    return match_decks


def get_decks_by_clan(clan, decks):
    match_decks = []
    for deck in decks:
        if deck["clan"].lower() == clan:
            match_decks.append(deck)

    return match_decks


def get_decks_by_disciplines(disciplines, decks):
    disciplines_counter = len(disciplines)
    match_decks = []

    for deck in decks:
        counter = 0
        for discipline in disciplines.keys():
            if discipline in deck["disciplines"]:
                counter += 1

        if disciplines_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_cardtypes(cardtype_input, decks):
    cardtypes_counter = len(cardtype_input)
    cardtypes = {}

    for k, v in cardtype_input.items():
        [min, max] = v.split(",")
        [min, max] = [float(min) / 100, float(max) / 100]
        cardtypes[k] = {"min": min, "max": max}

    match_decks = []

    for deck in decks:
        counter = 0

        for type, v in cardtypes.items():
            if v["max"] == 0 and type not in deck["cardtypes_ratio"]:
                counter += 1
            if (
                type in deck["cardtypes_ratio"]
                and v["min"] < deck["cardtypes_ratio"][type] < v["max"]
            ):
                counter += 1

        if cardtypes_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_capacity(capacity_input, decks):
    capacity_brackets = []
    for k in capacity_input.keys():
        capacity_brackets.append([int(i) for i in k.split("-")])

    match_cards = []
    for deck in decks:
        for b in capacity_brackets:
            if b[0] <= deck["capacity"] <= b[1]:
                match_cards.append(deck)
                break

    return match_cards


def get_decks_by_traits(traits, decks):
    trait_counter = len(traits)
    match_decks = []
    for deck in decks:
        counter = 0

        for trait in traits.keys():
            if trait in deck["traits"]:
                counter += 1
                continue
            if trait == "my" and Deck.query.get(deck["deckid"]).author == deck["owner"]:
                counter += 1

        if trait_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_libraryTotal(total_input, decks):
    total_brackets = []
    for k in total_input.keys():
        total_brackets.append([int(i) for i in k.split("-")])

    match_cards = []
    for deck in decks:
        for b in total_brackets:
            if b[0] <= deck["library_total"] <= b[1]:
                match_cards.append(deck)
                break

    return match_cards


def match_inventory(request, inventory, decks):
    crypt_ratio = float(request["crypt"]) if "crypt" in request else None
    library_ratio = float(request["library"]) if "library" in request else None
    scaling = int(request["scaling"]) if "scaling" in request else False

    match_decks = []

    for deck in decks:
        if crypt_ratio:
            min_counter = round(deck["crypt_total"] * crypt_ratio)
            counter = 0

            for card, q in deck["crypt"].items():
                if card in inventory:
                    if q > inventory[card]:
                        counter += inventory[card]
                    else:
                        counter += q

            if counter < min_counter:
                continue

        if library_ratio:
            counter = 0
            scaling_factor = deck["library_total"] / scaling if scaling else None
            min_counter = (
                scaling * library_ratio
                if scaling
                else deck["library_total"] * library_ratio
            )

            for card, q in deck["library"].items():
                if card in inventory:
                    q = q / scaling_factor if scaling else q

                    if q > inventory[card]:
                        counter += inventory[card]
                    else:
                        counter += q

            if counter < min_counter:
                continue

        match_decks.append(deck)

    return match_decks


with open("cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)


def get_deck_for_frontend(deckid):
    d = Deck.query.get(deckid)
    deck = {
        "deckid": d.deckid,
        "name": d.name,
        "author": d.author_public_name,
        "owner": d.author.username,
        "description": d.description,
        "date": d.creation_date,
        "cards": d.cards,
    }

    return deck


def get_missing_fields(source):
    deck = {
        "crypt_total": 0,
        "library_total": 0,
        "capacity": None,
        "disciplines": [],
        "cardtypes_ratio": {},
        "clan": None,
        "traits": [],
    }

    crypt = {}
    library = {}
    clans = {}
    disciplines = set()
    crypt_disciplines = set()
    total_capacity = 0
    total_crypt_ex_ac = 0

    for id, q in source.cards.items():
        if id > 200000:
            crypt[id] = crypt_db[str(id)]
            crypt[id]["q"] = q
            deck["crypt_total"] += q
            if id != 200076:
                total_crypt_ex_ac += q

        else:
            library[id] = library_db[str(id)]
            library[id]["q"] = q
            deck["library_total"] += q

    for id, c in crypt.items():
        # Skip Anarch Convert
        if id != 200076:
            total_capacity += c["q"] * c["Capacity"]

            if (clan := c["Clan"]) in clans:
                clans[clan] += c["q"]
            else:
                clans[clan] = c["q"]

        if "star" not in deck["traits"] and id != 200076:
            adv = c["Adv"]
            if adv and adv[1] in crypt:
                if (c["q"] + crypt[adv[1]]["q"]) / total_crypt_ex_ac > 0.38:
                    deck["traits"].append("star")
            else:
                if c["q"] / total_crypt_ex_ac > 0.38:
                    deck["traits"].append("star")

        for d in c["Disciplines"].keys():
            crypt_disciplines.add(d)

    for clan, q in clans.items():
        if q / deck["crypt_total"] > 0.5:
            deck["clan"] = clan

    if len(clans) <= 1 and "monoclan" not in deck["traits"]:
        deck["traits"].append("monoclan")

    deck["capacity"] = total_capacity / total_crypt_ex_ac

    card_types = {}

    for id, c in library.items():
        if c["Type"] in card_types:
            card_types[c["Type"]] += c["q"]
        else:
            card_types[c["Type"]] = c["q"]

        if "&" in c["Discipline"]:
            for d in c["Discipline"].split(" & "):
                if d in crypt_disciplines:
                    disciplines.add(d)

        elif "/" in c["Discipline"]:
            for d in c["Discipline"].split("/"):
                if d in crypt_disciplines:
                    disciplines.add(d)

        elif c["Discipline"] in crypt_disciplines:
            disciplines.add(c["Discipline"])

    for ct, q in card_types.items():
        deck["cardtypes_ratio"][ct.lower()] = q / deck["library_total"]

    deck["disciplines"] = sorted(list(disciplines))

    return deck


def sanitize_twd(deck):
    try:
        del deck["description"]
        del deck["disciplines"]
        del deck["format"]
        del deck["link"]
        del deck["timestamp"]
        del deck["score"]
        del deck["cardtypes_ratio"]
        del deck["crypt_total"]
        del deck["library_total"]
        del deck["clan"]
        del deck["capacity"]
        del deck["traits"]
    except KeyError:
        pass

    return deck
