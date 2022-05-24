const inventoryLibrarySort = (cards, sortMethod) => {
  const byName = (a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
    return 0;
  };

  const byQuantity = (a, b) => {
    return b.q - a.q;
  };

  const byBloodCost = (a, b) => {
    if (!isNaN(a.c['Blood Cost']) && isNaN(b.c['Blood Cost'])) return -1;
    if (!isNaN(b.c['Blood Cost']) && isNaN(a.c['Blood Cost'])) return 1;
    if (isNaN(a.c['Blood Cost']) && isNaN(b.c['Blood Cost'])) return 0;
    return b.c['Blood Cost'] - a.c['Blood Cost'];
  };

  const byPoolCost = (a, b) => {
    if (!isNaN(a.c['Pool Cost']) && isNaN(b.c['Pool Cost'])) return -1;
    if (isNaN(a.c['Pool Cost']) && !isNaN(b.c['Pool Cost'])) return 1;
    if (isNaN(a.c['Pool Cost']) && isNaN(b.c['Pool Cost'])) return 0;
    return b.c['Pool Cost'] - a.c['Pool Cost'];
  };

  const byClan = (a, b) => {
    if (a.c['Clan'] && !b.c['Clan']) {
      return -1;
    }
    if (!a.c['Clan'] && b.c['Clan']) {
      return 1;
    }
    if (a.c['Clan'] < b.c['Clan']) {
      return -1;
    }
    if (a.c['Clan'] > b.c['Clan']) {
      return 1;
    }
    return 0;
  };

  const byType = (a, b) => {
    if (a.c['Type'] < b.c['Type']) {
      return -1;
    }
    if (a.c['Type'] > b.c['Type']) {
      return 1;
    }
    return 0;
  };

  const byDiscipline = (a, b) => {
    if (a.c['Discipline'] && !b.c['Discipline']) {
      return -1;
    }
    if (!a.c['Discipline'] && b.c['Discipline']) {
      return 1;
    }
    if (a.c['Discipline'] < b.c['Discipline']) {
      return -1;
    }
    if (a.c['Discipline'] > b.c['Discipline']) {
      return 1;
    }
    return 0;
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Quantity':
        return cards.sort(byName).sort(byQuantity);
      case 'Cost - Max to Min':
        return cards.sort(byName).sort(byPoolCost).sort(byBloodCost);
      case 'Cost - Min to Max':
        return cards
          .sort(byName)
          .reverse()
          .sort(byPoolCost)
          .sort(byBloodCost)
          .reverse();
      case 'Clan / Discipline':
        return cards.sort(byName).sort(byType).sort(byDiscipline).sort(byClan);
      case 'Type':
        return cards.sort(byName).sort(byType);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default inventoryLibrarySort;
