import dayjs from 'dayjs';
import { proxy } from 'valtio';
import {
  AUTHOR,
  BRANCHES,
  BRANCH_NAME,
  CARDS,
  CRYPT,
  CRYPT_TIMER,
  DECK,
  DECKID,
  DECKS,
  DESCRIPTION,
  H,
  ID,
  INVENTORY_TYPE,
  IS_AUTHOR,
  IS_BRANCHES,
  IS_PUBLIC,
  LIBRARY,
  MASTER,
  NAME,
  PUBLIC_PARENT,
  S,
  TAGS,
  TEXT,
  TIMESTAMP,
  USED_IN_INVENTORY,
} from '@/constants';
import { miscStore, startCryptTimer } from '@/context';
import { deckServices } from '@/services';
import { deepClone } from '@/utils';

export const deckStore = proxy({
  [DECK]: undefined,
  [DECKS]: undefined,
});

export const setDeck = (v) => {
  deckStore[DECK] = deepClone(v);
  miscStore[CRYPT_TIMER] = !miscStore[CRYPT_TIMER];
};

export const deckCardChange = (deckid, card, q) => {
  const cardSrc = card[ID] > 200000 ? CRYPT : LIBRARY;
  const initialDeckState = deepClone(deckStore[DECK]);
  const initialDecksState = deepClone(deckStore[DECKS][deckid]);

  if (q >= 0) {
    deckStore[DECKS][deckid][cardSrc][card[ID]] = {
      c: card,
      q: q,
    };

    if (deckid === deckStore[DECK][DECKID]) {
      deckStore[DECK][cardSrc][card[ID]] = {
        c: card,
        q: q,
      };
    }
  } else {
    delete deckStore[DECKS][deckid][cardSrc][card[ID]];

    if (deckid === deckStore[DECK][DECKID]) {
      delete deckStore[DECK][cardSrc][card[ID]];
    }
  }

  changeMaster(deckid);

  if (cardSrc === CRYPT) startCryptTimer();

  deckServices.cardChange(deckid, card[ID], q).catch(() => {
    deckStore[DECK] = initialDeckState;
    deckStore[DECKS][deckid] = initialDecksState;
  });
};

export const deckUpdate = (deckid, field, value) => {
  let initialDeckState;
  if (deckStore?.deck?.[DECKID] === deckid) {
    initialDeckState = deepClone(deckStore[DECK]);
  }
  const initialDecksState = deepClone(deckStore[DECKS][deckid]);

  const clearNegative = (cards) => {
    Object.values(cards).forEach((v) => {
      if (v.q < 0) delete cards[v.c[ID]];
    });

    return cards;
  };

  switch (field) {
    case USED_IN_INVENTORY:
      Object.keys(value).forEach((cardid) => {
        if (cardid > 200000) {
          deckStore[DECKS][deckid][CRYPT][cardid].i = value[cardid];
        } else {
          deckStore[DECKS][deckid][LIBRARY][cardid].i = value[cardid];
        }
      });

      if (deckid === deckStore?.deck?.[DECKID]) {
        Object.keys(value).forEach((cardid) => {
          if (cardid > 200000) {
            deckStore[DECK][CRYPT][cardid].i = value[cardid];
          } else {
            deckStore[DECK][LIBRARY][cardid].i = value[cardid];
          }
        });
      }
      break;
    case CARDS:
      deckStore[DECKS][deckid][CRYPT] = clearNegative(deepClone(value[CRYPT]));
      deckStore[DECKS][deckid][LIBRARY] = clearNegative(deepClone(value[LIBRARY]));

      if (deckid === deckStore?.[DECK]?.[DECKID]) {
        deckStore[DECK][CRYPT] = clearNegative(deepClone(value[CRYPT]));
        deckStore[DECK][LIBRARY] = clearNegative(deepClone(value[LIBRARY]));
      }
      break;
    default:
      deckStore[DECKS][deckid][field] = value;
      if (field === INVENTORY_TYPE) {
        Object.keys(deckStore[DECKS][deckid][CRYPT]).forEach((cardid) => {
          deckStore[DECKS][deckid][CRYPT][cardid].i = '';
        });
        Object.keys(deckStore[DECKS][deckid][LIBRARY]).forEach((cardid) => {
          deckStore[DECKS][deckid][LIBRARY][cardid].i = '';
        });
      }

      if (deckid === deckStore?.deck?.[DECKID]) {
        deckStore[DECK][field] = value;
        if (field === INVENTORY_TYPE) {
          Object.keys(deckStore[DECK][CRYPT]).forEach((cardid) => {
            deckStore[DECK][CRYPT][cardid].i = '';
          });
          Object.keys(deckStore[DECK][LIBRARY]).forEach((cardid) => {
            deckStore[DECK][LIBRARY][cardid].i = '';
          });
        }
      }
  }

  const branchesUpdateFields = [NAME, AUTHOR];
  if (
    branchesUpdateFields.includes(field) &&
    (deckStore[DECKS][deckid][BRANCHES] || deckStore[DECKS][deckid][MASTER])
  ) {
    branchesUpdate(deckid, field, value);
  }
  changeMaster(deckid);

  let finalValue = value;
  if (field === CARDS) {
    const cards = {};
    Object.values({ ...value[CRYPT], ...value[LIBRARY] }).forEach((card) => {
      cards[card.c[ID]] = card.q;
    });
    finalValue = cards;
  }

  deckStore[DECKS][deckid][TIMESTAMP] = dayjs().toISOString();

  return deckServices.update(deckid, field, finalValue).catch(() => {
    deckStore[DECK] = initialDeckState;
    deckStore[DECKS][deckid] = initialDecksState;
  });
};

