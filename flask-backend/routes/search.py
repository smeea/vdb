from flask import jsonify, request, abort

from searchCrypt import searchCrypt
from searchLibrary import searchLibrary
from api import app


@app.route('/api/search/crypt', methods=['POST'])
def searchCryptRoute():
    result = searchCrypt(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route('/api/search/library', methods=['POST'])
def searchLibraryRoute():
    result = searchLibrary(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route('/api/search/quick', methods=['POST'])
def searchQuickRoute():
    result = []

    crypt = searchCrypt(request)
    if crypt != 400:
        result += crypt

    library = searchLibrary(request)
    if library != 400:
        result += library

    if result:
        return jsonify(result)
    else:
        abort(400)
