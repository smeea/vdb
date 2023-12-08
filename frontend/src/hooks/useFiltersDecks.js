// hook is writen in a way that it checks for missing criterias on each deck step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the deck dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that deck check.

import { getClan, getSect } from '@/utils';
import { useDeckLibrary } from '@/hooks';

const useFiltersDecks = (decks = {}) => {
  const filterDecks = (filter) => {
    return Object.values(decks).filter((deck) => {
      if (filter.rank && missingRank(filter.rank, deck)) return false;
      if (filter.crypt && missingCrypt(filter.crypt, deck)) return false;
      if (filter.library && missingLibrary(filter.library, deck)) return false;
      if (filter.libraryTotal && missingLibraryTotal(filter.libraryTotal, deck))
        return false;
      if (filter.clan && missingClan(filter.clan, deck)) return false;
      if (filter.sect && missingSect(filter.sect, deck)) return false;
      if (filter.capacity && missingCapacity(filter.capacity, deck))
        return false;
      if (filter.disciplines && missingDisciplines(filter.disciplines, deck))
        return false;
      if (filter.cardtypes && missingCardtypes(filter.cardtypes, deck))
        return false;
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
      console.log('from', to, from, deck.score.rank);
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
  const { libraryTotal } = useDeckLibrary(deck.library);

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
  const clan = getClan(deck.crypt);
  if (clan && clan.toLowerCase() === filter) return false;

  return true;
};

const missingSect = (filter, deck) => {
  const sect = getSect(deck.crypt);
  if (sect && sect.toLowerCase() === filter) return false;

  return true;
};

const missingCapacity = (filter, deck) => {
  let totalCapacity = 0;
  let totalCrypt = 0;
  Object.values(deck.crypt).forEach((card) => {
    totalCrypt += card.q;
    totalCapacity += card.q * card.c.Capacity;
  });
  const avgCapacity = totalCapacity / totalCrypt;

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
  let totalLibrary = 0;

  Object.values(deck.library).forEach((card) => {
    totalLibrary += card.q;
    const type = card.c['Type'].toLowerCase();
    if (cardTypes[type]) {
      cardTypes[type] += card.q;
    } else {
      cardTypes[type] = card.q;
    }
  });

  if (
    Object.keys(filter).every((t) => {
      const value = filter[t].split(',');
      const typeRatio = (cardTypes[t] / totalLibrary) * 100;
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
        case 'monoclan':
          return clans.length === 1;
        case 'star':
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
    case 'eq':
      return cardQty == q;
    case 'gt':
      return cardQty >= q;
    case 'lt':
      return cardQty > 0 && cardQty <= q;
    case 'lt0':
      return cardQty <= q;
    default:
      return false;
  }
};
