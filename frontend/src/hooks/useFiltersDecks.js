// hook is writen in a way that it checks for missing criterias on each deck step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the deck dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that deck check.

import { countCards, countTotalCost, getClan, getSect } from '@/utils';
import { STAR, MONOCLAN, LT, LT0, GT, EQ, NOT, OR, CAPACITY } from '@/constants';

const useFiltersDecks = (decks = {}) => {
  const filterDecks = (filter) => {
    return Object.values(decks).filter((deck) => {
      if (filter.rank && missingRank(filter.rank, deck)) return false;
      if (filter.crypt && missingCrypt(filter.crypt, deck)) return false;
      if (filter.library && missingLibrary(filter.library, deck)) return false;
      if (filter.libraryTotal && missingLibraryTotal(filter.libraryTotal, deck)) return false;
      if (filter.clan && missingClan(filter.clan, deck)) return false;
      if (filter.sect && missingSect(filter.sect, deck)) return false;
      if (filter.capacity && missingCapacity(filter.capacity, deck)) return false;
      if (filter.disciplines && missingDisciplines(filter.disciplines, deck)) return false;
      if (filter.cardtypes && missingCardtypes(filter.cardtypes, deck)) return false;
      if (filter.traits && missingTraits(filter.traits, deck)) return false;

      return true;
    });
  };

  return {
    filterDecks,
  };
};

export default useFiltersDecks;

const missingRank = (filter, deck) => {
  const { to, from } = filter;
  let miss = false;

  if (from) {
    if (from.includes('%')) {
      if (deck.score.rank > (deck.score.players * from.split('%')[0]) / 100) {
        miss = true;
      }
    } else {
      if (deck.score.rank > from) miss = true;
    }
  }

  if (to) {
    if (to.includes('%')) {
      if (deck.score.rank < (deck.score.players * to.split('%')[0]) / 100) {
        miss = true;
      }
    } else {
      if (deck.score.rank < to) miss = true;
    }
  }

  return miss;
};

const missingCrypt = (filter, deck) => {
  if (
    Object.keys(filter).every((c) => {
      const { q, m } = filter[c];
      const cardQty = deck.crypt?.[c]?.q ?? 0;
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
      const cardQty = deck.library?.[c]?.q ?? 0;
      return compareQty(cardQty, q, m);
    })
  ) {
    return false;
  }

  return true;
};

const missingLibraryTotal = (filter, deck) => {
  const libraryTotal = countCards(Object.values(deck.library));

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
  const clan = getClan(deck.crypt);

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
  const sect = getSect(deck.crypt);

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
  const cryptTotal = countCards(Object.values(deck.crypt));
  const cryptTotalCap = countTotalCost(Object.values(deck.crypt), CAPACITY);
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
      return Object.values(deck.library).some((card) => {
        return card.c.Discipline.includes(d);
      });
    })
  ) {
    return false;
  }
  return true;
};

const missingCardtypes = (filter, deck) => {
  let cardTypes = {};
  let libraryTotal = 0;

  Object.values(deck.library).forEach((card) => {
    libraryTotal += card.q;
    const type = card.c.Type.toLowerCase();
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
  let clans = [];
  Object.values(deck.crypt)
    .filter((card) => card.Id !== 200076)
    .forEach((card) => {
      if (!clans.includes(card.c.Clan)) clans.push(card.c.Clan);
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

const compareQty = (cardQty, q, m) => {
  switch (m) {
    case EQ:
      return cardQty == q;
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
