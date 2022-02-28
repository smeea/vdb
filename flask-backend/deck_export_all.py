from deck_export import deck_export
import json


def deck_export_all(decks, format):
    with open("cardbase_crypt.json", "r") as crypt_file, open(
        "cardbase_lib.json", "r"
    ) as library_file:
        crypt_base = json.load(crypt_file)
        library_base = json.load(library_file)

        mydecks = []
        for d in decks:
            deck = {
                "cards": d.cards,
                "name": d.name,
                "author": d.author.public_name,
                "branch_name": d.branch_name if d.branch_name else "",
                "description": d.description,
            }

            result = deck_export(deck, format, crypt_base, library_base)

            if format == "csv" or format == "xlsx":
                pass
            else:
                mydecks.append(
                    {"name": result["name"], "format": format, "deck": result["deck"]}
                )

        return mydecks
