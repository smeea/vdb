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

export const inventoryCardsAddState = (cards) => {
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

export const inventoryCardChangeState = (card, count) => {
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
