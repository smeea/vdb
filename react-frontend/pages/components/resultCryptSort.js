function resultCryptSort(cards, sortMethod) {
  const sortByName = (a, b) => {
    if (a['Name'] > b['Name']){
      return 1;
    } else {
      return -1;
    }
  };

  const sortByCapacity = (a, b) => {
    if (a['Capacity'] > b['Capacity']){
      return 1;
    } else {
      return -1;
    }
  };

  const sortByClan = (a, b) => {
    if (a['Clan'] > b['Clan']){
      return 1;
    } else {
      return -1;
    }
  };

  const sortByGroup = (a, b) => {
    if (a['Group'] > b['Group']){
      return 1;
    } else {
      return -1;
    }
  };


  if (sortMethod == 'Capacity') {
    return cards.sort(sortByCapacity);
  } else if (sortMethod == 'Clan') {
    return cards.sort(sortByClan);
  } else if (sortMethod == 'Group') {
    return cards.sort(sortByGroup);
  } else if (sortMethod == 'Name') {
    return cards.sort(sortByName);
  } else if (sortMethod == 'Default') {
    return cards.sort(sortByName).sort(sortByClan).sort(sortByGroup).sort(sortByCapacity);
  } else {
    return cards;
  }
}

export default resultCryptSort;
