import { cardtypeSortedFull } from 'utils/constants';
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
} from 'utils';

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
        return cards.sort(byName);
      case 'Quantity':
        return cards.sort(byName).sort(byQuantity);
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
      case 'Type ': // SPACE SUFFIX IS INTENTIONAL
        return cards.sort(byName).sort(byType);
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
      case 'Cost - Max to Min ': // SPACE SUFFIX IS INTENTIONAL
        return cards.sort(byName).sort(byPoolCost).sort(byBloodCost);
      case 'Cost - Min to Max ': // SPACE SUFFIX IS INTENTIONAL
        return cards
          .sort(byName)
          .reverse()
          .sort(byPoolCost)
          .sort(byBloodCost)
          .reverse();
      case 'Player':
        return cards.sort(byName).sort(byPlayer);
      case 'Date - Print':
        return cards.sort(byName).sort(byDatePrint);
      case 'Date - Win':
        return cards.sort(byName).sort(byDateWin);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default librarySort;
