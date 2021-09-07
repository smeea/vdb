import requests
import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


with open("vtescrypt.json",
          "r") as crypt_file, open("vteslib.json", "r") as library_file, open(
              "amaranth_ids.json", "w") as amaranth_ids:
    crypt = json.load(crypt_file)
    library = json.load(library_file)

    response = requests.get('https://amaranth.vtes.co.nz/api/cards')

    ids = {}

    for idx, i in enumerate(response.json()['result']):
        if ' (ADV)' in i['name']:
            for card in crypt:
                if letters_to_ascii(i['name'][:-6].lower(
                )) in card['ASCII Name'].lower() and card['Adv'][0]:
                    ids[str(i['id'])] = card['Id']

        else:
            for card in crypt:
                if letters_to_ascii(i['name'].lower(
                )) == card['ASCII Name'].lower() and not card['Adv'][0]:
                    ids[str(i['id'])] = card['Id']

        for card in library:
            if letters_to_ascii(i['name'].lower()) == card['ASCII Name'].lower(
            ) or i['name'].lower() == card['Name'].lower():
                ids[str(i['id'])] = card['Id']

    # json.dump(ids, amaranth_ids, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(ids, amaranth_ids, indent=4, separators=(',', ':'))
