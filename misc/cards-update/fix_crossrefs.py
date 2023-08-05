import json


with open("cardbase_crypt.json", "r+") as crypt_file, open(
        "cardbase_lib.json", "r+") as lib_file, open(
            "../../frontend/src/assets/data/disciplinesList.json","r") as disciplines_list, open(
                "../../frontend/src/assets/data/virtuesList.json","r") as virtues_list:


    disciplines = list(json.load(disciplines_list).keys())
    virtues = list(json.load(virtues_list).keys())
    blacklist = [
        'Red List', 'Seraph',
        'Imperator', 'Regent', 'Brujah Justicar', 'Gangrel Justicar',
        'Malkavian Justicar', 'Nosferatu Justicar', 'Toreador Justicar',
        'Tremere Justicar', 'Ventrue Justicar', 'Inflict', 'Circle', 'Frenzy',
        'Dodge', 'Lock', 'Determine', 'Guru', 'Changeling', 'Zombie', 'Wash',
        'Nod', 'Crow', 'Contract', 'Luc', 'Monster', 'Inquisition', 'Angel'
    ] + disciplines + virtues

    crypt = json.load(crypt_file)
    library = json.load(lib_file)
    cards = {**crypt, **library}

    for id, card in cards.items():
        # if id == '100001':
        #     print('\n')

        for other_card in cards.values():
            if other_card['Id'] == int(id):
                continue

            name = other_card['Name']
            if ', The' in name:
                name = name.replace(', The', '')
                name = f"The {name}"

            if name not in blacklist and name not in card[
                    'Name'] and name in card['Card Text']:
                if f"/{name}/" in card['Card Text']:
                    pass
                    # print(f"OK: {card['Name']} -> /{other_card['Name']}/")
                else:
                    if int(id) > 200000:
                        crypt[id]['Card Text'] = crypt[id][
                            'Card Text'].replace(name,
                                                 f"/{other_card['Name']}/")
                    else:
                        library[id]['Card Text'] = library[id][
                            'Card Text'].replace(name,
                                                 f"/{other_card['Name']}/")

                    # print(f"FIXED: {card['Name']} -> {other_card['Name']}")

    crypt_file.seek(0)
    lib_file.seek(0)

    json.dump(crypt, crypt_file, indent=4, separators=(',', ':'))
    json.dump(library, lib_file, indent=4, separators=(',', ':'))
