import { proxy } from 'valtio';
import { derive } from 'derive-valtio';
import { update } from 'idb-keyval';
import { SETS, CRYPT, LIBRARY, BANNED, ALLOWED } from '@/utils/constants';

export const limitedFullStore = proxy({
  [CRYPT]: {},
  [LIBRARY]: {},
  [SETS]: {},
  [ALLOWED]: {
    crypt: {},
    library: {},
  },
  [BANNED]: {
    [CRYPT]: {},
    [LIBRARY]: {},
  },
});

export const limitedStore = derive({
  crypt: (get) => {
    const allowed = get(limitedFullStore)[ALLOWED][CRYPT];
    const banned = get(limitedFullStore)[BANNED][CRYPT];
    const sets = Object.keys(get(limitedFullStore)[SETS]);
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
    const allowed = get(limitedFullStore)[ALLOWED][LIBRARY];
    const banned = get(limitedFullStore)[BANNED][LIBRARY];
    const sets = Object.keys(get(limitedFullStore)[SETS]);
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
  limitedFullStore[ALLOWED][CRYPT] = v;
};

export const setLimitedAllowedLibrary = (v) => {
  limitedFullStore[ALLOWED][LIBRARY] = v;
};

export const setLimitedBannedCrypt = (v) => {
  limitedFullStore[BANNED][CRYPT] = v;
};

export const setLimitedBannedLibrary = (v) => {
  limitedFullStore[BANNED][LIBRARY] = v;
};

export const setLimitedSets = (v) => {
  limitedFullStore[SETS] = v;
};

export const limitedSetChange = (set, isAdd) => {
  const store = limitedFullStore[SETS];
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
  const store = limitedFullStore[isAllowed ? ALLOWED : BANNED][card.Id > 200000 ? CRYPT : LIBRARY];
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
