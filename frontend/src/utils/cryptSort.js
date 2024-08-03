import {
  bySect,
  byCardName,
  byClan,
  byCapacity,
  byGroup,
  byQuantity,
  byPlayer,
  byDateWin,
  byDatePrint,
} from '@/utils';

const cryptSort = (cards, sortMethod) => {
  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.toSorted(byCardName);
      case 'Capacity - Min to Max':
        return cards.toSorted(byCardName).toReversed().toSorted(byCapacity).toReversed();
      case 'Capacity - Max to Min':
        return cards.toSorted(byCardName).toSorted(byCapacity);
      case 'Capacity':
        return cards.toSorted(byCardName).toSorted(byQuantity).toSorted(byCapacity);
      case 'Quantity':
        return cards.toSorted(byCardName).toSorted(byQuantity);
      case 'Quantity ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byQuantity);
      case 'Clan':
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byClan);
      case 'Clan ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byGroup).toSorted(byClan);
      case 'Group':
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byGroup);
      case 'Group ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byClan).toSorted(byGroup);
      case 'Sect':
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(bySect);
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

export default cryptSort;
