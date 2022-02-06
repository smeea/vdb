import searchTwdComponents
from models import PublicDeck
from searchPdaComponents import generate_deck_from_db, sanitize_deck


def searchPda(request):
    decks = []
    for d in PublicDeck.query.all():
        deck = d.__dict__
        deck['date'] = d.timestamp.strftime('%Y-%m-%d')
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
        return [sanitize_deck(d) for d in matches]
    else:
        return 400