export const deckToggleInventoryState = (deckid) => {
  switch (deckStore[DECKS][deckid][INVENTORY_TYPE]) {
    case S:
      deckUpdate(deckid, INVENTORY_TYPE, H);
      break;
    case H:
      deckUpdate(deckid, INVENTORY_TYPE, '');
      break;
    default:
      deckUpdate(deckid, INVENTORY_TYPE, S);
  }
};

export const cardToggleInventoryState = (deckid, cardid) => {
  const deck = deckStore[DECKS][deckid];
  const target = cardid > 200000 ? CRYPT : LIBRARY;
  const value = deck[target][cardid].i ? '' : deck[INVENTORY_TYPE] === S ? H : S;
  deckUpdate(deckid, USED_IN_INVENTORY, {
    [cardid]: value,
  });
};

export const deckAdd = (deck) => {
  const d = {
    [DECKID]: deck[DECKID],
    [NAME]: deck[NAME] ?? '',
    [MASTER]: deck[MASTER] ?? null,
    [BRANCHES]: deck[BRANCHES] ?? [],
    [BRANCH_NAME]: deck[BRANCH_NAME] ?? '#0',
    [DESCRIPTION]: deck[DESCRIPTION] ?? '',
    [AUTHOR]: deck[AUTHOR] ?? '',
    [CRYPT]: deck[CRYPT],
    [LIBRARY]: deck[LIBRARY],
    [TAGS]: deck[TAGS] ?? [],
    [TIMESTAMP]: dayjs().toISOString(),
    [IS_AUTHOR]: true,
    [IS_PUBLIC]: Boolean(deck[PUBLIC_PARENT]),
    [IS_BRANCHES]: Boolean(deck[MASTER] || deck[BRANCHES]?.length > 0),
  };

  deckStore[DECKS][deck[DECKID]] = d;
};

export const deckLocalize = (localizedCrypt, nativeCrypt, localizedLibrary, nativeLibrary) => {
  Object.values(deckStore[DECK][CRYPT]).forEach((card) => {
    const id = card.c[ID];
    const newInfo = localizedCrypt[id] ? localizedCrypt[id] : nativeCrypt[id];
    deckStore[DECK][CRYPT][id].c[NAME] = newInfo[NAME];
    deckStore[DECK][CRYPT][id].c[TEXT] = newInfo[TEXT];
  });
  Object.values(deckStore[DECK][LIBRARY]).forEach((card) => {
    const id = card.c[ID];
    const newInfo = localizedLibrary[id] ? localizedLibrary[id] : nativeLibrary[id];
    deckStore[DECK][LIBRARY][id].c[NAME] = newInfo[NAME];
    deckStore[DECK][LIBRARY][id].c[TEXT] = newInfo[TEXT];
  });
};

// INTERNAL STORE FUNCTIONS
const changeMaster = (deckid) => {
  const oldMasterDeckid = deckStore[DECKS][deckid][MASTER];

  if (oldMasterDeckid) {
    const branches = deckStore[DECKS][oldMasterDeckid][BRANCHES].filter((i) => i !== deckid);
    branches.push(oldMasterDeckid);

    branches.forEach((b) => {
      deckStore[DECKS][b][MASTER] = deckid;
      deckStore[DECKS][b][BRANCHES] = [];
    });
    deckStore[DECKS][deckid][BRANCHES] = branches;
    deckStore[DECKS][deckid][MASTER] = null;

    deckStore[DECK][BRANCHES] = branches;
    deckStore[DECK][MASTER] = null;
  }
};

const branchesUpdate = (deckid, field, value) => {
  let revisions = [];
  if (deckStore[DECKS][deckid][MASTER]) {
    revisions = [
      deckStore[DECKS][deckid][MASTER],
      ...deckStore[DECKS][deckStore[DECKS][deckid][MASTER]][BRANCHES],
    ];
  } else {
    revisions = [deckid, ...deckStore[DECKS][deckid][BRANCHES]];
  }

  revisions.forEach((d) => {
    deckStore[DECKS][d][field] = value;
  });
};
