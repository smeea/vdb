import { proxy } from "valtio";
import { CRYPT, HARD, ID, INVENTORY_TYPE, IS_FROZEN, LIBRARY, SOFT, WISHLIST } from "@/constants";
import { startCryptTimer } from "@/context";
import { inventoryServices } from "@/services";
import { deepClone, getIsPlaytest } from "@/utils";

export const inventoryStore = proxy({
  [CRYPT]: {},
  [LIBRARY]: {},
  [IS_FROZEN]: false,
  [WISHLIST]: {},
});

export const usedStore = proxy({
  [CRYPT]: {
    [SOFT]: {},
    [HARD]: {},
  },
  [LIBRARY]: {
    [SOFT]: {},
    [HARD]: {},
  },
});

export const inventoryCardsAdd = (cards) => {
  const initialCryptState = deepClone(inventoryStore[CRYPT]);
  const initialLibraryState = deepClone(inventoryStore[LIBRARY]);

  const filteredCards = {};
  Object.keys(cards)
    .filter((cardid) => !getIsPlaytest(cardid))
    .forEach((cardid) => {
      filteredCards[cardid] = cards[cardid];
    });

  inventoryServices.addCards(filteredCards).catch(() => {
    inventoryStore[CRYPT] = initialCryptState;
    inventoryStore[LIBRARY] = initialLibraryState;
  });

  Object.values(filteredCards).forEach((card) => {
    const { q, c } = card;

    const store = c[ID] > 200000 ? inventoryStore[CRYPT] : inventoryStore[LIBRARY];
    const isPositive = (store[c[ID]]?.q || 0) + q > 0;
    if (isPositive) {
      if (store[c[ID]]) {
        store[c[ID]].q = store[c[ID]].q + q;
      } else {
        store[c[ID]] = {
          c: c,
          q: q,
        };
      }
    } else {
      delete store[c[ID]];
    }
  });
};

export const inventoryCardChange = (card, q) => {
  if (getIsPlaytest(card[ID])) return;
  const cardSrc = card[ID] > 200000 ? CRYPT : LIBRARY;
  const initialState = deepClone(inventoryStore[cardSrc]);
  const store = inventoryStore[cardSrc];

  if (q >= 0) {
    if (store[card[ID]]) {
      store[card[ID]].q = q;
    } else {
      store[card[ID]] = {
        c: card,
        q: q,
      };
    }
  } else {
    delete store[card[ID]];
  }

  if (cardSrc === CRYPT) startCryptTimer();

  inventoryServices.setCard(card[ID], q).catch(() => {
    inventoryStore[cardSrc] = initialState;
  });
};

export const inventoryCardTextChange = (card, text) => {
  if (getIsPlaytest(card[ID])) return;
  const cardSrc = card[ID] > 200000 ? CRYPT : LIBRARY;
  const initialState = deepClone(inventoryStore[cardSrc]);
  const store = inventoryStore[cardSrc];

  inventoryServices.setCardText(card[ID], text).catch(() => {
    inventoryStore[cardSrc] = initialState;
  });

  if (store[card[ID]]) {
    store[card[ID]].t = text;
  } else {
    store[card[ID]] = {
      q: 0,
      c: card,
      t: text,
    };
  }
};

export const inventoryUpdate = (field, value) => {
  const initialState = inventoryStore[field];
  inventoryStore[field] = value;
  inventoryServices.update(field, value).catch(() => {
    inventoryStore[field] = initialState;
  });
};

export const setupUsedInventory = (decks) => {
  const softCrypt = {};
  const softLibrary = {};
  const hardCrypt = {};
  const hardLibrary = {};
  const crypts = { h: hardCrypt, s: softCrypt };
  const libraries = { h: hardLibrary, s: softLibrary };

  Object.keys(decks).forEach((deckid) => {
    if (decks[deckid][INVENTORY_TYPE]) {
      Object.entries(decks[deckid][CRYPT]).forEach(([id, card]) => {
        if (!card.q) return;
        const target = crypts[card.i || decks[deckid][INVENTORY_TYPE]];
        if (!target[id]) target[id] = {};
        target[id][deckid] = card.q;
      });
      Object.entries(decks[deckid][LIBRARY]).forEach(([id, card]) => {
        if (!card.q) return;
        const target = libraries[card.i || decks[deckid][INVENTORY_TYPE]];
        if (!target[id]) target[id] = {};
        target[id][deckid] = card.q;
      });
    }
  });

  usedStore[CRYPT] = {
    soft: softCrypt,
    hard: hardCrypt,
  };
  usedStore[LIBRARY] = {
    soft: softLibrary,
    hard: hardLibrary,
  };
};

export const wishlistUpdate = (cardid, field, value) => {
  const initialState = inventoryStore[WISHLIST];

  if (inventoryStore[WISHLIST][cardid]) {
    inventoryStore[WISHLIST][cardid][field] = value;
  } else {
    inventoryStore[WISHLIST][cardid] = { [field]: value };
  }

  inventoryServices.updateWishlist(cardid, field, value).catch(() => {
    inventoryStore[WISHLIST] = initialState;
  });
};
