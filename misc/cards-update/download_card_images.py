import json
import multiprocessing
import os
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def url_response(value):
    filename, url = value

    image_path = f"../../frontend/public/images/cards/en-EN/{filename}"
    image_meta = f"./images_meta/{filename}.meta"

    session = requests.Session()
    adapter = HTTPAdapter(max_retries=Retry(total=5, backoff_factor=1))
    session.mount("https://", adapter)

    headers = {}
    if os.path.exists(image_meta):
        with open(image_meta) as f:
            etag, last_modified = f.read().split("\n")
        if etag:
            headers["If-None-Match"] = etag
        elif last_modified:
            headers["If-Modified-Since"] = last_modified

    resp = session.get(url, headers=headers, timeout=(10, 60), stream=True)

    if resp.status_code == 304:
        print(f"{url} not modified, skipping download")
    elif resp.ok:
        with open(image_path, "wb") as f:
            for chunk in resp.iter_content(1 << 16):
                f.write(chunk)
        etag = resp.headers.get("ETag", "")
        last_mod = resp.headers.get("Last-Modified", "")
        with open(image_path, "w") as f:
            f.write(f"{etag}\n{last_mod}")
    else:
        resp.raise_for_status()


with open("vtes.json", "r", encoding="utf8") as krcg_file:
    prefix = "https://static.krcg.org/card/"
    krcg_cards = json.load(krcg_file)
    cards = []
    for card in krcg_cards:
        filename = card["url"].removeprefix(prefix)
        if card["id"] > 200000 and card["group"] == "ANY":
            filename = filename.replace("any.jpg", "gany.jpg")

        cards.append((filename, card["url"]))

    pool = multiprocessing.Pool(processes=8)
    pool.map(url_response, cards)
