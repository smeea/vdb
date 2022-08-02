import { cardtypeSortedFull } from 'utils/constants';
import { getCardProperty } from 'utils';

const resultLibrarySort = (cards, sortMethod) => {
  const byName = (a, b) => {
    const aName = a['ASCII Name'] || a.c['ASCII Name'];
    const bName = b['ASCII Name'] || b.c['ASCII Name'];

    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };

  const byType = (a, b) => {
    const aType = a.Type || a.c.Type;
    const bType = b.Type || b.c.Type;

    if (aType < bType) return -1;
    if (aType > bType) return 1;
    return 0;
  };

  const byGroupedType = (a, b) => {
    return (
      cardtypeSortedFull.indexOf(getCardProperty(a, 'Type')) -
      cardtypeSortedFull.indexOf(getCardProperty(b, 'Type'))
    );
  };

  const byBloodCost = (a, b) => {
    if (!isNaN(a['Blood Cost']) && isNaN(b['Blood Cost'])) return -1;
    if (!isNaN(b['Blood Cost']) && isNaN(a['Blood Cost'])) return 1;
    if (isNaN(a['Blood Cost']) && isNaN(b['Blood Cost'])) return 0;
    return b['Blood Cost'] - a['Blood Cost'];
  };

  const byPoolCost = (a, b) => {
    if (!isNaN(a['Pool Cost']) && isNaN(b['Pool Cost'])) return -1;
    if (isNaN(a['Pool Cost']) && !isNaN(b['Pool Cost'])) return 1;
    if (isNaN(a['Pool Cost']) && isNaN(b['Pool Cost'])) return 0;
    return b['Pool Cost'] - a['Pool Cost'];
  };

  const byClan = (a, b) => {
    if (a.Clan && !b.Clan) {
      return -1;
    }
    if (!a.Clan && b.Clan) {
      return 1;
    }
    if (a.Clan < b.Clan) {
      return -1;
    }
    if (a.Clan > b.Clan) {
      return 1;
    }
    return 0;
  };

  const byDiscipline = (a, b) => {
    if (a.Discipline && !b.Discipline) {
      return -1;
    }
    if (!a.Discipline && b.Discipline) {
      return 1;
    }
    if (a.Discipline < b.Discipline) {
      return -1;
    }
    if (a.Discipline > b.Discipline) {
      return 1;
    }
    return 0;
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Clan / Discipline':
        return cards.sort(byName).sort(byType).sort(byDiscipline).sort(byClan);
      case 'Type':
        return cards.sort(byName).sort(byDiscipline).sort(byClan).sort(byType);
      case 'GroupedType':
        return cards.sort(byName).sort(byGroupedType);
      case 'Cost - Min to Max':
        return cards
          .sort(byName)
          .reverse()
          .sort(byDiscipline)
          .sort(byClan)
          .sort(byType)
          .sort(byPoolCost)
          .sort(byBloodCost)
          .reverse();
      case 'Cost - Max to Min':
        return cards
          .sort(byName)
          .sort(byDiscipline)
          .sort(byClan)
          .sort(byType)
          .sort(byPoolCost)
          .sort(byBloodCost);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default resultLibrarySort;
