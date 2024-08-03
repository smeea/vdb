import { cardtypeSortedFull } from '@/utils/constants';
import {
  byBloodCost,
  byPoolCost,
  byDiscipline,
  byQuantity,
  byType,
  byCardName,
  byClanOpt,
  byPlayer,
  byDateWin,
  byDatePrint,
  getCardProperty,
} from '@/utils';

const byGroupedType = (a, b) => {
  return (
    cardtypeSortedFull.indexOf(getCardProperty(a, 'Type')) -
    cardtypeSortedFull.indexOf(getCardProperty(b, 'Type'))
  );
};

const librarySort = (cards, sortMethod) => {
  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.toSorted(byCardName);
      case 'Quantity':
        return cards.toSorted(byCardName).toSorted(byQuantity);
      case 'Clan / Discipline':
        return cards
          .toSorted(byCardName)
          .toSorted(byType)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt);
      case 'Type':
        return cards
          .toSorted(byCardName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType);
      case 'Type ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byCardName).toSorted(byType);
      case 'GroupedType':
        return cards.toSorted(byCardName).toSorted(byGroupedType);
      case 'Cost - Min to Max':
        return cards
          .toSorted(byCardName)
          .toReversed()
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case 'Cost - Max to Min':
        return cards
          .toSorted(byCardName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost);
      case 'Cost - Max to Min ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byCardName).toSorted(byPoolCost).toSorted(byBloodCost);
      case 'Cost - Min to Max ': // SPACE SUFFIX IS INTENTIONAL
        return cards
          .toSorted(byCardName)
          .toReversed()
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case 'Player':
        return cards.toSorted(byCardName).toSorted(byPlayer);
      case 'Date - Print':
        return cards.toSorted(byCardName).toSorted(byDatePrint);
      case 'Date - Win':
        return cards.toSorted(byCardName).toSorted(byDateWin);
      default:
        return cards;
    }
  }

  return null;
};

export default librarySort;
