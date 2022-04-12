import json

with open("twdDecks.json",
          "r") as twda_input, open("cardbase_crypt.json", "r") as crypt_file, open(
              "cardbase_lib.json", "r") as library_file:

    twda = json.load(twda_input)
    cardbase_crypt = json.load(crypt_file).values()
    cardbase_library = json.load(library_file).values()

CURRENT_YEAR = 2021
YEAR_MULTIPLIER = 0.1
PLAYERS_MULTIPLIER = 0.1
cards = {}

twda_total = len(twda)

for c in cardbase_crypt:
    cards[c['Id']] = {}
for c in cardbase_library:
    cards[c['Id']] = {}

for idx, twd in enumerate(twda):
    # if idx == 0:
    #     break
    # print(f"Generating TWDA cards compatibility: {idx + 1} of {twda_total}")
    year = int(twd['creation_date'][:4])
    year_diff = CURRENT_YEAR - year
    year_coef = 1 / (1 + year_diff * YEAR_MULTIPLIER)
    players_coef = twd['players'] * PLAYERS_MULTIPLIER if type(
        twd['players']) == int else 1
    score = year_coef * players_coef

    for i in twd['cards'].keys():
        i = int(i)
        for k in twd['cards'].keys():
            k = int(k)
            if k == i:
                continue

            if k not in cards[i].keys():
                cards[i][k] = 0
            cards[i][k] += score

with open("cardsCompatibility.json", "w") as output:
    json.dump(cards, output, indent=4, separators=(',', ':'))
