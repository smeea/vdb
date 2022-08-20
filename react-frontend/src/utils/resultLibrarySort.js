import { cardtypeSortedFull } from 'utils/constants';
import {
  byBloodCost,
  byPoolCost,
  byDiscipline,
  byType,
  byName,
  byClanOpt,
  getCardProperty,
} from 'utils';

const resultLibrarySort = (cards, sortMethod) => {
  const byGroupedType = (a, b) => {
    return (
      cardtypeSortedFull.indexOf(getCardProperty(a, 'Type')) -
      cardtypeSortedFull.indexOf(getCardProperty(b, 'Type'))
    );
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Clan / Discipline':
        return cards
          .sort(byName)
          .sort(byType)
          .sort(byDiscipline)
          .sort(byClanOpt);
      case 'Type':
        return cards
          .sort(byName)
          .sort(byDiscipline)
          .sort(byClanOpt)
          .sort(byType);
      case 'GroupedType':
        return cards.sort(byName).sort(byGroupedType);
      case 'Cost - Min to Max':
        return cards
          .sort(byName)
          .reverse()
          .sort(byDiscipline)
          .sort(byClanOpt)
          .sort(byType)
          .sort(byPoolCost)
          .sort(byBloodCost)
          .reverse();
      case 'Cost - Max to Min':
        return cards
          .sort(byName)
          .sort(byDiscipline)
          .sort(byClanOpt)
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
