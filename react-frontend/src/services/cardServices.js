import { loadUsingSWR, loadAndWait } from './utils';
import preconDecksData from 'assets/data/preconDecks.json';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';

const VERSION = '2021-12-09';
const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json?v=${VERSION}`;
const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json?v=${VERSION}`;
const urlLocalizedCrypt = (lang) =>
  `${process.env.ROOT_URL}cardbase_crypt.${lang}.json`;
const urlLocalizedLibrary = (lang) =>
  `${process.env.ROOT_URL}cardbase_lib.${lang}.json`;

export const getCryptBase = () => {
  return loadUsingSWR(urlCrypt);
};

export const getLibraryBase = () => {
  return loadUsingSWR(urlLibrary);
};

export const getLocalizedCrypt = async (lang) => {
  return await loadAndWait(urlLocalizedCrypt(lang));
};

export const getLocalizedLibrary = async (lang) => {
  return await loadAndWait(urlLocalizedLibrary(lang));
};

export const getNativeText = (base = []) => {
  en = {};
  Object.keys(base).map((id) => {
    en[id] = {
      Name: base[id]['Name'],
      'Card Text': base[id]['Card Text'],
    };
  });
  return en;
};

export const getPreconDecks = () => {
  const precons = {};

  Object.keys(preconDecksData).map((set) => {
    Object.keys(preconDecksData[set]).map((precon) => {
      const deckid = `${set}:${precon}`;
      const name = setsAndPrecons[set]['precons'][precon]['name'];

      precons[deckid] = {
        name: `${name}`,
        deckid: deckid,
        author: 'VTES Team',
        description: `Preconstructed from "${
          setsAndPrecons[set]['name']
        }" [${setsAndPrecons[set]['date'].slice(4)}]`,
        crypt: {},
        library: {},
      };
      Object.keys(preconDecksData[set][precon]).map((card) => {
        if (card > 200000) {
          precons[deckid]['crypt'][card] = {
            c: getCryptBase()[card],
            q: preconDecksData[set][precon][card],
          };
        } else {
          precons[deckid]['library'][card] = {
            c: getLibraryBase()[card],
            q: preconDecksData[set][precon][card],
          };
        }
      });
    });
  });
  return precons;
};
