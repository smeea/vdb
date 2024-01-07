from api import app, db
from models import Deck, User
import json

# NOT REQUIRED; USE ONLY AS TEMPLATE FOR FUTURE FIXES

changes = {
    210001: 209001,
    210002: 209002,
    210003: 209003,
    210004: 209004,
    210005: 209005,
    210006: 209006,
    210007: 209007,
    210008: 209008,
    210009: 209009,
    210010: 209010,
    210011: 209011,
    210021: 209021,
    210022: 209022,
    210023: 209023,
    210024: 209024,
    210025: 209025,
    210026: 209026,
    210027: 209027,
    210028: 209028,
    210029: 209029,
    210041: 209041,
    210042: 209042,
    210043: 209043,
    210044: 209044,
    210045: 209045,
    210046: 209046,
    210047: 209047,
    210048: 209048,
    210049: 209049,
    210050: 209050,
    110001: 102254,
    110002: 102265,
    110003: 102247,
    110005: 102264,
    110006: 102266,
    110007: 102249,
    110021: 102260,
    110022: 102255,
    110023: 102253,
    110024: 102256,
    110025: 102267,
    110027: 102251,
    110041: 102259,
    110042: 102257,
    110043: 102248,
    110044: 102250,
    110045: 102263,
    110046: 102262,
    110049: 102261,
    110050: 102258,
    110051: 102252,
}

with open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file, open("../frontend/public/data/cardbase_lib.json", "r") as library_file, open("../frontend/public/data/cardbase_lib_playtest.json", "r") as library_playtest_file, open("../frontend/public/data/cardbase_crypt_playtest.json", "r") as crypt_playtest_file:
    cardlist = sorted([*json.load(crypt_file).keys(), *json.load(library_file).keys(), *json.load(crypt_playtest_file).keys(),*json.load(library_playtest_file).keys(),])


with app.app_context():
    for deck in Deck.query.all():
        new_cards = {}
        new_used_cards = {}

        for k, v in deck.cards.items():
            if k in changes.keys():
                new_cards[changes[k]] = v
                print(f"{k} to {changes[k]} in deck")
                if k in deck.used_in_inventory:
                    print(f"{k} to {changes[k]} in used")
                    new_used_cards[changes[k]] = deck.used_in_inventory[k]

            elif str(k) not in cardlist:
                print(f"{k} deleted from deck")
                continue

            else:
                new_cards[k] = v
                if k in deck.used_in_inventory:
                    new_used_cards[k] = deck.used_in_inventory[k]


        deck.used_in_inventory = new_used_cards
        deck.cards = new_cards

    db.session.commit()

