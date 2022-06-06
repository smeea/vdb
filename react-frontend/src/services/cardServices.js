import preconDecksData from 'assets/data/preconDecks.json';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const VERSION = '2022-06-03';
const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json?v=${VERSION}`;
const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json?v=${VERSION}`;
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

  const nativeCrypt = {};
  const nativeLibrary = {};
  Object.values({ ...crypt, ...library }).map((card) => {
    const target = card.Id > 200000 ? nativeCrypt : nativeLibrary;
    target[card.Id] = {
      Name: card['Name'],
      'Card Text': card['Card Text'],
    };
  });

  return {
    crypt: crypt,
    library: library,
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

export const getPreconDecks = (cryptCardBase, libraryCardBase) => {
  const precons = {};

  Object.keys(preconDecksData).map((set) => {
    Object.keys(preconDecksData[set]).map((precon) => {
      const deckid = `${set}:${precon}`;
      const name = setsAndPrecons[set]['precons'][precon]['name'];

      precons[deckid] = {
        name: `${name}`,
        deckid: deckid,
        author: 'VTES Team',
        description: `Preconstructed from "${setsAndPrecons[set]['name']}" [${setsAndPrecons[set]['date']}]`,
        crypt: {},
        library: {},
      };
      Object.keys(preconDecksData[set][precon]).map((card) => {
        if (card > 200000) {
          precons[deckid]['crypt'][card] = {
            c: cryptCardBase[card],
            q: preconDecksData[set][precon][card],
          };
        } else {
          precons[deckid]['library'][card] = {
            c: libraryCardBase[card],
            q: preconDecksData[set][precon][card],
          };
        }
      });
    });
  });
  return precons;
};
