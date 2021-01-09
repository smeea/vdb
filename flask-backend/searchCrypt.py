import searchCryptComponents

def searchCrypt(request):
    queries = request.json

    matches = []

    for k, v in queries.items():
        function_to_call = getattr(searchCryptComponents, 'get_crypt_by_' + k)
        if not matches:
            matches = function_to_call(v)
        else:
            matches = function_to_call(v, matches)

        if not matches:
            break

    if matches:
        return matches
    else:
        return 400
