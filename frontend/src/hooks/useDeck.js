const useDeck = (cards, cryptCardBase, libraryCardBase) => {
  const crypt = {};
  const library = {};

  if (cards && cryptCardBase && libraryCardBase) {
    Object.keys(cards).map((cardid) => {
      if (cardid > 200000) {
        crypt[cardid] = {
          q: cards[cardid],
          c: cryptCardBase[cardid],
        };
      } else {
        library[cardid] = {
          q: cards[cardid],
          c: libraryCardBase[cardid],
        };
      }
    });
  }
  return { crypt: crypt, library: library };
};

export default useDeck;
