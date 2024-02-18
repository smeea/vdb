import { byTimestamp } from '@/utils';

const decksSort = (decks, sortMethod) => {
  const byRank = (a, b) => {
    return a.score.rank - b.score.rank;
  };

  const byFavorites = (a, b) => {
    return b.favoritedBy - a.favoritedBy;
  };

  const byName = (a, b) => {
    return a.name.localeCompare(b.name);
  };

  const byDate = (a, b) => {
    return a.creation_date < b.creation_date;
  };

  const byPlayers = (a, b) => {
    return b.players - a.players;
  };

  if (decks) {
    decks = [...decks];
    switch (sortMethod) {
      case 'Rank - High to Low':
        return decks.toSorted(byRank);
      case 'Rank - Low to High':
        return decks.toSorted(byRank).toReversed();
      case 'byName':
        return decks.toSorted(byName);
      case 'byDate':
        return decks.toSorted(byTimestamp);
      case 'Date - New to Old':
        return decks.toSorted(byDate);
      case 'Date - Old to New':
        return decks.toSorted(byDate).toReversed();
      case 'Favorites':
        return decks.toSorted(byDate).toSorted(byFavorites);
      case 'Players':
        return decks.toSorted(byDate).toSorted(byPlayers);
      default:
        return decks;
    }
  } else {
    return null;
  }
};

export default decksSort;
