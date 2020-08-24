function resultLibrarySort(cards, sortMethod) {
  const byName = (a, b) => {
    if (a['Name'] > b['Name']){
      return 1;
    } else {
      return -1;
    }
  };

  const byType = (a, b) => {
    if (a['Type'] > b['Type']){
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

  const byDiscipline = (a, b) => {
    if (a['Discipline'] > b['Discipline']){
      return 1;
    } else {
      return -1;
    }
  };


  if (cards) {
    if (sortMethod == 'Discipline') {
      return cards.sort(byName).sort(byDiscipline);
    } else if (sortMethod == 'Clan') {
      return cards.sort(byName).sort(byClan);
    } else if (sortMethod == 'Type') {
      return cards.sort(byName).sort(byType);
    } else if (sortMethod == 'Name') {
      return cards.sort(byName);
    } else if (sortMethod == 'Default') {
      return cards.sort(byName).sort(byClan).sort(byDiscipline).sort(byType);
    } else {
      return cards;
    }
  } else {
    return null;
  }
}

export default resultLibrarySort;
