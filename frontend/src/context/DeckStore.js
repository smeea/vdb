import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import { CARD_TEXT } from '@/utils/constants';
import { deckServices } from '@/services';

export const deckStore = proxy({
  deck: undefined,
  decks: undefined,
  cryptTimer: undefined,
  cryptTimers: [],
});

export const setDeck = (v) => {
  deckStore.deck = v;
  deckStore.cryptTimer = !deckStore.cryptTimer;
};

export const deckCardChange = (deckid, card, q) => {
  const cardSrc = card.Id > 200000 ? 'crypt' : 'library';
  const initialDeckState = deepClone(deckStore.deck);
  const initialDecksState = deepClone(deckStore.decks[deckid]);

  if (q >= 0) {
    if (deckStore.decks[deckid][cardSrc][card.Id]) {
      deckStore.decks[deckid][cardSrc][card.Id].q = q;
    } else {
      deckStore.decks[deckid][cardSrc][card.Id] = {
        c: card,
        q: q,
      };
    }

    if (deckid === deckStore.deck.deckid) {
      if (deckStore.deck[cardSrc][card.Id]) {
        deckStore.deck[cardSrc][card.Id].q = q;
      } else {
        deckStore.deck[cardSrc][card.Id] = {
          c: card,
          q: q,
        };
      }
    }
  } else {
    delete deckStore.decks[deckid][cardSrc][card.Id];

    if (deckid === deckStore.deck.deckid) {
      delete deckStore.deck[cardSrc][card.Id];
    }
  }

  changeMaster(deckid);

  const startTimer = () => {
    let counter = 1;
    deckStore.cryptTimers.forEach((timerId) => {
      clearInterval(timerId);
    });
    deckStore.cryptTimers = [];

    const timerId = setInterval(() => {
      if (counter > 0) {
        counter = counter - 1;
      } else {
        clearInterval(timerId);
        deckStore.cryptTimer = !deckStore.cryptTimer;
      }
    }, 500);

    deckStore.cryptTimers = [...deckStore.cryptTimers, timerId];
  };
  if (cardSrc === 'crypt') startTimer();

  deckServices.cardChange(deckid, card.Id, q).catch(() => {
    deckStore.deck = initialDeckState;
    deckStore.decks[deckid] = initialDecksState;
  });
};

export const deckUpdate = (deckid, field, value) => {
  const initialDeckState = deepClone(deckStore.deck);
  const initialDecksState = deepClone(deckStore.decks[deckid]);

  switch (field) {
    case 'usedInInventory':
      Object.keys(value).forEach((cardid) => {
        if (cardid > 200000) {
          deckStore.decks[deckid].crypt[cardid].i = value[cardid];
        } else {
          deckStore.decks[deckid].library[cardid].i = value[cardid];
        }
      });

      if (deckid === deckStore.deck.deckid) {
        Object.keys(value).forEach((cardid) => {
          if (cardid > 200000) {
            deckStore.deck.crypt[cardid].i = value[cardid];
          } else {
            deckStore.deck.library[cardid].i = value[cardid];
          }
        });
      }
      break;
    case 'cards':
      deckStore.decks[deckid].crypt = value.crypt;
      deckStore.decks[deckid].library = value.library;

      if (deckid === deckStore.deck.deckid) {
        deckStore.deck.crypt = value.crypt;
        deckStore.deck.library = value.library;
      }
      break;
    default:
      deckStore.decks[deckid][field] = value;
      if (field === 'inventoryType') {
        Object.keys(deckStore.decks[deckid].crypt).forEach((cardid) => {
          deckStore.decks[deckid].crypt[cardid].i = '';
        });
        Object.keys(deckStore.decks[deckid].library).forEach((cardid) => {
          deckStore.decks[deckid].library[cardid].i = '';
        });
      }

      if (deckid === deckStore.deck.deckid) {
        deckStore.deck[field] = value;
        if (field === 'inventoryType') {
          Object.keys(deckStore.deck.crypt).forEach((cardid) => {
            deckStore.deck.crypt[cardid].i = '';
          });
          Object.keys(deckStore.deck.library).forEach((cardid) => {
            deckStore.deck.library[cardid].i = '';
          });
        }
      }
  }

  const branchesUpdateFields = ['name', 'author'];
  if (
    branchesUpdateFields.includes(field) &&
    (deckStore.decks[deckid].branches || deckStore.decks[deckid].master)
  ) {
    branchesUpdate(deckid, field, value);
  }
  changeMaster(deckid);

  if (field === 'cards') {
    const cards = {};
    Object.values({ ...value.crypt, ...value.library }).forEach((card) => {
      cards[card.c.Id] = card.q;
    });
    value = cards;
  }

  const now = new Date();
  deckStore.decks[deckid].timestamp = now.toUTCString();

  deckServices.update(deckid, field, value).catch(() => {
    deckStore.deck = initialDeckState;
    deckStore.decks[deckid] = initialDecksState;
  });
};

export const deckToggleInventoryState = (deckid) => {
  switch (deckStore.decks[deckid].inventoryType) {
    case 's':
      deckUpdate(deckid, 'inventoryType', 'h');
      break;
    case 'h':
      deckUpdate(deckid, 'inventoryType', '');
      break;
    default:
      deckUpdate(deckid, 'inventoryType', 's');
  }
};

export const cardToggleInventoryState = (deckid, cardid) => {
  const deck = deckStore.decks[deckid];
  const target = cardid > 200000 ? 'crypt' : 'library';
  const value = deck[target][cardid].i ? '' : deck.inventoryType === 's' ? 'h' : 's';
  deckUpdate(deckid, 'usedInInventory', {
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

  deckStore.decks[deck.deckid] = d;
};

export const deckLocalize = (localizedCrypt, nativeCrypt, localizedLibrary, nativeLibrary) => {
  Object.values(deckStore.deck.crypt).forEach((card) => {
    const id = card.c.Id;
    const newInfo = localizedCrypt[id] ? localizedCrypt[id] : nativeCrypt[id];
    deckStore.deck.crypt[id].c['Name'] = newInfo['Name'];
    deckStore.deck.crypt[id].c[CARD_TEXT] = newInfo[CARD_TEXT];
  });
  Object.values(deckStore.deck.library).forEach((card) => {
    const id = card.c.Id;
    const newInfo = localizedLibrary[id] ? localizedLibrary[id] : nativeLibrary[id];
    deckStore.deck.library[id].c['Name'] = newInfo['Name'];
    deckStore.deck.library[id].c[CARD_TEXT] = newInfo[CARD_TEXT];
  });
};

// INTERNAL STORE FUNCTIONS
const changeMaster = (deckid) => {
  const oldMasterDeckid = deckStore.decks[deckid].master;

  if (oldMasterDeckid) {
    const branches = deckStore.decks[oldMasterDeckid].branches.filter((i) => i !== deckid);
    branches.push(oldMasterDeckid);

    branches.forEach((b) => {
      deckStore.decks[b].master = deckid;
      deckStore.decks[b].branches = [];
    });
    deckStore.decks[deckid].branches = branches;
    deckStore.decks[deckid].master = null;

    deckStore.deck.branches = branches;
    deckStore.deck.master = null;
  }
};

const branchesUpdate = (deckid, field, value) => {
  let revisions = [];
  if (deckStore.decks[deckid].master) {
    revisions = [
      deckStore.decks[deckid].master,
      ...deckStore.decks[deckStore.decks[deckid].master].branches,
    ];
  } else {
    revisions = [deckid, ...deckStore.decks[deckid].branches];
  }

  revisions.forEach((d) => {
    deckStore.decks[d][field] = value;
  });
};
