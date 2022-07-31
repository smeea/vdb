import json

sets = {
    "NB": 2022,
    "V5A": 2021,
    "KSU": 2021,
    "V5": 2020,
    "25th": 2019,
    "FB": 2019,
    "SP": 2019,
    "Anthology I": 2019,
    "KoTR": 2018,
    "HttBR": 2018,
    "LK": 2018,
    "Anthology": 2017,
    "AU": 2016,
    "TU": 2014,
    "DM": 2013,
    "HttB": 2010,
    "EK": 2009,
    "BSC": 2008,
    "KoT": 2008,
    "TR": 2008,
    "SoC": 2007,
    "LotN": 2007,
    "NoR": 2006,
    "Third": 2006,
    "KMW": 2005,
    "LoB": 2005,
    "Gehenna": 2004,
    "Tenth": 2004,
    "Anarchs": 2003,
    "BH": 2003,
    "CE": 2002,
    "BL": 2001,
    "FN": 2001,
    "SW": 2000,
    "Sabbat": 1996,
    "AH": 1996,
    "DS": 1995,
    "VTES": 1995,
    "Jyhad": 1994,
}

with open("twda.json", "r") as twda_input, open(
    "cardbase_crypt.json", "r"
) as crypt_file, open("cardbase_lib.json", "r") as library_file:

    crypt_cardbase = json.load(crypt_file).values()
    library_cardbase = json.load(library_file).values()
    cards = {}

    for card in [*crypt_cardbase, *library_cardbase]:
        cards[card["Id"]] = {
            "deckid": None,
        }

    twda = json.load(twda_input)
    total = len(twda)

    for i in twda:
        deckid = i["id"]
        player = i["player"]
        date = int(i["date"][:4])

        for card in i["crypt"]["cards"]:
            cards[card["id"]]["deckid"] = deckid
            cards[card["id"]]["twd_date"] = date
            cards[card["id"]]["player"] = player

        for cardtype in i["library"]["cards"]:
            for card in cardtype["cards"]:
                cards[card["id"]]["deckid"] = deckid
                cards[card["id"]]["twd_date"] = date
                cards[card["id"]]["player"] = player

with open("twd_cards_history.json", "w") as output_file, open(
    "twd_cards_history.min.json", "w"
) as output_file_min:
    json.dump(cards, output_file_min, separators=(",", ":"))
    json.dump(cards, output_file, indent=4, separators=(",", ":"))
