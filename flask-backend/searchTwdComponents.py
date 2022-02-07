def get_twd_by_crypt(crypt, twda):
    cards_counter = len(crypt)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, v in crypt.items():
            q, m = v['q'], v['m']
            if m == 'gt':
                if q:
                    if card in deck['crypt'] and deck['crypt'][card]['q'] >= q:
                        counter += 1
                else:
                    counter += 1

            elif m == 'eq':
                if q:
                    if card in deck['crypt'] and deck['crypt'][card]['q'] == q:
                        counter += 1
                elif card not in deck['crypt']:
                    counter += 1

            elif m == 'lt':
                if q:
                    if card in deck['crypt'] and deck['crypt'][card]['q'] <= q:
                        counter += 1

            elif m == 'lt0':
                if card in deck['crypt'] and deck['crypt'][card][
                        'q'] <= q or card not in deck['crypt']:
                    counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_library(library, twda):
    cards_counter = len(library)
    match_decks = []
    for deck in twda:
        counter = 0
        for card, v in library.items():
            q, m = v['q'], v['m']
            if m == 'gt':
                if q:
                    if card in deck['library'] and deck['library'][card]['q'] >= q:
                        counter += 1
                else:
                    counter += 1

            elif m == 'eq':
                if q:
                    if card in deck['library'] and deck['library'][card]['q'] == q:
                        counter += 1
                elif card not in deck['library']:
                    counter += 1

            elif m == 'lt':
                if q:
                    if card in deck['library'] and deck['library'][card]['q'] <= q:
                        counter += 1

            elif m == 'lt0':
                if card in deck['library'] and deck['library'][card][
                        'q'] <= q or card not in deck['library']:
                    counter += 1

        if counter == cards_counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_player(player, twda):
    match_decks = []
    for deck in twda:
        if player in deck['player']:
            match_decks.append(deck)

    return match_decks


def get_twd_by_location(location, twda):
    match_decks = []
    for deck in twda:
        if location in deck['location']:
            match_decks.append(deck)

    return match_decks


def get_twd_by_event(event, twda):
    match_decks = []
    for deck in twda:
        if event.lower() in deck['event'].lower():
            match_decks.append(deck)

    return match_decks


def get_twd_by_date(request, twda):
    date_from = int(request['from']) if 'from' in request else 1997
    date_to = int(request['to']) if 'to' in request else 2077
    match_decks = []

    for deck in twda:
        date = int(deck['date'][0:4])
        if date_from <= date <= date_to:
            match_decks.append(deck)

    return match_decks


def get_twd_by_players(request, twda):
    players_from = int(request['from']) if 'from' in request else 1
    players_to = int(request['to']) if 'to' in request else 1000
    match_decks = []

    for deck in twda:
        if deck['players'] != 'Unknown' and players_from <= deck[
                'players'] <= players_to:
            match_decks.append(deck)

    return match_decks


def get_twd_by_clan(clan, twda):
    match_decks = []
    for deck in twda:
        if deck['clan'].lower() == clan:
            match_decks.append(deck)

    return match_decks


def get_twd_by_disciplines(disciplines, twda):
    disciplines_counter = len(disciplines)
    match_decks = []

    for deck in twda:
        counter = 0
        for discipline in disciplines.keys():
            if discipline in deck['disciplines']:
                counter += 1

        if disciplines_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_cardtypes(cardtype_input, twda):
    cardtypes_counter = len(cardtype_input)
    cardtypes = {}

    for k, v in cardtype_input.items():
        [min, max] = v.split(',')
        [min, max] = [float(min) / 100, float(max) / 100]
        cardtypes[k] = {'min': min, 'max': max}

    match_decks = []

    for deck in twda:
        counter = 0

        for type, v in cardtypes.items():
            if v['max'] == 0 and type not in deck['cardtypes_ratio']:
                counter += 1
            if type in deck['cardtypes_ratio'] and v['min'] < deck[
                    'cardtypes_ratio'][type] < v['max']:
                counter += 1

        if cardtypes_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_capacity(capacity_input, twda):
    capacity_brackets = []
    for k in capacity_input.keys():
        capacity_brackets.append([int(i) for i in k.split('-')])

    match_cards = []
    for deck in twda:
        for b in capacity_brackets:
            if b[0] <= deck['capacity'] <= b[1]:
                match_cards.append(deck)
                break

    return match_cards


def get_twd_by_traits(traits, twda):
    trait_counter = len(traits)
    match_decks = []
    for deck in twda:
        counter = 0
        for trait in traits.keys():
            if trait in deck['traits']:
                counter += 1

        if trait_counter == counter:
            match_decks.append(deck)

    return match_decks


def get_twd_by_libraryTotal(total_input, twda):
    total_brackets = []
    for k in total_input.keys():
        total_brackets.append([int(i) for i in k.split('-')])

    match_cards = []
    for deck in twda:
        for b in total_brackets:
            if b[0] <= deck['libraryTotal'] <= b[1]:
                match_cards.append(deck)
                break

    return match_cards


def matchInventory(request, inventory, twda):
    crypt_ratio = float(request['crypt']) if 'crypt' in request else None
    library_ratio = float(request['library']) if 'library' in request else None
    scaling = int(request['scaling']) if 'scaling' in request else False

    match_decks = []

    for deck in twda:
        if crypt_ratio:
            min_counter = round(deck['cryptTotal'] * crypt_ratio)
            counter = 0

            for card, v in deck['crypt'].items():
                if card in inventory:
                    q = v['q']
                    if q > inventory[card]:
                        counter += inventory[card]
                    else:
                        counter += q

            if counter < min_counter:
                continue

        if library_ratio:
            counter = 0
            scaling_factor = deck['libraryTotal'] / scaling if scaling else None
            min_counter = scaling * library_ratio if scaling else deck[
                'libraryTotal'] * library_ratio

            for card, v in deck['library'].items():
                if card in inventory:
                    q = v['q'] / scaling_factor if scaling else v['q']

                    if q > inventory[card]:
                        counter += inventory[card]
                    else:
                        counter += q

            if counter < min_counter:
                continue

        match_decks.append(deck)

    return match_decks


def sanitizeTwd(deck):
    try:
        del (deck['description'])
        del (deck['disciplines'])
        del (deck['format'])
        del (deck['link'])
        del (deck['timestamp'])
        del (deck['score'])
        del (deck['cardtypes_ratio'])
        del (deck['libraryTotal'])
        del (deck['cryptTotal'])
        del (deck['clan'])
        del (deck['capacity'])
        del (deck['traits'])
    except KeyError:
        pass

    return (deck)
