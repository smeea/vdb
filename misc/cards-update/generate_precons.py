import json

bundles = {
    "FoL": {
        "": {},
    },
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
    "Anthology I": {
        "": {},
    },
    "LK": {
        "": {},
    },
    "Anthology": {
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
        "SKB": {},
        "SKM": {},
        "SKTr": {},
        "SKTz": {},
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

playtest_bundles = {
    "PLAYTEST": {
        "PR": {},
        "PSal": {},
        "PTz": {},
    },
}

with open("cardbase_crypt.json", "r") as crypt_file, open(
    "cardbase_lib.json", "r"
) as library_file, open("precon_decks.json", "w") as precons_file, open(
    "precon_decks.min.json", "w"
) as precons_file_min:
    crypt = list(json.load(crypt_file).values())
    library = list(json.load(library_file).values())

    try:
        with open("cardbase_crypt_playtest.json", "r") as crypt_playtest_file, open(
            "cardbase_lib_playtest.json", "r"
        ) as library_playtest_file:
            crypt = crypt + list(json.load(crypt_playtest_file).values())
            library = library + list(json.load(library_playtest_file).values())

            bundles = {
                **playtest_bundles,
                **bundles,
            }

    except Exception:
        pass

    for card in crypt + library:
        for card_set, card_precons in card["Set"].items():
            if card_set in bundles:
                for precon in bundles[card_set].keys():
                    if precon in card_precons:
                        bundles[card_set][precon][card["Id"]] = int(
                            card_precons[precon]
                        )

    json.dump(bundles, precons_file_min, separators=(",", ":"))
    json.dump(bundles, precons_file, indent=4, separators=(",", ":"))
