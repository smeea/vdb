function resultDecksSort(decks, sortMethod) {
  const byName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
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
      default:
        return decks;
    }
  } else {
    return null;
  }
}

export default resultDecksSort;
