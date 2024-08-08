import {
  CAPACITY,
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLAN,
  CLANx,
  DATE_PRINT,
  DATE_WIN,
  GROUP,
  GROUPx,
  NAME,
  PLAYER,
  QUANTITY,
  QUANTITYx,
  SECT,
} from '@/utils/constants';

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
      case NAME:
        return cards.toSorted(byCardName);
      case CAPACITY_MIN_MAX:
        return cards.toSorted(byCardName).toReversed().toSorted(byCapacity).toReversed();
      case CAPACITY_MAX_MIN:
        return cards.toSorted(byCardName).toSorted(byCapacity);
      case CAPACITY:
        return cards.toSorted(byCardName).toSorted(byQuantity).toSorted(byCapacity);
      case QUANTITY:
        return cards.toSorted(byCardName).toSorted(byQuantity);
      case QUANTITYx:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byQuantity);
      case CLAN:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byClan);
      case CLANx:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byGroup).toSorted(byClan);
      case GROUP:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byGroup);
      case GROUPx:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(byClan).toSorted(byGroup);
      case SECT:
        return cards.toSorted(byCardName).toSorted(byCapacity).toSorted(bySect);
      case PLAYER:
        return cards.toSorted(byCardName).toSorted(byPlayer);
      case DATE_PRINT:
        return cards.toSorted(byCardName).toSorted(byDatePrint);
      case DATE_WIN:
        return cards.toSorted(byCardName).toSorted(byDateWin);
      default:
        return cards;
    }
  }

  return null;
};

export default cryptSort;
