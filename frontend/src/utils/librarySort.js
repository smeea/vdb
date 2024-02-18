import { cardtypeSortedFull } from '@/utils/constants';
import {
  byBloodCost,
  byPoolCost,
  byDiscipline,
  byQuantity,
  byType,
  byName,
  byClanOpt,
  byPlayer,
  byDateWin,
  byDatePrint,
  getCardProperty,
} from '@/utils';

const librarySort = (cards, sortMethod) => {
  const byGroupedType = (a, b) => {
    return (
      cardtypeSortedFull.indexOf(getCardProperty(a, 'Type')) -
      cardtypeSortedFull.indexOf(getCardProperty(b, 'Type'))
    );
  };

  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.toSorted(byName);
      case 'Quantity':
        return cards.toSorted(byName).toSorted(byQuantity);
      case 'Clan / Discipline':
        return cards
          .toSorted(byName)
          .toSorted(byType)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt);
      case 'Type':
        return cards
          .toSorted(byName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType);
      case 'Type ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byName).toSorted(byType);
      case 'GroupedType':
        return cards.toSorted(byName).toSorted(byGroupedType);
      case 'Cost - Min to Max':
        return cards
          .toSorted(byName)
          .toReversed()
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case 'Cost - Max to Min':
        return cards
          .toSorted(byName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost);
      case 'Cost - Max to Min ': // SPACE SUFFIX IS INTENTIONAL
        return cards
          .toSorted(byName)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost);
      case 'Cost - Min to Max ': // SPACE SUFFIX IS INTENTIONAL
        return cards
          .toSorted(byName)
          .toReversed()
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case 'Player':
        return cards.toSorted(byName).toSorted(byPlayer);
      case 'Date - Print':
        return cards.toSorted(byName).toSorted(byDatePrint);
      case 'Date - Win':
        return cards.toSorted(byName).toSorted(byDateWin);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default librarySort;
