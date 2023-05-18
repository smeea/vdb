import { proxy } from 'valtio';
import { set, update } from 'idb-keyval';

export const limitedStore = proxy({
  crypt: {},
  library: {},
});

export const setLimitedCrypt = (v) => {
  limitedStore.crypt = v;
  set('limitedCrypt', v);
};

export const setLimitedLibrary = (v) => {
  limitedStore.library = v;
  set('limitedLibrary', v);
};

export const limitedCardAdd = (card) => {
  const store = card.Id > 200000 ? limitedStore.crypt : limitedStore.library;
  const idbStore = card.Id > 200000 ? 'limitedCrypt' : 'limitedLibrary';

  store[card.Id] = card;
  update(idbStore, (val) => ({
    ...val,
    [card.Id]: true,
  }));
};

export const limitedCardDel = (card) => {
  const store = card.Id > 200000 ? limitedStore.crypt : limitedStore.library;
  delete store[card.Id];
};
