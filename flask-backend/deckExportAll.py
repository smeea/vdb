import base64
import zipfile
import json
import sys
from deckExport import deckExport

def deckExportAll(decks, format):
    mydecks = []
    for d in decks:
        deck = {
            'cards': d.cards,
            'name': d.name,
            'author': d.author.public_name,
            'description': d.description,
        }
        result = deckExport(deck, format)
        mydecks.append({'name': result['name'], 'format': format, 'deck': result['deck']})

    return (mydecks)
