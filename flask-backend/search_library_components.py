import json
import re


def get_library_by_text(requests, library):
    match_cards = []
    requests_counter = len(requests)

    for card in library:
        counter = 0

        for request in requests:
            value = request["value"] if "regex" in request else request["value"].lower()
            regex = True if "regex" in request else False
            in_query = request["in"] if "in" in request else None

            if regex:
                if in_query == "text":
                    if re.search(value, card["Card Text"], re.IGNORECASE):
                        counter += 1

                elif in_query == "name":
                    if re.search(value, card["Name"], re.IGNORECASE) or re.search(
                        value, card["ASCII Name"], re.IGNORECASE
                    ):
                        counter += 1

                else:
                    if (
                        re.search(value, card["Card Text"], re.IGNORECASE)
                        or re.search(value, card["Name"], re.IGNORECASE)
                        or re.search(value, card["ASCII Name"], re.IGNORECASE)
                    ):
                        counter += 1

            else:
                card_text = card["Card Text"].lower()
                card_name = card["Name"].lower()
                card_name_ascii = card["ASCII Name"].lower()

                if in_query == "text":
                    if card_text.find(value) != -1:
                        counter += 1

                elif in_query == "name":
                    if card_name.find(value) != -1 or card_name_ascii.find(value) != -1:
                        counter += 1

                else:
                    if (
                        card_text.find(value) != -1
                        or card_name.find(value) != -1
                        or card_name_ascii.find(value) != -1
                    ):
                        counter += 1

        if requests_counter == counter:
            match_cards.append(card)

    return match_cards


def get_library_by_type(request, library):
    types = request["value"]

    match_cards = []

    for card in library:
        if request["logic"] == "or":
            for type in types:
                if type in card["Type"].lower().split("/"):
                    match_cards.append(card)

        elif request["logic"] == "and":
            counter = 0
            for type in types:
                if type in card["Type"].lower().split("/"):
                    counter += 1

            if counter == len(types):
                match_cards.append(card)

        elif request["logic"] == "not":
            counter = 0
            for type in types:
                if type not in card["Type"].lower().split("/"):
                    counter += 1

            if counter == len(types):
                match_cards.append(card)

    return match_cards


def get_library_by_discipline(request, library):
    disciplines = request["value"]
    match_cards = []

    for card in library:
        if request["logic"] == "or":
            for discipline in disciplines:
                if (discipline in card["Discipline"].lower()) or (
                    discipline == "not required" and not card["Discipline"].lower()
                ):
                    if card not in match_cards:
                        match_cards.append(card)

        elif request["logic"] == "not":
            counter = 0
            for discipline in disciplines:
                if discipline not in card["Discipline"].lower():
                    counter += 1

            if counter == len(disciplines) and card not in match_cards:
                match_cards.append(card)

        elif request["logic"] == "and":
            counter = 0
            for discipline in disciplines:
                if (discipline in card["Discipline"].lower()) or (
                    discipline == "not required" and not card["Discipline"].lower()
                ):
                    counter += 1

            if counter == len(disciplines) and card not in match_cards:
                match_cards.append(card)

    return match_cards


def get_library_by_clan(request, library):
    clans = request["value"]
    match_cards = []

    for card in library:
        if request["logic"] == "or":
            card_clans = [c.lower() for c in card["Clan"].split("/")]
            for clan in clans:
                if (clan in card_clans) or (
                    clan == "not required" and not card["Clan"].lower()
                ):
                    match_cards.append(card)

        else:
            card_clans = [c.lower() for c in card["Clan"].split("/")]
            counter = 0
            for card_clan in card_clans:
                if card_clan not in clans:
                    counter += 1

            if counter == len(card_clans) and card not in match_cards:
                match_cards.append(card)

    return match_cards


def get_library_by_title(request, library):
    match_cards = []
    titles = request["value"]

    all_titles = [
        "primogen",
        "prince",
        "justicar",
        "inner circle",
        "baron",
        "bishop",
        "archbishop",
        "priscus",
        "cardinal",
        "regent",
        "magaji",
    ]

    for card in library:
        if request["logic"] == "or":
            for title in titles:
                if title == "not required":
                    counter = 0
                    for i in all_titles:
                        if i not in card["Requirement"].lower():
                            counter += 1
                    if counter == len(all_titles) and card not in match_cards:
                        match_cards.append(card)

                elif (
                    re.search(
                        f"(\W|\A){title}",
                        card["Requirement"],
                        re.IGNORECASE,
                    )
                    and not "non-" + title in card["Requirement"].lower()
                ):
                    if card not in match_cards:
                        match_cards.append(card)

        else:
            counter = 0
            for title in titles:
                if title.lower() not in card["Requirement"].lower():
                    counter += 1

            if counter == len(titles):
                match_cards.append(card)

    return match_cards


