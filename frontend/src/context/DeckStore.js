import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import {
  USED_IN_INVENTORY,
  CRYPT,
  LIBRARY,
  DECK,
  DECKS,
  CRYPT_TIMER,
  CARD_TEXT,
  CARDS,
  INVENTORY_TYPE,
  AUTHOR,
} from '@/utils/constants';
import { deckServices } from '@/services';
import { startCryptTimer, miscStore } from '@/context';

export const deckStore = proxy({
  [DECK]: undefined,
  [DECKS]: undefined,
});

export const setDeck = (v) => {
  deckStore[DECK] = deepClone(v);
  miscStore[CRYPT_TIMER] = !miscStore[CRYPT_TIMER];
};

export const deckCardChange = (deckid, card, q) => {
  const cardSrc = card.Id > 200000 ? CRYPT : LIBRARY;
  const initialDeckState = deepClone(deckStore[DECK]);
  const initialDecksState = deepClone(deckStore[DECKS][deckid]);

  if (q >= 0) {
    deckStore[DECKS][deckid][cardSrc][card.Id] = {
      c: card,
      q: q,
    };

    if (deckid === deckStore[DECK].deckid) {
      deckStore[DECK][cardSrc][card.Id] = {
        c: card,
        q: q,
      };
    }
  } else {
    delete deckStore[DECKS][deckid][cardSrc][card.Id];

    if (deckid === deckStore[DECK].deckid) {
      delete deckStore[DECK][cardSrc][card.Id];
    }
  }

  changeMaster(deckid);

  if (cardSrc === CRYPT) startCryptTimer();

  deckServices.cardChange(deckid, card.Id, q).catch(() => {
    deckStore[DECK] = initialDeckState;
    deckStore[DECKS][deckid] = initialDecksState;
  });
};

export const deckUpdate = (deckid, field, value) => {
  let initialDeckState;
  if (deckStore?.deck?.deckid === deckid) {
    initialDeckState = deepClone(deckStore[DECK]);
  }
  const initialDecksState = deepClone(deckStore[DECKS][deckid]);

  switch (field) {
    case USED_IN_INVENTORY:
      Object.keys(value).forEach((cardid) => {
        if (cardid > 200000) {
          deckStore[DECKS][deckid].crypt[cardid].i = value[cardid];
        } else {
          deckStore[DECKS][deckid].library[cardid].i = value[cardid];
        }
      });

      if (deckid === deckStore?.deck?.deckid) {
        Object.keys(value).forEach((cardid) => {
          if (cardid > 200000) {
            deckStore[DECK].crypt[cardid].i = value[cardid];
          } else {
            deckStore[DECK].library[cardid].i = value[cardid];
          }
        });
      }
      break;
    case CARDS:
      deckStore[DECKS][deckid].crypt = value.crypt;
      deckStore[DECKS][deckid].library = value.library;

      if (deckid === deckStore?.deck?.deckid) {
        deckStore[DECK].crypt = value.crypt;
        deckStore[DECK].library = value.library;
      }
      break;
    default:
      deckStore[DECKS][deckid][field] = value;
      if (field === INVENTORY_TYPE) {
        Object.keys(deckStore[DECKS][deckid].crypt).forEach((cardid) => {
          deckStore[DECKS][deckid].crypt[cardid].i = '';
        });
        Object.keys(deckStore[DECKS][deckid].library).forEach((cardid) => {
          deckStore[DECKS][deckid].library[cardid].i = '';
        });
      }

      if (deckid === deckStore?.deck?.deckid) {
        deckStore[DECK][field] = value;
        if (field === INVENTORY_TYPE) {
          Object.keys(deckStore[DECK].crypt).forEach((cardid) => {
            deckStore[DECK].crypt[cardid].i = '';
          });
          Object.keys(deckStore[DECK].library).forEach((cardid) => {
            deckStore[DECK].library[cardid].i = '';
          });
        }
      }
  }

  const branchesUpdateFields = ['name', AUTHOR];
  if (
    branchesUpdateFields.includes(field) &&
    (deckStore[DECKS][deckid].branches || deckStore[DECKS][deckid].master)
  ) {
    branchesUpdate(deckid, field, value);
  }
  changeMaster(deckid);

  if (field === CARDS) {
    const cards = {};
    Object.values({ ...value.crypt, ...value.library }).forEach((card) => {
      cards[card.c.Id] = card.q;
    });
    value = cards;
  }

  const now = new Date();
  deckStore[DECKS][deckid].timestamp = now.toUTCString();

  return deckServices.update(deckid, field, value).catch(() => {
    deckStore[DECK] = initialDeckState;
    deckStore[DECKS][deckid] = initialDecksState;
  });
};

