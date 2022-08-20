import { bySect, byName, byClan, byCapacity, byGroup, byQuantity } from 'utils';

const resultCryptSort = (cards, sortMethod) => {
  if (cards) {
    switch (sortMethod) {
      case 'Name':
        return cards.sort(byName);
      case 'Capacity - Min to Max': // Only in Results
        return cards.sort(byName).reverse().sort(byCapacity).reverse();
      case 'Capacity - Max to Min': // Only in Results
        return cards.sort(byName).sort(byCapacity);
      case 'Capacity': // Only in Decks
        return cards.sort(byName).sort(byQuantity).sort(byCapacity);
      case 'Quantity': // Only in Decks
        return cards.sort(byName).sort(byCapacity).sort(byQuantity);
      case 'Clan':
        return cards.sort(byName).sort(byCapacity).sort(byClan);
      case 'Group':
        return cards.sort(byName).sort(byCapacity).sort(byGroup);
      case 'Sect':
        return cards.sort(byName).sort(byCapacity).sort(bySect);
      default:
        return cards;
    }
  } else {
    return null;
  }
};

export default resultCryptSort;
