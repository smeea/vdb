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

    for i in linesArray:
        cardname = ''
        quantity = 0
        adv = False

        if '(ADV)' in i:
            if cardMatch := re.match(
                    r'^ *([0-9]+)x?\s+(.*?)(\s\(ADV\))(\s+\d+.*)', i):
                cardname = cardMatch.group(2).lower()
                quantity = int(cardMatch.group(1))
                adv = True

            elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)(\s\(ADV\))', i):
                cardname = cardMatch.group(2).lower()
                quantity = int(cardMatch.group(1))
                adv = True

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*?)(\s+\d+.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

        if not adv:
            for card in crypt:
                if (cardname == card['Name'].lower()
                        or cardname == unidecode(
                            card['Name'].lower())) and not card['Adv']:
                    cards[str(card['Id'])] = quantity

            for card in library:
                if cardname == card['Name'].lower(
                ) or cardname == unidecode(card['Name'].lower()):
                    cards[str(card['Id'])] = quantity

        else:
            for card in crypt:
                if (cardname == card['Name'].lower()
                        or cardname == unidecode(
                            card['Name'].lower())) and card['Adv']:
                    cards[str(card['Id'])] = quantity

    return (cards)
