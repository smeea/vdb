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

def deck_parse_import(deckText):
    linesArray = deckText.splitlines()
    deck = {}
    for i in linesArray:
        if cardMatch := re.match(r'^([0-9]+)x?\s+(.*?)(\s+\d+.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

            for card in crypt:
                if cardname == card['Name'].lower() or cardname == letters_to_ascii(
                        card['Name'].lower()):
                    deck[card['Id']] = quantity

            for card in library:
                if cardname == card['Name'].lower() or cardname == letters_to_ascii(
                        card['Name'].lower()):
                    deck[card['Id']] = quantity

        elif cardMatch := re.match(r'^([0-9]+)x?\s+(.*)', i):
            cardname = cardMatch.group(2).lower()
            quantity = int(cardMatch.group(1))

            for card in crypt:
                if cardname == card['Name'].lower() or cardname == letters_to_ascii(
                        card['Name'].lower()):
                    deck[card['Id']] = quantity

            for card in library:
                if cardname == card['Name'].lower() or cardname == letters_to_ascii(
                        card['Name'].lower()):
                    deck[card['Id']] = quantity

    return(deck)
