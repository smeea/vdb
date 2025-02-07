import { CRYPT, LIBRARY } from '@/constants';

const getDiffMissing = (deckTo, deckFrom) => {
  const missingCrypt = {};
  const missingLibrary = {};

  Object.keys(deckTo[CRYPT])
    .filter((card) => deckTo[CRYPT][card].q > 0)
    .forEach((card) => {
      if (!deckFrom[CRYPT][card]) {
        missingCrypt[card] = deckTo[CRYPT][card];
      } else if (deckFrom[CRYPT][card].q < deckTo[CRYPT][card].q) {
        missingCrypt[card] = {
          c: deckTo[CRYPT][card].c,
          q: deckTo[CRYPT][card].q - deckFrom[CRYPT][card].q,
        };
      }
    });

  Object.keys(deckTo[LIBRARY])
    .filter((card) => deckTo[LIBRARY][card].q > 0)
    .forEach((card) => {
      if (!deckFrom[LIBRARY][card]) {
        missingLibrary[card] = deckTo[LIBRARY][card];
      } else if (deckFrom[LIBRARY][card].q < deckTo[LIBRARY][card].q) {
        missingLibrary[card] = {
          c: deckTo[LIBRARY][card].c,
          q: deckTo[LIBRARY][card].q - deckFrom[LIBRARY][card].q,
        };
      }
    });

  return { missingCrypt, missingLibrary };
};

export default getDiffMissing;
