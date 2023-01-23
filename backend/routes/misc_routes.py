from flask import jsonify
from api import app
import json

@app.route("/api/version", methods=["GET"])
def version_route():
    with open("../CHANGES.json", "r") as changes_file:
        changes = json.load(changes_file)
        return jsonify(changes[0])


@app.route("/api/changelog", methods=["GET"])
def changelog_route():
    with open("../CHANGES.json", "r") as changes_file:
        changes = json.load(changes_file)
        return jsonify(changes)
