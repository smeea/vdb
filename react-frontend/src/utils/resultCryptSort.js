const resultCryptSort = (cards, sortMethod) => {
  const byName = (a, b) => {
    const aName = a['ASCII Name'] || a.c['ASCII Name'];
    const bName = b['ASCII Name'] || b.c['ASCII Name'];

    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };

  const byClan = (a, b) => {
    const aClan = a.Clan || a.c.Clan;
    const bClan = b.Clan || b.c.Clan;

    if (aClan < bClan) return -1;
    if (aClan > bClan) return 1;
    return 0;
  };

  const bySect = (a, b) => {
    const aSect = a.Sect || a.c.Sect;
    const bSect = b.Sect || b.c.Sect;

    if (aSect < bSect) return -1;
    if (aSect > bSect) return 1;
    return 0;
  };

  const byQuantity = (a, b) => {
    return b.q - a.q;
  };

  const byCapacity = (a, b) => {
    const aCapacity = a.Capacity || a.c.Capacity;
    const bCapacity = b.Capacity || b.c.Capacity;
    return bCapacity - aCapacity;
  };

  const byGroup = (a, b) => {
    const aGroup = a.Group || a.c.Group;
    const bGroup = b.Group || b.c.Group;
    return aGroup - bGroup;
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Capacity - Min to Max': // Only in Results
        return cards.sort(byName).reverse().sort(byCapacity).reverse();
      case 'Capacity - Max to Min': // Only in Results
        return cards.sort(byName).sort(byCapacity);
      case 'Capacity': // Only in Decks
        return cards.sort(byName).sort(byQuantity).sort(byCapacity);
      case 'Quantity': // Only in Decks
        return cards.sort(byName).sort(byCapacity).sort(byQuantity);
      case 'Clan':
        return cards.sort(byName).sort(byCapacity).sort(byClan);
      case 'Group':
        return cards.sort(byName).sort(byCapacity).sort(byGroup);
      case 'Sect':
        return cards
          .sort(byName)
          .sort(byCapacity)
          .sort(byQuantity)
          .sort(bySect);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default resultCryptSort;
