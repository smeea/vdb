import re
from unidecode import unidecode


def importParseCard(i, cardbase):
    id = None
    quantity = None

    if '(ADV)' in i:
        cardname = ''
        if cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*?)(\s\(ADV\))(\s+\d+.*)',
                                 i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)(\s\(ADV\))', i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)

        cardname = re.sub(r'\W', '', unidecode(cardname)).lower()
        if cardname in cardbase:
            id = cardbase[cardname]['adv']

    elif ' (G' in i:
        if cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)\s\(G(.*)\)', i):
            quantity = int(cardMatch.group(1))
            cardname = cardMatch.group(2)
            group = cardMatch.group(3)
            cardname = re.sub(r'\W', '', unidecode(cardname)).lower()
            if cardname in cardbase:
                if group in cardbase[cardname]:
                    id = cardbase[cardname][group]

    elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*?)(\s+\d+.*):(.*)', i):
        quantity = int(cardMatch.group(1))
        cardname = cardMatch.group(2)
        group = cardMatch.group(4)
        cardname = re.sub(r'\W', '', unidecode(cardname)).lower()

        if cardname in cardbase:
            if group in cardbase[cardname]:
                id = cardbase[cardname][group]

    elif cardMatch := re.match(r'^ *([0-9]+)x?(.*)', i):
        quantity = int(cardMatch.group(1))
        cardname = cardMatch.group(2)
        cardname = re.sub(r'\W', '', unidecode(cardname)).lower()
        if cardname in cardbase:
            id = cardbase[cardname]['base']

    return ([id, quantity])
