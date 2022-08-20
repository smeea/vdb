import {
  byBloodCost,
  byPoolCost,
  byType,
  byDiscipline,
  byName,
  byQuantity,
  byClanOpt,
} from 'utils';

const inventoryLibrarySort = (cards, sortMethod) => {
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
        return cards
          .sort(byName)
          .sort(byType)
          .sort(byDiscipline)
          .sort(byClanOpt);
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
