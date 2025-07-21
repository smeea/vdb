import json
from flask_login import current_user
from models import Deck

with open("twd_decks.json", "r") as twd_decks_file:
    twd_decks = json.load(twd_decks_file)

with open("../frontend/public/data/precon_decks.json", "r") as precons_file:
    precon_decks = json.load(precons_file)


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
        if author == deck["author"]:
            match_decks.append(deck)

    return match_decks


def get_decks_by_location(location, decks):
    country = location["country"] if "country" in location else ""
    city = location["city"] if "city" in location else ""
    match_decks = []
    for deck in decks:
        if deck["location"].startswith(city) and deck["location"].endswith(country):
            match_decks.append(deck)

    return match_decks


def get_decks_by_event(event, decks):
    match_decks = []
    for deck in decks:
        if event.lower() in deck["event"].lower():
            match_decks.append(deck)

    return match_decks


def get_decks_by_date(request, decks):
    date_from = int(request.get("from") or 1997)
    date_to = int(request.get("to") or 2077)
    match_decks = []

    for deck in decks:
        date = int(deck["creation_date"][0:4])
        if date_from <= date <= date_to:
            match_decks.append(deck)

    return match_decks


def get_decks_by_players(request, decks):
    players_from = int(request.get("from") or 1)
    players_to = int(request.get("to") or 1000)
    match_decks = []

    for deck in decks:
        if (
            deck["players"] != "Unknown"
            and players_from <= deck["players"] <= players_to
        ):
            match_decks.append(deck)

    return match_decks


def get_decks_by_clan(value, decks):
    clans = value["value"]
    logic = value["logic"]
    match_decks = []
    for deck in decks:
        for clan in clans:
            if logic == "or":
                if deck["clan"] and deck["clan"].lower() == clan:
                    match_decks.append(deck)
            if logic == "not":
                if not deck["clan"] or deck["clan"].lower() != clan:
                    match_decks.append(deck)

    return match_decks


def get_decks_by_sect(value, decks):
    sects = value["value"]
    logic = value["logic"]
    match_decks = []
    for deck in decks:
        for sect in sects:
            if logic == "or":
                if deck["sect"] and deck["sect"].lower() == sect:
                    match_decks.append(deck)
            if logic == "not":
                if not deck["sect"] or deck["sect"].lower() != sect:
                    match_decks.append(deck)

    return match_decks


def get_decks_by_tags(value, decks):
    match_decks = []
    positive_tags = []
    negative_tags = []
    for k, v in value.items():
        if v:
            positive_tags.append(k)
        else:
            negative_tags.append(k)
    for deck in decks:
        tags = [*deck["tags"]["superior"], *deck["tags"]["base"]]

        if (
            set(positive_tags).issubset(tags)
            and len(list(set(negative_tags) & set(tags))) == 0
        ):
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

        if trait_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_decks_by_src(src, decks):
    print(src)
    match_decks = []

    for deck in decks:
        match src:
            case "my":
                if deck.get("public_parent"):
                    match_decks.append(deck)

            case "my-nonpublic":
                if not deck.get("public_parent"):
                    match_decks.append(deck)

            case "favorites":
                if deck["deckid"] in current_user.favorites:
                    match_decks.append(deck)

    return match_decks


def get_decks_by_libraryTotal(total_input, decks):
    total_brackets = []
    for k in total_input.keys():
        total_brackets.append([int(i) for i in k.split("-")])

    match_cards = []
    for deck in decks:
        library_size = deck["library_total"] if deck["library_total"] else 0
        for b in total_brackets:
            if b[0] <= library_size <= b[1]:
                match_cards.append(deck)
                break

    return match_cards


def match_inventory(request, inventory, decks):
    crypt_ratio = float(request.get("crypt") or 0)
    library_ratio = float(request.get("library") or 0)
    scaling = int(request.get("scaling") or 0)

    match_decks = []

    for deck in decks:
        if crypt_ratio:
            min_counter = round(deck["crypt_total"] * crypt_ratio)
            counter = 0

            for card, q in deck["crypt"].items():
                if card in inventory:
                    if q > inventory[card]["q"]:
                        counter += inventory[card]["q"]
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
                    q = q / scaling_factor if scaling_factor else q

                    if q > inventory[card]["q"]:
                        counter += inventory[card]["q"]
                    else:
                        counter += q

            if counter < min_counter:
                continue

        match_decks.append(deck)

    return match_decks


def get_decks_by_similar(deckid, decks):
    cards = {}

    if len(deckid) == 9:
        deck = Deck.query.get(deckid)
        if deck:
            cards = deck.cards

    elif ":" in deckid:
        set, precon = deckid.split(":")
        cards = precon_decks[set][precon]

    else:
        cards = twd_decks[deckid]["cards"]

    CRYPT_COEF = 4  # Increase points for Crypt cards
    AC_COEF = 0.5  # Reduce points for Anarch Convert
    SIMILARITY_THRESHOLD = 50  # Minimum points to pass

    match_decks = []
    query_crypt_total = 0
    query_library_total = 0

    for cardid, q in cards.items():
        if int(cardid) > 200000:
            query_crypt_total += q
        else:
            query_library_total += q

    for deck in decks:
        crypt_ratio = (
            deck["crypt_total"] / query_crypt_total if query_crypt_total else 0
        )
        library_ratio = (
            deck["library_total"] / query_library_total if query_library_total else 0
        )

        matches_crypt = 0
        matches_library = 0

        for cardid, q in cards.items():
            cardid = int(cardid)
            if cardid > 200000:
                if cardid in deck["crypt"]:
                    # Reduce points for Anarch Convert
                    if cardid == 200076:
                        matches_crypt += min(q, deck["crypt"][cardid]) * AC_COEF
                    else:
                        matches_crypt += min(q, deck["crypt"][cardid])

            elif cardid in deck["library"]:
                matches_library += min(q, deck["library"][cardid])

        similarity = (
            matches_crypt * crypt_ratio * CRYPT_COEF + matches_library * library_ratio
        )

        if similarity > SIMILARITY_THRESHOLD:
            match_decks.append(deck)

    return match_decks
