import json
import searchCryptComponents

with open("vtescrypt.json", "r") as crypt_file:
    vtescrypt = json.load(crypt_file)

def searchCrypt(request, crypt=vtescrypt):
    queries = request.json

    matches = []

    for k, v in queries.items():
        if k == 0 or k =='0':
            print(queries)
        function_to_call = getattr(searchCryptComponents, 'get_crypt_by_' + k)
        if not matches:
            matches = function_to_call(v, crypt)
        else:
            matches = function_to_call(v, matches)

        if not matches:
            break

    if matches:
        results = [i['Id'] for i in matches]
        return results
    else:
        return 400
