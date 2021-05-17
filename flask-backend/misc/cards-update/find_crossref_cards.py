import json
import re

blacklist = [
    'Auspex',
    'Abombwe',
    'Animalism',
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
    'Thaumaturgy',
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
    'Guru',
    'Changeling',
    'Zombie',
]

with open("cardbase_crypt.json", "r",
          encoding='utf8') as crypt_file, open("cardbase_lib.json",
                                               "r",
                                               encoding='utf8') as lib_file:

    crypt = json.load(crypt_file)
    library = json.load(lib_file)
    cards = {**crypt, **library}

    for id, card in cards.items():
        other_cards = cards.copy()
        del other_cards[id]

        if id == '100001':
            print('\n')

        for other_card in other_cards.values():
            if other_card['Name'] not in blacklist and other_card[
                    'Name'] not in card['Name'] and other_card['Name'] in card[
                        'Card Text']:
                if f"/{other_card['Name']}/" in card['Card Text']:
                    print(f"{card['Name']} -> /{other_card['Name']}/")
                else:
                    print(f"{card['Name']} -> {other_card['Name']}")
