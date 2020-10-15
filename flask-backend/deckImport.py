import json
import re
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)

with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def deckImport(deckText):
    linesArray = deckText.splitlines()
    deck = {}
    for i in linesArray:
        cardname = ''
        quantity = 0
        adv = False

        if '(ADV)' in i:
            if cardMatch := re.match(
                    r'^([0-9]+)x?\s+(.*?)(\s\(ADV\))(\s+\d+.*)', i):
                cardname = cardMatch.group(2).lower()
                quantity = int(cardMatch.group(1))
                adv = True

            elif cardMatch := re.match(r'^([0-9]+)x?\s+(.*)(\s\(ADV\))', i):
                cardname = cardMatch.group(2).lower()
                quantity = int(cardMatch.group(1))
                adv = True

        elif cardMatch := re.match(r'^([0-9]+)x?\s+(.*?)(\s+\d+.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

        elif cardMatch := re.match(r'^([0-9]+)x?\s+(.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

        if not adv:
            for card in crypt:
                if (cardname == card['Name'].lower()
                        or cardname == letters_to_ascii(
                            card['Name'].lower())) and not card['Adv']:
                    deck[str(card['Id'])] = quantity

            for card in library:
                if cardname == card['Name'].lower(
                ) or cardname == letters_to_ascii(card['Name'].lower()):
                    deck[str(card['Id'])] = quantity

        else:
            for card in crypt:
                if (cardname == card['Name'].lower()
                        or cardname == letters_to_ascii(
                            card['Name'].lower())) and card['Adv']:
                    deck[str(card['Id'])] = quantity

    return (deck)
