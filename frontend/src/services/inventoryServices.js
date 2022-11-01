export const inventoryImportCards = (cards) => {
  const c = {};
  Object.values(cards).map((card) => {
    if (card.q > 0) {
      c[card.c.Id] = card.q;
    }
  });

  const url = `${process.env.API_URL}inventory`;
  const options = {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(c),
  };
  return fetch(url, options);
};

export const inventoryCardChange = (card, count) => {
  const url = `${process.env.API_URL}inventory`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [card.Id]: count }),
  };
  return fetch(url, options);
};
