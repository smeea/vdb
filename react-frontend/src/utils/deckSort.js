const deckSort = (cards, sortMethod) => {
  const byName = (a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
    return 0;
  };

  const byClan = (a, b) => {
    if (a.c['Clan'] < b.c['Clan']) {
      return -1;
    }
    if (a.c['Clan'] > b.c['Clan']) {
      return 1;
    }
    return 0;
  };

  const byCapacity = (a, b) => {
    return b.c.Capacity - a.c.Capacity;
  };

  const byQuantity = (a, b) => {
    return b.q - a.q;
  };

  const byGroup = (a, b) => {
    return a.c.Group - b.c.Group;
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Quantity':
        return cards.sort(byName).sort(byCapacity).sort(byQuantity);
      case 'Capacity':
        return cards.sort(byName).sort(byQuantity).sort(byCapacity);
      case 'Group':
        return cards.sort(byName).sort(byCapacity).sort(byGroup);
      case 'Clan':
        return cards.sort(byName).sort(byCapacity).sort(byClan);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default deckSort;
