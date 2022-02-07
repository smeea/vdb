import searchTwdComponents
from models import PublicDeck
from searchPdaComponents import get_deck_for_frontend


def searchPda(request):
    decks = []
    for d in PublicDeck.query.order_by(PublicDeck.date).all():
        deck = {
            'deckid': d.deckid,
            'capacity': d.capacity,
            'cardtypes_ratio': d.cardtypes_ratio,
            'clan': d.clan,
            'crypt': {},
            'date': d.date,
            'disciplines': d.disciplines,
            'library': {},
            'library_total': d.library_total,
            'player': d.author_public_name,
            'traits': d.traits,
        }

        for id, q in d.crypt.items():
            deck['crypt'][str(id)] = {'q': q}
        for id, q in d.library.items():
            deck['library'][str(id)] = {'q': q}

        decks.append(deck)

    queries = request.json

    matches = []
    query_priority = [
        'player',
        'date',
        'libraryTotal',
        'crypt',
        'library',
        'clan',
        'traits',
        'capacity',
        'disciplines',
        'cardtypes',
    ]

    for q in query_priority:
        if q in queries:
            function_to_call = getattr(searchTwdComponents, 'get_twd_by_' + q)
            if not matches:
                matches = function_to_call(queries[q], decks)
            else:
                matches = function_to_call(queries[q], matches)

            if not matches:
                break

    if matches:
        return [get_deck_for_frontend(d['deckid']) for d in matches]
    else:
        return 400
