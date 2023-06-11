export const addCards = (cards) => {
  const c = {};
  Object.values(cards).map((card) => {
    if (card.q !== 0) {
      c[card.c.Id] = card.q;
    }
  });

  const url = `${import.meta.env.VITE_API_URL}/inventory`;
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

export const setCard = (card, count) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
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
