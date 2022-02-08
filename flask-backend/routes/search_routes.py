from flask import jsonify, request, abort

from search_crypt import search_crypt
from search_library import search_library
from api import app


@app.route("/api/search/crypt", methods=["POST"])
def searchCryptRoute():
    result = search_crypt(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route("/api/search/library", methods=["POST"])
def searchLibraryRoute():
    result = search_library(request)
    if result != 400:
        return jsonify(result)
    else:
        abort(400)


@app.route("/api/search/quick", methods=["POST"])
def searchQuickRoute():
    result = []

    crypt = search_crypt(request)
    if crypt != 400:
        result += crypt

    library = search_library(request)
    if library != 400:
        result += library

    if result:
        return jsonify(result)
    else:
        abort(400)
