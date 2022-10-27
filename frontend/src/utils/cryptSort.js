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
} from 'utils';

const cryptSort = (cards, sortMethod) => {
  if (cards) {
    cards = [...cards];
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Capacity - Min to Max':
        return cards.sort(byName).reverse().sort(byCapacity).reverse();
      case 'Capacity - Max to Min':
        return cards.sort(byName).sort(byCapacity);
      case 'Capacity':
        return cards.sort(byName).sort(byQuantity).sort(byCapacity);
      case 'Quantity':
        return cards.sort(byName).sort(byQuantity);
      case 'Quantity ': // SPACE SUFFIX IS INTENTIONAL
        return cards.sort(byName).sort(byCapacity).sort(byQuantity);
      case 'Clan':
        return cards.sort(byName).sort(byClan);
      case 'Clan ': // SPACE SUFFIX IS INTENTIONAL
        return cards.sort(byName).sort(byCapacity).sort(byClan);
      case 'Group':
        return cards.sort(byName).sort(byGroup);
      case 'Group ': // SPACE SUFFIX IS INTENTIONAL
        return cards.sort(byName).sort(byCapacity).sort(byGroup);
      case 'Sect':
        return cards.sort(byName).sort(byCapacity).sort(bySect);
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

export default cryptSort;
