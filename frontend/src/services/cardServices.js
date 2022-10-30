import preconDecksData from 'assets/data/preconDecks.json';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { useDeck, useTags } from 'hooks';

const VERSION = '2022-09-28';
const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json?v=${VERSION}`;
const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json?v=${VERSION}`;
const urlCryptPlaytest = `${process.env.ROOT_URL}cardbase_crypt_playtest.json?v=${VERSION}`;
const urlLibraryPlaytest = `${process.env.ROOT_URL}cardbase_lib_playtest.json?v=${VERSION}`;
const urlLocalizedCrypt = (lang) =>
  `${process.env.ROOT_URL}cardbase_crypt.${lang}.json?v=${VERSION}`;
const urlLocalizedLibrary = (lang) =>
  `${process.env.ROOT_URL}cardbase_lib.${lang}.json?v=${VERSION}`;

export const getCardBase = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const cryptResponse = await fetch(urlCrypt, options);
  const libraryResponse = await fetch(urlLibrary, options);
  const crypt = await cryptResponse.json();
  const library = await libraryResponse.json();

  const cryptResponsePlaytest = await fetch(urlCryptPlaytest, options);
  const libraryResponsePlaytest = await fetch(urlLibraryPlaytest, options);
  const cryptPlaytest = await cryptResponsePlaytest.json();
  const libraryPlaytest = await libraryResponsePlaytest.json();

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

  const cryptResponse = await fetch(urlLocalizedCrypt(lang), options);
  const libraryResponse = await fetch(urlLocalizedLibrary(lang), options);
  const crypt = await cryptResponse.json();
  const library = await libraryResponse.json();

  return {
    crypt: crypt,
    library: library,
  };
};

export const getPreconDecks = () => {
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

      const cardsData = useDeck(preconDecksData[set][precon]);
      let tags = [];
      Object.values(useTags(cardsData.crypt, cardsData.library)).map((v) => {
        tags = tags.concat(v);
      });

      preconDecks[deckid].crypt = cardsData.crypt;
      preconDecks[deckid].library = cardsData.library;
      preconDecks[deckid].tags = cardsData.tags;
    });
  });

  return preconDecks;
};
