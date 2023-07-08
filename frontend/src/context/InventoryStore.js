import { proxy } from 'valtio';
import { inventoryServices } from '@/services';

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
  const initialCryptState = JSON.parse(JSON.stringify(inventoryStore.crypt));
  const initialLibraryState = JSON.parse(
    JSON.stringify(inventoryStore.library),
  );

  inventoryServices.addCards(cards).catch(() => {
    inventoryStore.crypt = initialCryptState;
    inventoryStore.library = initialLibraryState;
  });

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

export const inventoryCardChange = (card, q) => {
  const initialCryptState = JSON.parse(JSON.stringify(inventoryStore.crypt));
  const initialLibraryState = JSON.parse(
    JSON.stringify(inventoryStore.library),
  );

  inventoryServices.setCard(card, q).catch(() => {
    inventoryStore.crypt = initialCryptState;
    inventoryStore.library = initialLibraryState;
  });

  const store =
    card.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;

  if (q >= 0) {
    store[card.Id] = {
      c: card,
      q: q,
    };
  } else {
    delete store[card.Id];
  }
};
