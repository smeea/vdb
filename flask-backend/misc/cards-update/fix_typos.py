import json

artist_fixes = {
    "Alejandro Collucci": "Alejandro Colucci",
    "Chet Masterz": "Chet Masters",
    "Dimple": "Nicolas Bigot",
    "EM Gist": "Erik Gist",
    "G. Goleash": "Grant Goleash",
    "Gin\u00e9s Qui\u00f1onero-Santiago": "Gin\u00e9s Qui\u00f1onero",
    "Glenn Osterberger": "Glen Osterberger",
    "Heather V. Kreiter": "Heather Kreiter",
    "Jeff \"el jefe\" Holt": "Jeff Holt",
    "L. Snelly": "Lawrence Snelly",
    "Mathias Tapia": "Matias Tapia",
    "Mattias Tapia": "Matias Tapia",
    "Matt Mitchell": "Matthew Mitchell",
    "Mike Gaydos": "Michael Gaydos",
    "Mike Weaver": "Michael Weaver",
    "Nicolas \"Dimple\" Bigot": "Nicolas Bigot",
    "Pat McEvoy": "Patrick McEvoy",
    "Ron Spenser": "Ron Spencer",
    "Sam Araya": "Samuel Araya",
    "Sandra Chang": "Sandra Chang-Adair",
    "T. Bradstreet": "Tim Bradstreet",
    "Tom Baxa": "Thomas Baxa",
    "zelgaris": "Tomáš Zahradníček",
}

with open("vtescrypt.json", "r+") as crypt_file:
    crypt = json.load(crypt_file)
    crypt_file.seek(0)
    crypt_file.truncate()
    new_crypt = []

    for card in crypt:
        new_artists = []

        for artist in card['Artist']:
            if artist in artist_fixes.keys():
                new_artists.append(artist_fixes[artist])
            else:
                new_artists.append(artist)

        card['Artist'] = new_artists

        new_crypt.append(card)

    # json.dump(artists, artists_crypt_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(new_crypt, crypt_file, indent=4, separators=(',', ':'))

with open("vteslib.json", "r+") as library_file:
    library = json.load(library_file)
    library_file.seek(0)
    library_file.truncate()
    new_library = []

    for card in library:
        new_artists = []

        for artist in card['Artist']:
            if artist in artist_fixes.keys():
                new_artists.append(artist_fixes[artist])
            else:
                new_artists.append(artist)

        card['Artist'] = new_artists

        new_library.append(card)

    # json.dump(artists, artists_lib_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(new_library, library_file, indent=4, separators=(',', ':'))
