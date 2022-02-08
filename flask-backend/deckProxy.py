from fpdf import FPDF
from unidecode import unidecode
import re
import base64
import os.path
import json

with open("cardbase_crypt.json", "r") as crypt_file:
    crypt_db = json.load(crypt_file)

with open("cardbase_lib.json", "r") as library_file:
    library_db = json.load(library_file)

cardtypes_sorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
]


def deckProxy(cards, lang):
    try:
        crypt = {}
        library = {}

        for k, v in cards.items():
            k = int(k)
            card = {}
            filename = None

            if k > 200000:
                card = crypt_db[str(k)]
                card['Name'] += f"g{card['Group'].lower()}"
                if card['Adv'] and card['Adv'][0]:
                    card['Name'] += 'adv'

                filename = unidecode(re.sub('[\\W]', '',
                                            card['Name'])).lower() + '.jpg'

            elif k < 200000:
                card = library_db[str(k)]
                filename = unidecode(re.sub('[\\W]', '',
                                            card['Name'])).lower() + '.jpg'

            file = None
            if 'set' in v and os.path.exists(
                    f"./cards/set/{v['set']}/{filename}"):
                file = f"./cards/set/{v['set']}/{filename}"
            else:
                if os.path.exists(f"./cards/{lang}/{filename}"):
                    file = f"./cards/{lang}/{filename}"
                else:
                    file = f"./cards/en-EN/{filename}"

            if k > 200000 and v['q'] > 0:
                crypt[card['Name']] = {
                    'file': file,
                    'q': v['q'],
                }

            elif k < 200000 and v['q'] > 0:
                if card['Type'] not in library:
                    library[card['Type']] = {}

                library[card['Type']][card['Name']] = {
                    'file': file,
                    'q': v['q'],
                }

        cardlist = []

        for card in sorted(crypt.keys()):
            for i in range(crypt[card]['q']):
                cardlist.append(crypt[card]['file'])

        for cardtype in cardtypes_sorted:
            if cardtype in library:
                for card in sorted(library[cardtype].keys()):
                    for i in range(library[cardtype][card]['q']):
                        cardlist.append(library[cardtype][card]['file'])

        pdf = FPDF('P', 'mm', 'A4')

        w = 63
        h = 88
        gap = 0.25
        left_margin = 10
        top_margin = 10

        x_counter = 0
        y_counter = 0

        pdf.add_page()
        pdf.set_fill_color(60, 60, 60)

        page = 1

        for c in cardlist:
            pdf.rect((left_margin + x_counter * (w + gap)),
                     (top_margin + y_counter * (h + gap)), (w + gap),
                     (h + gap), 'F')

            pdf.image(c, (w + gap) * x_counter + left_margin,
                      (h + gap) * y_counter + top_margin, w, h)

            x_counter += 1

            if x_counter == 3:
                y_counter += 1
                x_counter = 0

            if y_counter == 3 and page * 9 < len(cardlist):
                page += 1
                pdf.add_page()
                pdf.set_fill_color(40, 40, 40)
                y_counter = 0

        output = pdf.output(dest='S').encode('latin-1')
        return base64.b64encode(output)

    except Exception:
        pass
