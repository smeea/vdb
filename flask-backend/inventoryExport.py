from datetime import date
import json
import re
import csv
from openpyxl import Workbook
import base64
import io


def inventoryExport(d, format):
    try:
        cryptTotal = 0
        libraryTotal = 0

        crypt = {}
        library = {}
        maxCrypt = 0
        maxLibrary = 0

        with open("cardbase_crypt.json",
                  "r") as crypt_file, open("cardbase_lib.json",
                                           "r") as library_file:
            cryptBase = json.load(crypt_file)
            libraryBase = json.load(library_file)
            for k, v in d['cards'].items():
                if v > 0:
                    k = int(k)
                    if k > 200000:
                        crypt[k] = {'c': cryptBase[str(k)], 'q': v}
                        cryptTotal += v
                        if maxCrypt < v:
                            maxCrypt = v
                    elif k < 200000:
                        library[k] = {'c': libraryBase[str(k)], 'q': v}
                        libraryTotal += v
                        if maxLibrary < v:
                            maxLibrary = v

        deck = []

        if format == 'csv':
            f = io.StringIO()
            writer = csv.writer(f)

            # Crypt export
            for i in crypt.values():
                q = i['q']
                id = i['c']['Id']
                writer.writerow([q, id])

            # Library export
            for i in library.values():
                q = i['q']
                id = i['c']['Id']
                writer.writerow([q, id])

            return base64.b64encode(f.getvalue().encode('latin-1'))

        elif format == 'xlsx':
            fb = io.BytesIO()
            wb = Workbook()
            ws_crypt = wb.active
            ws_crypt.title = "Crypt"
            ws_library = wb.create_sheet(title="Library")

            # Crypt export
            sorted_crypt = sorted(crypt.values(), key=lambda x: x['c']['Name'])
            for i in sorted_crypt:
                q = i['q']
                c = i['c']
                name = c['ASCII Name'].replace('"', "'")
                if c['Adv'] and c['Adv'][0]:
                    name = f"{name} (ADV)"
                if c['New']:
                    name = f"{name} (G{c['Group']})"

                ws_crypt.append([q, name])

            # Library export
            sorted_library = sorted(library.values(),
                                    key=lambda x: x['c']['Name'])
            for i in sorted_library:
                q = i['q']
                c = i['c']
                name = c['ASCII Name'].replace('"', "'")
                ws_library.append([q, name])

            wb.save(fb)

            return base64.b64encode(fb.getvalue())

        elif format == 'lackey':
            # Library export
            sorted_library = sorted(library.values(),
                                    key=lambda x: x['c']['Name'])

            for i in sorted_library:
                q = i['q']
                c = i['c']
                deck.append(f"{str(q)}{' ' * (8 - len(str(q)))}")
                deck.append(f"{c['ASCII Name']}\n")

            # Crypt export
            deck.append('Crypt:\n')

            sorted_crypt = sorted(crypt.values(), key=lambda x: x['c']['Name'])

            for i in sorted_crypt:
                q = i['q']
                c = i['c']
                deck.append(f"{str(q)}{' ' * (8 - len(str(q)))}")
                deck.append(f"{c['ASCII Name']}")

                if c['Adv'] and c['Adv'][0]:
                    deck.append(f" (ADV)")
                if c['New']:
                    deck.append(f" (G{c['Group']})")

                deck.append('\n')

        elif format == 'text':
            # Crypt export
            disciplinesList = {
                'Auspex': 'aus',
                'Abombwe': 'abo',
                'Animalism': 'ani',
                'Blood Sorcery': 'tha',
                'Celerity': 'cel',
                'Chimerstry': 'chi',
                'Daimoinon': 'dai',
                'Dementation': 'dem',
                'Dominate': 'dom',
                'Fortitude': 'for',
                'Melpominee': 'mel',
                'Mytherceria': 'myt',
                'Necromancy': 'nec',
                'Obeah': 'obe',
                'Obfuscate': 'obf',
                'Obtenebration': 'obt',
                'Potence': 'pot',
                'Presence': 'pre',
                'Protean': 'pro',
                'Serpentis': 'ser',
                'Sanguinus': 'san',
                'Spiritus': 'spi',
                'Temporis': 'tem',
                'Thanatosis': 'thn',
                'Quietus': 'qui',
                'Valeren': 'val',
                'Vicissitude': 'vic',
                'Visceratika': 'vis',
                'Defense': 'def',
                'Innocence': 'inn',
                'Judgment': 'jud',
                'Martyrdom': 'mar',
                'Redemption': 'red',
                'Vengeance': 'ven',
                'Vision': 'vis',
            }

            cryptUnique = len(crypt.keys())

            deck.append(f"Inventory: {d['author']}\n")
            deck.append(f"Dated: {date.today().strftime('%d %B %Y')}\n")
            deck.append("\n")

            cryptUniqueTitle = f"Crypt Unique Cards: {cryptUnique}\n"
            cryptTotalTitle = f"Crypt Total Cards: {cryptTotal}\n"

            cryptSub = re.sub('.', '=', cryptTotalTitle)

            deck.append(cryptUniqueTitle)
            deck.append(cryptTotalTitle)
            deck.append(cryptSub)

            sorted_crypt_keys = sorted(crypt,
                                       key=lambda x: (crypt[x]['c']['Name']))
            cryptExport = {}
            longestName = 0
            longestTitle = 0
            longestCapacity = 0
            longestDisciplines = 0

            for id in sorted_crypt_keys:
                q = crypt[id]['q']
                c = crypt[id]['c']

                baseDisciplines = []
                supDisciplines = []
                for i, j in c['Disciplines'].items():
                    if j == 1:
                        baseDisciplines.append(disciplinesList[i].lower())
                    elif j == 2:
                        supDisciplines.append(disciplinesList[i].upper())

                disciplines = ' '.join(baseDisciplines + supDisciplines)

                name = c['Name']
                if c['Adv'] and c['Adv'][0]:
                    name = f"{name} (ADV)"

                cryptExport[c['Id']] = {
                    'Name': name,
                    'Quantity': q,
                    'Disciplines': disciplines,
                    'Title': c['Title'],
                    'Clan': c['Clan'],
                    'Capacity': c['Capacity'],
                    'Group': c['Group']
                }

                if len(name) > longestName:
                    longestName = len(name)
                if len(c['Title']) > longestTitle:
                    longestTitle = len(c['Title'])
                if len(str(c['Capacity'])) > longestCapacity:
                    longestCapacity = len(str(c['Capacity']))
                if len(disciplines) > longestDisciplines:
                    longestDisciplines = len(disciplines)

            for k, v in cryptExport.items():
                quantitySpaces = len(str(maxCrypt)) - len(str(v['Quantity']))

                nameSpaces = longestName - len(v['Name']) + 3
                disSpaces = longestDisciplines - len(v['Disciplines']) + 3

                capacitySpaces = longestCapacity - len(str(v['Capacity']))
                titleSpaces = longestTitle - len(v['Title']) + 3

                deck.append(f"{' ' * quantitySpaces}{v['Quantity']}x ")
                deck.append(f"{v['Name']}{' ' * nameSpaces}")
                deck.append(f"{' ' * capacitySpaces}{v['Capacity']}  ")
                deck.append(f"{v['Disciplines']}{' ' * disSpaces}")
                deck.append(f"{v['Title']}{' ' * titleSpaces}")
                deck.append(f"{v['Clan']}:{v['Group']}\n")

            deck.append("\n")

            # Library export
            byTypeOrder = [
                'Master',
                'Conviction',
                'Action',
                'Action/Reaction',
                'Action/Combat',
                'Ally',
                'Equipment',
                'Political Action',
                'Retainer',
                'Power',
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

            byType = {}
            byTypeTotal = {}

            libraryUnique = len(library.keys())

            for k, v in library.items():
                cardType = v['c']['Type']
                cardName = v['c']['Name']
                if cardType not in byType:
                    byType[cardType] = {}
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] = v['q']
                else:
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] += v['q']

            libraryUniqueTitle = f"Library Unique Cards: {libraryUnique}\n"
            libraryTotalTitle = f"Library Total Cards: {libraryTotal}\n"

            librarySub = re.sub('.', '=', libraryTotalTitle)

            deck.append(libraryUniqueTitle)
            deck.append(libraryTotalTitle)
            deck.append(librarySub)

            for i in byTypeOrder:
                if i in byType:
                    typeTitle = f"{i} ({byTypeTotal[i]})\n"
                    deck.append(typeTitle)

                    if format == 'text':
                        typeSub = re.sub('.', '-', typeTitle)
                        deck.append(typeSub)

                    sorted_library_keys = sorted(byType[i].keys())
                    for k in sorted_library_keys:
                        q = byType[i][k]
                        quantitySpaces = len(str(maxLibrary)) - len(str(q))
                        deck.append(f"{' ' * quantitySpaces}{q}x {k}\n")

                    deck.append('\n')

        deck_str = ''.join(deck)

        return {
            'name': f"Inventory - {d['author']}",
            'format': format,
            'deck': deck_str
        }

    except Exception:
        pass
