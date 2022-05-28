import csv
import re
import json

languages = ["es-ES", "fr-FR", "pt-PT"]

for lang in languages:
    for i in ["crypt", "lib"]:
        filename_in = f"vtes{i}.{lang}.csv"
        filename_out = f"cardbase_{i}.{lang}.json"

        with open(filename_in, "r", encoding="utf8") as f_in, open(
            filename_out, "w", encoding="utf8"
        ) as f_out:

            reader = csv.reader(f_in)
            fieldnames = next(reader)
            csv_cards = csv.DictReader(f_in, fieldnames)
            cards_localized = {}

            for card in csv_cards:
                card["Card Text"] = re.sub("[{}]", "", card["Card Text"])
                card["Card Text"] = re.sub(
                    r"\[(\w+)\s*(\w*)\]", r"[\1\2]", card["Card Text"]
                )
                card_name = card[f"Name {lang}"]
                if not card_name:
                    card_name = card["Name"]

                cards_localized[card["Id"]] = {
                    "Name": card_name,
                    "Card Text": card["Card Text"],
                }

            # json.dump(cards, f_out, separators=(',', ':'))
            # Use this instead, for output with indentation (e.g. for debug)
            json.dump(cards_localized, f_out, indent=4, separators=(",", ":"))
