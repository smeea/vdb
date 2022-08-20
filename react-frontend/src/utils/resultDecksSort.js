import { byName, byTimestamp } from 'utils';

const resultDecksSort = (decks, sortMethod) => {
  const byFavorites = (a, b) => {
    return b.favoritedBy - a.favoritedBy;
  };

  const byDate = (a, b) => {
    return a.creation_date < b.creation_date;
  };

  const byPlayers = (a, b) => {
    return b.players - a.players;
  };

  if (decks) {
    switch (sortMethod) {
      case 'byName':
        return decks.sort(byName);
      case 'byDate':
        return decks.sort(byTimestamp);
      case 'Date - New to Old':
        return decks.sort(byDate);
      case 'Date - Old to New':
        return decks.sort(byDate).reverse();
      case 'Favorites':
        return decks.sort(byDate).sort(byFavorites);
      case 'Players':
        return decks.sort(byDate).sort(byPlayers);
      default:
        return decks;
    }
  } else {
    return null;
  }
};

export default resultDecksSort;
