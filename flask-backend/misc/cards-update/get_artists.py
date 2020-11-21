import json
import unicodedata


def letters_to_ascii(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


with open("vtescrypt.json",
          "r") as crypt_file, open("vteslib.json", "r") as library_file, open(
              "artists.json", "w", encoding='utf8') as artists_file:
    crypt = json.load(crypt_file)
    library = json.load(library_file)

    artistsSet = set()

    for card in crypt:
        artistsSet.add(letters_to_ascii(card['Artist']))

    for card in library:
        artistsSet.add(letters_to_ascii(card['Artist']))

    artists = sorted(artistsSet)

    # json.dump(artists, artists_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(artists, artists_file, indent=4, separators=(',', ':'))
