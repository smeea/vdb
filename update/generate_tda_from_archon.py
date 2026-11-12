import gzip
import json


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

            decks[tuid][uuid] = obj["data"]["cards"]

            if tuid not in data:
                data[tuid] = {"info": None, "players": None}

        if obj["type"] == "tournament":
            tuid = obj["data"]["uid"]
            tournaments[tuid] = obj["data"]

    for tuid in tournaments:
        if tournaments[tuid]["multideck"]:
            data.pop(tuid, None)
            decks.pop(tuid, None)

    for tuid, e in data.items():
        t = tournaments[tuid]

        e["players"] = [None] * len(t["standings"])
        for i, v in enumerate(t["standings"]):
            e["players"][i] = {
                "gw": v["gw"],
                "vp": v["vp"],
                "uuid": v["user_uid"],
                "dq": v["disqualified"],
            }

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
            "isNC": t["rank"] in ["National Championship", "Continental Championship"],
        }

        if e["info"]["date"] is None:
            print("WRONG DATE: ", tuid)

    for tuid, dks in decks.items():
        for uuid, cards in dks.items():
            idx = next((i for i, d in enumerate(data[tuid]["players"]) if d["uuid"] == uuid), None)
            if idx == None:
                print("WRONG EVENT, TWD: ", tuid, uuid)
                continue
            data[tuid]["players"][idx]["deck"] = cards

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

        for i in e["players"]:
            del i["uuid"]

    for tuid in bad_tournaments:
        del data[tuid]

    json.dump(data, tda_file, indent=4, separators=(",", ":"))
