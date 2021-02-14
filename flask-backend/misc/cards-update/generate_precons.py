import json
import re

bundles = {
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
        "": {},
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
        "PF": {},
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

with open("vtescrypt.json", "r") as crypt_file, open("vteslib.json", "r+") as library_file, open("precons.json", "w") as precons_file:
    crypt = json.load(crypt_file)
    library = json.load(library_file)

    for card in crypt + library:
        for card_set, card_precons in card["Set"].items():
            if card_set in bundles:
                for precon in bundles[card_set].keys():
                    if precon in card_precons:
                        if q_match := re.match(r'^(\D+)([0-9]+)?', card_precons):
                            if q_match.group(2):
                                q = q_match.group(2)
                            else:
                                q = 1
                        else:
                            q = card["Set"][card_set]

                        bundles[card_set][precon][card["Id"]] = int(q)

    # json.dump(precons, precons_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(bundles, precons_file, indent=4, separators=(',', ':'))
