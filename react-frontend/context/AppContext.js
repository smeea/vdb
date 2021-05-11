import React, { useState, useLayoutEffect } from 'react';
import defaultsTwdForm from '../pages/components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from '../pages/components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from '../pages/components/forms_data/defaultsLibraryForm.json';

const AppContext = React.createContext({
  isMobile: false,
  username: undefined,
  setUsername: () => {},
  lang: 'en-EN',
  setLang: () => {},
  publicName: undefined,
  setPublicName: () => {},
  email: undefined,
  setEmail: () => {},
  localizedCrypt: undefined,
  showImage: true,
  setShowImage: () => {},
  addMode: false,
  setAddMode: () => {},
  hideMissing: false,
  setHideMissing: () => {},
  inventoryMode: false,
  setInventoryMode: () => {},
  isInventory: undefined,

  cryptCardBase: undefined,
  setCryptCardBase: () => {},
  libraryCardBase: undefined,
  setLibraryCardBase: () => {},
  setLocalizedCrypt: () => {},
  localizedLibrary: undefined,
  setLocalizedLibrary: () => {},
  nativeCrypt: undefined,
  setNativeCrypt: () => {},
  nativeLibrary: undefined,
  setNativeLibrary: () => {},

  twdFormState: undefined,
  setTwdFormState: () => {},
  cryptFormState: undefined,
  setCryptFormState: () => {},
  libraryFormState: undefined,
  setLibraryFormState: () => {},

  twdResults: undefined,
  setTwdResults: () => {},
  cryptResults: undefined,
  setCryptResults: () => {},
  libraryResults: undefined,
  setLibraryResults: () => {},

  usedCryptCards: undefined,
  setUsedCryptCards: () => {},
  usedLibraryCards: undefined,
  setUsedLibraryCards: () => {},

  showTwdSearch: undefined,
  setShowTwdSearch: () => {},
  showCryptSearch: undefined,
  setShowCryptSearch: () => {},
  showLibrarySearch: undefined,
  setShowLibrarySearch: () => {},

  inventoryCrypt: undefined,
  setInventoryCrypt: () => {},
  inventoryLibrary: undefined,
  setInventoryLibrary: () => {},

  decks: undefined,
  setDecks: () => {},
  activeDeck: undefined,
  setActiveDeck: () => {},
  sharedDeck: undefined,
  setSharedDeck: () => {},
  getDecks: () => {},
  deckRouter: () => {},
});

export default AppContext;

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [showImage, setShowImage] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [inventoryMode, setInventoryMode] = useState(false);
  const [hideMissing, setHideMissing] = useState(false);

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);

  const [twdFormState, setTwdFormState] = useState(defaultsTwdForm);
  const [cryptFormState, setCryptFormState] = useState(defaultsCryptForm);
  const [libraryFormState, setLibraryFormState] = useState(defaultsLibraryForm);
  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  const [inventoryCrypt, setInventoryCrypt] = useState({});
  const [inventoryLibrary, setInventoryLibrary] = useState({});
  const [usedCryptCards, setUsedCryptCards] = useState({
    soft: {},
    hard: {},
  });
  const [usedLibraryCards, setUsedLibraryCards] = useState({
    soft: {},
    hard: {},
  });

  const [decks, setDecks] = useState(undefined);
  const [activeDeck, setActiveDeck] = useState({ src: null, deckid: null });
  const [sharedDeck, setSharedDeck] = useState(undefined);

  const changeLang = (lang) => {
    setLang(lang);
    window.localStorage.setItem('lang', lang);
  };

  useLayoutEffect(() => {
    const lastLang = window.localStorage.getItem('lang');

    if (lastLang) {
      setLang(lastLang);
    } else {
      setLang('en-EN');
    }
  }, [lang]);

  const isInventory =
    Object.keys(inventoryCrypt).length > 0 ||
    Object.keys(inventoryLibrary).length > 0;

  const getDecks = () => {
    const url = `${process.env.API_URL}decks`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          Object.keys(data).map((i) => {
            Object.keys(data[i].crypt).map((j) => {
              data[i].crypt[j].c = cryptCardBase[j];
            });
            Object.keys(data[i].library).map((j) => {
              data[i].library[j].c = libraryCardBase[j];
            });
          });
          setDecks(data);
        } else {
          setDecks({});
        }
      });
  };

  const deckRouter = (pointer) => {
    if (pointer) {
      switch (pointer['src']) {
        case 'my':
          return decks && decks[pointer['deckid']];
        case 'precons':
          return preconDecks && preconDecks[pointer['deckid']];
        case 'shared':
        case 'twd':
          return sharedDeck && sharedDeck[pointer['deckid']];
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        isMobile,
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        lang,
        changeLang,
        hideMissing,
        setHideMissing,
        inventoryMode,
        setInventoryMode,
        isInventory,
        addMode,
        setAddMode,
        showImage,
        setShowImage,

        cryptCardBase,
        setCryptCardBase,
        libraryCardBase,
        setLibraryCardBase,
        localizedCrypt,
        setLocalizedCrypt,
        localizedLibrary,
        setLocalizedLibrary,
        nativeCrypt,
        setNativeCrypt,
        nativeLibrary,
        setNativeLibrary,

        twdFormState,
        setTwdFormState,
        cryptFormState,
        setCryptFormState,
        libraryFormState,
        setLibraryFormState,

        twdResults,
        setTwdResults,
        cryptResults,
        setCryptResults,
        libraryResults,
        setLibraryResults,

        usedCryptCards,
        setUsedCryptCards,
        usedLibraryCards,
        setUsedLibraryCards,

        showTwdSearch,
        setShowTwdSearch,
        showCryptSearch,
        setShowCryptSearch,
        showLibrarySearch,
        setShowLibrarySearch,

        inventoryCrypt,
        setInventoryCrypt,
        inventoryLibrary,
        setInventoryLibrary,

        decks,
        setDecks,
        activeDeck,
        setActiveDeck,
        sharedDeck,
        setSharedDeck,
        getDecks,
        deckRouter,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
