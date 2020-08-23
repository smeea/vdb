function resultCryptSort(cards, sortMethod) {
  const byName = (a, b) => {
    if (a['Name'] > b['Name']){
      return 1;
    } else {
      return -1;
    }
  };

  const byCapacity = (a, b) => {
    if (a['Capacity'] > b['Capacity']){
      return 1;
    } else {
      return -1;
    }
  };

  const byClan = (a, b) => {
    if (a['Clan'] > b['Clan']){
      return 1;
    } else {
      return -1;
    }
  };

  const byGroup = (a, b) => {
    if (a['Group'] > b['Group']){
      return 1;
    } else {
      return -1;
    }
  };


  if (cards) {
    if (sortMethod == 'Capacity') {
      return cards.sort(byName).sort(byCapacity);
    } else if (sortMethod == 'Clan') {
      return cards.sort(byName).sort(byClan);
    } else if (sortMethod == 'Group') {
      return cards.sort(byName).sort(byGroup);
    } else if (sortMethod == 'Name') {
      return cards.sort(byName);
    } else if (sortMethod == 'Default') {
      return cards.sort(byName).sort(byClan).sort(byGroup).sort(byCapacity);
    } else {
      return cards;
    }
  } else {
    return null;
  }
};

export default resultCryptSort;
