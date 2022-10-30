import { proxy } from 'valtio';

export const inventoryStore = proxy({
  crypt: {},
  library: {},
});

export const usedStore = proxy({
  crypt: {
    soft: {},
    hard: {},
  },
  library: {
    soft: {},
    hard: {},
  },
});

export const setInventoryCrypt = (v) => {
  inventoryStore.crypt = v;
};

export const setInventoryLibrary = (v) => {
  inventoryStore.library = v;
};

export const setUsedCrypt = (v) => {
  usedStore.crypt = v;
};

export const setUsedLibrary = (v) => {
  usedStore.library = v;
};

export const inventoryCardsAdd = (cards) => {
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
  // TODO revert on bad respose
  fetch(url, options);

  Object.values(cards).map((card) => {
    const { q, c } = card;

    const store = c.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;
    const isPositive = (store[c.Id]?.q || 0) + q > 0;
    if (isPositive) {
      store[c.Id] = {
        c: c,
        q: (store[c.Id]?.q || 0) + q,
      };
    } else {
      delete store[c.Id];
    }
  });
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
  // TODO revert on bad respose
  fetch(url, options);

  const store =
    card.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;
  if (count >= 0) {
    store[card.Id] = {
      c: card,
      q: count,
    };
  } else {
    delete store[card.Id];
  }
};
