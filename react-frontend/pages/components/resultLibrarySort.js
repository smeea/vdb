function resultLibrarySort(cards, sortMethod) {
  const byName = (a, b) => {
    if (a['ASCII Name'] < b['ASCII Name']) {
      return -1;
    } else {
      return 1;
    }
  };

  const byType = (a, b) => {
    if (a['Type'] < b['Type']) {
      return -1;
    } else if (a['Type'] == b['Type']) {
      return 0;
    } else {
      return 1;
    }
  };

  const byBloodCost = (a, b) => {
    if (!isNaN(a['Blood Cost']) && isNaN(b['Blood Cost'])) return -1
    if (isNaN(a['Blood Cost']) && !isNaN(b['Blood Cost'])) return 1
    if (isNaN(a['Blood Cost']) && isNaN(b['Blood Cost'])) return 0
    return b['Blood Cost'] - a['Blood Cost'];
  };

  const byPoolCost = (a, b) => {
    if (!isNaN(a['Pool Cost']) && isNaN(b['Pool Cost'])) return -1
    if (isNaN(a['Pool Cost']) && !isNaN(b['Pool Cost'])) return 1
    if (isNaN(a['Pool Cost']) && isNaN(b['Pool Cost'])) return 0
    return b['Pool Cost'] - a['Pool Cost'];
  };

  const byClan = (a, b) => {
    if (a['Clan'] && !b['Clan']) {
      return -1;
    } else if (!a['Clan'] && b['Clan']) {
      return 1;
    } else if (a['Clan'] > b['Clan']) {
      return 1;
    } else if (a['Clan'] == b['Clan']) {
      return 0;
    } else {
      return -1;
    }
  };

  const byDiscipline = (a, b) => {
    if (a['Discipline'] && !b['Discipline']) {
      return -1;
    } else if (!a['Discipline'] && b['Discipline']) {
      return 1;
    } else if (a['Discipline'] > b['Discipline']) {
      return 1;
    } else if (a['Discipline'] == b['Discipline']) {
      return 0;
    } else {
      return -1;
    }
  };

  if (cards) {
    switch(sortMethod) {
    case 'Name':
      return cards.sort(byName);
    case 'Clan/Discipline':
      return cards.sort(byName).sort(byType).sort(byDiscipline).sort(byClan);
    case 'Type':
      return cards.sort(byName).sort(byDiscipline).sort(byClan).sort(byType);
    case 'Cost':
      return cards.sort(byName).sort(byDiscipline).sort(byClan).sort(byType).sort(byPoolCost).sort(byBloodCost);
    default:
      return cards;
    }
  } else {
    return null;
  }
}

export default resultLibrarySort;
