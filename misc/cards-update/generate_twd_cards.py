import json

sets = {
    "V5A": 2021,
    "KSU": 2021,
    "V5": 2020,
    "25th": 2019,
    "FB": 2019,
    "SP": 2019,
    "KoTR": 2018,
    "HttBR": 2018,
    "Anthology": 2018,
    "LK": 2018,
    "AU": 2016,
    "TU": 2014,
    "DM": 2013,
    "HttB": 2010,
    "EK": 2009,
    "BSC": 2008,
    "KoT": 2008,
    "TR": 2008,
    "SoC": 2007,
    "LotN": 2007,
    "NoR": 2006,
    "Third": 2006,
    "KMW": 2005,
    "LoB": 2005,
    "Gehenna": 2004,
    "Tenth": 2004,
    "Anarchs": 2003,
    "BH": 2003,
    "CE": 2002,
    "BL": 2001,
    "FN": 2001,
    "SW": 2000,
    "Sabbat": 1996,
    "AH": 1996,
    "DS": 1995,
    "VTES": 1995,
    "Jyhad": 1994,
}

with open("twda.json",
          "r") as twda_input, open("cardbase_crypt_backend.json", "r") as crypt_file, open(
              "cardbase_lib_backend.json", "r") as library_file:

    crypt_cardbase = json.load(crypt_file).values()
    library_cardbase = json.load(library_file).values()
    crypt = {}
    library = {}

    for card in crypt_cardbase:
        name = card['Name']
        if card['Adv'] and card['Adv'][0]:
            name += ' ADV'

        crypt[card['Id']] = {
            'name': name,
            'player': '-',
            'twd': '-',
            'twd_date': '-',
        }

        date = None
        for set in card['Set']:
            if set == 'POD':
                continue

            d = None
            if set == 'Promo':
                d = int(list(card['Set']['Promo'].keys())[0][:4])
            else:
                d = sets[set]

            if date is None:
                date = d
            elif date > d:
                date = d

        crypt[card['Id']]['release_date'] = date

    for card in library_cardbase:
        library[card['Id']] = {
            'name': card['Name'],
            'player': '-',
            'twd': '-',
            'twd_date': '-',
        }

        date = None
        for set in card['Set']:
            if set == 'POD':
                continue

            d = None
            if set == 'Promo':
                d = int(list(card['Set']['Promo'].keys())[0][:4])
            else:
                d = sets[set]

            if date is None:
                date = d
            elif date > d:
                date = d

        library[card['Id']]['release_date'] = date

    twda = json.load(twda_input)
    total = len(twda)

    for idx, i in enumerate(twda):
        # if idx == 0:
        #     break
        # print(f"Generating TWDA cards history: {idx + 1} of {total}")
        deckid = i['id']
        player = i['player']
        date = int(i['date'][:4])

        for card in i['crypt']['cards']:
            crypt[card['id']]['twd'] = deckid
            crypt[card['id']]['twd_date'] = date
            crypt[card['id']]['player'] = player

        for cardtype in i['library']['cards']:
            for card in cardtype['cards']:
                library[card['id']]['twd'] = deckid
                library[card['id']]['twd_date'] = date
                library[card['id']]['player'] = player

    print("{:<35} {:<5} {:<5} {:<4} {:<30} {}".format('Name', 'Print', 'Win', 'YtW', 'Player',
                                               'Link'))
    for c in crypt.values():
        ytw = None
        if c['twd_date'] != '-':
            ytw = c['twd_date'] - c['release_date']
        else:
            ytw = str(2021 - c['release_date']) + '+'

        print("{:<35} {:<5} {:<5} {:<4} {:<30} {}".format(
            c['name'][:35], c['release_date'], c['twd_date'], ytw, c['player'],
            f"https://vdb.im/decks?id={c['twd']}"
            if c['twd'] != '-' else '-'))

    print("")
    print("{:<35} {:<5} {:<5} {:<4} {:<30} {}".format('Name', 'Print', 'Win', 'YtW', 'Player',
                                               'Link'))
    for c in library.values():
        ytw = None
        if c['twd_date'] != '-':
            ytw = c['twd_date'] - c['release_date']
        else:
            ytw = str(2021 - c['release_date']) + '+'

        print("{:<35} {:<5} {:<5} {:<4} {:<30} {}".format(
            c['name'][:35], c['release_date'], c['twd_date'], ytw, c['player'],
            f"https://vdb.im/decks?id={c['twd']}"
            if c['twd'] != '-' else '-'))
