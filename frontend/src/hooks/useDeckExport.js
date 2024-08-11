import disciplinesList from '@/assets/data/disciplinesList.json';
import virtuesList from '@/assets/data/virtuesList.json';
import { cryptSort, librarySort } from '@/utils';
import {
  cardtypeSortedFull,
  MASTER,
  TRIFLE,
  CARD_TEXT,
  TWD,
  NAME,
  QUANTITY,
  CAPACITY,
} from '@/utils/constants';

const getCryptTitle = (crypt) => {
  let cryptTotalCap = 0;
  const capacityList = [];

  Object.values(crypt).forEach((card) => {
    cryptTotalCap += card.c['Capacity'] * card.q;
    for (let i = 0; i < card.q; i++) capacityList.push(card.c['Capacity']);
  });
  capacityList.sort((a, b) => a - b);
  const cryptTotalCards = capacityList.length;
  const cryptAvg = cryptTotalCards ? Math.round((cryptTotalCap / cryptTotalCards) * 100) / 100 : 0;
  let cryptMin = 0;
  let cryptMax = 0;

  const counter = capacityList.length >= 4 ? 4 : capacityList.length;
  for (let i = 0; i < counter; i++) {
    cryptMin += capacityList[i];
    cryptMax += capacityList.at(-1 - i);
  }

  const title = `Crypt (${cryptTotalCards} cards, min=${cryptMin} max=${cryptMax} avg=${cryptAvg})`;
  return title;
};

const getCryptText = (crypt) => {
  let result = '';

  const disciplinesAndVirtues = { ...disciplinesList, ...virtuesList };

  const getDisciplines = (disciplines) => {
    const baseDisciplines = [];
    const supDisciplines = [];
    Object.keys(disciplines).forEach((d) => {
      if (disciplines[d] === 1) {
        baseDisciplines.push(disciplinesAndVirtues[d].toLowerCase());
      } else {
        supDisciplines.push(disciplinesAndVirtues[d].toUpperCase());
      }
    });

    return [...supDisciplines, ...baseDisciplines].join(' ');
  };

  let maxQtyLength = 0;
  let maxNameLength = 0;
  let maxTitleLength = 0;
  let maxCapacityLength = 0;
  let maxDisciplinesLength = 0;

  crypt.forEach((card) => {
    const c = card.c;
    const q = card.q;
    let name = c.Name;
    if (c['Adv'] && c['Adv'][0]) {
      name += ' (ADV)';
    }
    const disciplines = getDisciplines(c.Disciplines);

    if (q.toString().length > maxQtyLength) {
      maxQtyLength = q.toString().length;
    }
    if (name.length > maxNameLength) {
      maxNameLength = name.length;
    }
    if (c['Title'].length > maxTitleLength) {
      maxTitleLength = c['Title'].length;
    }
    if (c['Capacity'].toString().length > maxCapacityLength) {
      maxCapacityLength = c['Capacity'].toString().length;
    }
    if (disciplines.length > maxDisciplinesLength) {
      maxDisciplinesLength = disciplines.length;
    }
  });

  crypt.forEach((card) => {
    const q = card.q;
    const c = card.c;

    let name = c.Name;
    if (c.Adv && c.Adv[0]) {
      name += ' (ADV)';
    }
    const disciplines = getDisciplines(c.Disciplines);

    const quantitySpaces = maxQtyLength - q.toString().length;
    const nameSpaces = maxNameLength - name.length + 3;
    const disSpaces = maxDisciplinesLength - disciplines.length + 3;
    const capacitySpaces = maxCapacityLength - c['Capacity'].toString().length;
    const titleSpaces = maxTitleLength - c['Title'].length + 3;

    result += `${q}x${' '.repeat(quantitySpaces)} `;
    result += `${name}${' '.repeat(nameSpaces)}`;
    result += `${' '.repeat(capacitySpaces)}${c['Capacity']} `;
    result += `${disciplines}${' '.repeat(disSpaces)}`;
    result += `${c['Title']}${' '.repeat(titleSpaces)}`;
    result += `${c['Clan']}:${c['Group']}\n`;
  });

  return result;
};

const getLibraryText = (library, format) => {
  let result = '';
  const byType = {};
  const byTypeTotal = {};
  let libraryTotal = 0;
  let triflesTotal = 0;

  Object.values(library).forEach((card) => {
    libraryTotal += card.q;
    const cardType = card.c.Type;
    const cardName = card.c.Name;
    if (card.c.Type === MASTER && card.c[CARD_TEXT].toLowerCase().includes(TRIFLE.toLowerCase())) {
      triflesTotal += card.q;
    }

    if (!byType[cardType]) {
      byType[cardType] = {};
      byType[cardType][cardName] = card.q;
      byTypeTotal[cardType] = card.q;
    } else {
      byType[cardType][cardName] = card.q;
      byTypeTotal[cardType] += card.q;
    }
  });

  const libraryTitle = `Library (${libraryTotal} cards)`;
  result += `${libraryTitle}\n`;
  if (format === 'text') {
    result += '='.repeat(libraryTitle.length);
    result += '\n';
  }

  cardtypeSortedFull.forEach((type) => {
    if (byType[type]) {
      let typeTitle = `${type} (${byTypeTotal[type]}`;
      if (type === MASTER && triflesTotal) {
        typeTitle += `; ${triflesTotal} trifle`;
      }
      typeTitle += ')\n';
      result += typeTitle;

      if (format === 'text') {
        result += '-'.repeat(typeTitle.length);
        result += '\n';
      }

      const sortedCards = Object.keys(byType[type]).toSorted();
      sortedCards.forEach((card) => {
        result += `${byType[type][card]}x ${card}\n`;
      });
      result += '\n';
    }
  });

  result = result.substring(0, result.length - 1);

  return result;
};

