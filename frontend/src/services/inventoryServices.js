export const changeState = (setInventory, cardBase, cardIds, cardQuantity) => {
  setInventory((prevState) => {
    const newState = { ...prevState };

    cardIds.forEach((cardid) => {
      const isPositive = (prevState[cardid]?.q || 0) + cardQuantity[cardid] > 0;

      if (isPositive) {
        newState[cardid] = {
          c: cardBase[cardid],
          q: (prevState[cardid]?.q || 0) + cardQuantity[cardid],
        };
      } else {
        delete newState[cardid];
      }
    });

    return newState;
  });
};
