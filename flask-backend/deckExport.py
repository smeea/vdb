from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id
import re


def deckExport(d, format):
    try:
        crypt = {}
        library = {}
        for k, v in d['cards'].items():
            k = int(k)
            if k > 200000 and v > 0:
                crypt[k] = {'c': get_crypt_by_id(k), 'q': v}
            elif k < 200000 and v > 0:
                library[k] = {'c': get_library_by_id(k), 'q': v}

        deck_name = d['name']
        if 'branch_name' in d:
            deck_name += f" [{d['branch_name']}]"

        deck = ''

        if format == 'lackey':
            for k, v in library.items():
                deck += str(v['q'])
                if v['q'] < 10:
                    deck += '       '
                else:
                    deck += '      '

                deck += v['c']['ASCII Name'].replace('"', "'") + '\n'

            deck += 'Crypt:\n'

            for k, v in crypt.items():
                deck += str(v['q'])
                if v['q'] < 10:
                    deck += '       '
                else:
                    deck += '      '

                if v['c']['Adv']:
                    deck += v['c']['ASCII Name'].replace('"', "'") + ' (ADV)\n'
                else:
                    deck += v['c']['ASCII Name'].replace('"', "'") + '\n'

        elif format == 'text' or format == 'twd':

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

            deck += f"Deck Name: {deck_name}\n"
            deck += f"Author: {d['author']}\n"
            deck += f"Description: {d['description']}\n" + "\n"

            cryptTitle = 'Crypt (' + str(
                cryptTotalCards) + ' cards, min=' + str(
                    cryptMin) + ' max=' + str(cryptMax) + ' avg=' + str(
                        round(cryptAvg, 2)) + ')\n'

            if format == 'twd':
                cryptSub = re.sub('.', '-', cryptTitle)
            elif format == 'text':
                cryptSub = re.sub('.', '=', cryptTitle)

            deck += cryptTitle
            deck += cryptSub

            cryptExport = {}
            longestQuantity = 0
            longestName = 0
            longestTitle = 0
            longestCapacity = 0
            longestDisciplines = 0

            for k, v in crypt.items():
                baseDisciplines = []
                supDisciplines = []
                for i, j in v['c']['Disciplines'].items():
                    if j == 1:
                        baseDisciplines.append(disciplinesList[i].lower())
                    elif j == 2:
                        supDisciplines.append(disciplinesList[i].upper())

                disciplines = ' '.join(baseDisciplines + supDisciplines)

                name = ''

                if v['c']['Adv']:
                    name = v['c']['Name'] + ' (ADV)'
                else:
                    name = v['c']['Name']

                cryptExport[name] = {
                    'Quantity': v['q'],
                    'Disciplines': disciplines,
                    'Title': v['c']['Title'],
                    'Clan': v['c']['Clan'],
                    'Capacity': v['c']['Capacity'],
                    'Group': v['c']['Group']
                }

                if len(str(v['q'])) > longestQuantity:
                    longestQuantity = len(str(v['q']))
                if len(v['c']['Name']) > longestName:
                    longestName = len(v['c']['Name'])
                if len(v['c']['Title']) > longestTitle:
                    longestTitle = len(v['c']['Title'])
                if len(str(v['c']['Capacity'])) > longestCapacity:
                    longestCapacity = len(str(v['c']['Capacity']))
                if len(disciplines) > longestDisciplines:
                    longestDisciplines = len(disciplines)

            for k, v in cryptExport.items():
                quantitySpaces = longestQuantity - len(str(v['Quantity']))

                nameSpaces = longestName - len(k) + 3
                disSpaces = longestDisciplines - len(v['Disciplines']) + 3

                capacitySpaces = longestCapacity - len(str(v['Capacity']))
                titleSpaces = longestTitle - len(v['Title']) + 3

                deck += ' ' * quantitySpaces + str(v['Quantity']) + 'x '
                deck += k + ' ' * nameSpaces
                deck += ' ' * capacitySpaces + str(v['Capacity']) + '  '
                deck += v['Disciplines'] + ' ' * disSpaces
                deck += v['Title'] + ' ' * titleSpaces
                deck += v['Clan'] + ':' + v['Group'] + '\n'

            deck += '\n'

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

            libraryTitle = 'Library (' + str(libraryTotal) + ' cards)\n'
            deck += libraryTitle

            if format == 'text':
                librarySub = re.sub('.', '=', libraryTitle)
                deck += librarySub

            for i in byTypeOrder:
                if i in byType:
                    typeTitle = i + ' (' + str(byTypeTotal[i]) + ')\n'
                    deck += typeTitle
                    if format == 'text':
                        typeSub = re.sub('.', '-', typeTitle)
                        deck += typeSub

                    for k, v in byType[i].items():
                        deck += str(v) + 'x ' + k + '\n'

                    deck += '\n'

        return {'name': deck_name, 'format': format, 'deck': deck}

    except Exception:
        pass
