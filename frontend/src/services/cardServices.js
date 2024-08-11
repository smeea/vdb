import ky from 'ky';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { CARD_TEXT, PLAYTEST } from '@/utils/constants';
import { useDeck, useTags } from '@/hooks';

const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlCrypt = `${BASE_URL}/data/cardbase_crypt.json?v=${CARD_VERSION}`;
const urlLibrary = `${BASE_URL}/data/cardbase_lib.json?v=${CARD_VERSION}`;
const urlCryptPlaytest = `${BASE_URL}/data/cardbase_crypt_playtest.json?v=${CARD_VERSION}`;
const urlLibraryPlaytest = `${BASE_URL}/data/cardbase_lib_playtest.json?v=${CARD_VERSION}`;
const urlLocalizedCrypt = (lang) =>
  `${BASE_URL}/data/cardbase_crypt.${lang}.json?v=${CARD_VERSION}`;
const urlLocalizedLibrary = (lang) =>
  `${BASE_URL}/data/cardbase_lib.${lang}.json?v=${CARD_VERSION}`;
const urlPreconDecks = `${BASE_URL}/data/precon_decks.json?v=${CARD_VERSION}`;

export const getCardBase = async () => {
  const crypt = await ky.get(urlCrypt).json();
  const library = await ky.get(urlLibrary).json();
  const cryptPlaytest = await ky.get(urlCryptPlaytest, { throwHttpErrors: false }).json();
  const libraryPlaytest = await ky.get(urlLibraryPlaytest, { throwHttpErrors: false }).json();

  const nativeCrypt = {};
  const nativeLibrary = {};
  Object.values({
    ...crypt,
    ...cryptPlaytest,
    ...library,
    ...libraryPlaytest,
  }).forEach((card) => {
    const target = card.Id > 200000 ? nativeCrypt : nativeLibrary;
    target[card.Id] = {
      Name: card['Name'],
      [CARD_TEXT]: card[CARD_TEXT],
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
  const crypt = await ky.get(urlLocalizedCrypt(lang)).json();
  const library = await ky.get(urlLocalizedLibrary(lang)).json();

  return {
    crypt: crypt,
    library: library,
  };
};

export const getPreconDecks = async (cryptCardBase, libraryCardBase) => {
  const preconDecksData = await ky.get(urlPreconDecks).json();

  const preconDecks = {};
  Object.keys(preconDecksData).forEach((set) => {
    Object.keys(preconDecksData[set]).forEach((precon) => {
      const deckid = `${set}:${precon}`;
      const name = setsAndPrecons[set]['precons'][precon]['name'];

      preconDecks[deckid] = {
        name: `${name}`,
        deckid: deckid,
        author: 'VTES Team',
        description: `Preconstructed from "${setsAndPrecons[set].name}"${
          setsAndPrecons[set].date ? ` [${setsAndPrecons[set].date}]` : ''
        }`,
        crypt: {},
        library: {},
      };

      const cardsData = useDeck(preconDecksData[set][precon], cryptCardBase, libraryCardBase);

      let tags = [];
      if (set !== PLAYTEST || (cryptCardBase[210001] && libraryCardBase[110001])) {
        Object.values(useTags(cardsData.crypt, cardsData.library)).forEach((v) => {
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
