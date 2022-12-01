import json
import re
from unidecode import unidecode
from import_parse_card import import_parse_card


with open("amaranth_response.json", "r") as amaranth_response_file, open(
    "cardbase_crypt.json", "r"
) as crypt_file, open("cardbase_lib.json", "r") as library_file, open(
    "amaranth_ids.json", "w"
) as amaranth_ids, open(
    "amaranth_ids.min.json", "w"
) as amaranth_ids_min:
    crypt = json.load(crypt_file).values()
    library = json.load(library_file).values()
    amaranth_cards = json.loads(
        amaranth_response_file.readline().replace("app.rows            = ", "")
    )
    cardbase = {}
    for card in crypt:
        adv = True if card["Adv"] and card["Adv"][0] else False
        name = re.sub(r"\W", "", unidecode(card["Name"])).lower()

        if name not in cardbase:
            cardbase[name] = {"base": card["Id"], card["Group"]: card["Id"]}
        elif adv:
            cardbase[name]["adv"] = card["Id"]
        else:
            cardbase[name][card["Group"]] = card["Id"]

    for card in library:
        name = re.sub(r"\W", "", unidecode(card["Name"])).lower()
        cardbase[name] = {"base": card["Id"]}

    ids = {}
    for c in amaranth_cards:
        if c[0] == "id":
            continue
        amaranth_id = c[0]
        name = c[1] if c[1] != "Ana Rita Montaia" else "Ana Rita Montana"
        entry = f"1x {name}"
        if c[2] == 10:  # 10 is Vampires
            entry += f" (G{c[4]})"

        vekn_id, _ = import_parse_card(entry, cardbase)
        if vekn_id:
            ids[str(amaranth_id)] = vekn_id

    json.dump(ids, amaranth_ids_min, separators=(",", ":"))
    json.dump(ids, amaranth_ids, indent=4, separators=(",", ":"))
