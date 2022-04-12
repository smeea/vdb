import json

with open("cardbase_crypt.json", "r") as crypt_file, open(
    "cardbase_lib.json", "r"
) as library_file, open("crypt.txt", "w") as output_crypt, open(
    "library.txt", "w"
) as output_library:
    crypt_cardbase = list(json.load(crypt_file).values())
    library_cardbase = list(json.load(library_file).values())

    for i in crypt_cardbase:
        output_crypt.write(f"1 {i['Name']}")
        if i["Adv"] and i["Adv"][0]:
            output_crypt.write(" (ADV)")
        output_crypt.write(" (G" + i["Group"].upper() + ")\n")

    for i in library_cardbase:
        output_library.write(f"1 {i['Name']}\n")

    output_crypt.close()
    output_library.close()
