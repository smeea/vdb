import json
import multiprocessing
import os
import string
import subprocess


def download_file(value):
    filename, url = value

    image_path = f"../frontend/public/images/cards/en-EN/{filename}"
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
            return

        if not os.path.exists(image_tmp) or os.path.getsize(image_tmp) == 0:
            raise RuntimeError(f"empty download for {url}")

        os.replace(image_tmp, image_path)

        if os.path.exists(meta_tmp) and os.path.getsize(meta_tmp) > 0:
            os.replace(meta_tmp, meta_path)
        elif os.path.exists(meta_path):
            os.remove(meta_path)

    finally:
        for tmp in (image_tmp, meta_tmp):
            if os.path.exists(tmp):
                os.remove(tmp)


with open("cardbase_crypt.json", "r") as crypt_file, open("cardbase_lib.json", "r") as library_file:
    url_prefix = "https://static.krcg.org/card"
    cards = {
        **json.load(crypt_file),
        **json.load(library_file),
    }
    image_list = []
    for card in cards.values():
        filename = (
            card["ascii"]
            .lower()
            .translate(str.maketrans("", "", string.punctuation + string.whitespace))
        )
        if card["id"] > 200000:
            filename += f"g{card['group']}"
            if card["adv"] and card["adv"][0]:
                filename += "adv"

        filename += ".jpg"
        url = f"{url_prefix}/{filename.replace('gany.jpg', 'any.jpg')}"

        image_list.append((filename, url))

    pool = multiprocessing.Pool(processes=8)
    pool.map(download_file, image_list)
