import searchTwdComponents

def searchTwd(request):
    queries = request.json

    matches = []
    query_priority = [
        'player',
        'location',
        'event',
        'date',
        'players',
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
                matches = function_to_call(queries[q])
            else:
                matches = function_to_call(queries[q], matches)

            if not matches:
                break

    [decks, cards] = searchTwdComponents.prepare_results(matches)
    if decks:
        return [decks, cards]
    else:
        return 400
