function resultLibrarySort(cards, sortMethod) {
  const sortByName = (a, b) => {
    if (a['Name'] > b['Name']){
      return 1;
    } else {
      return -1;
    }
  };

  const sortByType = (a, b) => {
    if (a['Type'] > b['Type']){
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

  const sortByDiscipline = (a, b) => {
    if (a['Discipline'] > b['Discipline']){
      return 1;
    } else {
      return -1;
    }
  };


  if (sortMethod == 'Discipline') {
    return cards.sort(sortByDiscipline);
  } else if (sortMethod == 'Clan') {
    return cards.sort(sortByClan);
  } else if (sortMethod == 'Type') {
    return cards.sort(sortByType);
  } else if (sortMethod == 'Name') {
    return cards.sort(sortByName);
  } else if (sortMethod == 'Default') {
    return cards.sort(sortByName).sort(sortByClan).sort(sortByDiscipline).sort(sortByType);
  } else {
    return cards;
  }
}

export default resultLibrarySort;
