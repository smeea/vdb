import {
  bySect,
  byName,
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
        return cards.toSorted(byName);
      case 'Capacity - Min to Max':
        return cards.toSorted(byName).toReversed().toSorted(byCapacity).toReversed();
      case 'Capacity - Max to Min':
        return cards.toSorted(byName).toSorted(byCapacity);
      case 'Capacity':
        return cards.toSorted(byName).toSorted(byQuantity).toSorted(byCapacity);
      case 'Quantity':
        return cards.toSorted(byName).toSorted(byQuantity);
      case 'Quantity ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(byQuantity);
      case 'Clan':
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(byClan);
      case 'Clan ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(byGroup).toSorted(byClan);
      case 'Group':
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(byGroup);
      case 'Group ': // SPACE SUFFIX IS INTENTIONAL
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(byClan).toSorted(byGroup);
      case 'Sect':
        return cards.toSorted(byName).toSorted(byCapacity).toSorted(bySect);
      case 'Player':
        return cards.toSorted(byName).toSorted(byPlayer);
      case 'Date - Print':
        return cards.toSorted(byName).toSorted(byDatePrint);
      case 'Date - Win':
        return cards.toSorted(byName).toSorted(byDateWin);
      default:
        return cards;
    }
  }

  return null;
};

export default cryptSort;
