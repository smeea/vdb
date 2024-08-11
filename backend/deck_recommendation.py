import json

with open("cards_compatibility.json", "r") as compatibility_file, open(
    "../frontend/public/data/cardbase_crypt.json", "r"
) as crypt_file, open("../frontend/public/data/cardbase_lib.json", "r") as library_file:
    cardbase_crypt = json.load(crypt_file)
    cardbase_lib = json.load(library_file)
    compatibility = json.load(compatibility_file)

CRYPT_MULTIPLIER_FOR_LIBRARY = 20
CRYPT_MULTIPLIER_FOR_CRYPT = 20
MASTER_MULTIPLIER = 0.5
CRYPT_RESULTS = 30
LIBRARY_RESULTS = 40


def deck_recommendation(cards):
    crypt = {}
    crypt_total = 0
    library = {}

    empty_cards = [k for k,v in cards.items() if v < 1]
    playtest_cards = [k for k in cards.keys() if k > 210000 or (k > 110000 and k < 200000)]
    for k in set(empty_cards + playtest_cards):
        del cards[int(k)]

    for k, v in cards.items():
        if k > 200000:
            crypt[k] = {"c": cardbase_crypt[str(k)], "q": v}
            crypt_total += v
        else:
            library[k] = {"c": cardbase_lib[str(k)], "q": v}



    discipline_multiplier = {}
    group_multiplier = {}

    for i in crypt.values():
        for k, v in i["c"]["Disciplines"].items():
            if k not in discipline_multiplier:
                discipline_multiplier[k] = i["q"] * v / crypt_total
            else:
                discipline_multiplier[k] += i["q"] * v / crypt_total

        g = i["c"]["Group"]
        if g not in group_multiplier:
            group_multiplier[g] = i["q"] / crypt_total
        else:
            group_multiplier[g] += i["q"] / crypt_total

    recommended_crypt = {}
    recommended_library = {}

    for c in cards:
        for r in compatibility[str(c)]:
            r = int(r)
            if r in cards:
                continue

            if r > 200000:
                if cardbase_crypt[str(r)]["Banned"]:
                    continue
            else:
                if cardbase_lib[str(r)]["Banned"]:
                    continue

            sum = 0
            for i in compatibility[str(r)].values():
                sum += i

            score = compatibility[str(c)][str(r)]

            if c > 200000:
                if r > 200000:
                    score = score * CRYPT_MULTIPLIER_FOR_CRYPT
                else:
                    score = score * CRYPT_MULTIPLIER_FOR_LIBRARY

            if r > 200000:
                g = cardbase_crypt[str(r)]["Group"]

                for k in group_multiplier.keys():
                    if g == "any" or k == "any":
                        pass
                    elif abs(int(k) - int(g)) <= 1:
                        score = score * (1 + group_multiplier[k])
                    else:
                        score = score * (1 - group_multiplier[k])

                if r not in recommended_crypt:
                    recommended_crypt[r] = score
                else:
                    recommended_crypt[r] += score
            else:
                disciplines = []
                d = cardbase_lib[str(r)]["Discipline"]
                if " & " in d:
                    disciplines = d.split(" & ")
                elif "/" in d:
                    disciplines = d.split("/")
                elif d:
                    disciplines = [d]

                if disciplines:
                    max_multiplier = 0
                    for d in disciplines:
                        if (
                            d in discipline_multiplier
                            and discipline_multiplier[d] > max_multiplier
                        ):
                            max_multiplier = discipline_multiplier[d]

                    score = score * max_multiplier

                t = cardbase_lib[str(r)]["Type"]
                if t == "Master":
                    score = score * MASTER_MULTIPLIER

                if r not in recommended_library:
                    recommended_library[r] = score
                else:
                    recommended_library[r] += score

    top_pick_crypt = sorted(
        recommended_crypt, key=lambda i: recommended_crypt[i], reverse=True
    )

    top_pick_library = sorted(
        recommended_library, key=lambda i: recommended_library[i], reverse=True
    )

    return {
        "crypt": top_pick_crypt[0:CRYPT_RESULTS],
        "library": top_pick_library[0:LIBRARY_RESULTS],
    }
