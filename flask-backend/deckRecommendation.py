import json
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id

with open("cardsCompatibility.json", "r") as compatibility_file, open(
        "cardbase_crypt.json",
        "r") as crypt_file, open("cardbase_lib.json", "r") as library_file:
    vtescrypt = json.load(crypt_file)
    vteslib = json.load(library_file)
    compatibility = json.load(compatibility_file)

CRYPT_MULTIPLIER = 10
AVG_MULTIPLIER = 1


def deckRecommendation(cards):
    crypt = {}
    crypt_total = 0
    library = {}

    for k, v in cards.items():
        if k > 200000:
            crypt[k] = {'c': vtescrypt[str(k)], 'q': v}
            crypt_total += v
        else:
            library[k] = {'c': vteslib[str(k)], 'q': v}

    discipline_multiplier = {}

    for i in crypt.values():
        for k, v in i['c']['Disciplines'].items():
            if k not in discipline_multiplier:
                discipline_multiplier[k] = i['q'] * v / crypt_total
            else:
                discipline_multiplier[k] += i['q'] * v / crypt_total

    recommended_crypt = {}
    recommended_library = {}

    for c in cards:
        for r in compatibility[str(c)]:
            r = int(r)
            if r in cards:
                continue

            sum = 0
            for i in compatibility[str(r)].values():
                sum += i

            avg_score = sum / len(compatibility[str(r)])
            score = compatibility[str(c)][str(r)]

            if AVG_MULTIPLIER and score < avg_score * AVG_MULTIPLIER:
                continue

            if c > 200000:
                score = score * CRYPT_MULTIPLIER
            if r > 200000:
                if r not in recommended_crypt:
                    recommended_crypt[r] = score
                else:
                    recommended_crypt[r] += score
            else:
                disciplines = []
                d = vteslib[str(r)]['Discipline']
                if ' & ' in d:
                    disciplines = d.split(' & ')
                elif '/' in d:
                    disciplines = d.split('/')
                elif d:
                    disciplines = [d]

                if disciplines:
                    max_multiplier = 0
                    for d in disciplines:
                        if d in discipline_multiplier and discipline_multiplier[
                                d] > max_multiplier:
                            max_multiplier = discipline_multiplier[d]

                    score = score * max_multiplier

                if r not in recommended_library:
                    recommended_library[r] = score
                else:
                    recommended_library[r] += score

    top_pick_crypt = sorted(recommended_crypt,
                            key=lambda i: recommended_crypt[i],
                            reverse=True)

    top_pick_library = sorted(recommended_library,
                              key=lambda i: recommended_library[i],
                              reverse=True)

    return ({'crypt': top_pick_crypt[0:20], 'library': top_pick_library[0:30]})
