import json
import search_crypt_components

with open("vtescrypt.json", "r") as crypt_file:
    vtescrypt = json.load(crypt_file)


def search_crypt(request, crypt=vtescrypt):
    queries = request.json

    matches = []

    for k, v in queries.items():
        function_to_call = getattr(search_crypt_components, "get_crypt_by_" + k)
        if not matches:
            matches = function_to_call(v, crypt)
        else:
            matches = function_to_call(v, matches)

        if not matches:
            break

    if matches:
        results = [i["Id"] for i in matches]
        return results
    else:
        return 400
