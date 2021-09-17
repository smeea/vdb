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
                cardname = cardMatch.group(2)
                quantity = int(cardMatch.group(1))
                adv = True

            elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)(\s\(ADV\))', i):
                cardname = cardMatch.group(2)
                quantity = int(cardMatch.group(1))
                adv = True

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*?)(\s+\d+.*)', i):
            cardname = cardMatch.group(2)
            quantity = int(cardMatch.group(1))

        elif cardMatch := re.match(r'^ *([0-9]+)x?\s+(.*)', i):
            cardname = cardMatch.group(2)
            quantity = int(cardMatch.group(1))

        cardname = re.sub(r'\W', '', unidecode(cardname)).lower()

        for card in crypt:
            csv_cardname = re.sub(r'\W', '', unidecode(card['Name'])).lower()

            card_adv = False
            if card['Adv'] and card['Adv'][0]:
                card_adv = True

            if (cardname == csv_cardname):
                if adv and card_adv:
                    cards[str(card['Id'])] = quantity
                if not adv and not card_adv:
                    cards[str(card['Id'])] = quantity

        for card in library:
            csv_cardname = re.sub(r'\W', '', unidecode(card['Name'])).lower()

            if cardname == csv_cardname:
                cards[str(card['Id'])] = quantity

    return (cards)
