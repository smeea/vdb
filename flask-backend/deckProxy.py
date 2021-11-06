from fpdf import FPDF
from unidecode import unidecode
import re
import base64
import os.path
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id


def deckProxy(input):
    try:
        cards = {}
        for k, v in input.items():
            k = int(k)
            name = None

            if k > 200000 and v['q'] > 0:
                card = get_crypt_by_id(k)
                name = card['Name']
                if card['Adv'] and card['Adv'][0]:
                    name += 'adv'
                if card['New']:
                    name += f"g{card['Group']}"
            elif k < 200000 and v['q'] > 0:
                name = get_library_by_id(k)['Name']

            filename = unidecode(re.sub('[\\W]', '', name)).lower() + '.jpg'
            file = None
            if 'set' in v and os.path.exists(
                    f"./cards/set/{v['set']}/{filename}"):
                file = f"./cards/set/{v['set']}/{filename}"
            else:
                file = f"./cards/{filename}"

            cards[name] = {
                'file': file,
                'q': v['q'],
            }

        cardlist = []

        for card in sorted(cards.keys()):
            for i in range(cards[card]['q']):
                cardlist.append(cards[card])

        pdf = FPDF('P', 'mm', 'A4')

        w = 63
        h = 88
        gap = 0.2
        left_margin = 10
        top_margin = 10

        x_counter = 0
        y_counter = 0

        pdf.add_page()
        pdf.set_fill_color(40, 40, 40)

        page = 1

        for c in cardlist:
            pdf.rect((left_margin + x_counter * (w + gap)),
                     (top_margin + y_counter * (h + gap)), (w + gap),
                     (h + gap), 'F')

            pdf.image(c['file'], (w + gap) * x_counter + left_margin,
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
