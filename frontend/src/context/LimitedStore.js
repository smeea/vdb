import { proxy } from 'valtio';
import { derive } from 'valtio/utils';
import { update } from 'idb-keyval';

export const limitedFullStore = proxy({
  crypt: {},
  library: {},
  sets: {},
  allowed: {
    crypt: {},
    library: {},
  },
  banned: {
    crypt: {},
    library: {},
  },
});

export const limitedStore = derive({
  crypt: (get) => {
    const allowed = get(limitedFullStore).allowed.crypt;
    const banned = get(limitedFullStore).banned.crypt;
    const sets = Object.keys(get(limitedFullStore).sets);
    const cards = {};

    Object.values(get(limitedFullStore).crypt)
      .filter((card) => {
        if (banned[card.Id]) return false;
        if (allowed[card.Id]) return true;
        if (
          Object.keys(card.Set).some((i) => {
            return sets.includes(i);
          })
        ) {
          return true;
        }
      })
      .forEach((card) => {
        cards[card.Id] = card;
      });

    return cards;
  },
  library: (get) => {
    const allowed = get(limitedFullStore).allowed.library;
    const banned = get(limitedFullStore).banned.library;
    const sets = Object.keys(get(limitedFullStore).sets);
    const cards = {};

    Object.values(get(limitedFullStore).library)
      .filter((card) => {
        if (banned[card.Id]) return false;
        if (allowed[card.Id]) return true;
        if (
          Object.keys(card.Set).some((i) => {
            return sets.includes(i);
          })
        ) {
          return true;
        }
      })
      .forEach((card) => {
        cards[card.Id] = card;
      });

    return cards;
  },
});

export const setLimitedAllowedCrypt = (v) => {
  limitedFullStore.allowed.crypt = v;
};

export const setLimitedAllowedLibrary = (v) => {
  limitedFullStore.allowed.library = v;
};

export const setLimitedBannedCrypt = (v) => {
  limitedFullStore.banned.crypt = v;
};

export const setLimitedBannedLibrary = (v) => {
  limitedFullStore.banned.library = v;
};

export const setLimitedSets = (v) => {
  limitedFullStore.sets = v;
};

export const limitedSetChange = (set, isAdd) => {
  const store = limitedFullStore.sets;
  const idbStore = 'limitedSets';

  if (isAdd) {
    store[set] = true;

    update(idbStore, (val) => ({
      ...val,
      [set]: true,
    }));
  } else {
    delete store[set];

    update(idbStore, (val) => {
      delete val[set];
      return val;
    });
  }
};

export const limitedCardChange = (card, isAllowed, isAdd) => {
  const store =
    card.Id > 200000
      ? isAllowed
        ? limitedFullStore.allowed.crypt
        : limitedFullStore.banned.crypt
      : isAllowed
        ? limitedFullStore.allowed.library
        : limitedFullStore.banned.library;

  const idbStore =
    card.Id > 200000
      ? isAllowed
        ? 'limitedAllowedCrypt'
        : 'limitedBannedCrypt'
      : isAllowed
        ? 'limitedAllowedLibrary'
        : 'limitedBannedLibrary';

  if (isAdd) {
    store[card.Id] = card;

    update(idbStore, (val) => ({
      ...val,
      [card.Id]: true,
    }));
  } else {
    delete store[card.Id];

    update(idbStore, (val) => {
      delete val[card.Id];
      return val;
    });
  }
};
