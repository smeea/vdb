import json
import csv
from openpyxl import Workbook
import base64
import io


def deck_export(d, format):
    with open("cardbase_crypt.json", "r") as crypt_file, open(
        "cardbase_lib.json", "r"
    ) as library_file:
        crypt_base = json.load(crypt_file)
        library_base = json.load(library_file)

    crypt = {}
    library = {}

    for k, v in d["cards"].items():
        if v > 0:
            k = int(k)
            if k > 200000:
                crypt[k] = {"c": crypt_base[str(k)], "q": v}
            elif k < 200000:
                library[k] = {"c": library_base[str(k)], "q": v}

    if format == "csv":
        f = io.StringIO()
        writer = csv.writer(f)

        for i in crypt.values():
            q = i["q"]
            id = i["c"]["Id"]
            writer.writerow([q, id])

        for i in library.values():
            q = i["q"]
            id = i["c"]["Id"]
            writer.writerow([q, id])

        return base64.b64encode(f.getvalue().encode("latin-1"))

    elif format == "xlsx":
        fb = io.BytesIO()
        wb = Workbook()
        ws_crypt = wb.active
        ws_crypt.title = "Crypt"
        ws_library = wb.create_sheet(title="Library")

        sorted_crypt = sorted(crypt.values(), key=lambda x: x["c"]["Name"])
        for i in sorted_crypt:
            q = i["q"]
            c = i["c"]
            name = c["ASCII Name"].replace('"', "'")
            if c["Adv"] and c["Adv"][0]:
                name = f"{name} (ADV)"
            if c["New"]:
                name = f"{name} (G{c['Group']})"

            ws_crypt.append([q, name])

        sorted_library = sorted(library.values(), key=lambda x: x["c"]["Name"])
        for i in sorted_library:
            q = i["q"]
            c = i["c"]
            name = c["ASCII Name"].replace('"', "'")
            ws_library.append([q, name])

        wb.save(fb)

        return base64.b64encode(fb.getvalue())
