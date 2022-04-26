export const getDecks = () => {
  const url = `${process.env.API_URL}decks`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  return fetch(url, options).then((response) => response.json());
};

export const deckUpdate = (deckid, field, value) => {
  const url = `${process.env.API_URL}deck/${deckid}`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [field]: value }),
  };

  return fetch(url, options);
};

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
