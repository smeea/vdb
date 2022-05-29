const resultDecksSort = (decks, sortMethod) => {
  const byName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const byFavorites = (a, b) => {
    return b.favoritedBy - a.favoritedBy;
  };

  const byDate = (a, b) => {
    return a.creation_date < b.creation_date;
  };

  const byPlayers = (a, b) => {
    return b.players - a.players;
  };

  const byTimestamp = (a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
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
