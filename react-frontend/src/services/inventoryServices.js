export const addtoStateByType = (
  setInventory,
  cardBase,
  cardIds,
  cardQuantity
) => {
  setInventory((prevState) => {
    const oldState = { ...prevState };

    cardIds.forEach((cardid) => {
      oldState[cardid] = {
        c: cardBase[cardid],
        q: prevState[cardid]
          ? prevState[cardid].q + cardQuantity[cardid]
          : cardQuantity[cardid],
      };
    });

    return oldState;
  });
};

export const deleteFromStateByType = (
  setInventory,
  cardBase,
  cardIds,
  cardQuantity
) => {
  setInventory((prevState) => {
    const oldState = { ...prevState };

    cardIds.forEach((cardid) => {
      if (prevState[cardid]) {
        if (prevState[cardid].q > cardQuantity[cardid]) {
          oldState[cardid] = {
            c: cardBase[cardid],
            q: prevState[cardid].q - cardQuantity[cardid],
          };
        } else {
          delete oldState[cardid];
        }
      }
    });

    return oldState;
  });
};
