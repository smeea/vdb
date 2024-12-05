import csv
import re
import json
from unidecode import unidecode
import multiprocessing


with open("../../frontend/src/assets/data/disciplinesList.json", "r") as disciplines_file, open(
                "../../frontend/src/assets/data/virtuesList.json", "r") as virtues_file, open(
                        "rulings.json", "r") as rulings_file, open(
                                "twda.json", "r") as twda_input:
        rulings = json.load(rulings_file)
        twda = json.load(twda_input)
        disciplines_list = json.load(disciplines_file)
        virtues_list = json.load(virtues_file)

        disciplines = {}
        for d in disciplines_list.items():
            disciplines[d[1]] = {
                "name": d[0],
                "value": 1
            }
            disciplines[d[1].upper()] = {
                "name": d[0],
                "value": 2
            }

        virtues = {}
        for v in virtues_list.items():
            virtues[v[1]] = v[0]

artist_fixes = {
    "Alejandro Collucci": "Alejandro Colucci",
    "Chet Masterz": "Chet Masters",
    "Dimple": "Nicolas \"Dimple\" Bigot",
    "EM Gist": "E.M. Gist",
    "G. Goleash": "Grant Goleash",
    "Ginés Quiñonero-Santiago": "Ginés Quiñonero",
    "Glenn Osterberger": "Glen Osterberger",
    "Heather Kreiter": "Heather V. Kreiter",
    "L. Snelly": "Lawrence Snelly",
    "Mathias Tapia": "Matias Tapia",
    "Mattias Tapia": "Matias Tapia",
    "Matthew Mitchell": "Matt Mitchell",
    "Mike Gaydos": "Michael Gaydos",
    "Mike Weaver": "Michael Weaver",
    'Nicolas "Dimple" Bigot': "Nicolas Bigot",
    "Pat McEvoy": "Patrick McEvoy",
    "Ron Spenser": "Ron Spencer",
    "Sam Araya": "Samuel Araya",
    "Sandra Chang": "Sandra Chang-Adair",
    "T. Bradstreet": "Tim Bradstreet",
    "Thomas Baxa": "Tom Baxa",
}

# Groups are not integers because of ANY-group vampires (e.g. Anarch Convert)
integer_fields = ["Id", "Capacity"]


def generate_artists(csv_cards, artists_file, artists_file_min):
    artists = set()
    for card in csv_cards:
        for artist in re.split("; | & ", card["Artist"]):
            if artist in artist_fixes.keys():
                artists.add(artist_fixes[artist])
            else:
                artists.add(artist)

    json.dump(sorted(artists), artists_file_min, separators=(",", ":"))
    json.dump(sorted(artists), artists_file, indent=4, separators=(",", ":"))


