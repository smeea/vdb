import json
import search_library_components

with open("cardbase_lib.json", "r") as library_file:
    cardbase = list(json.load(library_file).values())


def search_library(request, library=cardbase):
    queries = request.json

    matches = []

    for k, v in queries.items():
        function_to_call = getattr(search_library_components, "get_library_by_" + k)
        if not matches:
            matches = function_to_call(v, library)
        else:
            matches = function_to_call(v, matches)

        if not matches:
            break

    if matches:
        results = [i["Id"] for i in matches]
        return results
    else:
        return 400
