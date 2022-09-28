import requests
import json
import unicodedata


def letters_to_ascii(text):
    return "".join(
        c for c in unicodedata.normalize("NFD", text) if unicodedata.category(c) != "Mn"
    )


with open("amaranth_response.json", "r") as amaranth_response_file, open(
    "cardbase_crypt.json", "r"
) as crypt_file, open("cardbase_lib.json", "r") as library_file, open(
    "amaranth_ids.json", "w"
) as amaranth_ids, open(
    "amaranth_ids.min.json", "w"
) as amaranth_ids_min:
    crypt = json.load(crypt_file).values()
    library = json.load(library_file).values()
    amaranth_cards = json.load(amaranth_response_file)["result"]

    ids = {}

    for i in amaranth_cards:
        name = letters_to_ascii(i["name"].lower())
        if i["type"] == "Imbued" or i["type"] == "Vampire":
            for card in crypt:
                if " (ADV)" in i["name"]:
                    if name[:-6] in card["ASCII Name"].lower():
                        if card["Adv"] and card["Adv"][0]:
                            ids[str(i["id"])] = card["Id"]
                            break

                else:
                    if name == card["ASCII Name"].lower():
                        if not card["Adv"] or (card["Adv"] and not card["Adv"][0]):
                            ids[str(i["id"])] = card["Id"]
                            break

        else:
            for card in library:
                if (
                    name == card["ASCII Name"].lower()
                    or i["name"].lower() == card["Name"].lower()
                ):
                    ids[str(i["id"])] = card["Id"]
                    break

    json.dump(ids, amaranth_ids_min, separators=(",", ":"))
    json.dump(ids, amaranth_ids, indent=4, separators=(",", ":"))
