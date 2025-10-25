from api import app, db
from models import Deck
import json
import os
from dotenv import load_dotenv

with (
    open("../frontend/public/data/cardbase_crypt.json", "r") as crypt_file,
    open("../frontend/public/data/cardbase_lib.json", "r") as library_file,
    open(
        f"../frontend/public/data/cardbase_lib_playtest_{os.environ.get('PLAYTEST_KEY')}.json", "r"
    ) as library_playtest_file,
    open(
        f"../frontend/public/data/cardbase_crypt_playtest_{os.environ.get('PLAYTEST_KEY')}.json",
        "r",
    ) as crypt_playtest_file,
):
    cardlist = sorted(
        [
            *json.load(crypt_file).keys(),
            *json.load(library_file).keys(),
            *json.load(crypt_playtest_file).keys(),
            *json.load(library_playtest_file).keys(),
        ]
    )

with app.app_context():
    # REMOVE OLD PLAYTEST CARDS FROM DECKS
    # REPLACE CARDID FOR PLAYTEST CARDS AFTER RELEASE
    changes = {
        210733: 201733,  # Aara
        210753: 201744,  # Concordia
        210747: 201747,  # Damina
        210761: 201760,  # Khin
        210764: 201762,  # Lika
        210762: 201764,  # Lyyl
        210769: 201766,  # Onka
        210772: 201769,  # Rasha
        210773: 201770,  # Rex
        210777: 201774,  # Suwira
        210746: 201775,  # Uress
        210781: 201776,  # Vence
        210735: 201735,  # Ael
        210736: 201736,  # Agni
        210758: 201743,  # Coco
        210745: 201746,  # Cyan
        210748: 201748,  # Devo
        210754: 201751,  # Foti
        210778: 201753,  # Uliss
        210752: 201754,  # Gosto
        210759: 201758,  # Jurg
        210770: 201767,  # Osval
        210782: 201777,  # Verri
        210783: 201778,  # Xime
        210738: 201738,  # Algir
        210739: 201739,  # Anou
        210743: 201742,  # Beren
        210742: 201745,  # Cross
        210755: 201755,  # Graz
        210756: 201756,  # Hekl
        210760: 201759,  # Kalya
        210763: 201761,  # Lawb
        210765: 201763,  # Loyi
        210771: 201768,  # Przem
        210775: 201772,  # Serha
        210776: 201773,  # Surap
        210734: 201734,  # Abder
        210737: 201737,  # Aita
        210740: 201740,  # Anxo
        210741: 201741,  # Ashur
        210750: 201749,  # El Mo
        210751: 201750,  # Eulo
        210749: 201752,  # Frau
        210757: 201757,  # Huld
        210766: 201765,  # Nadez
        210774: 201771,  # Sakur
        210784: 201779,  # Yure
        210785: 201780,  # Zbig
        150047: 102308,  # Abs Tyr
        150006: 102309,  # Abu Po
        150000: 102310,  # Aug Do
        150002: 102317,  # Bloodh
        150025: 102311,  # Buri HG
        150040: 102312,  # Cold W
        150026: 102313,  # Curs Ab
        150003: 102315,  # Danc WD
        150039: 102318,  # Emp Fa
        150005: 102319,  # Ensna
        150018: 102320,  # Enthr
        150019: 102321,  # Fev Pi
        150046: 102316,  # For Per
        150020: 102323,  # For Mo
        150030: 102324,  # Frea Con
        150031: 102325,  # Gift FH
        150032: 102326,  # Grav Dro
        150033: 102327,  # Heart
        150021: 102328,  # Hedo
        150014: 102329,  # Hunt Qua
        150022: 102330,  # Kiss Ca
        150041: 102331,  # Magn Aut
        150034: 102322,  # Meddl
        150035: 102332,  # Morbi
        150007: 102333,  # Pilla Fall
        150042: 102334,  # Priv Pos
        150036: 102335,  # Putre Su
        150009: 102336,  # Rage Apo
        150045: 102337,  # Rele
        150024: 102338,  # Seed of T
        150011: 102339,  # Sent Sig
        150012: 102340,  # Soulg
        150017: 102341,  # Subv
        150023: 102342,  # Swif Co
        150016: 102343,  # Terr Vis
        150027: 102314,  # Dead CD
        150013: 102344,  # Twis Bloo
        150048: 102345,  # Unhol Sac
        150043: 102346,  # Unth Hum
        150015: 102347,  # Wall OF
        150044: 102348,  # War OA
    }

    for deck in Deck.query.all():
        new_cards = {}
        new_used_cards = {}

        for k, v in deck.cards.items():
            if k in changes.keys():
                new_cards[changes[k]] = v
                print(f"{k} to {changes[k]} in deck {deck.deckid}")
                if k in deck.used_in_inventory:
                    print(f"{k} to {changes[k]} in used")
                    new_used_cards[changes[k]] = deck.used_in_inventory[k]

            elif str(k) not in cardlist:
                print(f"{k} deleted from deck {deck.deckid}")
                continue

            else:
                new_cards[k] = v
                if k in deck.used_in_inventory:
                    new_used_cards[k] = deck.used_in_inventory[k]

        deck.used_in_inventory = new_used_cards
        deck.cards = new_cards

    db.session.commit()
