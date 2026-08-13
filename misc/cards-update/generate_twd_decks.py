import json
import multiprocessing

with open("cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)


def generate_twd(i):
    deck = {
        "author": i["player"] if i["player"] else "Unknown",
        "cards": {},
        "cardtypes_ratio": {},
        "clan": None,
        "creation_date": i["event"]["date"],
        "deckid": i["id"],
        "description": i["comment"] if i["comment"] else "Unknown",
        "event": i["event"]["name"],
        "link": i["event"]["url"] if i["event"]["url"] else "",
        "location": i["event"]["place"] if i["event"]["place"] else "Unknown",
        "name": i["name"] if i["name"] else "Unknown",
        "players": i["event"]["players_count"] if i["event"]["players_count"] else "Unknown",
        "sect": None,
        "traits": [],
    }

    crypt = {}
    clans = {}
    sects = {}
    disciplines = set()
    cardtypes = {}
    crypt_total = 0
    library_total = 0
    crypt_disciplines = set()
    total_capacity_ex_ac = 0
    total_crypt_ex_ac = 0

    for card in i["cards"]:
        id = card["id"]
        q = card["count"]
        deck["cards"][id] = q

        if id > 200000:
            c = crypt_db[str(id)]
            crypt_total += q

            # Skip Anarch Convert
            if id != 200076:
                total_crypt_ex_ac += q
                total_capacity_ex_ac += q * c["capacity"]
                clans[c["clan"]] = clans.get(c["clan"], 0) + q
                if path := c["path"]:
                    clans[path] = clans.get(path, 0) + q

            sects[c["sect"]] = sects.get(c["sect"], 0) + q

            if "star" not in deck["traits"] and id != 200076:
                if c["adv"] and c["adv"][1] in crypt:
                    q += crypt[c["adv"][1]]["q"]

                if q / total_crypt_ex_ac > 0.33:
                    deck["traits"].append("star")

            for d in c["disciplines"].keys():
                crypt_disciplines.add(d)

    for clan, q in clans.items():
        if q / total_crypt_ex_ac > 0.5:
            deck["clan"] = clan

    if len(clans) <= 1 and "monoclan" not in deck["traits"]:
        deck["traits"].append("monoclan")

    for sect, q in sects.items():
        if q / crypt_total > 0.65:
            deck["sect"] = sect

    deck["capacity"] = round(total_capacity_ex_ac / total_crypt_ex_ac, 1)
    deck["disciplines"] = sorted(list(disciplines))

    for card in i["cards"]:
        id = card["id"]
        q = card["count"]

        if id < 200000:
            c = library_db[str(id)]
            library_total += q

            ct = c["type"].lower()
            cardtypes[ct] = cardtypes.get(ct, 0) + q

            discipline_entry = c["discipline"]
            if "&" in discipline_entry:
                for d in discipline_entry.split(" & "):
                    if d in [*crypt_disciplines, "Flight", "Maleficia", "Striga"]:
                        disciplines.add(d)

            elif "/" in discipline_entry:
                for d in discipline_entry.split("/"):
                    if d in [*crypt_disciplines, "Flight", "Maleficia", "Striga"]:
                        disciplines.add(d)

            elif discipline_entry in [
                *crypt_disciplines,
                "Flight",
                "Maleficia",
                "Striga",
            ]:
                disciplines.add(discipline_entry)

    for ct, q in cardtypes.items():
        deck["cardtypes_ratio"][ct] = round(q / library_total, 2)

    deck["crypt_total"] = crypt_total
    deck["library_total"] = library_total

    return deck


with (
    open("twda.json", "r") as twd_input,
    open("twd_decks.json", "w") as twd_decks_file,
    open("twd_locations.json", "w") as twd_locations_file,
    open("twd_players.json", "w") as twd_players_file,
):
    decks = []
    decks_by_id = {}

    twda = json.load(twd_input).values()
    total = len(twda)

    pool = multiprocessing.Pool(processes=4)
    decks = pool.map(generate_twd, twda)

    for deck in decks:
        if len(deck["deckid"]) == 9:
            deck["deckid"] = f"{deck['deckid']}0"

        decks_by_id[deck["deckid"]] = deck

    json.dump(decks_by_id, twd_decks_file, indent=4, separators=(",", ":"))

    cities = set(())
    countries = set(())
    players = set(())

    for i in twda:
        place = i["event"]["place"].split(", ")
        countries.add(place[-1])
        if len(place) > 1:
            cities.add(f"{place[-2]}, {place[-1]}")

        players.add(i["player"])

    cities = sorted(cities)
    countries = sorted(countries)
    players = sorted(players)

    json.dump(players, twd_players_file, indent=4, separators=(",", ":"))
    json.dump(
        {"countries": countries, "cities": cities},
        twd_locations_file,
        indent=4,
        separators=(",", ":"),
    )