# "210001","Roy","","Vampire","Ravnos","","7","2","obf","Anarch.","","","","ARTIST"
# "210002","Oleg Kaprizov","","Vampire","Ravnos","","7","3","obf pre","Anarch.","","","","ARTIST"
# "210003","Trung Chau Pham","","Vampire","Ravnos","","7","3","ANI","Anarch.","","","","ARTIST"
# "210004","Zafira","","Vampire","Ravnos","","7","4","obf PRE","Anarch.","","","","ARTIST"
# "210005","Jean-François","","Vampire","Ravnos","","7","4","ani obf pre","Anarch.","","","","ARTIST"
# "210006","Gathii","","Vampire","Ravnos","","7","5","obf ANI PRE","Anarch.","","","","ARTIST"
# "210007","Phaibun","","Vampire","Ravnos","","7","5","ani OBF PRE","Anarch.","","","","ARTIST"
# "210008","Henrique Pasquale","","Vampire","Ravnos","","7","6","ANI OBF PRE","Anarch.","","","","ARTIST"
# "210009","Doc Martina","","Vampire","Ravnos","","7","6","for pre ANI OBF","Anarch: Rescuing a vampire from torpor costs Doc Martina -1 blood.","","","","ARTIST"
# "210010","Luciano Carvalho","","Vampire","Ravnos","","7","6","pre ANI OBF","Anarch: During your unlock phase, you can move an animal retainer from a vampire you control to another vampire you control.","","","","ARTIST"
# "210011","Sreelekha","","Vampire","Ravnos","","7","8","ANI FOR OBF PRE","Anarch: If Sreelekha is ready at the start of your discard phase, you get +1 discard phase action. +1 bleed.","","","","ARTIST"
# "210021","Adrino Manauara","","Vampire","Tzimisce","","6","8","pot ANI DOM PRO","Anarch Baron of Manaus: Adrino gets 1 optional press each combat.","","baron","","ARTIST"
# "210022","Ángel Guerrero","","Vampire","Tzimisce","","6","7","ANI DOM PRO","Anarch Baron of Ciudad Juárez.","","baron","","ARTIST"
# "210023","Branimira","","Vampire","Tzimisce","","6","6","dom pre pro ANI","Anarch Baron of Sofia: While you have 9 or fewer pool, Branimira gets +1 intercept.","","baron","","ARTIST"
# "210024","Neserian","","Vampire","Tzimisce","","6","6","ani cel DOM PRO","Anarch: While you control no locations, Neserian gets -1 bleed. While you control 1 or more locations, Neserian gets +1 bleed.","","","","ARTIST"
# "210025","Clara Hjortshøj","","Vampire","Tzimisce","","6","5","ani aus dom PRO","Anarch.","","","","ARTIST"
# "210026","Whisper","","Vampire","Tzimisce","","6","5","pro ANI DOM","Anarch.","","","","ARTIST"
# "210027","Marialena","","Vampire","Tzimisce","","6","5","ani DOM PRO","Anarch.","","","","ARTIST"
# "210028","Prentis Derby","","Vampire","Tzimisce","","6","4","ani dom pro","Anarch.","","","","ARTIST"
# "210029","Susie Kano","","Vampire","Tzimisce","","6","3","ani dom","Anarch.","","","","ARTIST"
# "210041","Dominica","","Vampire","Salubri","","7","3","aus for","Independent: Dominica can search your library for a master archetype card, reveal it, and move it to your hand as a +1 stealth action.","","","","ARTIST"
# "210042","Yael","","Vampire","Salubri","","7","4","aus dom for","Independent.","","","","ARTIST"
# "210043","Sakhar","","Vampire","Salubri","","7","6","dom AUS FOR","Independent: Sakhar can search your library for an equipment card, reveal it, and move it to your hand as a +1 stealth action.","","","","ARTIST"
# "210044","Opikun","","Vampire","Salubri","","7","5","aus dom FOR","Independent: Once each combat involving a vampire you control, Opikun can burn 1 blood to prevent up to 2 non-aggravated damage to that vampire from the opposing minion's strike.","","","","ARTIST"
# "210045","Aniel","","Vampire","Salubri","","7","6","for AUS DOM","Independent: Aniel can burn 1 corruption counter or a card requiring a Discipline from another ready minion as a +1 stealth (D) action that costs 1 blood.","","","","ARTIST"
# "210046","Malachi","","Vampire","Salubri","","7","6","AUS DOM FOR","Independent.","","","","ARTIST"
# "210047","Seraphina","","Vampire","Salubri","","7","8","cel tha AUS DOM FOR","Independent: Seraphina can add 2 blood or life to another minion you control as a +1 stealth action, not to exceed starting life.","","","","ARTIST"
# "210048","Abaddon","","Vampire","Salubri","","7","8","cel pot AUS DOM FOR","Independent: Abaddon gets 1 optional maneuver and 1 optional press each combat.","","","","ARTIST"
# "210049","Castellan","","Vampire","Salubri","","7","6","cel dom AUS FOR","Independent: Castellan gets +1 intercept during directed actions, and -1 intercept during non-directed actions.","","","","ARTIST"
# "210050","Ilonka","","Vampire","Salubri","","7","7","tha AUS DOM FOR","Independent: Once each turn, if Ilonka is ready, she can look at the acting minion's controller's hand after a successful bleed against you, then she can burn 1 blood to discard 1 card from it.","","","","ARTIST"