def get_library_by_sect(request, library):
    sects = request["value"]
    match_cards = []
    all_sects = ["camarilla", "sabbat", "laibon", "independent", "anarch", "imbued"]

    for card in library:
        if request["logic"] == "or":
            for sect in sects:
                if sect == "not required":
                    counter = 0
                    for i in all_sects:
                        if i not in card["Requirement"]:
                            counter += 1
                    if counter == len(all_sects) and card not in match_cards:
                        match_cards.append(card)

                elif (
                    sect in card["Requirement"].lower()
                    and not "non-" + sect in card["Requirement"].lower()
                ):
                    if card not in match_cards:
                        match_cards.append(card)

        elif request["logic"] == "not":
            counter = 0
            for sect in sects:
                if sect.lower() not in card["Requirement"].lower():
                    counter += 1

            if counter == len(sects) and card not in match_cards:
                match_cards.append(card)

    return match_cards


def get_library_by_blood(request, library):
    cost = request["blood"]
    moreless = request["moreless"]
    match_cards = []

    for card in library:
        if moreless == "le":
            if card["Blood Cost"] <= cost or card["Blood Cost"] == "X":
                match_cards.append(card)

        elif moreless == "ge":
            if (
                card["Blood Cost"]
                and card["Blood Cost"] >= cost
                or card["Blood Cost"] == "X"
                or (cost == "0" and not card["Blood Cost"])
            ):
                match_cards.append(card)

        elif moreless == "eq":
            if (
                card["Blood Cost"] == cost
                or card["Blood Cost"] == "X"
                or (cost == "0" and not card["Blood Cost"])
            ):
                match_cards.append(card)

    return match_cards


def get_library_by_pool(request, library):
    cost = request["pool"]
    moreless = request["moreless"]
    match_cards = []
    for card in library:
        if moreless == "le":
            if (
                card["Pool Cost"] <= cost
                or card["Pool Cost"] == "X"
                or not card["Pool Cost"]
            ):
                match_cards.append(card)

        elif moreless == "ge":
            if (
                card["Pool Cost"]
                and card["Pool Cost"] >= cost
                or card["Pool Cost"] == "X"
                or (cost == "0" and not card["Pool Cost"])
            ):
                match_cards.append(card)

        elif moreless == "eq":
            if (
                card["Pool Cost"] == cost
                or card["Pool Cost"] == "X"
                or (cost == "0" and not card["Pool Cost"])
            ):
                match_cards.append(card)

    return match_cards


