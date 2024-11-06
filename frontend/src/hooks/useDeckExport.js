import { getTextDisciplines, cryptSort, librarySort } from '@/utils';
import {
  ASCII,
  CAPACITY,
  TEXT,
  JOL,
  LACKEY,
  TYPE_MASTER,
  NAME,
  QUANTITY,
  TEXT,
  TRIFLE,
  TWD,
  TWD_HINTS,
} from '@/constants';
import cardtypeSortedFull from '@/assets/data/cardtypeSortedFull.json';

const getCryptTitle = (crypt) => {
  let cryptTotalCap = 0;
  const capacityList = [];

  Object.values(crypt).forEach((card) => {
    cryptTotalCap += card.c[CAPACITY] * card.q;
    for (let i = 0; i < card.q; i++) capacityList.push(card.c[CAPACITY]);
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

  return `Crypt (${cryptTotalCards} cards, min=${cryptMin} max=${cryptMax} avg=${cryptAvg})`;
};

const getCryptText = (crypt) => {
  let result = '';
  let maxQtyLength = 0;
  let maxNameLength = 0;
  let maxTitleLength = 0;
  let maxCapacityLength = 0;
  let maxDisciplinesLength = 0;

  crypt.forEach((card) => {
    const c = card.c;
    const q = card.q;
    let name = c[NAME];
    if (c[ADV] && c[ADV][0]) {
      name += ' (ADV)';
    }
    const disciplines = getTextDisciplines(c[DISCIPLINES]);

    if (q.toString().length > maxQtyLength) {
      maxQtyLength = q.toString().length;
    }
    if (name.length > maxNameLength) {
      maxNameLength = name.length;
    }
    if (c[TITLE].length > maxTitleLength) {
      maxTitleLength = c[TITLE].length;
    }
    if (c[CAPACITY].toString().length > maxCapacityLength) {
      maxCapacityLength = c[CAPACITY].toString().length;
    }
    if (disciplines.length > maxDisciplinesLength) {
      maxDisciplinesLength = disciplines.length;
    }
  });

  crypt.forEach((card) => {
    const q = card.q;
    const c = card.c;

    let name = c[NAME];
    if (c[ADV] && c[ADV][0]) {
      name += ' (ADV)';
    }
    const disciplines = getTextDisciplines(c[DISCIPLINES]);

    const quantitySpaces = maxQtyLength - q.toString().length;
    const nameSpaces = maxNameLength - name.length + 3;
    const disSpaces = maxDisciplinesLength - disciplines.length + 3;
    const capacitySpaces = maxCapacityLength - c[CAPACITY].toString().length;
    const titleSpaces = maxTitleLength - c[TITLE].length + 3;

    result += `${q}x${' '.repeat(quantitySpaces)} `;
    result += `${name}${' '.repeat(nameSpaces)}`;
    result += `${' '.repeat(capacitySpaces)}${c[CAPACITY]} `;
    result += `${disciplines}${' '.repeat(disSpaces)}`;
    result += `${c[TITLE]}${' '.repeat(titleSpaces)}`;
    result += `${c[CLAN]}:${c['Group']}\n`;
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
    const cardType = card.c[TYPE];
    const cardName = card.c[NAME];
    if (card.c[TYPE] === TYPE_MASTER && card.c[TEXT].toLowerCase().includes(TRIFLE.toLowerCase())) {
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
  if (format === TEXT) {
    result += '='.repeat(libraryTitle.length);
    result += '\n';
  }

  cardtypeSortedFull.forEach((type) => {
    if (byType[type]) {
      let typeTitle = `${type} (${byTypeTotal[type]}`;
      if (type === TYPE_MASTER && triflesTotal) {
        typeTitle += `; ${triflesTotal} trifle`;
      }
      typeTitle += ')\n';
      result += typeTitle;

      if (format === TEXT) {
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
  const sortedCrypt = cryptSort(Object.values(deck[CRYPT]), NAME);
  const sortedLibrary = librarySort(Object.values(deck[LIBRARY]), NAME);

  sortedCrypt.forEach((card) => {
    let name = card.c[NAME];
    if (card.c[ADV] && card.c[ADV][0]) {
      name += ' (ADV)';
    }
    if (card.c['New']) {
      name += ` (G${card.c['Group']})`;
    }
    result += `${card.q}x${name}\n`;
  });

  sortedLibrary.forEach((card) => {
    const name = card.c[NAME];
    result += `${card.q}x${name}\n`;
  });

  return result;
};

const exportLackey = (deck) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck[CRYPT]), NAME);
  const sortedLibrary = librarySort(Object.values(deck[LIBRARY]), NAME);

  sortedLibrary.forEach((card) => {
    const spaces = 8 - card.q.toString().length;
    result += `${card.q}${' '.repeat(spaces)}`;
    result += `${card.c[ASCII].replace(/\//g, '')}\n`;
  });

  result += 'Crypt:\n';

  sortedCrypt.forEach((card) => {
    const spaces = 8 - card.q.toString().length;
    let name = card.c[ASCII];
    if (card.c[ADV] && card.c[ADV][0]) {
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
  const sortedCrypt = cryptSort(Object.values(deck[CRYPT]), QUANTITY);

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

Deck Name: ${deck[NAME]}${' '.repeat(39 - deck[NAME].length)} # OPTIONAL
Created by: Author Name                            # OPTIONAL, only if different from Winner
Description:                                       # OPTIONAL
${
  deck[DESCRIPTION].replace(/\n|\s/g, '').length > 0
    ? deck[DESCRIPTION]
    : `Put your descriptiopn here.
Empty lines in description are OK. Can take multiple lines.
Each line can be as long as you need it.
One empty line between Description and Crypt is necessary.

# Comments on particular cards are possible in the end on the same line using ' -- ' like this:
# 4x Dummy Corporation -- will increase to 8x, saved me in every round and twice in finals`
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

Deck Name: ${deck[NAME]}
Description:
[Description]
`;
  }

  result += '\n';
  result += `${getCryptTitle(deck[CRYPT])}\n`;
  result += '-'.repeat(getCryptTitle(deck[CRYPT]).length);
  result += '\n';
  result += getCryptText(sortedCrypt);
  result += '\n';
  result += getLibraryText(deck[LIBRARY], TWD);

  return result;
};

const exportText = (deck) => {
  let result = '';
  const sortedCrypt = cryptSort(Object.values(deck[CRYPT]), CAPACITY);

  result += `Deck Name: ${deck[NAME]}\n`;
  result += `Author: ${deck[AUTHOR]}\n`;
  if (deck[DESCRIPTION]) {
    result += `Description: ${deck[DESCRIPTION]}\n`;
  }
  result += '\n';
  result += `${getCryptTitle(deck[CRYPT])}\n`;
  result += '='.repeat(getCryptTitle(deck[CRYPT]).length);
  result += '\n';
  result += getCryptText(sortedCrypt);
  result += '\n';
  result += getLibraryText(deck[LIBRARY], TEXT);

  return result;
};

const useDeckExport = (deck, format) => {
  const crypt = Object.values(deck[CRYPT])
    .filter((card) => card.q > 0)
    .reduce((obj, card) => {
      return Object.assign(obj, {
        [card.c[ID]]: deck[CRYPT][card.c[ID]],
      });
    }, {});

  const library = Object.values(deck[LIBRARY])
    .filter((card) => card.q > 0)
    .reduce((obj, card) => {
      return Object.assign(obj, {
        [card.c[ID]]: deck[LIBRARY][card.c[ID]],
      });
    }, {});

  const d = { ...deck, crypt: crypt, library: library };

  switch (format) {
    case JOL:
      return exportJol(d);
    case LACKEY:
      return exportLackey(d);
    case TWD:
      return exportTwd(d, false);
    case TWD_HINTS:
      return exportTwd(d, true);
    case TEXT:
      return exportText(d);
  }
};

export default useDeckExport;
