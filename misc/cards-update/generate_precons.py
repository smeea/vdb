import json

bundles = {
    "NB": {
        "PM": {},
        "PN": {},
        "PTo": {},
        "PTr": {},
        "PV": {},
    },
    "V5A": {
        "PBh": {},
        "PMin": {},
        "PB": {},
        "PG": {},
    },
    "KSU": {
        "AU": {},
        "DM": {},
        "TUA": {},
        "TUB": {},
    },
    "V5": {
        "PM": {},
        "PN": {},
        "PTo": {},
        "PTr": {},
        "PV": {},
    },
    "SP": {
        "LB": {},
        "PwN": {},
        "DoF": {},
        "PoS": {},
    },
    "HttBR": {
        "A": {},
        "B": {},
    },
    "KoTR": {
        "A": {},
        "B": {},
    },
    "25th": {
        "": {},
    },
    "FB": {
        "PM": {},
        "PN": {},
        "PTo": {},
        "PTr": {},
        "PV": {},
    },
    "Anthology": {
        "": {},
    },
    "LK": {
        "": {},
    },
    "HttB": {
        "PKia": {},
        "PSam": {},
        "PSal": {},
        "PGar": {},
    },
    "KoT": {
        "PB": {},
        "PM": {},
        "PT": {},
        "PV": {},
    },
    "BSC": {
        "X": {},
    },
    "LotN": {
        "PA": {},
        "PS": {},
        "PG": {},
        "PR": {},
    },
    "Third": {
        "PB": {},
        "PM": {},
        "PTr": {},
        "PTz": {},
    },
    "LoB": {
        "PA": {},
        "PG": {},
        "PI": {},
        "PO": {},
    },
    "KMW": {
        "PAl": {},
        "PAn": {},
        "PB": {},
        "PG": {},
    },
    "Tenth": {
        "A": {},
        "B": {},
    },
    "BH": {
        "PM": {},
        "PN": {},
        "PTo": {},
        "PTr": {},
    },
    "Anarchs": {
        "PAB": {},
        "PAG": {},
        "PG": {},
    },
    "CE": {
        "PB": {},
        "PM": {},
        "PN": {},
        "PTo": {},
        "PTr": {},
        "PV": {},
    },
    "FN": {
        "PA": {},
        "PS": {},
        "PG": {},
        "PR": {},
    },
    "SW": {
        "PB": {},
        "PL": {},
        "PT": {},
        "PV": {},
    },
}

with open("cardbase_crypt.json",
          "r") as crypt_file, open("cardbase_lib.json", "r") as library_file, open(
              "preconDecks.json", "w") as precons_file:
    crypt = list(json.load(crypt_file).values())
    library = list(json.load(library_file).values())

    for card in crypt + library:
        for card_set, card_precons in card["Set"].items():
            if card_set in bundles:
                for precon in bundles[card_set].keys():
                    if precon in card_precons:
                        bundles[card_set][precon][card["Id"]] = int(
                            card_precons[precon])

    # json.dump(precons, precons_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(bundles, precons_file, indent=4, separators=(',', ':'))
