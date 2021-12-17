import libBase from 'assets/data/cardbase_lib.json';
import cryptBase from 'assets/data/cardbase_crypt.json';
import libBaseES from 'assets/data/cardbase_lib.es-ES.json';
import cryptBaseES from 'assets/data/cardbase_crypt.es-ES.json';
import libBaseFR from 'assets/data/cardbase_lib.fr-FR.json';
import cryptBaseFR from 'assets/data/cardbase_crypt.fr-FR.json';
import preconDecksData from 'assets/data/preconDecks.json';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';

export const getCryptBase = () => {
  return cryptBase;
};

export const getLibraryBase = () => {
  return libBase;
};

export const getNativeCrypt = () => {
  en = {};
  Object.keys(getCryptBase()).map((id) => {
    en[id] = {
      Name: getCryptBase()[id]['Name'],
      'Card Text': getCryptBase()[id]['Card Text'],
    };
  });
  return en;
};

export const getNativeLibrary = () => {
  en = {};
  Object.keys(getLibraryBase()).map((id) => {
    en[id] = {
      Name: getLibraryBase()[id]['Name'],
      'Card Text': getLibraryBase()[id]['Card Text'],
    };
  });

  return en;
};

export const libraryBases = {
  'en-EN': getNativeLibrary(),
  'es-ES': libBaseES,
  'fr-FR': libBaseFR,
};

export const cryptBases = {
  'en-EN': getNativeCrypt(),
  'es-ES': cryptBaseES,
  'fr-FR': cryptBaseFR,
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

// const getCardBase = () => {
//     const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json?v=${VERSION}`;
//     const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json?v=${VERSION}`;
//     const options = {
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//     };

//     fetch(urlCrypt, options)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error === undefined) {
//           setCryptCardBase(data);
//           const en = {};
//           Object.keys(data).map((id) => {
//             en[id] = {
//               Name: data[id]['Name'],
//               'Card Text': data[id]['Card Text'],
//             };
//           });
//           setNativeCrypt(en);
//         }
//       });

//     fetch(urlLibrary, options)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error === undefined) {
//           setLibraryCardBase(data);
//           const en = {};
//           Object.keys(data).map((id) => {
//             en[id] = {
//               Name: data[id]['Name'],
//               'Card Text': data[id]['Card Text'],
//             };
//           });
//           setNativeLibrary(en);
//         }
//       });
//   };

//   const getLocalization = (lang) => {
//     const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.${lang}.json`;
//     const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.${lang}.json`;

//     const options = {
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//     };

//     fetch(urlCrypt, options)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error === undefined) {
//           setLocalizedCrypt((prevState) => ({
//             ...prevState,
//             [lang]: data,
//           }));
//         }
//       });

//     fetch(urlLibrary, options)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error === undefined) {
//           setLocalizedLibrary((prevState) => ({
//             ...prevState,
//             [lang]: data,
//           }));
//         }
//       });
//   };
