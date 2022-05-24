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
