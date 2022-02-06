from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id


def sanitize_deck(d):
    deck = {
        'deckid': d['deckid'],
        'name': d['name'],
        'player': d['author_public_name'],
        'description': d['description'],
        'date': d['timestamp'].strftime('%Y-%m-%d'),
        'crypt': {},
        'library': {},
    }

    for id, q in d['crypt'].items():
        deck['crypt'][id] = {'q': q}
    for id, q in d['library'].items():
        deck['library'][id] = {'q': q}

    return(deck)


def generate_deck_for_db(source):
    deck = {
        'deckid': source.deckid,
        'name': source.name,
        'description': source.description,
        'author': source.author,
        'author_public_name': source.author_public_name,
        'tags': source.tags,
        'crypt_total': 0,
        'library_total': 0,
        'capacity': None,
        'disciplines': [],
        'cardtypes_ratio': {},
        'clan': None,
        'traits': [],
        'crypt': {},
        'library': {},
    }

    totalCapacity = 0
    totalCryptExAC = 0

    clans = {}
    disciplines = set()
    cryptDisciplines = set()

    for id, q in source.cards.items():
        if id > 200000:
            deck['crypt'][id] = q
            deck['crypt_total'] += q
            if id != 200076:
                totalCryptExAC += q

        else:
            deck['library'][id] = q
            deck['library_total'] += q

    for id, q in deck['crypt'].items():
        # Skip Anarch Convert
        if id != 200076:
            totalCapacity += q * get_crypt_by_id(id)['Capacity']

            if (clan := get_crypt_by_id(id)['Clan']) in clans:
                clans[clan] += q
            else:
                clans[clan] = q

        if 'star' not in deck['traits'] and id != 200076:
            adv = get_crypt_by_id(id)['Adv']
            if adv and adv[1] in deck['crypt']:
                if (q + deck['crypt'][adv[1]]) / totalCryptExAC > 0.38:
                    deck['traits'].append('star')
            else:
                if q / totalCryptExAC > 0.38:
                    deck['traits'].append('star')

        for discipline in get_crypt_by_id(id)['Disciplines'].keys():
            cryptDisciplines.add(discipline)

    for clan, q in clans.items():
        if q / deck['crypt_total'] > 0.5:
            deck['clan'] = clan

    if len(clans) <= 1 and 'monoclan' not in deck['traits']:
        deck['traits'].append('monoclan')

    deck['capacity'] = totalCapacity / totalCryptExAC

    card_types = {}

    for id, q in deck['library'].items():
        ct = get_library_by_id(id)['Type']
        if ct in card_types:
            card_types[ct] += q
        else:
            card_types[ct] = q

        card_discipline_entry = get_library_by_id(id)['Discipline']
        if '&' in card_discipline_entry:
            for discipline in card_discipline_entry.split(' & '):
                if discipline in cryptDisciplines:
                    disciplines.add(discipline)

        elif '/' in card_discipline_entry:
            for discipline in card_discipline_entry.split('/'):
                if discipline in cryptDisciplines:
                    disciplines.add(discipline)

        elif card_discipline_entry in cryptDisciplines:
            disciplines.add(card_discipline_entry)

    for ct, q in card_types.items():
        deck['cardtypes_ratio'][ct.lower()] = q / deck['library_total']

    deck['disciplines'] = sorted(list(disciplines))

    return (deck)

# TODO deck for search
def generate_deck_from_db(d):
    # deck = {
    #     'deckid': d.deckid,
    #     'name': d.name,
    #     'player': d.author_public_name,
    #     'description': d.description,
    #     'date': d.timestamp.strftime('%Y-%m-%d'),
    #     'crypt': crypt,
    #     'library': library,
    #                    author_public_name=deck['author_public_name'],
    #                    description=deck['description'],
    #                    author=deck['author'],
    #                    tags=deck['tags'],
    #                    crypt=deck['crypt'],
    #                    library=deck['library'],
    #                    crypt_total=deck['crypt_total'],
    #                    library_total=deck['library_total'],
    #                    capacity=deck['capacity'],
    #                    cardtypes_ratio=deck['cardtypes_ratio'],
    #                    clan=deck['clan'],
    #                    disciplines=deck['disciplines'],
    #                    traits=deck['traits']
    # }

    return(d)
