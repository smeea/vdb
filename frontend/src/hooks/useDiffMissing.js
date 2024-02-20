const useDiffMissing = (deckTo, deckFrom) => {
  const missingCrypt = {};
  const missingLibrary = {};

  Object.keys(deckTo.crypt)
    .filter((card) => deckTo.crypt[card].q > 0)
    .forEach((card) => {
      if (!deckFrom.crypt[card]) {
        missingCrypt[card] = deckTo.crypt[card];
      } else if (deckFrom.crypt[card].q < deckTo.crypt[card].q) {
        missingCrypt[card] = {
          c: deckTo.crypt[card].c,
          q: deckTo.crypt[card].q - deckFrom.crypt[card].q,
        };
      }
    });

  Object.keys(deckTo.library)
    .filter((card) => deckTo.library[card].q > 0)
    .forEach((card) => {
      if (!deckFrom.library[card]) {
        missingLibrary[card] = deckTo.library[card];
      } else if (deckFrom.library[card].q < deckTo.library[card].q) {
        missingLibrary[card] = {
          c: deckTo.library[card].c,
          q: deckTo.library[card].q - deckFrom.library[card].q,
        };
      }
    });

  return { missingCrypt, missingLibrary };
};

export default useDiffMissing;