def generate_card(card):
    # Convert some fields values to integers
    for k in integer_fields:
        try:
            card[k] = int(card[k])
        except (ValueError):
            pass

    # Remove {} and spaces in []
    card["Card Text"] = re.sub("[{}]", "", card["Card Text"])
    card["Card Text"] = re.sub(r"\[(\w+)\s*(\w*)\]", r"[\1\2]", card["Card Text"])

    # Convert sets to dict
    if not card["Set"]:
        card["Set"] = {"playtest": {}}

    else:
        sets = card["Set"].split(", ")
        card["Set"] = {}

        for set in sets:
            if "-" in set:
                set = set.split("-")
            elif ":" in set:
                set = set.split(":")

            precons = set[1].split("/")

            # Fix for KoT, HttB Reprints (marked in CSV as KoT, but have only
            # bundles named "A" or "B" not existing in original KoT)
            if set[0] in ["KoT", "HttB"]:
                counter = 0
                for precon in precons:
                    if re.match(r"(A|B)[0-9]?", precon):
                        counter += 1

                if counter > 0:
                    card["Set"][f"{set[0]}R"] = {}
                if counter < len(precons):
                    card["Set"][set[0]] = {}

            elif set[0] == "Anthology":
                for precon in precons:
                    if "LARP" in precon:
                        card["Set"]["Anthology"] = {}
                    else:
                        card["Set"]["Anthology"] = {}
                        card["Set"]["Anthology I"] = {}

            elif set[0] == "V5":
                for precon in precons:
                    if "PL" in precon:
                        card["Set"]["V5L"] = {}
                    else:
                        card["Set"]["V5"] = {}

            elif set[0] not in ["AU", "DM", "TU"] and set[0] not in card["Set"]:
                card["Set"][set[0]] = {}

            # Fix for DM, TU, AU Kickstarter Unleashed
            # (merge into Kickstarter Unleashed set)
            if set[0] in ["DM", "TU", "AU"]:
                for precon in precons:
                    if precon == "C":
                        card["Set"][set[0]] = {"C": True}
                    else:
                        if "KSU" not in card["Set"]:
                            card["Set"]["KSU"] = {}

                        if m := re.match(r"^(A|B)([0-9]+)?", precon):
                            card["Set"]["KSU"][f"{set[0]}{m.group(1)}"] = m.group(2)
                        else:
                            card["Set"]["KSU"][set[0]] = precon

            elif set[0] == "Anthology":
                for precon in precons:
                    if "LARP" in precon:
                        m = re.match(r"^LARP([0-9]+)", precon)
                        card["Set"]["Anthology"][""] = m.group(1)
                    else:
                        card["Set"]["Anthology I"][""] = precon
                        card["Set"]["Anthology"][""] = precon

            # Split Lasombra from V5 (2020) set
            elif set[0] == "V5":
                for precon in precons:
                    set_name = 'V5' if 'PL' not in precon else 'V5L'
                    if m := re.match(r"^(\D+)([0-9]+)?", precon):
                        card["Set"][set_name][m.group(1)] = m.group(2)

            else:
                for precon in precons:
                    if set[0] in ["KoT", "HttB"] and (
                            m := re.match(r"^(A|B)([0-9]+)?", precon)
                    ):
                        s = f"{set[0]}R"
                        if m.group(2):
                            card["Set"][s][m.group(1)] = m.group(2)
                        else:
                            card["Set"][s][m.group(1)] = 1

                    else:
                        if m := re.match(r"^(\D+)([0-9]+)?", precon):
                            if m.group(1) in ["C", "U", "R", "V", "DTC"]:
                                card["Set"][set[0]][m.group(1)] = True
                            elif m.group(2):
                                card["Set"][set[0]][m.group(1)] = m.group(2)
                            else:
                                card["Set"][set[0]][m.group(1)] = 1
                        elif m := re.match(r"^[0-9][0-9]?$", precon):
                            card["Set"][set[0]][""] = precon
                        else:
                            date = f"{precon[0:4]}-{precon[4:6]}-{precon[6:8]}"
                            card["Set"][set[0]][date] = True

    # Add Sect
    if card["Type"] == "Imbued":
        card["Sect"] = "Imbued"
    else:
        text = re.split("\\W+", card["Card Text"])
        if text[0] == "Advanced":
            card["Sect"] = text[1]
        else:
            card["Sect"] = text[0]

    # Remove empty disciplines/virtues
    if card["Type"] == "Imbued":
        card_disciplines_letters = card["Disciplines"].split()
        card_disciplines = {}
        for d in card_disciplines_letters:
            if d in virtues:
                card_disciplines[virtues[d]] = 1

        card["Disciplines"] = card_disciplines

    elif card["Type"] == "Vampire":
        card_disciplines_letters = card["Disciplines"].split()
        card_disciplines = {}
        for d in card_disciplines_letters:
            if d in disciplines:
                card_disciplines[disciplines[d]['name']] = disciplines[d]['value']

        card["Disciplines"] = card_disciplines

    artists = []
    for artist in re.split("; | & ", card["Artist"]):
        if artist in artist_fixes.keys():
            artists.append(artist_fixes[artist])
        else:
            artists.append(artist)

    card["Artist"] = artists

    # Add twda info
    card["Twd"] = 0
    for i in twda:
        for c in i["crypt"]["cards"]:
            if c["id"] == card["Id"]:
                card["Twd"] += 1

    # Add Advancement info
    card["Advancement"] = ""
    for c in csv_cards_main:
        if (
                c["Name"] == card["Name"]
                and int(c["Id"]) != card["Id"]
                and c["Group"] == card["Group"]
        ):
            isAdv = bool(card["Adv"])
            card["Advancement"] = [isAdv, int(c["Id"])]

    # Add new revision info
    card["New"] = False

    for c in csv_cards_main:
        if (
                c["Name"] == card["Name"]
                and int(c["Id"]) < card["Id"]
                and c["Group"] != card["Group"]
        ):
            card["New"] = True

    # Rename Assamite and Follower of Set
    if card["Clan"] == "Assamite":
        card["Clan"] = "Banu Haqim"

    if card["Clan"] == "Follower of Set":
        card["Clan"] = "Ministry"

    card["Card Text"] = (
        card["Card Text"]
        .replace("Assamites", "Banu Haqim")
        .replace("Assamite", "Banu Haqim")
    )

    card["Card Text"] = card["Card Text"].replace("Followers of Set", "Ministers")
    card["Card Text"] = card["Card Text"].replace("Follower of Set", "Minister")

    # Rename Thaumaturgy
    card["Card Text"] = card["Card Text"].replace("Thaumaturgy", "Blood Sorcery")

    card_ready = {
        "adv": card["Advancement"],
        "aka": card["Aka"],
        "artist": card["Artist"],
        "ascii": unidecode(card["Name"]),
        "banned": card["Banned"],
        "capacity": card["Capacity"],
        "clan": card["Clan"],
        "disciplines": card["Disciplines"],
        "group": card["Group"].lower(),
        "id": card["Id"],
        "name": card["Name"],
        "new": card["New"],
        "path": card["Path"] if 'Path' in card else '',
        "rulings": rulings[str(card["Id"])] if str(card["Id"]) in rulings else [],
        "sect": card["Sect"],
        "set": card["Set"],
        "text": card["Card Text"],
        "title": card["Title"].lower(),
        "twd": card["Twd"],
    }

    if "Playtest Old" in card and card["Playtest Old"]:
        card_ready["playtest_old"] = True

    return card_ready

