import json

rulings = {}

with open("rulings.txt",
          "r", encoding='utf8') as f_txt, open("rulings.json",
                                               "w",
                                               encoding='utf8') as f_json:

    currentcard = ''
    for line in f_txt:
        if line.startswith('\n'):
            continue
        elif not line.startswith('    '):
            cardname = line.replace(':\n', '')
            currentcard = cardname
            rulings[currentcard] = []
        else:
            ruling = line.strip()
            rulings[currentcard].append(ruling)

    # json.dump(cards, f_json, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(rulings, f_json, indent=4, separators=(',', ':'))