def get_library_by_traits(traits, library):
    match_cards = []
    trait_counter = len(traits)
    for card in library:
        counter = 0

        # Below are just dirty hacks to match by 'trait' (card text part).
        # It can break anytime (if card text in CVS card base changes), but
        # just works for now. Please refer to Python Regexp's ('re' module).

        for trait in traits.keys():

            if trait == "intercept":
                if re.search(
                    r"{}".format(
                        "\-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0"
                    ),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "stealth":
                if re.search(
                    r"{}".format(
                        "\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\-[0-9]+ intercept"
                    ),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "bleed":
                if re.search(
                    r"{}".format("\+[0-9]+ bleed"), card["Card Text"], re.IGNORECASE
                ):
                    counter += 1

            elif trait == "strength":
                if re.search(
                    r"{}".format("\+[0-9]+ strength"), card["Card Text"], re.IGNORECASE
                ):
                    counter += 1

            elif trait == "aggravated":
                if re.search(
                    r"{}".format("(?<!non-)aggravated"),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "prevent":
                if re.search(
                    r"{}".format("(?<!un)prevent"), card["Card Text"], re.IGNORECASE
                ):
                    counter += 1

            elif trait == "bounce bleed":
                if re.search(
                    r"{}".format("change the target of the bleed|is now bleeding"),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "unlock":
                if re.search(
                    r"{}".format("(?!not )unlock(?! phase|ed)|wakes"),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "banned":
                if card["Banned"]:
                    counter += 1

            elif trait == "non-twd":
                if not card["Twd"]:
                    counter += 1

            elif trait == "burn":
                if card["Burn Option"]:
                    counter += 1

            elif trait == "votes-title":
                if re.search(
                    r"{}".format("\+. vote|additional vote|represent the .* title"),
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    counter += 1

            elif trait == "reduce bleed":
                if re.search(
                    r"{}".format("reduce a bleed"), card["Card Text"], re.IGNORECASE
                ):
                    counter += 1

            elif trait == "no-requirements":
                if (
                    not card["Requirement"]
                    and not card["Discipline"]
                    and not card["Clan"]
                    and "requires a" not in card["Card Text"].lower()
                ):
                    counter += 1

            elif re.search(r"{}".format(trait), card["Card Text"], re.IGNORECASE):
                counter += 1

        if trait_counter == counter:
            match_cards.append(card)

    return match_cards


def get_library_by_set(request, library):
    with open("setsAndPrecons.json", "r") as set_file:
        sets_data = json.load(set_file)

    BCP_START = "2018-01-01"
    match_cards = []
    r_sets = request["value"]

    for idx, card in enumerate(library):
        dates = []
        for k in card["Set"].keys():
            if sets_data[k]["date"]:
                dates.append(sets_data[k]["date"])

            elif k == "Promo":
                dates.extend(card["Set"]["Promo"].keys())

        library[idx]["min_date"] = min(dates)
        library[idx]["max_date"] = max(dates)

    for r_set in r_sets:
        r_date = sets_data[r_set]["date"] if r_set != "bcp" else None

        for card in library:
            if card in match_cards:
                continue

            if r_set == "bcp":
                if "only in" in request or "first print" in request:
                    if card["min_date"] >= BCP_START:
                        match_cards.append(card)

                elif card["max_date"] >= BCP_START:
                    match_cards.append(card)

            elif "age" in request:
                if request["age"] == "or-newer" and r_date <= card["max_date"]:
                    match_cards.append(card)

                if request["age"] == "or-older" and r_date >= card["min_date"]:
                    match_cards.append(card)

                if request["age"] == "not-newer" and r_date >= card["max_date"]:
                    match_cards.append(card)

                if request["age"] == "not-older" and r_date <= card["min_date"]:
                    match_cards.append(card)

            elif r_set in card["Set"]:
                if "only in" in request:
                    if len(card["Set"].keys()) == 1:
                        match_cards.append(card)

                elif "first print" in request:
                    if card["min_date"] == r_date:
                        match_cards.append(card)
                else:
                    match_cards.append(card)

    return match_cards


def get_library_by_precon(request, library):
    with open("setsAndPrecons.json", "r") as set_file:
        sets_data = json.load(set_file)

    BCP_START = "2018-01-01"
    match_cards = []
    reqs = request["value"]

    for idx, card in enumerate(library):
        dates = []
        for k in card["Set"].keys():
            if sets_data[k]["date"]:
                dates.append(sets_data[k]["date"])

        if dates:
            library[idx]["min_date"] = min(dates)
            library[idx]["max_date"] = max(dates)
        else:
            # Ignore Promos
            library[idx]["min_date"] = "0"
            library[idx]["max_date"] = "0"

    for req in reqs:
        [r_set, r_subset] = req.split(":") if req != "bcp" else [None, None]
        r_date = sets_data[r_set]["date"] if r_set else None

        for card in library:
            if card in match_cards:
                continue

            if req == "bcp":
                if "only in" in request:
                    counter = 0
                    for c_set in card["Set"].keys():
                        if sets_data[c_set]["date"] >= BCP_START:
                            counter += 1

                    if counter == len(card["Set"].keys()):
                        match_cards.append(card)

                elif "first print" in request:
                    if card["min_date"] >= BCP_START:
                        match_cards.append(card)

                elif card["max_date"] >= BCP_START:
                    match_cards.append(card)

            elif r_set in card["Set"] and r_subset in card["Set"][r_set]:
                if "only in" in request:
                    if (
                        len(card["Set"].keys()) == 1
                        and len(card["Set"][r_set].keys()) == 1
                    ):
                        match_cards.append(card)

                elif "first print" in request:
                    if card["min_date"] == r_date:
                        match_cards.append(card)

                else:
                    match_cards.append(card)

    return match_cards


def get_library_by_artist(artist, library):
    match_cards = []
    for card in library:
        if artist in card["Artist"]:
            match_cards.append(card)

    return match_cards


def get_library_by_capacity(request, library):
    capacity = int(request["capacity"])

    moreless = request["moreless"]
    match_cards = []

    for card in library:
        if moreless == "le":
            for i in range(1, capacity):
                if re.search(
                    f"requires .* (of|with) capacity less than {i + 1}",
                    card["Card Text"],
                    re.IGNORECASE,
                ) or re.search(
                    f"requires .* (of|with) capacity {i} or less",
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    match_cards.append(card)

        elif moreless == "ge":
            for i in range(capacity, 11):
                if re.search(
                    f"requires .* (of|with) capacity {i} or more",
                    card["Card Text"],
                    re.IGNORECASE,
                ) or re.search(
                    f"requires .* (of|with) capacity above {i - 1}",
                    card["Card Text"],
                    re.IGNORECASE,
                ):
                    match_cards.append(card)

    return match_cards


def is_match_by_initials(initials, text):
    prev_index = 0

    for c in initials:
        index = text.find(c, prev_index)
        if index == -1:
            return False
        if index != prev_index and index != 0:
            while text[index - 1].isalnum():
                index = text.find(c, index + 1)
                if index == -1:
                    return False

        prev_index = index + 1

    return True


def get_library_by_name(pattern, library):
    match_cards = []
    remaining_cards = []
    match_cards_by_initials = []
    pattern = pattern.lower()
    for card in library:
        if pattern in card["ASCII Name"].lower() or pattern in card["Name"].lower():
            match_cards.append(card)
        else:
            remaining_cards.append(card)

    for card in remaining_cards:
        if is_match_by_initials(
            pattern, card["ASCII Name"].lower()
        ) or is_match_by_initials(pattern, card["Name"].lower()):
            match_cards_by_initials.append(card)

    return match_cards + match_cards_by_initials