def generate_cards(csv_cards, cardbase_file, cardbase_file_min):
    pool = multiprocessing.Pool(processes=4)
    fixed_cards = pool.map(generate_card, csv_cards)

    cardbase = {}
    for card in fixed_cards:
        cardbase[card['id']] = card

    json.dump(cardbase, cardbase_file_min, separators=(",", ":"))
    json.dump(cardbase, cardbase_file, indent=4, separators=(",", ":"))


with open("artistsCrypt.json", "w", encoding="utf8") as artists_file, open(
                "artistsCrypt.min.json", "w", encoding="utf8"
) as artists_file_min, open("vtescrypt.csv", "r", encoding="utf-8-sig") as cardbase_csv_main, open(
        "cardbase_crypt.json", "w", encoding="utf8"
) as cardbase_file, open(
        "cardbase_crypt.min.json", "w", encoding="utf8"
) as cardbase_file_min:
        reader_main = csv.reader(cardbase_csv_main)
        fieldnames_main = next(reader_main)
        csv_cards_main = list(csv.DictReader(cardbase_csv_main, fieldnames_main))
        generate_cards(csv_cards_main, cardbase_file, cardbase_file_min)
        generate_artists(csv_cards_main, artists_file, artists_file_min)

with open(
        "playtest/vtescrypt_playtest.csv", "r", encoding="utf-8-sig"
) as cardbase_csv_playtest, open(
        "playtest/cardbase_crypt_playtest.json", "w", encoding="utf8"
) as cardbase_file_playtest, open(
        "playtest/cardbase_crypt_playtest.min.json", "w", encoding="utf8"
) as cardbase_file_min_playtest:
        reader_playtest = csv.reader(cardbase_csv_playtest)
        fieldnames_playtest = next(reader_playtest)
        csv_cards_playtest = csv.DictReader(cardbase_csv_playtest, fieldnames_playtest)
        generate_cards(csv_cards_playtest, cardbase_file_playtest, cardbase_file_min_playtest)
