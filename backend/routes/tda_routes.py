from flask import jsonify
import json
from api import app


with open("tda.json", "r") as tda_file:
    tda = json.load(tda_file)


@app.route("/api/tda", methods=["GET"])
def get_all_tda():
    t = {}
    for k, v in tda.items():
        t[k] = v["info"]
    return jsonify(t)


@app.route("/api/tda/<string:eventid>", methods=["GET"])
def get_tda(eventid):
    return jsonify(tda[eventid])
