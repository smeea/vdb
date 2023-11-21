import csv
import re
import json
import unicodedata


def letters_to_ascii(text):
    return "".join(
        c for c in unicodedata.normalize("NFD", text) if unicodedata.category(c) != "Mn"
    )


artist_fixes = {
    "Alejandro Collucci": "Alejandro Colucci",
    "Chet Masterz": "Chet Masters",
    "Dimple": "Nicolas Bigot",
    "EM Gist": "Erik Gist",
    "G. Goleash": "Grant Goleash",
    "Gin\u00e9s Qui\u00f1onero-Santiago": "Gin\u00e9s Qui\u00f1onero",
    "Glenn Osterberger": "Glen Osterberger",
    "Heather V. Kreiter": "Heather Kreiter",
    'Jeff "el jefe" Holt': "Jeff Holt",
    "L. Snelly": "Lawrence Snelly",
    "Mathias Tapia": "Matias Tapia",
    "Mattias Tapia": "Matias Tapia",
    "Matt Mitchell": "Matthew Mitchell",
    "Mike Gaydos": "Michael Gaydos",
    "Mike Weaver": "Michael Weaver",
    'Nicolas "Dimple" Bigot': "Nicolas Bigot",
    "Pat McEvoy": "Patrick McEvoy",
    "Ron Spenser": "Ron Spencer",
    "Sam Araya": "Samuel Araya",
    "Sandra Chang": "Sandra Chang-Adair",
    "T. Bradstreet": "Tim Bradstreet",
    "Tom Baxa": "Thomas Baxa",
    "zelgaris": "Tomáš Zahradníček",
}

integer_fields = ["Id"]
useless_fields = ["Aka", "Flavor Text"]


def generate_artists(cardbase_csv, artists_file, artists_file_min):
    reader_main = csv.reader(cardbase_csv)
    fieldnames_main = next(reader_main)
    csv_cards = csv.DictReader(cardbase_csv, fieldnames_main)

    artists = set()
    for card in csv_cards:
        for artist in re.split("; | & ", card["Artist"]):
            if artist in artist_fixes.keys():
                artists.add(artist_fixes[artist])
            else:
                artists.add(artist)

    json.dump(sorted(artists), artists_file_min, separators=(",", ":"))
    json.dump(sorted(artists), artists_file, indent=4, separators=(",", ":"))


