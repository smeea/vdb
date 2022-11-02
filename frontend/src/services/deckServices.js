export const update = (deckid, field, value) => {
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

export const cardChange = (deckid, cardid, q) => {
  const url = `${process.env.API_URL}deck/${deckid}`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardChange: { [cardid]: q } }),
  };

  return fetch(url, options);
};

export const deckImport = (deckBody) => {
  const url = `${process.env.API_URL}deck`;
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deckBody),
  };

  return fetch(url, options);
};

export const branchesImport = async (masterId, branches) => {
  const url = `${process.env.API_URL}deck/${masterId}/branch`;
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      branches: branches,
    }),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      data.map((branch, idx) => {
        branches[idx].deckid = branch.deckid;
        branches[idx].branchName = branch.branchName;
      });

      return branches;
    });
};

export const getDeckFromAmaranth = async (deckUrl) => {
  const url = `${process.env.AMARANTH_API_URL}deck`;
  const id = deckUrl.replace(/.*#deck\//i, '');
  const options = {
    method: 'POST',
    body: `id=${id}`,
  };

  const response = await fetch(url, options);
  const deck = await response.json();

  return deck.result;
};
