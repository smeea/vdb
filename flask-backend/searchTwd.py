import searchTwdComponents
import json


def searchTwd(request):
    with open("twdDecks.json", "r") as twd_file:
        twda = json.load(twd_file)

    queries = request.json

    matches = []
    query_priority = [
        'player',
        'location',
        'event',
        'date',
        'players',
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
                matches = function_to_call(queries[q], twda)
            else:
                matches = function_to_call(queries[q], matches)

            if not matches:
                break

    if matches:
        return matches
    else:
        return 400
