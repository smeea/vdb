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
        'Tremere Justicar', 'Ventrue Justicar', 'Inflict', 'Circle', 'Frenzy',
        'Dodge', 'Lock', 'Determine', 'Guru', 'Changeling', 'Zombie', 'Wash',
        'Nod', 'Crow', 'Contract', 'Luc', 'Monster', 'Inquisition', 'Angel'
    ] + disciplines + virtues

    def generate_crossref(card):
        for other_card in cards.values():
            if other_card['Id'] == card['Id']:
                continue

            name = other_card['Name']
            if ', The' in name:
                name = name.replace(', The', '')
                name = f"The {name}"

            if name not in blacklist and name not in card[
                    'Name'] and name in card['Card Text']:
                if f"/{name}/" in card['Card Text'] or name in ['Hazimel'] and 'Eye of Hazimel' in card['Card Text'] or name in ['Flash', 'Grenade'] and 'Flash Grenade' in card['Card Text']:
                    pass

                else:
                    card['Card Text'] = card['Card Text'].replace(name,
                                                    f"/{other_card['Name']}/")

        return card

    pool = multiprocessing.Pool(processes=4)
    fixed_cards = pool.map(generate_crossref, cards.values())
    fixed_crypt = {}
    fixed_library = {}

    for card in fixed_cards:
        if card['Id'] > 200000:
            fixed_crypt[str(card['Id'])] = card
        else:
            fixed_library[str(card['Id'])] = card

    crypt_file.seek(0)
    lib_file.seek(0)

    json.dump(fixed_crypt, crypt_file, indent=4, separators=(',', ':'))
    json.dump(fixed_library, lib_file, indent=4, separators=(',', ':'))
