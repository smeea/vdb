import json
import re
from unidecode import unidecode

with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)

with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def inventoryImportParse(deckText):
    linesArray = deckText.splitlines()
    cards = {}
    cardbase = {}

    for card in crypt:
        adv = True if card['Adv'] and card['Adv'][0] else False
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()
        if adv:
            name += 'adv'

        cardbase[name] = str(card['Id'])

    for card in library:
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()
        cardbase[name] = str(card['Id'])

    for i in linesArray:
        cardname = ''
        quantity = 0

        if '(ADV)' in i:
            if cardMatch := re.match(
                    r'^ *([0-9]+)x?\s+(.*?)(\s\(ADV\))(\s+\d+.*)', i):
                cardname = cardMatch.group(2) + 'adv'
                quantity = int(cardMatch.group(1))

            elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)(\s\(ADV\))', i):
                cardname = cardMatch.group(2) + 'adv'
                quantity = int(cardMatch.group(1))

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*?)(\s+\d+.*)', i):
            cardname = cardMatch.group(2)
            quantity = int(cardMatch.group(1))

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)', i):
            cardname = cardMatch.group(2)
            quantity = int(cardMatch.group(1))

        cardname = re.sub(r'\W', '', unidecode(cardname)).lower()
        if cardname in cardbase:
            id = cardbase[cardname]
            cards[id] = quantity

    return (cards)