const exportJol = (deck) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck.crypt), NAME);
  const sortedLibrary = librarySort(Object.values(deck.library), NAME);

  sortedCrypt.forEach((card) => {
    let name = card.c['ASCII Name'];
    if (card.c['Adv'] && card.c['Adv'][0]) {
      name += ' (ADV)';
    }
    if (card.c['New']) {
      name += ` (G${card.c['Group']})`;
    }
    result += `${card.q}x${name}\n`;
  });

  sortedLibrary.forEach((card) => {
    const name = card.c['ASCII Name'];
    result += `${card.q}x${name}\n`;
  });

  return result;
};

const exportLackey = (deck) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck.crypt), NAME);
  const sortedLibrary = librarySort(Object.values(deck.library), NAME);

  sortedLibrary.forEach((card) => {
    const spaces = 8 - card.q.toString().length;
    result += `${card.q}${' '.repeat(spaces)}`;
    result += `${card.c['ASCII Name'].replace(/\//g, '')}\n`;
  });

  result += 'Crypt:\n';

  sortedCrypt.forEach((card) => {
    const spaces = 8 - card.q.toString().length;
    let name = card.c['ASCII Name'];
    if (card.c['Adv'] && card.c['Adv'][0]) {
      name += ' (ADV)';
    }
    if (card.c['New']) {
      name += ` (G${card.c['Group']})`;
    }

    result += `${card.q}${' '.repeat(spaces)}`;
    result += `${name}\n`;
  });

  return result;
};

const exportTwd = (deck, withHints) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck.crypt), QUANTITY);

  if (withHints) {
    result += `# REPLACE BELOW LINES WITH YOUR EVENT DATA
# REMOVE EVERYTHING STARTING FROM "#" ON EACH LINE (FIRST LINE WILL BE EVENT NAME)
6th Great Symposium                                # Event Name
Mikkeli, Finland                                   # Event Location
March 25th 2023                                    # Event Date
3R+F                                               # Number of Rounds
13 players                                         # Number of Players
Otso Saariluoma                                    # Winner
https://www.vekn.net/event-calendar/event/10546    # Event Link

Deck Name: ${deck.name}${' '.repeat(39 - deck.name.length)} # OPTIONAL
Created by: Author Name                            # OPTIONAL, only if different from Winner
Description:                                       # OPTIONAL
${
  deck.description
    ? deck.description
    : `Put your descriptiopn here, like how deck   # Don't format text width with line breaks
worked, what would you like to change, say hello   # Example on the left is how NOT TO DO
to your grandma or anything else.                  # Break line only to start new paragraph/list item/etc

Empty lines in description are OK. One empty line between Description and Crypt is necessary.

# Comments on particular cards are possible in the end on the same line using ' -- ' like this:
# 4x Dummy Corporation -- will increase to 8x, saved me in every round and twice in finals'`
}
`;
  } else {
    result += `[Event Name]
[Location]
[Date]
[Format]
[Players]
[Winner]
[Event Link]

-- [Scores]

Deck Name: ${deck.name}
Description:
[Description]
`;
  }

  result += '\n';
  result += `${getCryptTitle(deck.crypt)}\n`;
  result += '-'.repeat(getCryptTitle(deck.crypt).length);
  result += '\n';
  result += getCryptText(sortedCrypt);
  result += '\n';
  result += getLibraryText(deck.library, TWD);

  return result;
};

const exportText = (deck) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck.crypt), CAPACITY);

  result += `Deck Name: ${deck.name}\n`;
  result += `Author: ${deck.author}\n`;
  if (deck.description) {
    result += `Description: ${deck.description}\n`;
  }
  result += '\n';
  result += `${getCryptTitle(deck.crypt)}\n`;
  result += '='.repeat(getCryptTitle(deck.crypt).length);
  result += '\n';
  result += getCryptText(sortedCrypt);
  result += '\n';
  result += getLibraryText(deck.library, 'text');

  return result;
};

const useDeckExport = (deck, format) => {
  const crypt = Object.values(deck.crypt)
    .filter((card) => card.q > 0)
    .reduce((obj, card) => {
      return Object.assign(obj, {
        [card.c.Id]: deck.crypt[card.c.Id],
      });
    }, {});

  const library = Object.values(deck.library)
    .filter((card) => card.q > 0)
    .reduce((obj, card) => {
      return Object.assign(obj, {
        [card.c.Id]: deck.library[card.c.Id],
      });
    }, {});

  const d = { ...deck, crypt: crypt, library: library };

  switch (format) {
    case 'jol':
      return exportJol(d);
    case 'lackey':
      return exportLackey(d);
    case TWD:
      return exportTwd(d, false);
    case 'twdHints':
      return exportTwd(d, true);
    case 'text':
      return exportText(d);
  }
};

export default useDeckExport;
