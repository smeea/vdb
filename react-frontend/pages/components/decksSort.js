function decksSort(decks, sortMethod) {
  const byName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
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

export default decksSort;
