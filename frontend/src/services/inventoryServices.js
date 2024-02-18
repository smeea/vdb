export const addCards = (cards) => {
  const c = {};
  Object.values(cards).forEach((card) => {
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

export const setCard = (cardid, count) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [cardid]: { q: count } }),
  };
  return fetch(url, options);
};

export const setCardText = (cardid, text) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [cardid]: { t: text } }),
  };
  return fetch(url, options);
};
