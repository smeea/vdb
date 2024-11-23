const parseDeck = (cards = {}, cryptCardBase, libraryCardBase) => {
  const crypt = {};
  const library = {};

  Object.keys(cards).forEach((cardid) => {
    if (cryptCardBase[cardid]) {
      crypt[cardid] = {
        q: cards[cardid],
        c: cryptCardBase[cardid],
      };
    } else if (libraryCardBase[cardid]) {
      library[cardid] = {
        q: cards[cardid],
        c: libraryCardBase[cardid],
      };
    }
  });
  return { crypt, library };
};

export default parseDeck;
