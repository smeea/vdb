import json
from models import Deck


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
