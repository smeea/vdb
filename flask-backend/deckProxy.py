from fpdf import FPDF
import unicodedata
import re
import base64
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id

def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')

def deckProxy(cards):
    try:
        crypt = {}
        library = {}
        for k, v in cards.items():
            k = int(k)
            if k > 200000 and v > 0:
                card = get_crypt_by_id(k)
                name = card['Name']
                if card['Adv']:
                    name += 'adv'

                crypt[letters_to_ascii(re.sub('[\\W]', '', name)).lower() + '.jpg'] = v
            elif k < 200000 and v > 0:
                name = get_library_by_id(k)['Name']
                library[letters_to_ascii(re.sub('[\\W]', '', name)).lower() + '.jpg'] = v

        imagelist = []

        for card in sorted(crypt.keys()):
            for i in range(crypt[card]):
                imagelist.append(card)

        for card in sorted(library.keys()):
            for i in range(library[card]):
                imagelist.append(card)

        pdf = FPDF('P', 'mm', 'A4')

        w = 63
        h = 88
        gap = 0.5
        left_margin = 10
        top_margin = 10

        x_counter = 0
        y_counter = 0

        pdf.add_page()

        for image in imagelist:
            pdf.image('./cards/' + image, (w + gap) * x_counter + left_margin, (h + gap) * y_counter + top_margin, w, h)

            x_counter += 1

            if x_counter == 3:
                y_counter += 1
                x_counter = 0

            if y_counter == 3:
                pdf.add_page()
                y_counter = 0

        file = pdf.output(dest='S').encode('latin-1')
        return base64.b64encode(file)

    except Exception:
        pass
