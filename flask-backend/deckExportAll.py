from deckExport import deckExport


def deckExportAll(decks, format):
    mydecks = []
    for d in decks:
        deck = {
            'cards': d.cards,
            'name': d.name,
            'author': d.author.public_name,
            'branch_name': d.branch_name if d.branch_name else "",
            'description': d.description,
        }

        result = deckExport(deck, format)

        if format == 'csv' or format == 'xlsx':
            pass
        else:
            mydecks.append({
                'name': result['name'],
                'format': format,
                'deck': result['deck']
            })

    return (mydecks)
