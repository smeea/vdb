import json
import re
import csv
from openpyxl import Workbook
import base64
import io


def deckExport(d, format):
    try:
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
                        if maxCrypt < v:
                            maxCrypt = v
                    elif k < 200000:
                        library[k] = {'c': libraryBase[str(k)], 'q': v}
                        if maxLibrary < v:
                            maxLibrary = v

        deck = []

        deck_name = d['name']
        if 'branch_name' in d and d['branch_name']:
            deck_name += f" [{d['branch_name']}]"

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

        elif format == 'jol':
            sorted_crypt = sorted(crypt.values(), key=lambda x: x['c']['Name'])
            for i in sorted_crypt:
                q = i['q']
                c = i['c']
                name = c['ASCII Name'].replace('"', "'")
                if c['Adv'] and c['Adv'][0]:
                    name = f"{name} (ADV)"
                if c['New']:
                    name = f"{name} (G{c['Group']})"

                deck.append(f"{q}x{name}\n")

            sorted_library = sorted(library.values(),
                                    key=lambda x: x['c']['Name'])
            for i in sorted_library:
                q = i['q']
                c = i['c']
                name = c['ASCII Name'].replace('"', "'")
                deck.append(f"{q}x{name}\n")

        elif format == 'lackey':
            # Library export
            sorted_library_keys = sorted(library,
                                         key=lambda x:
                                         (library[x]['c']['Name']))

            for id in sorted_library_keys:
                q = library[id]['q']
                c = library[id]['c']
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

        elif format == 'text' or format == 'twd':
            # Crypt export
            disciplinesList = {
                'Auspex': 'aus',
                'Abombwe': 'abo',
                'Animalism': 'ani',
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
                'Thaumaturgy': 'tha',
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

            cryptTotalCap = 0
            capacityList = []

            for k, v in crypt.items():
                cryptTotalCap += v['c']['Capacity'] * v['q']
                for x in range(v['q']):
                    capacityList.append(v['c']['Capacity'])

            cryptTotalCards = len(capacityList)
            cryptAvg = cryptTotalCap / cryptTotalCards if cryptTotalCards else 0

            cryptMin = 0
            cryptMax = 0
            capacityList.sort()

            counter = 4 if len(capacityList) >= 4 else len(capacityList)
            for i in range(counter):
                cryptMin += capacityList[i]
                cryptMax += capacityList[-i - 1]

            deck.append(f"Deck Name: {deck_name}\n")
            deck.append(f"Author: {d['author']}\n")
            deck.append(f"Description: {d['description']}\n")
            deck.append("\n")

            cryptTitle = 'Crypt (' + str(
                cryptTotalCards) + ' cards, min=' + str(
                    cryptMin) + ' max=' + str(cryptMax) + ' avg=' + str(
                        round(cryptAvg, 2)) + ')\n'

            if format == 'twd':
                cryptSub = re.sub('.', '-', cryptTitle)
            elif format == 'text':
                cryptSub = re.sub('.', '=', cryptTitle)

            deck.append(cryptTitle)
            deck.append(cryptSub)

            if format == 'text':
                sorted_crypt = sorted(sorted(sorted(
                    crypt.values(), key=lambda x: x['c']['Name']),
                                             key=lambda x: x['c']['Capacity'],
                                             reverse=True),
                                      key=lambda x: x['q'],
                                      reverse=True)
            else:
                sorted_crypt = sorted(crypt.values(),
                                      key=lambda x: x['c']['Name'])

            cryptExport = {}
            longestName = 0
            longestTitle = 0
            longestCapacity = 0
            longestDisciplines = 0

            for i in sorted_crypt:
                q = i['q']
                c = i['c']

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

                if format == 'text':
                    deck.append(f"{' ' * quantitySpaces}{v['Quantity']}x ")
                else:
                    deck.append(f"{v['Quantity']}x{' ' * quantitySpaces} ")
                deck.append(v['Name'] + ' ' * nameSpaces)
                deck.append(' ' * capacitySpaces + str(v['Capacity']) + '  ')
                deck.append(v['Disciplines'] + ' ' * disSpaces)
                deck.append(v['Title'] + ' ' * titleSpaces)
                deck.append(v['Clan'] + ':' + v['Group'] + '\n')

            deck.append("\n")

            # Library export
            byType = {}
            byTypeTotal = {}

            libraryTotal = 0

            for k, v in library.items():
                libraryTotal += v['q']
                cardType = v['c']['Type']
                cardName = v['c']['Name']
                if cardType not in byType:
                    byType[cardType] = {}
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] = v['q']
                else:
                    byType[cardType][cardName] = v['q']
                    byTypeTotal[cardType] += v['q']

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

            libraryTitle = f"Library ({libraryTotal} cards)\n"
            deck.append(libraryTitle)

            if format == 'text':
                librarySub = re.sub('.', '=', libraryTitle)
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
                        if format == 'text':
                            deck.append(f"{' ' * quantitySpaces}{q}x {k}\n")
                        else:
                            deck.append(f"{q}x{' ' * quantitySpaces} {k}\n")

                    deck.append('\n')

        deck_str = ''.join(deck)

        return {'name': deck_name, 'format': format, 'deck': deck_str}

    except Exception:
        pass
