import csv
import re
import json

languages = ["es-ES", "fr-FR", "pt-PT"]

for lang in languages:
    for i in ["crypt", "lib"]:
        filename_in = f"vtes{i}.{lang}.csv"
        filename_out = f"cardbase_{i}.{lang}.json"
        filename_out_min = f"cardbase_{i}.{lang}.min.json"

        with open(filename_in, "r", encoding="utf8") as f_in, open(
            filename_out, "w", encoding="utf8"
        ) as f_out, open(filename_out_min, "w", encoding="utf8") as f_out_min:

            reader = csv.reader(f_in)
            fieldnames = next(reader)
            csv_cards = csv.DictReader(f_in, fieldnames)
            cards_localized = {}

            for card in csv_cards:
                card["Card Text"] = re.sub("[{}]", "", card["Card Text"])
                card["Card Text"] = re.sub(
                    r"\[(\w+)\s*(\w*)\]", r"[\1\2]", card["Card Text"]
                )

                cards_localized[card["Id"]] = {
                    "Name": card[f"Name {lang}"] if card[f"Name {lang}"] else card['Name'],
                    "Card Text": card["Card Text"].strip(),
                }

            json.dump(cards_localized, f_out_min, separators=(",", ":"))
            json.dump(cards_localized, f_out, indent=4, separators=(",", ":"))
