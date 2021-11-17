import json
import re
from unidecode import unidecode
from importParseCard import importParseCard

with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)

with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def inventoryImport(deckText):
    linesArray = deckText.splitlines()
    cards = {}
    cardbase = {}

    for card in crypt:
        adv = True if card['Adv'] and card['Adv'][0] else False
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()

        if name not in cardbase:
            cardbase[name] = {
                'base': card['Id'],
                card['Group']: card['Id']
            }
        elif adv:
            cardbase[name]['adv'] = card['Id']
        else:
            cardbase[name][card['Group']] = card['Id']

    for card in library:
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()
        cardbase[name] = {
            'base': str(card['Id'])
        }

    for i in linesArray:
        id, quantity = importParseCard(i, cardbase)
        if id and quantity:
            cards[id] = quantity

    return (cards)
