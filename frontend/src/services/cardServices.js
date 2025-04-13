import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import {
  AUTHOR,
  CRYPT,
  DATE,
  DECKID,
  DESCRIPTION,
  ID,
  LIBRARY,
  NAME,
  NATIVE_CRYPT,
  NATIVE_LIBRARY,
  PLAYTEST,
  PLAYTEST_OLD,
  PRECONS,
  TAGS,
  TEXT,
} from "@/constants";
import { getTags, parseDeck } from "@/utils";
import ky from "ky";

const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCardBase = async (secret) => {
  const urlCrypt = `${BASE_URL}/data/cardbase_crypt.json?v=${CARD_VERSION}`;
  const urlLibrary = `${BASE_URL}/data/cardbase_lib.json?v=${CARD_VERSION}`;
  const urlCryptPlaytest = `${BASE_URL}/data/cardbase_crypt_playtest_${secret}.json?v=${CARD_VERSION}`;
  const urlLibraryPlaytest = `${BASE_URL}/data/cardbase_lib_playtest_${secret}.json?v=${CARD_VERSION}`;

  const crypt = await ky.get(urlCrypt).json();
  const library = await ky.get(urlLibrary).json();
  const cryptPlaytest = secret
    ? await ky.get(urlCryptPlaytest, { throwHttpErrors: false }).json()
    : {};
  const libraryPlaytest = secret
    ? await ky.get(urlLibraryPlaytest, { throwHttpErrors: false }).json()
    : {};

  const nativeCrypt = {};
  const nativeLibrary = {};
  Object.values({
    ...crypt,
    ...cryptPlaytest,
    ...library,
    ...libraryPlaytest,
  }).forEach((card) => {
    const target = card[ID] > 200000 ? nativeCrypt : nativeLibrary;
    target[card[ID]] = {
      [NAME]: card[NAME],
      [TEXT]: card[TEXT],
    };
  });

  return {
    [CRYPT]: { ...crypt, ...cryptPlaytest },
    [LIBRARY]: { ...library, ...libraryPlaytest },
    [NATIVE_CRYPT]: nativeCrypt,
    [NATIVE_LIBRARY]: nativeLibrary,
  };
};

export const getLocalizedCardBase = async (lang) => {
  const urlLocalizedCrypt = (lang) =>
    `${BASE_URL}/data/cardbase_crypt.${lang}.json?v=${CARD_VERSION}`;
  const urlLocalizedLibrary = (lang) =>
    `${BASE_URL}/data/cardbase_lib.${lang}.json?v=${CARD_VERSION}`;

  const crypt = await ky.get(urlLocalizedCrypt(lang)).json();
  const library = await ky.get(urlLocalizedLibrary(lang)).json();

  return {
    [CRYPT]: crypt,
    [LIBRARY]: library,
  };
};

export const getPreconDecks = async (cryptCardBase, libraryCardBase, secret) => {
  const urlPreconDecks = `${BASE_URL}/data/precon_decks.json?v=${CARD_VERSION}`;
  const urlPreconPlaytestDecks = `${BASE_URL}/data/precon_decks_playtest_${secret}.json?v=${CARD_VERSION}`;

  const preconDecksData = await ky.get(urlPreconDecks).json();
  const preconPlaytestDecksData = secret ? await ky.get(urlPreconPlaytestDecks).json() : {};
  const preconData = { ...preconDecksData, ...preconPlaytestDecksData };

  const preconDecks = {};
  Object.keys(preconData).forEach((set) => {
    Object.keys(preconData[set]).forEach((precon) => {
      const deckid = `${set}:${precon}`;
      const name = setsAndPrecons[set][PRECONS][precon][NAME];

      preconDecks[deckid] = {
        [NAME]: `${name}`,
        [DECKID]: deckid,
        [AUTHOR]: "VTES Team",
        [DESCRIPTION]: `Preconstructed from "${setsAndPrecons[set][NAME]}"${
          setsAndPrecons[set][DATE] ? ` [${setsAndPrecons[set][DATE]}]` : ""
        }`,
        [CRYPT]: {},
        [LIBRARY]: {},
      };

      if (set === PLAYTEST && setsAndPrecons[set][PRECONS][precon][PLAYTEST_OLD]) {
        preconDecks[deckid][PLAYTEST_OLD] = true;
      }

      const cardsData = parseDeck(cryptCardBase, libraryCardBase, preconData[set][precon]);

      let tags = [];
      if (set !== PLAYTEST || (cryptCardBase[210001] && libraryCardBase[110001])) {
        Object.values(getTags(cardsData[CRYPT], cardsData[LIBRARY])).forEach((v) => {
          tags = tags.concat(v);
        });
      }

      preconDecks[deckid][CRYPT] = cardsData[CRYPT];
      preconDecks[deckid][LIBRARY] = cardsData[LIBRARY];
      preconDecks[deckid][TAGS] = tags;
    });
  });

  return preconDecks;
};
