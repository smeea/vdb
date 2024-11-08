import { byTimestamp } from '@/utils';
import {
  DATE,
  NAME,
  DATE_NEW_OLD,
  DATE_OLD_NEW,
  FAVORITES,
  PLAYERS,
  RANK_HIGH_LOW,
  RANK_LOW_HIGH,
  RANK,
} from '@/constants';

const decksSort = (decks, sortMethod) => {
  const byRank = (a, b) => a.score[RANK] - b.score[RANK];
  const byFavorites = (a, b) => b.favoritedBy - a.favoritedBy;
  const byName = (a, b) => a[NAME].localeCompare(b[NAME]);
  const byDate = (a, b) => a.creation_date < b.creation_date;
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
