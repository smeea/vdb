from api import app, db
from models import Deck
import json
import os

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
        252000: 201787,  # addis
        252008: 201802,  # kaiser
        252001: 201788,  # aisl
        252002: 201793,  # cart
        252005: 201799,  # helle
        252016: 201820,  # torq
        252017: 201822,  # valer
        252018: 201823,  # vritr
        252015: 201819,  # thom
        252007: 201801,  # juli
        252010: 201804,  # kathe
        252003: 201797,  # elie
        252012: 201813,  # quadi
        252014: 201818,  # tharm
        252004: 201798,  # giann
        252009: 201803,  # kali
        252013: 201815,  # sami
        252006: 201800,  # hope
        252011: 201812,  # padr
        162001: 102369,  # hole
        162003: 102374,  # circ
        162005: 102378,  # doub
        162010: 102388,  # resp
        162012: 102390,  # st pat
        162008: 102383,  # info
        162000: 102367,  # aaro
        162007: 102380,  # fath
        162011: 102389,  # ronz
        162013: 102391,  # vial
        162002: 102370,  # back
        162004: 102376,  # dead
        162006: 102379,  # embo
        240005: 201789,  # arie
        253007: 201796,  # edua
        253004: 201817,  # terez
        253002: 201791,  # caca
        253006: 201795,  # durok
        253008: 201805,  # luan
        253010: 201807,  # marc
        253011: 201808,  # mari
        253012: 201809,  # mela
        253013: 201810,  # oenco
        253014: 201811,  # ogran
        253017: 201821,  # tuba
        253015: 201814,  # reyo
        253016: 201816,  # sydn
        253001: 201790,  # brux
        253009: 201806,  # luiz
        253003: 201792,  # caiq
        253005: 201794,  # dori
        163000: 102369,  # acad
        163001: 102371,  # baru
        163012: 102375,  # conv
        163005: 102377,  # dest
        163011: 102387,  # pala
        163002: 102366,  # port
        163004: 102372,  # caoe
        163007: 102382,  # iara
        163010: 102386,  # mulh
        163008: 102384,  # lamb
        163003: 102373,  # chav
        163006: 102381,  # hali
        163009: 102385,  # meia
    }

    for deck in Deck.query.all():
        new_cards = {}
        new_used_cards = {}

        for k, v in deck.cards.items():
            if k in changes:
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
