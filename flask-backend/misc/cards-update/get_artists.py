import json


with open("vtescrypt.json", "r") as crypt_file, open("artistsCrypt.json", "w", encoding='utf8') as artists_crypt_file:
    crypt = json.load(crypt_file)

    artistsSet = set()

    for card in crypt:
        for artist in card['Artist']:
            artistsSet.add(artist)

    artists = sorted(artistsSet)

    # json.dump(artists, artists_crypt_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(artists, artists_crypt_file, indent=4, separators=(',', ':'))

with open("vteslib.json", "r") as library_file, open("artistsLib.json", "w", encoding='utf8') as artists_lib_file:
    library = json.load(library_file)

    artistsSet = set()

    for card in library:
        for artist in card['Artist']:
            artistsSet.add(artist)

    artists = sorted(artistsSet)

    # json.dump(artists, artists_lib_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(artists, artists_lib_file, indent=4, separators=(',', ':'))
