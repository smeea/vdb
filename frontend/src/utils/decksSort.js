import {
  CREATION_DATE,
  DATE,
  DATE_NEW_OLD,
  DATE_OLD_NEW,
  FAVORITED_BY,
  FAVORITES,
  NAME,
  PLAYERS,
  RANK,
  RANK_HIGH_LOW,
  RANK_LOW_HIGH,
  SCORE,
} from '@/constants';
import { byTimestamp } from '@/utils';

const decksSort = (decks, sortMethod) => {
  const byRank = (a, b) => a[SCORE][RANK] - b[SCORE][RANK];
  const byFavorites = (a, b) => b[FAVORITED_BY] - a[FAVORITED_BY];
  const byName = (a, b) => a[NAME].localeCompare(b[NAME]);
  const byDate = (a, b) => a[CREATION_DATE] < b[CREATION_DATE];
  const byPlayers = (a, b) => b[PLAYERS] - a[PLAYERS];

  if (decks) {
    decks = [...decks];
    switch (sortMethod) {
      case RANK_HIGH_LOW:
        return decks.toSorted(byRank);
      case RANK_LOW_HIGH:
        return decks.toSorted(byRank).toReversed();
      case NAME:
        return decks.toSorted(byName);
      case DATE:
        return decks.toSorted(byTimestamp);
      case DATE_NEW_OLD:
        return decks.toSorted(byDate);
      case DATE_OLD_NEW:
        return decks.toSorted(byDate).toReversed();
      case FAVORITES:
        return decks.toSorted(byDate).toSorted(byFavorites);
      case PLAYERS:
        return decks.toSorted(byDate).toSorted(byPlayers);
      default:
        return decks;
    }
  } else {
    return null;
  }
};

export default decksSort;
