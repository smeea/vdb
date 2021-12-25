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

    for i in response.json()['result']:
        name = letters_to_ascii(i['name'].lower())
        if i['type'] == 'Imbued' or i['type'] == 'Vampire':
            for card in crypt:
                if ' (ADV)' in i['name']:
                    if name[:-6] in card['ASCII Name'].lower():
                        if card['Adv'] and card['Adv'][0]:
                            ids[str(i['id'])] = card['Id']
                            break

                else:
                    if name == card['ASCII Name'].lower():
                        if not card['Adv'] or (card['Adv']
                                               and not card['Adv'][0]):
                            ids[str(i['id'])] = card['Id']
                            break

        else:
            for card in library:
                if name == card['ASCII Name'].lower() or i['name'].lower(
                ) == card['Name'].lower():
                    ids[str(i['id'])] = card['Id']
                    break

    # json.dump(ids, amaranth_ids, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(ids, amaranth_ids, indent=4, separators=(',', ':'))
