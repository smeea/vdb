import json
import multiprocessing
import os
import subprocess

MAX_ATTEMPTS = 5


def download_file(value):
    filename, url = value

    image_path = f"../../frontend/public/images/cards/en-EN/{filename}"
    meta_path = f"./images_meta/{filename}.meta"
    image_tmp = image_path + ".part"
    meta_tmp = meta_path + ".part"

    cmd = [
        "curl",
        "-fsSL",
        "--retry",
        "5",
        "--retry-delay",
        "1",
        "--retry-connrefused",
        "--remove-on-error",
        "--etag-save",
        meta_tmp,
        "--etag-compare",
        meta_path,
        "-w",
        "%{http_code}",
        "-o",
        image_tmp,
        "--",
        url,
    ]

    print(filename)
    try:
        proc = subprocess.run(cmd, check=True, timeout=60, capture_output=True, text=True)
        http_code = proc.stdout.strip()

        if http_code == "304":
            # Server says our copy is current: keep image_path and meta_path untouched.
            return

        # Any other success code means a body was written to image_tmp.
        if not os.path.exists(image_tmp) or os.path.getsize(image_tmp) == 0:
            raise RuntimeError(f"empty download for {url}")

        os.replace(image_tmp, image_path)

        if os.path.exists(meta_tmp) and os.path.getsize(meta_tmp) > 0:
            os.replace(meta_tmp, meta_path)
        elif os.path.exists(meta_path):
            # Server sent no ETag: drop the stale one so the next run re-downloads.
            os.remove(meta_path)

    finally:
        # Always clean temp files, whether we succeeded, got a 304, or raised.
        for tmp in (image_tmp, meta_tmp):
            if os.path.exists(tmp):
                os.remove(tmp)


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
    pool.map(download_file, cards)
