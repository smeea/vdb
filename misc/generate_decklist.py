import json

with open("cardbase_crypt.json", "r") as crypt_file, open(
    "cardbase_lib.json", "r"
) as library_file, open("crypt.txt", "w") as output_crypt, open(
    "library.txt", "w"
) as output_library:
    crypt_base = json.load(crypt_file)
    library_base = json.load(library_file)

    for i in crypt_base:
        output_crypt.write(f"1 {crypt_base[i]['Name']}")
        if crypt_base[i]["Adv"] and crypt_base[i]["Adv"][0]:
            output_crypt.write(" (ADV)")
        output_crypt.write(" (G" + crypt_base[i]["Group"].upper() + ")\n")

    for i in library_base:
        output_library.write(f"1 {library_base[i]['Name']}\n")

    output_crypt.close()
    output_library.close()
