import json
import re
from unidecode import unidecode

with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)

with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def deckImport(deckText):
    linesArray = deckText.splitlines()
    deck = {
        'name': 'New Imported Deck',
        'author': '',
        'description': '',
        'cards': {}
    }
    for i in linesArray:
        cardname = ''
        quantity = 0
        adv = False

        if nameMatch := re.match(r'^Deck Name: (.+)', i):
            deck['name'] = nameMatch.group(1)
        if nameMatch := re.match(r'^Author: (.+)', i):
            deck['author'] = nameMatch.group(1)
        if nameMatch := re.match(r'^Description: (.+)', i):
            deck['description'] = nameMatch.group(1)

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

        for card in crypt:
            card_adv = False
            if card['Adv'] and card['Adv'][0]:
                card_adv = True

            if (cardname == card['Name'].lower()
                    or cardname == unidecode(card['Name'].lower())):
                if adv and card_adv:
                    deck['cards'][str(card['Id'])] = quantity
                if not adv and not card_adv:
                    deck['cards'][str(card['Id'])] = quantity

        for card in library:
            if cardname == card['Name'].lower() or cardname == unidecode(
                    card['Name'].lower()):
                deck['cards'][str(card['Id'])] = quantity

    return (deck['name'], deck['author'], deck['description'], deck['cards'])
