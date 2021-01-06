function resultCryptSort(cards, sortMethod) {
  const byName = (a, b) => {
    if (a['ASCII Name'] < b['ASCII Name']) {
      return -1;
    } else {
      return 1;
    }
  };

  const byClan = (a, b) => {
    if (a['Clan'] < b['Clan']) {
      return -1;
    } else if (a['Clan'] == b['Clan']) {
      return 0;
    } else {
      return 1
    }
  };

  const byCapacity = (a, b) => {
    return a['Capacity'] - b['Capacity'];
  };


  const byGroup = (a, b) => {
    return a['Group'] - b['Group'];
  };

  if (cards) {
    switch(sortMethod) {
    case 'Name':
      return cards.sort(byName);
    case 'Capacity':
      return cards.sort(byName).sort(byCapacity);
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
