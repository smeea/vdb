import { proxy } from 'valtio';
import { deepClone } from '@/utils';
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
    deckStore.decks[deckid][cardSrc][card.Id] = {
      c: card,
      q: q,
    };

    if (deckid === deckStore.deck.deckid) {
      deckStore.deck[cardSrc][card.Id] = {
        c: card,
        q: q,
      };
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
    deckStore.cryptTimers.map((timerId) => {
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
  startTimer();

  deckServices.cardChange(deckid, card.Id, q).catch(() => {
    deckStore.deck = initialDeckState;
    deckStore.decks[deckid] = initialDecksState;
  });
};

export const deckUpdate = (deckid, field, value) => {
  const initialDeckState = deepClone(deckStore.deck);
  const initialDecksState = deepClone(deckStore.decks[deckid]);

  if (field === 'usedInInventory') {
    Object.keys(value).map((cardid) => {
      if (cardid > 200000) {
        deckStore.decks[deckid].crypt[cardid].i = value[cardid];
      } else {
        deckStore.decks[deckid].library[cardid].i = value[cardid];
      }
    });

    if (deckid === deckStore.deck.deckid) {
      Object.keys(value).map((cardid) => {
        if (cardid > 200000) {
          deckStore.deck.crypt[cardid].i = value[cardid];
        } else {
          deckStore.deck.library[cardid].i = value[cardid];
        }
      });
    }
  } else if (field === 'cards') {
    deckStore.decks[deckid].crypt = value.crypt;
    deckStore.decks[deckid].library = value.library;

    if (deckid === deckStore.deck.deckid) {
      deckStore.deck.crypt = value.crypt;
      deckStore.deck.library = value.library;
    }
  } else {
    deckStore.decks[deckid][field] = value;
    if (field === 'inventoryType') {
      Object.keys(deckStore.decks[deckid].crypt).map((cardid) => {
        deckStore.decks[deckid].crypt[cardid].i = '';
      });
      Object.keys(deckStore.decks[deckid].library).map((cardid) => {
        deckStore.decks[deckid].library[cardid].i = '';
      });
    }

    if (deckid === deckStore.deck.deckid) {
      deckStore.deck[field] = value;
      if (field === 'inventoryType') {
        Object.keys(deckStore.deck.crypt).map((cardid) => {
          deckStore.deck.crypt[cardid].i = '';
        });
        Object.keys(deckStore.deck.library).map((cardid) => {
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
    Object.values({ ...value.crypt, ...value.library }).map((card) => {
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

export const deckLocalize = (
  localizedCrypt,
  nativeCrypt,
  localizedLibrary,
  nativeLibrary
) => {
  Object.values(deckStore.deck.crypt).map((card) => {
    const id = card.c.Id;
    const newInfo = localizedCrypt[id] ? localizedCrypt[id] : nativeCrypt[id];
    deckStore.deck.crypt[id].c['Name'] = newInfo['Name'];
    deckStore.deck.crypt[id].c['Card Text'] = newInfo['Card Text'];
  });
  Object.values(deckStore.deck.library).map((card) => {
    const id = card.c.Id;
    const newInfo = localizedLibrary[id]
      ? localizedLibrary[id]
      : nativeLibrary[id];
    deckStore.deck.library[id].c['Name'] = newInfo['Name'];
    deckStore.deck.library[id].c['Card Text'] = newInfo['Card Text'];
  });
};

// INTERNAL STORE FUNCTIONS
const changeMaster = (deckid) => {
  const oldMasterDeckid = deckStore.decks[deckid].master;

  if (oldMasterDeckid) {
    const branches = [...deckStore.decks[oldMasterDeckid].branches];
    branches.splice(branches.indexOf(deckid), 1);
    branches.push(oldMasterDeckid);

    branches.map((b) => {
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

  revisions.map((d) => {
    deckStore.decks[d][field] = value;
  });
};
