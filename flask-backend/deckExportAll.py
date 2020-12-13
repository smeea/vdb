import base64
import zipfile
import json
import sys
from deckExport import deckExport

def deckExportAll(decks, format):
    mydecks = []
    for deck in decks:
        d = deckExport(deck, format)
        mydecks.append({'name': d['name'], 'format': format, 'deck': d['deck']})

    return (mydecks)
