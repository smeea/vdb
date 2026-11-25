import gzip
import json
import math


PLAYERS_THRESHOLD = 8
DECKS_THRESHOLD = 5
DECKS_RATIO_THRESHOLD = 0.25

with (
    gzip.open("archon.jsonl.gz", "rt", encoding="utf-8") as archon_file,
    open("tda.json", "w") as tda_file,
):
    tournaments = {}
    decks = {}
    data = {}
    users = {}

    for line in archon_file:
        line = line.strip()
        if not line:
            continue
        obj = json.loads(line)

        if obj["type"] == "deck":
            uuid = obj["data"].get("user_uid")
            if not uuid:
                continue

            tuid = obj["data"]["tournament_uid"]
            if tuid not in decks:
                decks[tuid] = {}

            decks[tuid][uuid] = {
                "name": obj["data"]["name"],
                "cards": obj["data"]["cards"],
            }

            if tuid not in data:
                data[tuid] = {"info": None, "players": None}

        if obj["type"] == "tournament":
            tuid = obj["data"]["uid"]
            tournaments[tuid] = obj["data"]

        if obj["type"] == "user":
            uuid = obj["data"]["uid"]
            users[uuid] = obj["data"]["vekn_id"]

    for tuid in tournaments:
        if tournaments[tuid]["multideck"] or tournaments[tuid]["format"] != "Standard":
            data.pop(tuid, None)
            decks.pop(tuid, None)

    for tuid, e in data.items():
        t = tournaments[tuid]

        total_gw = 0
        total_vp = 0
        median_vp = 0
        median_gw = 0
        matches = 0

        for table in t["rounds"]:
            matches += len(table)

        e["players"] = [None] * len(t["standings"])
        for i, v in enumerate(t["standings"]):
            e["players"][i] = {
                "gw": v["gw"],
                "vp": v["vp"],
                "uuid": v["user_uid"],
                "author": users[v["user_uid"]],
                "dq": v["disqualified"],
            }

            if i + 1 > math.ceil(len(t["standings"]) / 2):
                median_vp = max(median_vp, v["vp"])
                median_gw = max(median_gw, v["gw"])

            total_gw += v["gw"]
            total_vp += v["vp"]

        id = (
            t["external_ids"].get("twda_entry")
            or t["external_ids"].get("twda")
            or t["external_ids"].get("vekn")
        )

        e["info"] = {
            "id": id,
            "date": t["start"].split("T")[0] if t["start"] else None,
            "city": t.get("city"),
            "country": t["country"],
            "name": t["name"],
            "matches": matches + 1 if matches else None,
            "total_vp": total_vp,
            "total_gw": total_gw,
            "median_gw": median_gw,
            "median_vp": median_vp,
            "rounds": t["max_rounds"],
            "isNC": t["rank"] in ["National Championship", "Continental Championship"],
        }

        # if e["info"]["date"] is None:
        #     print("WRONG DATE: ", tuid)

    for tuid, dks in decks.items():
        for uuid, deck in dks.items():
            idx = next((i for i, d in enumerate(data[tuid]["players"]) if d["uuid"] == uuid), None)
            if idx == None:
                # print("WRONG EVENT, TWD: ", tuid, uuid)
                continue
            data[tuid]["players"][idx]["deck"] = deck["cards"]
            data[tuid]["players"][idx]["name"] = deck["name"]

    bad_tournaments = []
    for tuid, e in data.items():
        total_players = len(e["players"])
        total_decks = sum(1 for d in e["players"] if d.get("deck"))
        e["info"]["players"] = total_players
        e["info"]["decks"] = total_decks

        if (
            total_decks / total_players < DECKS_RATIO_THRESHOLD and total_decks < DECKS_THRESHOLD
        ) or total_players < PLAYERS_THRESHOLD:
            bad_tournaments.append(tuid)
        else:
            median_rank = 0
            reported_ranks = [i + 1 for i, d in enumerate(e["players"]) if d.get("deck")]

            if len(reported_ranks) % 2:
                median_rank = reported_ranks[int((len(reported_ranks) - 1) / 2)]
            else:
                min = reported_ranks[int(len(reported_ranks) / 2 + 1)]
                max = reported_ranks[int(len(reported_ranks) / 2 - 1)]
                median_rank = (min + max) / 2

            e["info"]["median_rank"] = median_rank

        for i in e["players"]:
            del i["uuid"]

    for tuid in bad_tournaments:
        del data[tuid]

    for tuid, e in list(data.items()):
        id = e["info"]["id"]
        data[id] = e
        del data[id]["info"]["id"]
        del data[tuid]

    json.dump(data, tda_file, indent=4, separators=(",", ":"))
