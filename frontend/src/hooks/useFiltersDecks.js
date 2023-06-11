// hook is writen in a way that it checks for missing criterias on each deck step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the deck dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that deck check.

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
  if (filter.from) {
    const from = filter.from.split('%');
    if (from.length > 1) {
      if (deck.score.rank <= (deck.score.players * from[0]) / 100) return false;
    } else if (deck.score.rank <= from[0]) return false;
  }

  if (filter.to) {
    const to = filter.to.split('%');
    if (to.length > 1) {
      if (deck.score.rank >= (deck.score.players * to[0]) / 100) return false;
    } else if (deck.score.rank >= to[0]) return false;
  }

  return true;
};

const missingCrypt = (filter, deck) => {
  return true;
};

const missingLibrary = (filter, deck) => {
  return true;
};

const missingLibraryTotal = (filter, deck) => {
  return true;
};

const missingClan = (filter, deck) => {
  return true;
};

const missingSect = (filter, deck) => {
  return true;
};

const missingCapacity = (filter, deck) => {
  return true;
};

const missingDisciplines = (filter, deck) => {
  return true;
};

const missingCardtypes = (filter, deck) => {
  return true;
};

const missingTraits = (filter, deck) => {
  return true;
};
