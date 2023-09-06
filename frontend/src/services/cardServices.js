import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useDeck, useTags } from '@/hooks';

const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
const urlCrypt = `${
  import.meta.env.VITE_BASE_URL
}/data/cardbase_crypt.json?v=${CARD_VERSION}`;
const urlLibrary = `${
  import.meta.env.VITE_BASE_URL
}/data/cardbase_lib.json?v=${CARD_VERSION}`;
const urlCryptPlaytest = `${
  import.meta.env.VITE_BASE_URL
}/data/cardbase_crypt_playtest.json?v=${CARD_VERSION}`;
const urlLibraryPlaytest = `${
  import.meta.env.VITE_BASE_URL
}/data/cardbase_lib_playtest.json?v=${CARD_VERSION}`;
const urlLocalizedCrypt = (lang) =>
  `${
    import.meta.env.VITE_BASE_URL
  }/data/cardbase_crypt.${lang}.json?v=${CARD_VERSION}`;
const urlLocalizedLibrary = (lang) =>
  `${
    import.meta.env.VITE_BASE_URL
  }/data/cardbase_lib.${lang}.json?v=${CARD_VERSION}`;
const urlPreconDecks = `${
  import.meta.env.VITE_BASE_URL
}/data/precon_decks.json?v=${CARD_VERSION}`;

export const getCardBase = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const crypt = await fetch(urlCrypt, options).then((response) =>
    response.json(),
  );
  const library = await fetch(urlLibrary, options).then((response) =>
    response.json(),
  );

  const cryptPlaytest = await fetch(urlCryptPlaytest, options).then(
    (response) => {
      if (response.headers.get('content-type') === 'application/json') {
        return response.json();
      } else {
        return {};
      }
    },
  );

  const libraryPlaytest = await fetch(urlLibraryPlaytest, options).then(
    (response) => {
      if (response.headers.get('content-type') === 'application/json') {
        return response.json();
      } else {
        return {};
      }
    },
  );

  const nativeCrypt = {};
  const nativeLibrary = {};
  Object.values({
    ...crypt,
    ...cryptPlaytest,
    ...library,
    ...libraryPlaytest,
  }).map((card) => {
    const target = card.Id > 200000 ? nativeCrypt : nativeLibrary;
    target[card.Id] = {
      Name: card['Name'],
      'Card Text': card['Card Text'],
    };
  });

  return {
    crypt: { ...crypt, ...cryptPlaytest },
    library: { ...library, ...libraryPlaytest },
    nativeCrypt: nativeCrypt,
    nativeLibrary: nativeLibrary,
  };
};

export const getLocalizedCardBase = async (lang) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const crypt = await fetch(urlLocalizedCrypt(lang), options).then((response) =>
    response.json(),
  );
  const library = await fetch(urlLocalizedLibrary(lang), options).then(
    (response) => response.json(),
  );

  return {
    crypt: crypt,
    library: library,
  };
};

export const getPreconDecks = async (cryptCardBase, libraryCardBase) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const preconDecksData = await fetch(urlPreconDecks, options).then(
    (response) => response.json(),
  );

  const preconDecks = {};
  Object.keys(preconDecksData).map((set) => {
    Object.keys(preconDecksData[set]).map((precon) => {
      const deckid = `${set}:${precon}`;
      const name = setsAndPrecons[set]['precons'][precon]['name'];

      preconDecks[deckid] = {
        name: `${name}`,
        deckid: deckid,
        author: 'VTES Team',
        description: `Preconstructed from "${setsAndPrecons[set]['name']}" [${setsAndPrecons[set]['date']}]`,
        crypt: {},
        library: {},
      };

      const cardsData = useDeck(
        preconDecksData[set][precon],
        cryptCardBase,
        libraryCardBase,
      );

      let tags = [];
      if (
        set !== 'PLAYTEST' ||
        (cryptCardBase[210001] && libraryCardBase[110001])
      ) {
        Object.values(useTags(cardsData.crypt, cardsData.library)).map((v) => {
          tags = tags.concat(v);
        });
      }

      preconDecks[deckid].crypt = cardsData.crypt;
      preconDecks[deckid].library = cardsData.library;
      preconDecks[deckid].tags = tags;
    });
  });

  return preconDecks;
};
