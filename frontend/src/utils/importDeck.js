import {
  ADV,
  ASCII,
  AUTHOR,
  BAD_CARDS,
  BASE,
  CRYPT,
  DESCRIPTION,
  GROUP,
  ID,
  LIBRARY,
  NAME,
} from '@/constants';
import { getIsPlaytest } from '@/utils';

const importDeck = async (deckText, cryptCardBase, libraryCardBase, isPlaytester) => {
  const { default: unidecode } = await import('unidecode');

  const cardbase = {};
  Object.values(cryptCardBase).forEach((card) => {
    const adv = !!card?.[ADV][0];
    const name = card[ASCII].toLowerCase().replace(/\W/g, '');

    if (!Object.keys(cardbase).includes(name)) {
      cardbase[name] = { base: card[ID], [card[GROUP]]: card[ID] };
    } else if (adv) {
      cardbase[name][ADV] = card[ID];
    } else {
      cardbase[name][card[GROUP]] = card[ID];
    }
  });

  Object.values(libraryCardBase).forEach((card) => {
    const name = card[ASCII].toLowerCase().replace(/\W/g, '');
    cardbase[name] = { base: card[ID] };
  });

  const minifyCardName = (name) => {
    name = unidecode(name).toLowerCase();
    if (name.startsWith('the ')) {
      name = `${name.replace(/^the /, '')}, the`;
    }
    return name.replace(/--.*$/, '').replace(/\W/g, '');
  };

  const parseCard = (i) => {
    let id;
    let q;

    if (i.includes('ADV')) {
      const regexp = /^([0-9]+) ?x?\s+(.*?)\s\(?ADV\)?.*/;
      const match = i.match(regexp);
      q = Number.parseInt(match[1]);
      let cardname = match[2];
      cardname = minifyCardName(cardname);

      if (Object.keys(cardbase).includes(cardname)) {
        id = cardbase[cardname][ADV];
      }
    } else if (i.includes(' (G')) {
      const regexp = /^\s*([0-9]+) ?x?\s+(.*)\s\(G(.*)\)/;
      const match = i.match(regexp);
      q = Number.parseInt(match[1]);
      const cardname = minifyCardName(match[2]);
      const group = match[3];
      if (Object.keys(cardbase).includes(cardname)) {
        if (Object.keys(cardbase[cardname]).includes(group)) {
          id = cardbase[cardname][group];
        }
      }
    } else {
      let regexp = /^\s*([0-9]+) ?x?\s+(.*?)(\s+\d+.*):(.*)/;
      let match = i.match(regexp);
      if (match) {
        q = Number.parseInt(match[1]);
        const cardname = minifyCardName(match[2]);
        const group = match[4].toLowerCase();
        if (Object.keys(cardbase).includes(cardname)) {
          if (Object.keys(cardbase[cardname]).includes(group)) {
            id = cardbase[cardname][group];
          }
        }
      } else {
        regexp = /^\s*([0-9]+) ?x?\s*(.*)/;
        match = i.match(regexp);
        q = Number.parseInt(match[1]);
        const cardname = minifyCardName(match[2]);
        if (Object.keys(cardbase).includes(cardname)) {
          id = cardbase[cardname][BASE];
        }
      }
    }

    return [id, q];
  };

  const deck = {
    [NAME]: 'New deck',
    [AUTHOR]: '',
    [DESCRIPTION]: '',
    [CRYPT]: {},
    [LIBRARY]: {},
    [BAD_CARDS]: [],
  };

  const deckArray = deckText.split(/\n/);
  deckArray.forEach((i) => {
    i = i.trim();
    if (i.startsWith('Deck Name: ')) {
      deck[NAME] = i.replace('Deck Name: ', '');
      return;
    }
    if (i.startsWith('Author: ')) {
      deck[AUTHOR] = i.replace('Author: ', '');
      return;
    }
    if (i.startsWith('Description: ')) {
      deck[DESCRIPTION] = i.replace('Description: ', '');
      return;
    }
    if (!i || i.match(/^\D/)) {
      return;
    }

    const [id, q] = parseCard(i);
    const isPlaytest = getIsPlaytest(id);

    if (id && q && (!isPlaytest || isPlaytester)) {
      if (id > 200000) {
        deck[CRYPT][id] = {
          c: cryptCardBase[id],
          q: q,
        };
      } else {
        deck[LIBRARY][id] = {
          c: libraryCardBase[id],
          q: q,
        };
      }
    } else {
      deck[BAD_CARDS].push(i);
    }
  });

  return deck;
};

export default importDeck;
