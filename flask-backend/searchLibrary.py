import searchLibraryComponents

def searchLibrary(request):
    queries = request.json

    matches = []

    for k, v in queries.items():
        function_to_call = getattr(searchLibraryComponents, 'get_library_by_' + k)
        if not matches:
            matches = function_to_call(v)
        else:
            matches = function_to_call(v, matches)

        if not matches:
            break

    if matches:
        results = [i['Id'] for i in matches]
        return results
    else:
        return 400
