import re
from unidecode import unidecode


def get_card_name(cardname):
    if cardname.startswith("The "):
        return re.sub(
            r"\W", "", unidecode(f"{cardname.removeprefix('The ')}, The")
        ).lower()
    else:
        return re.sub(r"\W", "", unidecode(cardname)).lower()


def import_parse_card(i, cardbase):
    id = None
    quantity = None

    # CRYPT
    if "(ADV)" in i:
        cardname = ""
        if cardMatch := re.match(r"^\s*([0-9]+)x?\s+(.*?)(\s\(ADV\))(\s+\d+.*)", i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)

        elif cardMatch := re.match(r"^\s*([0-9]+)x?\s+(.*)(\s\(ADV\))", i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)

        cardname = get_card_name(cardname)

        if cardname in cardbase and "adv" in cardbase[cardname]:
            id = cardbase[cardname]["adv"]

    elif " (G" in i:
        if cardMatch := re.match(r"^\s*([0-9]+)x?\s+(.*)\s\(G(.*)\)", i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)
            group = cardMatch.group(3)
            cardname = get_card_name(cardname)
            if cardname in cardbase:
                if group in cardbase[cardname]:
                    id = cardbase[cardname][group]

    elif cardMatch := re.match(r"^\s*([0-9]+)x?\s+(.*?)(\s+\d+.*):(.*)", i):

        quantity = int(cardMatch.group(1))
        cardname = cardMatch.group(2)
        group = cardMatch.group(4)
        cardname = get_card_name(cardname)

        if cardname in cardbase:
            if group in cardbase[cardname]:
                id = cardbase[cardname][group]

    # LIBRARY
    elif cardMatch := re.match(r"^\s*([0-9]+)x?\s*(.*)", i):
        quantity = int(cardMatch.group(1))
        cardname = cardMatch.group(2)
        cardname = get_card_name(cardname)
        if cardname in cardbase:
            id = cardbase[cardname]["base"]

    return [id, quantity]
