function resultCryptSort(cards, sortMethod) {
  const byName = (a, b) => {
    if (a['ASCII Name'] < b['ASCII Name']) {
      return -1;
    }
    if (a['ASCII Name'] > b['ASCII Name']) {
      return 1;
    }
    return 0;
  };

  const byClan = (a, b) => {
    if (a['Clan'] < b['Clan']) {
      return -1;
    }
    if (a['Clan'] > b['Clan']) {
      return 1;
    }
    return 0;
  };

  const byCapacity = (a, b) => {
    return a['Capacity'] - b['Capacity'];
  };

  const byGroup = (a, b) => {
    return a['Group'] - b['Group'];
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Capacity - Min to Max':
        return cards.sort(byName).sort(byCapacity);
      case 'Capacity - Max to Min':
        return cards.sort(byName).reverse().sort(byCapacity).reverse();
      case 'Clan':
        return cards.sort(byName).sort(byCapacity).sort(byClan);
      case 'Group':
        return cards.sort(byName).sort(byCapacity).sort(byGroup);
      default:
        return cards;
    }
  } else {
    return null;
  }
}

export default resultCryptSort;
