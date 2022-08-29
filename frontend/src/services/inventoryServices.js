export const changeState = (setInventory, cardBase, cardIds, cardQuantity) => {
  setInventory((prevState) => {
    const oldState = { ...prevState };

    cardIds.forEach((cardid) => {
      const isPositive = (prevState[cardid]?.q || 0) + cardQuantity[cardid] > 0;

      if (isPositive) {
        oldState[cardid] = {
          c: cardBase[cardid],
          q: (prevState[cardid]?.q || 0) + cardQuantity[cardid],
        };
      } else {
        delete oldState[cardid];
      }
    });

    return oldState;
  });
};
