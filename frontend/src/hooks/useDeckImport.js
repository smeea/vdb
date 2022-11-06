const useDeckImport = async (deckText, cardBaseCrypt, cardBaseLibrary) => {
  const unidecode = await import('unidecode');

  const cardbase = {};
  Object.values(cardBaseCrypt).map((card) => {
    const adv = card?.Adv[0] ? true : false;
    const name = card['ASCII Name'].toLowerCase().replace(/\W/g, '');

    if (!Object.keys(cardbase).includes(name)) {
      cardbase[name] = { base: card.Id, [card.Group]: card.Id };
    } else if (adv) {
      cardbase[name].adv = card.Id;
    } else {
      cardbase[name][card.Group] = card.Id;
    }
  });

  Object.values(cardBaseLibrary).map((card) => {
    const name = card['ASCII Name'].toLowerCase().replace(/\W/g, '');
    cardbase[name] = { base: card.Id };
  });

  const minifyCardName = (name) => {
    name = unidecode(name).toLowerCase();
    if (name.startsWith('the ')) {
      name = `${name.replace(/^the /, '')}, the`;
    }
    return name.replace(/\W/g, '');
  };

  const parseCard = (i) => {
    let id;
    let q;

    if (i.includes('ADV')) {
      const regexp = /^([0-9]+)x?\s+(.*?)\s\(ADV\).*/;
      const match = i.match(regexp);
      q = parseInt(match[1]);
      let cardname = match[2];
      cardname = minifyCardName(cardname);

      if (Object.keys(cardbase).includes(cardname)) {
        id = cardbase[cardname]['adv'];
      }
    } else if (i.includes(' (G')) {
      const regexp = /^\s*([0-9]+)x?\s+(.*)\s\(G(.*)\)/;
      const match = i.match(regexp);
      q = parseInt(match[1]);
      const cardname = minifyCardName(match[2]);
      const group = match[3];
      if (Object.keys(cardbase).includes(cardname)) {
        if (Object.keys(cardbase[cardname]).includes(group)) {
          id = cardbase[cardname][group];
        }
      }
    } else {
      let regexp = /^\s*([0-9]+)x?\s+(.*?)(\s+\d+.*):(.*)/;
      let match = i.match(regexp);
      if (match) {
        q = parseInt(match[1]);
        const cardname = minifyCardName(match[2]);
        const group = match[4];
        if (Object.keys(cardbase).includes(cardname)) {
          if (Object.keys(cardbase[cardname]).includes(group)) {
            id = cardbase[cardname][group];
          }
        }
      } else {
        regexp = /^\s*([0-9]+)x?\s*(.*)/;
        match = i.match(regexp);
        q = parseInt(match[1]);
        const cardname = minifyCardName(match[2]);
        if (Object.keys(cardbase).includes(cardname)) {
          id = cardbase[cardname]['base'];
        }
      }
    }

    return [id, q];
  };

  const deck = {
    name: 'New deck',
    author: '',
    description: '',
    cards: {},
    badCards: [],
  };

  const deckArray = deckText.split(/\n/);
  deckArray.map((i) => {
    i = i.trim();
    if (i.startsWith('Deck Name: ')) {
      deck.name = i.replace('Deck Name: ', '');
      return;
    }
    if (i.startsWith('Author: ')) {
      deck.author = i.replace('Author: ', '');
      return;
    }
    if (i.startsWith('Description: ')) {
      deck.description = i.replace('Description: ', '');
      return;
    }
    if (!i || i.match(/^\D/)) {
      return;
    }

    const [id, q] = parseCard(i);
    if (id && q) {
      deck.cards[id] = {
        c: id > 200000 ? cryptCardBase[id] : libraryCardBase[id],
        q: q,
      };
    } else {
      deck.badCards.push(i);
    }
  });

  return deck;
};

export default useDeckImport;
