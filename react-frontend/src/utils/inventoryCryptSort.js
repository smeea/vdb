import { byName, byClan, byGroup, byQuantity, byCapacity } from 'utils';

const inventoryCryptSort = (cards, sortMethod) => {
  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Quantity':
        return cards.sort(byName).sort(byQuantity);
      case 'Capacity - Max to Min':
        return cards.sort(byName).sort(byCapacity);
      case 'Capacity - Min to Max':
        return cards.sort(byName).reverse().sort(byCapacity).reverse();
      case 'Group':
        return cards.sort(byName).sort(byGroup);
      case 'Clan':
        return cards.sort(byName).sort(byClan);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default inventoryCryptSort;
