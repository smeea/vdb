// hook is writen in a way that it checks for missing criterias on each deck step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the deck dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that deck check.
import {
  BASE,
  CAPACITY,
  CARDTYPES,
  CLAN,
  CRYPT,
  DISCIPLINE,
  DISCIPLINES,
  EQ,
  GT,
  ID,
  LIBRARY,
  LIBRARY_TOTAL,
  LT,
  LT0,
  MONOCLAN,
  NOT,
  OR,
  PLAYERS,
  RANK,
  SCORE,
  SECT,
  STAR,
  SUPERIOR,
  TAGS,
  TRAITS,
  TYPE,
} from '@/constants';
import { countCards, countTotalCost, getClan, getSect } from '@/utils';

const filterDecks = (decks = {}, filter) => {
  return Object.values(decks).filter((deck) => {
    if (filter[RANK] && missingRank(filter[RANK], deck)) return false;
    if (filter[CRYPT] && missingCrypt(filter[CRYPT], deck)) return false;
    if (filter[LIBRARY] && missingLibrary(filter[LIBRARY], deck)) return false;
    if (filter[LIBRARY_TOTAL] && missingLibraryTotal(filter[LIBRARY_TOTAL], deck)) return false;
    if (filter[CLAN] && missingClan(filter[CLAN], deck)) return false;
    if (filter[SECT] && missingSect(filter[SECT], deck)) return false;
    if (filter[CAPACITY] && missingCapacity(filter[CAPACITY], deck)) return false;
    if (filter[DISCIPLINES] && missingDisciplines(filter[DISCIPLINES], deck)) return false;
    if (filter[CARDTYPES] && missingCardtypes(filter[CARDTYPES], deck)) return false;
    if (filter[TRAITS] && missingTraits(filter[TRAITS], deck)) return false;
    if (filter[TAGS] && missingTags(filter[TAGS], deck)) return false;

    return true;
  });
};

export default filterDecks;

const missingRank = (filter, deck) => {
  const { to, from } = filter;
  let miss = false;

  if (from) {
    if (from.includes('%')) {
      if (deck[SCORE][RANK] > (deck[SCORE][PLAYERS] * from.split('%')[0]) / 100) {
        miss = true;
      }
    } else {
      if (deck[SCORE][RANK] > from) miss = true;
    }
  }

  if (to) {
    if (to.includes('%')) {
      if (deck[SCORE][RANK] < (deck[SCORE][PLAYERS] * to.split('%')[0]) / 100) {
        miss = true;
      }
    } else {
      if (deck[SCORE][RANK] < to) miss = true;
    }
  }

  return miss;
};

const missingCrypt = (filter, deck) => {
  if (
    Object.keys(filter).every((c) => {
      const { q, m } = filter[c];
      const cardQty = deck[CRYPT]?.[c]?.q ?? 0;
      return compareQty(cardQty, q, m);
    })
  ) {
    return false;
  }

  return true;
};

const missingLibrary = (filter, deck) => {
  if (
    Object.keys(filter).every((c) => {
      const { q, m } = filter[c];
      const cardQty = deck[LIBRARY]?.[c]?.q ?? 0;
      return compareQty(cardQty, q, m);
    })
  ) {
    return false;
  }

  return true;
};

const missingLibraryTotal = (filter, deck) => {
  const libraryTotal = countCards(Object.values(deck[LIBRARY]));

  if (
    Object.keys(filter).some((i) => {
      const value = i.split('-');
      if (libraryTotal >= value[0] && libraryTotal <= value[1]) return true;
    })
  ) {
    return false;
  }

  return true;
};

const missingClan = (filter, deck) => {
  const { value, logic } = filter;
  const clan = getClan(deck[CRYPT]);

  switch (logic) {
    case OR:
      return !value.some((i) => {
        if (clan && clan.toLowerCase() === i) return true;
      });
    case NOT:
      return value.some((i) => {
        if (clan && clan.toLowerCase() === i) return true;
      });
  }

  return true;
};

const missingSect = (filter, deck) => {
  const { value, logic } = filter;
  const sect = getSect(deck[CRYPT]);

  switch (logic) {
    case OR:
      return !value.some((i) => {
        if (sect && sect.toLowerCase() === i) return true;
      });
    case NOT:
      return value.some((i) => {
        if (sect && sect.toLowerCase() === i) return true;
      });
  }

  return true;
};

const missingCapacity = (filter, deck) => {
  const cryptTotal = countCards(Object.values(deck[CRYPT]));
  const cryptTotalCap = countTotalCost(Object.values(deck[CRYPT]), CAPACITY);
  const avgCapacity = cryptTotalCap / cryptTotal;

  if (
    Object.keys(filter).some((i) => {
      const value = i.split('-');
      if (avgCapacity >= value[0] && avgCapacity <= value[1]) return true;
    })
  ) {
    return false;
  }

  return true;
};

const missingDisciplines = (filter, deck) => {
  if (
    Object.keys(filter).every((d) => {
      return Object.values(deck[LIBRARY]).some((card) => {
        return card.c[DISCIPLINE].includes(d);
      });
    })
  ) {
    return false;
  }
  return true;
};

const missingCardtypes = (filter, deck) => {
  const cardTypes = {};
  let libraryTotal = 0;

  Object.values(deck[LIBRARY]).forEach((card) => {
    libraryTotal += card.q;
    const type = card.c[TYPE].toLowerCase();
    if (cardTypes[type]) {
      cardTypes[type] += card.q;
    } else {
      cardTypes[type] = card.q;
    }
  });

  if (
    Object.keys(filter).every((t) => {
      const value = filter[t].split(',');
      const typeRatio = (cardTypes[t] / libraryTotal) * 100;
      if (typeRatio >= value[0] && typeRatio <= value[1]) return true;
    })
  ) {
    return false;
  }

  return true;
};

const missingTraits = (filter, deck) => {
  let cryptTotal = 0;
  let cryptMaxUnique = 0;
  const clans = [];
  Object.values(deck[CRYPT])
    .filter((card) => card[ID] !== 200076)
    .forEach((card) => {
      if (!clans.includes(card.c[CLAN])) clans.push(card.c[CLAN]);
      cryptTotal += card.q;
      if (cryptMaxUnique < card.q) cryptMaxUnique = card.q;
    });

  if (
    Object.keys(filter).every((t) => {
      switch (t) {
        case MONOCLAN:
          return clans.length === 1;
        case STAR:
          return cryptMaxUnique / cryptTotal > 0.33;
        default:
          return true;
      }
    })
  ) {
    return false;
  }
  return true;
};

const missingTags = (filter, deck) => {
  const tags = [...deck[TAGS][SUPERIOR], ...deck[TAGS][BASE]];
  const positiveTags = Object.keys(filter).filter((i) => filter[i]);
  const negativeTags = Object.keys(filter).filter((i) => !filter[i]);

  return (
    positiveTags.some((i) => {
      return !tags.includes(i);
    }) ||
    negativeTags.some((i) => {
      return tags.includes(i);
    })
  );
};

const compareQty = (cardQty, q, m) => {
  switch (m) {
    case EQ:
      return cardQty === q;
    case GT:
      return cardQty >= q;
    case LT:
      return cardQty > 0 && cardQty <= q;
    case LT0:
      return cardQty <= q;
    default:
      return false;
  }
};
