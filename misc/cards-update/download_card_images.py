import json
import requests
import multiprocessing


def url_response(url):
    path, url = url
    r = requests.get(url, stream=True)
    with open(path, "wb") as f:
        for ch in r:
            f.write(ch)


with open("vtes.json", "r", encoding="utf8") as krcg_file:
    prefix = "https://static.krcg.org/card/"
    save_directory = "../../frontend/dist/images/cards/en-EN"
    krcg_cards = json.load(krcg_file)
    cards = []
    for card in krcg_cards:
        filename = f"{save_directory}/{card['url'].removeprefix(prefix)}"
        if card["id"] > 200000 and card["group"] == "ANY":
            filename = filename.replace("any.jpg", "gany.jpg")

        cards.append((filename, card["url"]))

    pool = multiprocessing.Pool(processes=8)
    pool.map(url_response, cards)
