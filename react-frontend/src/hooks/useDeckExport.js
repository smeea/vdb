import { resultCryptSort } from 'utils';

const getCryptTitle = (crypt) => {
  cryptTotalCap = 0;
  capacityList = [];

  Object.values(crypt).map((card) => {
    cryptTotalCap += card.c['Capacity'] * card.q;
    for (let i = 0; i < card.q; i++) capacityList.push(card.c['Capacity']);
  });
  capacityList.sort();
  cryptTotalCards = capacityList.length;
  cryptAvg = cryptTotalCards
    ? Math.round((cryptTotalCap / cryptTotalCards) * 100) / 100
    : 0;
  cryptMin = 0;
  cryptMax = 0;

  const counter = capacityList.length >= 4 ? 4 : capacityList.length;
  for (let i = 0; i < counter; i++) {
    cryptMin += capacityList[i];
    cryptMax += capacityList[capacityList.length - 1 - i];
  }

  const title = `Crypt (${cryptTotalCards} cards, min=${cryptMin} max=${cryptMax} avg=${cryptAvg})`;

  return title;
};

const getCryptText = (crypt) => {
  let result = '';

  const disciplinesList = {
    Auspex: 'aus',
    Abombwe: 'abo',
    Animalism: 'ani',
    'Blood Sorcery': 'tha',
    Celerity: 'cel',
    Chimerstry: 'chi',
    Daimoinon: 'dai',
    Dementation: 'dem',
    Dominate: 'dom',
    Fortitude: 'for',
    Melpominee: 'mel',
    Mytherceria: 'myt',
    Necromancy: 'nec',
    Obeah: 'obe',
    Obfuscate: 'obf',
    Obtenebration: 'obt',
    Potence: 'pot',
    Presence: 'pre',
    Protean: 'pro',
    Serpentis: 'ser',
    Sanguinus: 'san',
    Spiritus: 'spi',
    Temporis: 'tem',
    Thanatosis: 'thn',
    Quietus: 'qui',
    Valeren: 'val',
    Vicissitude: 'vic',
    Visceratika: 'vis',
    Defense: 'def',
    Innocence: 'inn',
    Judgment: 'jud',
    Martyrdom: 'mar',
    Redemption: 'red',
    Vengeance: 'ven',
    Vision: 'vis',
  };

  const getDisciplines = (disciplines) => {
    const baseDisciplines = [];
    const supDisciplines = [];
    Object.keys(disciplines).map((d) => {
      if (disciplines[d] === 1) {
        baseDisciplines.push(disciplinesList[d].toLowerCase());
      } else {
        supDisciplines.push(disciplinesList[d].toUpperCase());
      }
    });

    return [...baseDisciplines, ...supDisciplines].join(' ');
  };

  let maxQtyLength = 0;
  let maxNameLength = 0;
  let maxTitleLength = 0;
  let maxCapacityLength = 0;
  let maxDisciplinesLength = 0;

  crypt.map((card) => {
    const c = card.c;
    const q = card.q;
    let name = c['Name'];
    if (c['Adv'] && c['Adv'][0]) {
      name += ' (ADV)';
    }
    const disciplines = getDisciplines(c.Disciplines);

    if (q.toString.length > maxQtyLength) {
      maxQtyLength = q.toString.length;
    }
    if (name.length > maxNameLength) {
      maxNameLength = name.length;
    }
    if (c['Title'].length > maxTitleLength) {
      maxTitleLength = c['Title'].length;
    }
    if (c['Capacity'].toString.length > maxCapacityLength) {
      maxCapacityLength = c['Capacity'].toString.length;
    }
    if (disciplines.length > maxDisciplinesLength) {
      maxDisciplinesLength = disciplines.length;
    }
  });

  crypt.map((card) => {
    const q = card.q;
    const c = card.c;

    let name = c['Name'];
    if (c['Adv'] && c['Adv'][0]) {
      name += ' (ADV)';
    }
    const disciplines = getDisciplines(c.Disciplines);

    const quantitySpaces = maxQtyLength - q.toString.length;
    const nameSpaces = maxNameLength - name.length + 3;
    const disSpaces = maxDisciplinesLength - disciplines.length + 3;
    const capacitySpaces = maxCapacityLength - c['Capacity'].toString.length;
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

  Object.values(library).map((card) => {
    libraryTotal += card.q;
    const cardType = card.c.Type;
    const cardName = card.c.Name;

    if (!byType[cardType]) {
      byType[cardType] = {};
      byType[cardType][cardName] = card.q;
      byTypeTotal[cardType] = card.q;
    } else {
      byType[cardType][cardName] = card.q;
      byTypeTotal[cardType] += card.q;
    }
  });

  const byTypeOrder = [
    'Master',
    'Conviction',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Ally',
    'Equipment',
    'Political Action',
    'Retainer',
    'Power',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  const libraryTitle = `Library (${libraryTotal} cards)`;
  result += `${libraryTitle}\n`;
  result += '-'.repeat(libraryTitle.length);
  result += '\n';

  byTypeOrder.map((type) => {
    if (byType[type]) {
      const typeTitle = `${type} (${byTypeTotal[type]})`;
      result += typeTitle;
      result += '\n';

      if (format === 'text') {
        result += '-'.repeat(typeTitle.length);
        result += '\n';
      }

      const sortedCards = Object.keys(byType[type]).sort();
      sortedCards.map((card) => {
        q = byType[type][card];
        result += `${q}x ${card}\n`;
      });

      result += '\n';
    }
  });

  result = result.substring(0, result.length - 1);

  return result;
};

const exportJol = (deck) => {
  let result = '';
  Object.values(deck.crypt).map((card) => {
    let name = card.c['ASCII Name'].replace('"', "'");
    if (card.c['Adv'] && card.c['Adv'][0]) {
      name += ' (ADV)';
    }
    if (card.c['New']) {
      name += ` (G${card.c['Group']})`;
    }
    result += `${card.q}x${name}\n`;
  });

  Object.values(deck.library).map((card) => {
    const name = card.c['ASCII Name'].replace('"', "'");
    result += `${card.q}x${name}\n`;
  });

  return result;
};

const exportLackey = (deck) => {
  let result = '';

  Object.values(deck.library).map((card) => {
    result += `${card.q}${' '.repeat(8 - card.q.toString.length)}`;
    result += `${card.c['ASCII Name'].replace('/', '')}\n`;
  });

  result += 'Crypt:\n';

  Object.values(deck.crypt).map((card) => {
    let name = card.c['ASCII Name'].replace('"', "'");
    if (card.c['Adv'] && card.c['Adv'][0]) {
      name += ' (ADV)';
    }
    if (card.c['New']) {
      name += ` (G${card.c['Group']})`;
    }
    result += `${card.q}${' '.repeat(8 - card.q.toString.length)}`;
    result += `${name}\n`;
  });

  return result;
};

const exportTwd = (deck) => {
  let result = '';
  const sortedCrypt = resultCryptSort(Object.values(deck.crypt), 'Quantity');

  result += `# REPLACE BELOW LINES WITH YOUR EVENT DATA
# REMOVE EVERYTHING STARTING FROM "#" ON EACH LINE (FIRST LINE WILL BE "EVENT NAME")
#
Nosferatu Hosting Loughman's Birthday                  # Event Name
Heath, Ohio                                            # Event Location
December 5th 2021                                      # Event Date
2R + F                                                 # Number of Rounds
13 players                                             # Number of Players
Karl Schaefer                                          # Winner
https://www.vekn.net/event-calendar/event/9953         # Event Link

--2gw8 + 3vp in final                                  # Scores

${deck.name}${' '.repeat(50 - deck.name.length)}     # Deck Name

${
  deck.description
    ? deck.description
    : `I was hoping to play the new Ministry today, but       # Deck description
with so many others planning to do the same, I         # Can be multiline (no
played this instead.                                   # line length limit)`
}
`;
  result += '\n';
  result += `${getCryptTitle(deck.crypt)}\n`;
  result += '-'.repeat(getCryptTitle(deck.crypt).length);
  result += '\n';
  result += getCryptText(sortedCrypt);
  result += '\n';
  result += getLibraryText(deck.library, 'twd');

  return result;
};

const exportText = (deck) => {
  let result = '';
  const sortedCrypt = resultCryptSort(Object.values(deck.crypt), 'Capacity');

  result += `Deck Name: ${deck.name}\n`;
  result += `Author: ${deck.author}\n`;
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
  Object.keys(deck.crypt).map((card) => {
    if (deck.crypt[card].q === 0) {
      delete deck.crypt[card];
    }
  });

  Object.keys(deck.library).map((card) => {
    if (deck.library[card].q === 0) {
      delete deck.library[card];
    }
  });

  switch (format) {
    case 'jol':
      return exportJol(deck);
    case 'lackey':
      return exportLackey(deck);
    case 'twd':
      return exportTwd(deck);
    case 'text':
      return exportText(deck);
  }
};

export default useDeckExport;
