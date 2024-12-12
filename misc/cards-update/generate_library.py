import csv
import re
import json
from unidecode import unidecode
import multiprocessing


with (
    open("twda.json", "r") as twda_input,
    open("rulings.json", "r") as rulings_file,
    open("vteslibmeta.csv", "r", encoding="utf-8-sig") as cardbase_meta_csv,
):
    rulings = json.load(rulings_file)
    twda = json.load(twda_input)
    reader_meta = csv.reader(cardbase_meta_csv)
    fieldnames_meta = next(reader_meta)
    csv_meta = csv.DictReader(cardbase_meta_csv, fieldnames_meta)
    requirements = []
    for c in csv_meta:
        requirements.append(c)

artist_fixes = {
    "Alejandro Collucci": "Alejandro Colucci",
    "Chet Masterz": "Chet Masters",
    "Dimple": 'Nicolas "Dimple" Bigot',
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

integer_fields = ["Id"]


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
    # Add Requirements
    for c in requirements:
        if c["Id"] == card["Id"]:
            card["Requirement"] = c["Requirement"]

    if "Requirement" not in card:
        card["Requirement"] = ""

    # Convert some fields values to integers
    for k in integer_fields:
        try:
            card[k] = int(card[k])
        except ValueError:
            pass

    # Sect requirement for Title-requiring cards
    title_sects = {
        "primogen": "camarilla",
        "prince": "camarilla",
        "justicar": "camarilla",
        "imperator": "camarilla",
        "inner circle": "camarilla",
        "bishop": "camarilla",
        "archbishop": "sabbat",
        "priscus": "sabbat",
        "cardinal": "sabbat",
        "regent": "sabbat",
        "1 vote": "independent",
        "2 votes": "independent",
        "magaji": "laibon",
        "kholo": "laibon",
        "baron": "anarch",
    }
    for req in card["Requirement"].split(","):
        if req in title_sects:
            if title_sects[req] not in card["Requirement"]:
                card["Requirement"] += f",{title_sects[req]}"

    # Multi-disciplines to alphabetic order
    if card["Discipline"]:
        if "/" in card["Discipline"]:
            disciplines = card["Discipline"].split("/")
            disciplines = sorted(disciplines)
            for idx, i in enumerate(disciplines):
                if idx == 0:
                    card["Discipline"] = i
                else:
                    card["Discipline"] += f"/{i}"

        elif "&" in card["Discipline"]:
            disciplines = card["Discipline"].split(" & ")
            disciplines = sorted(disciplines)
            for idx, i in enumerate(disciplines):
                if idx == 0:
                    card["Discipline"] = i
                else:
                    card["Discipline"] += f" & {i}"

    # Multi-types to alphabetic order
    if card["Type"]:
        if "/" in card["Type"]:
            types = card["Type"].split("/")
            types = sorted(types)
            for idx, i in enumerate(types):
                if idx == 0:
                    card["Type"] = i
                else:
                    card["Type"] += f"/{i}"

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
                    set_name = "V5" if "PL" not in precon else "V5L"
                    if m := re.match(r"^(\D+)([0-9]+)?", precon):
                        card["Set"][set_name][m.group(1)] = m.group(2)

            else:
                for precon in precons:
                    if set[0] in ["KoT", "HttB"] and (m := re.match(r"^(A|B)([0-9]+)?", precon)):
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
        for cardtype in i["library"]["cards"]:
            for c in cardtype["cards"]:
                if c["id"] == card["Id"]:
                    card["Twd"] += 1

    # Rename legacy clans and disciplines
    card["Clan"] = (
        card["Clan"].replace("Follower of Set", "Ministry").replace("Assamite", "Banu Haqim")
    )

    card["Card Text"] = re.sub("[{}]", "", card["Card Text"])
    card["Card Text"] = (
        card["Card Text"]
        .replace("Assamites", "Banu Haqim")
        .replace("Assamite", "Banu Haqim")
        .replace("Followers of Set", "Ministers")
        .replace("Follower of Set", "Minister")
        .replace("Thaumaturgy", "Blood Sorcery")
    )
    card["Discipline"] = card["Discipline"].replace("Thaumaturgy", "Blood Sorcery")

    match card["Blood Cost"]:
        case "":
            card["Blood Cost"] = 0
        case "X":
            card["Blood Cost"] = "X"
        case _:
            card["Blood Cost"] = int(card["Blood Cost"])

    match card["Pool Cost"]:
        case "":
            card["Pool Cost"] = 0
        case "X":
            card["Pool Cost"] = "X"
        case _:
            card["Pool Cost"] = int(card["Pool Cost"])

    match card["Conviction Cost"]:
        case "":
            card["Conviction Cost"] = 0
        case "X":
            card["Conviction Cost"] = "X"
        case _:
            card["Conviction Cost"] = int(card["Conviction Cost"])

    card_ready = {
        "aka": card["Aka"],
        "artist": card["Artist"],
        "ascii": unidecode(card["Name"]),
        "banned": card["Banned"],
        "blood": card["Blood Cost"],
        "burn": card["Burn Option"],
        "clan": card["Clan"],
        "conviction": card["Conviction Cost"],
        "discipline": card["Discipline"],
        "id": card["Id"],
        "name": card["Name"],
        "path": card["Path"] if "Path" in card else "",
        "pool": card["Pool Cost"],
        "requirement": card["Requirement"].lower(),
        "rulings": rulings[str(card["Id"])] if str(card["Id"]) in rulings else [],
        "set": card["Set"],
        "text": card["Card Text"],
        "twd": card["Twd"],
        "type": card["Type"],
    }

    if card["Type"] == "Master" and ("trifle" in card["Card Text"].lower()):
        card_ready["trifle"] = True

    if "Playtest Old" in card and card["Playtest Old"]:
        card_ready["playtest_old"] = True

    return card_ready


def generate_cards(csv_cards, cardbase_file, cardbase_file_min):
    pool = multiprocessing.Pool(processes=4)
    fixed_cards = pool.map(generate_card, csv_cards)

    cardbase = {}
    for card in fixed_cards:
        cardbase[card["id"]] = card

    json.dump(cardbase, cardbase_file_min, separators=(",", ":"))
    json.dump(cardbase, cardbase_file, indent=4, separators=(",", ":"))


with (
    open("vteslib.csv", "r", encoding="utf-8-sig") as cardbase_csv_main,
    open("cardbase_lib.json", "w", encoding="utf8") as cardbase_file,
    open("cardbase_lib.min.json", "w", encoding="utf8") as cardbase_file_min,
    open("artistsLib.json", "w", encoding="utf8") as artists_file,
    open("artistsLib.min.json", "w", encoding="utf8") as artists_file_min,
):
    reader_main = csv.reader(cardbase_csv_main)
    fieldnames_main = next(reader_main)
    csv_cards = list(csv.DictReader(cardbase_csv_main, fieldnames_main))
    generate_cards(csv_cards, cardbase_file, cardbase_file_min)
    generate_artists(csv_cards, artists_file, artists_file_min)

with (
    open("playtest/vteslib_playtest.csv", "r", encoding="utf-8-sig") as cardbase_csv_playtest,
    open("playtest/cardbase_lib_playtest.json", "w", encoding="utf8") as cardbase_file,
    open("playtest/cardbase_lib_playtest.min.json", "w", encoding="utf8") as cardbase_file_min,
):
    reader_playtest = csv.reader(cardbase_csv_playtest)
    fieldnames_playtest = next(reader_playtest)
    csv_cards_playtest = csv.DictReader(cardbase_csv_playtest, fieldnames_playtest)
    generate_cards(csv_cards_playtest, cardbase_file, cardbase_file_min)