export const deckToggleInventoryState = (deckid) => {
  switch (deckStore[DECKS][deckid][INVENTORY_TYPE]) {
    case 's':
      deckUpdate(deckid, INVENTORY_TYPE, 'h');
      break;
    case 'h':
      deckUpdate(deckid, INVENTORY_TYPE, '');
      break;
    default:
      deckUpdate(deckid, INVENTORY_TYPE, 's');
  }
};

export const cardToggleInventoryState = (deckid, cardid) => {
  const deck = deckStore[DECKS][deckid];
  const target = cardid > 200000 ? CRYPT : LIBRARY;
  const value = deck[target][cardid].i ? '' : deck[INVENTORY_TYPE] === 's' ? 'h' : 's';
  deckUpdate(deckid, USED_IN_INVENTORY, {
    [cardid]: value,
  });
};

export const deckAdd = (deck) => {
  const now = new Date();
  const d = {
    deckid: deck.deckid,
    name: deck.name ?? '',
    master: deck.master ?? null,
    branches: deck.branches ?? [],
    branchName: deck.branchName ?? '#0',
    description: deck.description ?? '',
    author: deck.author ?? '',
    crypt: deck.crypt,
    library: deck.library,
    timestamp: now.toUTCString(),
    isAuthor: true,
    isPublic: Boolean(deck.publicParent),
    isBranches: Boolean(deck.master || deck.branches?.length > 0),
  };

  deckStore[DECKS][deck.deckid] = d;
};

export const deckLocalize = (localizedCrypt, nativeCrypt, localizedLibrary, nativeLibrary) => {
  Object.values(deckStore[DECK].crypt).forEach((card) => {
    const id = card.c.Id;
    const newInfo = localizedCrypt[id] ? localizedCrypt[id] : nativeCrypt[id];
    deckStore[DECK].crypt[id].c.Name = newInfo.Name;
    deckStore[DECK].crypt[id].c[CARD_TEXT] = newInfo[CARD_TEXT];
  });
  Object.values(deckStore[DECK].library).forEach((card) => {
    const id = card.c.Id;
    const newInfo = localizedLibrary[id] ? localizedLibrary[id] : nativeLibrary[id];
    deckStore[DECK].library[id].c.Name = newInfo.Name;
    deckStore[DECK].library[id].c[CARD_TEXT] = newInfo[CARD_TEXT];
  });
};

// INTERNAL STORE FUNCTIONS
const changeMaster = (deckid) => {
  const oldMasterDeckid = deckStore[DECKS][deckid].master;

  if (oldMasterDeckid) {
    const branches = deckStore[DECKS][oldMasterDeckid].branches.filter((i) => i !== deckid);
    branches.push(oldMasterDeckid);

    branches.forEach((b) => {
      deckStore[DECKS][b].master = deckid;
      deckStore[DECKS][b].branches = [];
    });
    deckStore[DECKS][deckid].branches = branches;
    deckStore[DECKS][deckid].master = null;

    deckStore[DECK].branches = branches;
    deckStore[DECK].master = null;
  }
};

const branchesUpdate = (deckid, field, value) => {
  let revisions = [];
  if (deckStore[DECKS][deckid].master) {
    revisions = [
      deckStore[DECKS][deckid].master,
      ...deckStore[DECKS][deckStore[DECKS][deckid].master].branches,
    ];
  } else {
    revisions = [deckid, ...deckStore[DECKS][deckid].branches];
  }

  revisions.forEach((d) => {
    deckStore[DECKS][d][field] = value;
  });
};
