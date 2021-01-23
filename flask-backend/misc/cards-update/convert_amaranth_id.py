import requests
import json

with open("vtescrypt.json", "r") as crypt_file, open("vteslib.json", "r") as library_file, open("amaranth_ids.json", "w") as amaranth_ids:
    crypt = json.load(crypt_file)
    library = json.load(library_file)

    response = requests.get('https://amaranth.vtes.co.nz/api/cards')

    ids = {}

    for i in response.json()['result']:
        if ' (ADV)' in i['name']:
            for card in crypt:
                if i['name'][:-6].lower() in card['ASCII Name'].lower() and card['Adv']:
                    ids[str(i['id'])] = card['Id']

        else:
            for card in crypt:
                if i['name'].lower() in card['ASCII Name'].lower() and not card['Adv']:
                    ids[str(i['id'])] = card['Id']

        for card in library:
            if i['name'].lower() in card['ASCII Name'].lower():
                ids[str(i['id'])] = card['Id']

    json.dump(ids, amaranth_ids, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    # json.dump(ids, amaranth_ids, indent=4, separators=(',', ':'))
