import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from 'components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from 'components/forms_data/defaultsLibraryForm.json';
import { initFromStorage, setLocalStorage } from 'services/storageServices.js';
import { cardServices, inventoryServices } from 'services';
import { useWindowSize } from 'hooks';

const AppContext = React.createContext();

export default AppContext;

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error(`useApp must be used within a AppProvider`);

  return context;
};

export const AppProvider = (props) => {
  const screenSize = useWindowSize();
  const isMobile = useMemo(() => screenSize.width <= 767, [screenSize.width]);
  const isNarrow = useMemo(() => screenSize.width <= 992, [screenSize.width]);
  const isDesktop = useMemo(() => screenSize.width >= 1200, [screenSize.width]);
  const isWide = useMemo(() => screenSize.width >= 1600, [screenSize.width]);

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [showImage, setShowImage] = useState(undefined);
  const [addMode, setAddMode] = useState(undefined);
  const [inventoryMode, setInventoryMode] = useState(undefined);
  const [hideMissing, setHideMissing] = useState(undefined);
  const [cryptDeckSort, setCryptDeckSort] = useState(undefined);
  const [cryptSearchSort, setCryptSearchSort] = useState(undefined);
  const [librarySearchSort, setLibrarySearchSort] = useState(undefined);

  const [cryptCardBase, setCryptCardBase] = useState(
    cardServices.getCryptBase()
  );
  const [libraryCardBase, setLibraryCardBase] = useState(
    cardServices.getLibraryBase()
  );
  const nativeCrypt = cardServices.getNativeText(cryptCardBase);
  const nativeLibrary = cardServices.getNativeText(libraryCardBase);

  const [localizedCrypt, setLocalizedCrypt] = useState({
    'en-EN': nativeCrypt,
  });
  const [localizedLibrary, setLocalizedLibrary] = useState({
    'en-EN': nativeLibrary,
  });

  const preconDecks = cardServices.getPreconDecks();

  const [twdFormState, setTwdFormState] = useState(
    JSON.parse(JSON.stringify(defaultsTwdForm))
  );
  const [cryptFormState, setCryptFormState] = useState(
    JSON.parse(JSON.stringify(defaultsCryptForm))
  );
  const [libraryFormState, setLibraryFormState] = useState(
    JSON.parse(JSON.stringify(defaultsLibraryForm))
  );
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
  const [sharedDeck, setSharedDeck] = useState({});
  const [recentDecks, setRecentDecks] = useState([]);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  // ---------------------------------------------------------------------------
  //                            USER FUNCTIONS
  // ---------------------------------------------------------------------------
  const whoAmI = () => {
    const url = `${process.env.API_URL}login`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (!data.username) {
          setInventoryMode(false);
        }
        setUsername(data.username);
        setPublicName(data.public_name);
        setEmail(data.email);
      });
  };

  // Trigger the Load user info
  useEffect(() => {
    if (username) {
      initializeUserData();
    } else {
      initializeUnauthenticatedUser();
    }
  }, [username]);

  const initializeUserData = () => {
    // Initizalize User Inventory
    getInventory();
    getDecks();
  };

  const initializeUnauthenticatedUser = () => {
    setInventoryCrypt({});
    setInventoryLibrary({});
    setDecks(undefined);
    setActiveDeck({ src: null, deckid: null });
    setEmail(undefined);
  };

  // ---------------------------------------------------------------------------
  //                          LANGUAGE FUNCTIONS
  // ---------------------------------------------------------------------------

  const changeLang = (lang) => {
    setLang(lang);
    setLocalStorage('lang', lang);
  };

  // Replace the current base text with the localized one
  const changeBaseTextToLocalizedText = (
    setFunction,
    localizedInfo,
    nativeInfo
  ) => {
    setFunction((prevState) => {
      const state = { ...prevState };
      Object.keys(prevState).map((k) => {
        const newInfo = localizedInfo[k] ? localizedInfo[k] : nativeInfo[k];
        state[k]['Name'] = newInfo['Name'];
        state[k]['Card Text'] = newInfo['Card Text'];
      });
      return state;
    });
  };

  // Load the localized info for the first time
  const initializeLocalizedInfo = async (lang) => {
    const localizedCrypt = await cardServices.getLocalizedCrypt(lang);
    const localizedLibrary = await cardServices.getLocalizedLibrary(lang);

    setLocalizedCrypt((prevState) => ({
      ...prevState,
      [lang]: localizedCrypt,
    }));

    setLocalizedLibrary((prevState) => ({
      ...prevState,
      [lang]: localizedLibrary,
    }));

    changeBaseTextToLocalizedText(
      setCryptCardBase,
      localizedCrypt,
      nativeCrypt
    );
    changeBaseTextToLocalizedText(
      setLibraryCardBase,
      localizedLibrary,
      nativeLibrary
    );
  };

  // Trigger the language change
  useEffect(async () => {
    if (!localizedCrypt[lang] || !localizedLibrary[lang])
      await initializeLocalizedInfo(lang);
    else {
      changeBaseTextToLocalizedText(
        setCryptCardBase,
        localizedCrypt[lang],
        nativeCrypt
      );
      changeBaseTextToLocalizedText(
        setLibraryCardBase,
        localizedLibrary[lang],
        nativeLibrary
      );
    }
  }, [lang]);

  // ---------------------------------------------------------------------------
  //                          APP DATA FUNCTIONS
  // ---------------------------------------------------------------------------

  const toggleShowImage = () => {
    setShowImage(!showImage);
    setLocalStorage('showImage', !showImage);
  };

  const toggleInventoryMode = () => {
    setInventoryMode(!inventoryMode);
    setLocalStorage('inventoryMode', !inventoryMode);
  };

  const changeCryptDeckSort = (method) => {
    setCryptDeckSort(method);
    setLocalStorage('cryptDeckSort', method);
  };

  const changeCryptSearchSort = (method) => {
    setCryptSearchSort(method);
    setLocalStorage('cryptSearchSort', method);
  };

  const changeLibrarySearchSort = (method) => {
    setLibrarySearchSort(method);
    setLocalStorage('librarySearchSort', method);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    setLocalStorage('addMode', !addMode);
  };

  const addRecentDeck = (deck) => {
    const d = [...recentDecks];
    const idx = recentDecks.map((v) => v.deckid).indexOf(deck.deckid);
    if (idx !== -1) d.splice(idx, 1);
    d.unshift({ deckid: deck.deckid, name: deck.name });
    if (d.length > 10) d.slice(0, 10);
    setRecentDecks(d);
    setLocalStorage('recentDecks', d);
  };

  const updateRecentDecks = (decks) => {
    setRecentDecks(decks);
    setLocalStorage('recentDecks', decks);
  };

  useLayoutEffect(() => {
    initFromStorage(
      'cryptSearchSort',
      'Capacity - Min to Max',
      setCryptSearchSort
    );
    initFromStorage('cryptDeckSort', 'Quantity', setCryptDeckSort);
    initFromStorage('librarySearchSort', 'Type', setLibrarySearchSort);
    initFromStorage('lang', 'en-EN', setLang);
    initFromStorage('addMode', isDesktop ? true : false, setAddMode);
    initFromStorage('inventoryMode', false, setInventoryMode);
    initFromStorage('showImage', true, setShowImage);
    initFromStorage('recentDecks', [], setRecentDecks);
  }, []);

  // ---------------------------------------------------------------------------
  //                          DECK FUNCTIONS
  // ---------------------------------------------------------------------------

  const getDecks = async () => {
    const decksData = await inventoryServices.getDecks();

    Object.keys(decksData).map((i) => {
      Object.keys(decksData[i].crypt).map((j) => {
        decksData[i].crypt[j].c = cryptCardBase[j];
      });
      Object.keys(decksData[i].library).map((j) => {
        decksData[i].library[j].c = libraryCardBase[j];
      });
    });
    setDecks(decksData);
  };

  const deckUpdate = (deckid, field, value) => {
    inventoryServices.deckUpdate(deckid, field, value).then(() => getDecks());
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardChange: { [cardid]: count } }),
    };

    const oldState = { ...decks };

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });
    let cardType;
    let cardBase;
    if (cardid > 200000) {
      cardType = 'crypt';
      cardBase = cryptCardBase;
    } else {
      cardType = 'library';
      cardBase = libraryCardBase;
    }

    if (count >= 0) {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        oldState[deckid][cardType][cardid] = {
          c: cardBase[cardid],
          q: count,
        };
        return oldState;
      });
    } else {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        delete oldState[deckid][cardType][cardid];
        return oldState;
      });
    }

    const startTimer = () => {
      let counter = 1;
      timers.map((timerId) => {
        clearInterval(timerId);
      });
      setTimers([]);

      const timerId = setInterval(() => {
        if (counter > 0) {
          counter = counter - 1;
        } else {
          clearInterval(timerId);
          setChangeTimer(!changeTimer);
        }
      }, 500);

      setTimers([...timers, timerId]);
    };

    startTimer();
  };

  const deckRouter = (pointer) => {
    if (pointer) {
      switch (pointer['src']) {
        case 'my':
          return decks && decks[pointer['deckid']];
        case 'precons':
          return preconDecks && preconDecks[pointer['deckid']];
        case 'twd':
        case 'shared':
          return sharedDeck && sharedDeck[pointer['deckid']];
      }
    }
  };

  // ---------------------------------------------------------------------------
  //                          INVENTORY FUNCTIONS
  // ---------------------------------------------------------------------------

  const getInventory = async () => {
    const inventoryData = await inventoryServices.getInventory();
    if (inventoryData) {
      Object.keys(inventoryData.crypt).map((i) => {
        inventoryData.crypt[i].c = cryptCardBase[i];
      });
      Object.keys(inventoryData.library).map((i) => {
        inventoryData.library[i].c = libraryCardBase[i];
      });
      setInventoryCrypt(inventoryData.crypt);
      setInventoryLibrary(inventoryData.library);
    }
  };

  // Trigger  Hard and Soft count function on changing decks
  useEffect(() => {
    if (decks) {
      setupHardAndSoftInventory();
    }
  }, [decks]);

  const setupHardAndSoftInventory = () => {
    const softCrypt = {};
    const softLibrary = {};
    const hardCrypt = {};
    const hardLibrary = {};
    const crypts = { h: hardCrypt, s: softCrypt };
    const libraries = { h: hardLibrary, s: softLibrary };

    const addToTarget = (target, deckid, id, quantity) => {
      if (quantity) {
        if (!target[id]) target[id] = {};
        target[id][deckid] = quantity;
      }
    };

    Object.keys(decks).forEach((deckid) => {
      if (decks[deckid].inventory_type) {
        for (const [id, card] of Object.entries(decks[deckid].crypt)) {
          const target = crypts[card.i || decks[deckid].inventory_type];
          addToTarget(target, deckid, id, card.q);
        }
        for (const [id, card] of Object.entries(decks[deckid].library)) {
          const target = libraries[card.i || decks[deckid].inventory_type];
          addToTarget(target, deckid, id, card.q);
        }
      }
    });

    setUsedCryptCards({
      soft: softCrypt,
      hard: hardCrypt,
    });
    setUsedLibraryCards({
      soft: softLibrary,
      hard: hardLibrary,
    });
  };

  const inventoryDeckAdd = (deck) => {
    const cards = {};

    Object.keys(deck.crypt).forEach((card) => {
      if (deck.crypt[card].q) {
        cards[card] = deck.crypt[card].q;
      }
    });

    Object.keys(deck.library).forEach((card) => {
      if (deck.library[card].q) {
        cards[card] = deck.library[card].q;
      }
    });

    const url = `${process.env.API_URL}inventory/add`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    };

    const oldCryptState = { ...inventoryCrypt };
    const oldLibraryState = { ...inventoryLibrary };
    fetch(url, options).catch((error) => {
      setInventoryCrypt(oldCryptState);
      setInventoryLibrary(oldLibraryState);
    });

    inventoryAddToState(cards);
  };

  const inventoryDeckDelete = (deck) => {
    const cards = {};

    Object.keys(deck.crypt).forEach((card) => {
      if (deck.crypt[card].q) {
        cards[card] = deck.crypt[card].q;
      }
    });

    Object.keys(deck.library).forEach((card) => {
      if (deck.library[card].q) {
        cards[card] = deck.library[card].q;
      }
    });

    const url = `${process.env.API_URL}inventory/del`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    };

    const oldCryptState = { ...inventoryCrypt };
    const oldLibraryState = { ...inventoryLibrary };
    fetch(url, options).catch((error) => {
      setInventoryCrypt(oldCryptState);
      setInventoryLibrary(oldLibraryState);
    });

    inventoryDeleteFromState(cards);
  };

  const inventoryAddToState = (cards) => {
    inventoryServices.addtoStateByType(
      setInventoryCrypt,
      cryptCardBase,
      Object.keys(cards).filter((cardid) => cardid > 200000),
      cards
    );

    inventoryServices.addtoStateByType(
      setInventoryLibrary,
      libraryCardBase,
      Object.keys(cards).filter((cardid) => cardid < 200000),
      cards
    );
  };

  const inventoryDeleteFromState = (cards) => {
    inventoryServices.deleteFromStateByType(
      setInventoryCrypt,
      cryptCardBase,
      Object.keys(cards).filter((cardid) => cardid > 200000),
      cards
    );

    inventoryServices.deleteFromStateByType(
      setInventoryLibrary,
      libraryCardBase,
      Object.keys(cards).filter((cardid) => cardid < 200000),
      cards
    );
  };

  const inventoryCardChange = (cardid, count) => {
    const url = `${process.env.API_URL}inventory/change`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [cardid]: count }),
    };

    let setInventory;
    let inventory;
    let cardBase;
    if (cardid > 200000) {
      setInventory = setInventoryCrypt;
      inventory = inventoryCrypt;
      cardBase = cryptCardBase;
    } else {
      setInventory = setInventoryLibrary;
      inventory = inventoryLibrary;
      cardBase = libraryCardBase;
    }

    if (count >= 0 || (count < 0 && inventory[cardid])) {
      const oldState = { ...inventory };

      fetch(url, options).catch((error) => {
        setInventory(oldState);
      });

      if (count >= 0) {
        setInventory((prevState) => ({
          ...prevState,
          [cardid]: {
            c: cardBase[cardid],
            q: count,
          },
        }));
      } else {
        setInventory((prevState) => {
          const state = { ...prevState };
          delete state[cardid];
          return state;
        });
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        // 1 - APP Context
        isMobile,
        isNarrow,
        isWide,
        isDesktop,
        lang,
        changeLang,
        hideMissing,
        setHideMissing,
        inventoryMode, // move to listing??
        toggleInventoryMode, // move to listing??
        setInventoryMode, // move to listing??
        addMode, // move to listing??
        toggleAddMode, // move to listing??
        showImage,
        toggleShowImage,

        // 2 - USER Context
        whoAmI,
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,

        // 3 - CARDBASE Context
        cryptCardBase,
        libraryCardBase,
        localizedCrypt,
        localizedLibrary,
        nativeCrypt,
        nativeLibrary,

        // 4 - INVENTORY Context
        inventoryCrypt,
        setInventoryCrypt,
        inventoryLibrary,
        setInventoryLibrary,
        inventoryDeckAdd,
        inventoryDeckDelete,
        inventoryAddToState,
        inventoryDeleteFromState,

        usedCryptCards,
        usedLibraryCards,
        inventoryCardChange,

        // 5 - DECK Context
        preconDecks,
        decks,
        activeDeck,
        setActiveDeck,
        sharedDeck,
        setSharedDeck,
        recentDecks,
        addRecentDeck,
        updateRecentDecks,
        getDecks,
        deckRouter,
        deckUpdate,
        deckCardChange,
        changeTimer,

        // 6 - LISTING Context (NEED REVIEW)

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

        showTwdSearch,
        setShowTwdSearch,
        showCryptSearch,
        setShowCryptSearch,
        showLibrarySearch,
        setShowLibrarySearch,

        // SORTING Context (NEED REVIEW)
        cryptSearchSort, // LOCAL ResultCrypt.jsx
        changeCryptSearchSort, // LOCAL ResultCrypt.jsx
        librarySearchSort, // LOCAL ResultLibrary.jsx
        changeLibrarySearchSort, // LOCAL ResultLibrary.jsx
        cryptDeckSort,
        changeCryptDeckSort,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
