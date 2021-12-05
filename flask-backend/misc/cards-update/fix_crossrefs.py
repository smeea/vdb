import json

blacklist = [
    'Auspex',
    'Abombwe',
    'Animalism',
    'Blood Sorcery',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dementation',
    'Dominate',
    'Fortitude',
    'Melpominee',
    'Mytherceria',
    'Necromancy',
    'Obeah',
    'Obfuscate',
    'Obtenebration',
    'Potence',
    'Presence',
    'Protean',
    'Serpentis',
    'Sanguinus',
    'Spiritus',
    'Temporis',
    'Thanatosis',
    'Quietus',
    'Valeren',
    'Vicissitude',
    'Visceratika',
    'Defense',
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
    'Red List',
    'Seraph',
    'Imperator',
    'Regent',
    'Brujah Justicar',
    'Gangrel Justicar',
    'Malkavian Justicar',
    'Nosferatu Justicar',
    'Toreador Justicar',
    'Tremere Justicar',
    'Ventrue Justicar',
    'Inflict',
    'Circle',
    'Frenzy',
    'Dodge',
    'Lock',
    'Determine',
    'Guru',
    'Changeling',
    'Zombie',
    'Wash',
    'Nod',
    'Crow',
    'Contract',
    'Luc',
    'Monster',
    'Inquisition',
]

with open("cardbase_crypt.json", "r+",
          encoding='utf8') as crypt_file, open("cardbase_lib.json",
                                               "r+",
                                               encoding='utf8') as lib_file:

    crypt = json.load(crypt_file)
    library = json.load(lib_file)
    cards = {**crypt, **library}

    for id, card in cards.items():
        if id == '100001':
            print('\n')

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
                    print(f"OK: {card['Name']} -> /{other_card['Name']}/")
                else:
                    if int(id) > 200000:
                        crypt[id]['Card Text'] = crypt[id][
                            'Card Text'].replace(name,
                                                 f"/{other_card['Name']}/")
                    else:
                        library[id]['Card Text'] = library[id][
                            'Card Text'].replace(name,
                                                 f"/{other_card['Name']}/")

                    print(f"FIXED: {card['Name']} -> {other_card['Name']}")

    crypt_file.seek(0)
    lib_file.seek(0)

    json.dump(crypt, crypt_file, indent=4, separators=(',', ':'))
    json.dump(library, lib_file, indent=4, separators=(',', ':'))