def generate_cards(cardbase_csv, cardbase_file, cardbase_file_min):
    reader_main = csv.reader(cardbase_csv)
    fieldnames_main = next(reader_main)
    csv_cards = csv.DictReader(cardbase_csv, fieldnames_main)
    reader_meta = csv.reader(cardbase_meta_csv)
    fieldnames_meta = next(reader_meta)
    csv_meta = csv.DictReader(cardbase_meta_csv, fieldnames_meta)
    requirements = []
    for c in csv_meta:
        requirements.append(c)

    cardbase = {}
    twda = json.load(twda_input)

    for card in csv_cards:
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
            except (ValueError):
                pass

        # ASCII-fication of name
        if card["Id"] == 101670:
            card["ASCII Name"] = "Sacre-Coeur Cathedral, France"
        elif card["Id"] == 100130:
            card["ASCII Name"] = "Bang Nakh - Tiger's Claws"
        else:
            card["ASCII Name"] = letters_to_ascii(card["Name"])

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
            card["Set"] = {"PLAYTEST": {}}
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

        # Remove useless fields
        for k in useless_fields:
            del card[k]

        artists = []
        for artist in re.split("; | & ", card["Artist"]):
            if artist in artist_fixes.keys():
                artists.append(artist_fixes[artist])
            else:
                artists.append(artist)

        card["Artist"] = artists

        # Remove {} and spaces in []
        card["Card Text"] = re.sub("[{}]", "", card["Card Text"])
        card["Card Text"] = re.sub(r"\[(\w+)\s*(\w*)\]", r"[\1\2]", card["Card Text"])

        # Add rules to card
        card["Rulings"] = []
        for c in krcg_cards:
            if c["id"] == card["Id"] and "rulings" in c:
                for rule in c["rulings"]["text"]:
                    if match := re.match(r"(.*?)\[... \S+\].*", rule):
                        text = match.group(1)
                        text = re.sub(r"{The (.+?)}", r"{\1, The}", text)
                        text = text.replace("Thaumaturgy", "Blood Sorcery")
                        text = text.replace("Assamites", "Banu Haqim")
                        text = text.replace("Assamite", "Banu Haqim")
                        text = text.replace("Followers of Set", "Ministers")
                        text = text.replace("Follower of Set", "Minister")
                        text = re.sub(r"\[(\w+)\s*(\w*)\]", r"[\1\2]", text)
                        card["Rulings"].append(
                            {
                                "text": text,
                                "refs": {},
                            }
                        )

                for id in c["rulings"]["links"].keys():
                    for i, rule in enumerate(c["rulings"]["text"]):
                        if id in rule:
                            card["Rulings"][i]["refs"][id] = c["rulings"]["links"][id]

        # Add twda info
        card["Twd"] = 0
        for i in twda:
            for cardtype in i["library"]["cards"]:
                for c in cardtype["cards"]:
                    if c["id"] == card["Id"]:
                        card["Twd"] += 1

        # Rename legacy clans and disciplines
        card["Clan"] = (
            card["Clan"]
            .replace("Follower of Set", "Ministry")
            .replace("Assamite", "Banu Haqim")
        )
        card["Card Text"] = (
            card["Card Text"]
            .replace("Assamites", "Banu Haqim")
            .replace("Assamite", "Banu Haqim")
            .replace("Followers of Set", "Ministers")
            .replace("Follower of Set", "Minister")
            .replace("Thaumaturgy", "Blood Sorcery")
        )
        card["Discipline"] = card["Discipline"].replace("Thaumaturgy", "Blood Sorcery")

        # Prepare for export
        cardbase[card["Id"]] = {
            "ASCII Name": card["ASCII Name"],
            "Artist": card["Artist"],
            "Banned": card["Banned"],
            "Blood Cost": card["Blood Cost"],
            "Burn Option": card["Burn Option"],
            "Card Text": card["Card Text"],
            "Clan": card["Clan"],
            "Conviction Cost": card["Conviction Cost"],
            "Discipline": card["Discipline"],
            "Id": card["Id"],
            "Name": card["Name"],
            "Pool Cost": card["Pool Cost"],
            "Requirement": card["Requirement"],
            "Rulings": card["Rulings"],
            "Set": card["Set"],
            "Twd": card["Twd"],
            "Type": card["Type"],
        }

    json.dump(cardbase, cardbase_file_min, separators=(",", ":"))
    json.dump(cardbase, cardbase_file, indent=4, separators=(",", ":"))


with open("vteslib.csv", "r", encoding="utf-8-sig") as cardbase_csv, open(
    "vteslibmeta.csv", "r", encoding="utf-8-sig"
) as cardbase_meta_csv, open(
    "cardbase_lib.json", "w", encoding="utf8"
) as cardbase_file, open(
    "cardbase_lib.min.json", "w", encoding="utf8"
) as cardbase_file_min, open(
    "vtes.json", "r", encoding="utf8"
) as krcg_file, open(
    "twda.json", "r"
) as twda_input:
    krcg_cards = json.load(krcg_file)
    generate_cards(cardbase_csv, cardbase_file, cardbase_file_min)

try:
    with open("vteslib_playtest.csv", "r", encoding="utf-8-sig") as cardbase_csv, open(
        "vteslibmeta.csv", "r", encoding="utf-8-sig"
    ) as cardbase_meta_csv, open(
        "cardbase_lib_playtest.json", "w", encoding="utf8"
    ) as cardbase_file, open(
        "cardbase_lib_playtest.min.json", "w", encoding="utf8"
    ) as cardbase_file_min, open(
        "vtes.json", "r", encoding="utf8"
    ) as krcg_file, open(
        "twda.json", "r"
    ) as twda_input:
        krcg_cards = json.load(krcg_file)
        generate_cards(cardbase_csv, cardbase_file, cardbase_file_min)
except Exception:
    print(
        "PLAYTEST DISABLED - NO LIBRARY PLAYTEST FILES FOUND (CONTACT PLAYTEST COORDINATOR TO GET IT)"
    )

with open("vteslib.csv", "r", encoding="utf-8-sig") as cardbase_csv, open(
    "artistsLib.json", "w", encoding="utf8"
) as artists_file, open(
    "artistsLib.min.json", "w", encoding="utf8"
) as artists_file_min:
    generate_artists(cardbase_csv, artists_file, artists_file_min)
