import { proxy } from 'valtio';
import { deckServices } from 'services';
import { useDeck } from 'hooks';

export const deckStore = proxy({
  deck: undefined,
  decks: undefined,
  cryptTimer: undefined,
  cryptTimers: [],
});

export const setDeck = (v) => {
  deckStore.deck = v;
};

export const deckCardChange = (
  deckid,
  cardid,
  q,
  cryptCardBase,
  libraryCardBase
) => {
  const cardSrc = cardid > 200000 ? 'crypt' : 'library';
  const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;

  const initialDeckState = JSON.parse(JSON.stringify(deckStore.deck));
  const initialDecksState = JSON.parse(JSON.stringify(deckStore.decks));

  deckServices.cardChange(deckid, cardid, q).catch(() => {
    if (deckid === deckStore.deck.deckid) {
      deckStore.deck = initialDeckState;
    }
    deckStore.decks = initialDecksState;
  });

  if (q >= 0) {
    deckStore.decks[deckid][cardSrc][cardid] = {
      c: cardBase[cardid],
      q: q,
    };

    if (deckid === deckStore.deck.deckid) {
      deckStore.deck[cardSrc][cardid] = {
        c: cardBase[cardid],
        q: q,
      };
    }
  } else {
    delete deckStore.decks[deckid][cardSrc][cardid];

    if (deckid === deckStore.deck.deckid) {
      delete deckStore.deck[cardSrc][cardid];
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
};

export const deckUpdate = (deckid, field, value) => {
  const initialDeckState =
    deckid === deckStore.deck?.deckid
      ? JSON.parse(JSON.stringify(deckStore.deck))
      : null;
  const initialDecksState = JSON.parse(JSON.stringify(deckStore.decks));

  if (field === 'usedInInventory') {
    Object.keys(value).map((cardid) => {
      if (cardid > 200000) {
        deckStore.decks[deckid].crypt[cardid].i = value[cardid];
      } else {
        deckStore.decks[deckid].library[cardid].i = value[cardid];
      }
    });

    if (deckid === deckStore.deck?.deckid) {
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

    if (deckid === deckStore.deck?.deckid) {
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

    if (deckid === deckStore.deck?.deckid) {
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
  deckServices.update(deckid, field, value).catch(() => {
    if (deckid === deckStore.deck?.deckid) {
      deckStore.deck = initialDeckState;
    }
    deckStore.decks = initialDecksState;
  });
};

export const deckAdd = (deck, cryptCardBase, libraryCardBase) => {
  const now = new Date();
  const { crypt, library } = useDeck(
    deck.cards,
    cryptCardBase,
    libraryCardBase
  );

  const d = {
    deckid: deck.deckid,
    name: deck.name ?? '',
    master: deck.master ?? null,
    branches: deck.branches ?? [],
    branchName: deck.branchName ?? '#0',
    description: deck.description ?? '',
    author: deck.author ?? '',
    crypt: crypt,
    library: library,
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
