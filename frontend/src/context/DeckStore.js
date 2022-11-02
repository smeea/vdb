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
    deckStore.deck = initialDeckState;
    deckStore.decks = initialDecksState;
  });

  if (q >= 0) {
    deckStore.decks[deckid][cardSrc][cardid] = {
      c: cardBase[cardid],
      q: q,
    };
  } else {
    deckStore.decks[deckid][cardSrc][cardid];
  }

  if (q >= 0) {
    deckStore.deck[cardSrc][cardid] = {
      c: cardBase[cardid],
      q: q,
    };
  } else {
    deckStore[cardSrc][cardid];
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
  const initialDeckState = JSON.parse(JSON.stringify(deckStore.deck));
  const initialDecksState = JSON.parse(JSON.stringify(deckStore.decks));

  deckServices.update(deckid, field, value).catch(() => {
    deckStore.deck = initialDeckState;
    deckStore.decks = initialDecksState;
  });

  if (field === 'usedInInventory') {
    Object.keys(value).map((cardid) => {
      if (cardid > 200000) {
        deckStore.decks[deckid].crypt[cardid].i = value[cardid];
      } else {
        deckStore.decks[deckid].library[cardid].i = value[cardid];
      }
    });

    Object.keys(value).map((cardid) => {
      if (cardid > 200000) {
        deckStore.deck.crypt[cardid].i = value[cardid];
      } else {
        deckStore.deck.library[cardid].i = value[cardid];
      }
    });
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

  const branchesUpdateFields = ['name', 'author'];
  if (
    branchesUpdateFields.includes(field) &&
    (deckStore.decks[deckid].branches || deckStore.decks[deckid].master)
  ) {
    branchesUpdate(deckid, field, value);
  }

  changeMaster(deckid);
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
