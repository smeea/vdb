import json
import multiprocessing

with open("cardbase_crypt.json", "r+") as crypt_file, open(
        "cardbase_lib.json", "r+") as lib_file, open(
            "../../frontend/src/assets/data/disciplinesList.json","r") as disciplines_list, open(
                "../../frontend/src/assets/data/virtuesList.json","r") as virtues_list:
    crypt = json.load(crypt_file)
    library = json.load(lib_file)
    cards = {**crypt, **library}
    disciplines = list(json.load(disciplines_list).keys())
    virtues = list(json.load(virtues_list).keys())
    blacklist = [
        'Red List', 'Seraph',
        'Imperator', 'Regent', 'Brujah Justicar', 'Gangrel Justicar',
        'Malkavian Justicar', 'Nosferatu Justicar', 'Toreador Justicar',
        'Tremere Justicar', 'Ventrue Justicar', 'Lasombra Justicar',
        'Banu Haqim Justicar', 'Inflict', 'Circle', 'Frenzy',
        'Dodge', 'Lock', 'Determine', 'Guru', 'Changeling', 'Zombie', 'Wash',
        'Nod', 'Crow', 'Contract', 'Luc', 'Monster', 'Inquisition', 'Angel'
    ] + disciplines + virtues

    longer_name_exceptions = [
        [['Flash', 'Grenade'], 'Flash Grenade'],
        [['Hazimel'], 'Eye of Hazimel'],
        [['Victoria'], 'Victoria Ash']
    ]

    def get_long_name_exception(name, text):
        return any(name in i[0] and i[1] in text for i in longer_name_exceptions)

    def generate_crossref(card):
        for other_card in cards.values():
            if other_card['id'] == card['id']:
                continue

            name = other_card['name']
            if ', The' in name:
                name = name.replace(', The', '')
                name = f"The {name}"

            if name not in blacklist and name not in card[
                    'name'] and name in card['text']:
                is_long_name_exception = get_long_name_exception(name, card['text'])

                if f"/{name}/" in card['text'] or is_long_name_exception:
                    pass

                else:
                    card['Card Text'] = card['text'].replace(name,
                                                    f"/{other_card['name']}/")

        return card

    pool = multiprocessing.Pool(processes=4)
    fixed_cards = pool.map(generate_crossref, cards.values())
    fixed_crypt = {}
    fixed_library = {}

    for card in fixed_cards:
        if card['id'] > 200000:
            fixed_crypt[str(card['id'])] = card
        else:
            fixed_library[str(card['id'])] = card

    crypt_file.seek(0)
    lib_file.seek(0)

    json.dump(fixed_crypt, crypt_file, indent=4, separators=(',', ':'))
    json.dump(fixed_library, lib_file, indent=4, separators=(',', ':'))
