import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import { initFromStorage, setLocalStorage } from 'services/storageServices.js';
import { cardServices, inventoryServices, deckServices } from 'services';
import { useWindowSize } from 'hooks';
import { byTimestamp } from 'utils';
import imbuedClansList from 'assets/data/imbuedClansList.json';

const AppContext = React.createContext();

export default AppContext;

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error(`useApp must be used within a AppProvider`);

  return context;
};

export const AppProvider = (props) => {
  const screenSize = useWindowSize();
  const isMobile = useMemo(() => screenSize <= 767, [screenSize]);
  const isNarrow = useMemo(() => screenSize <= 992, [screenSize]);
  const isDesktop = useMemo(() => screenSize >= 1200, [screenSize]);
  const isWide = useMemo(() => screenSize >= 1440, [screenSize]);

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [showImage, setShowImage] = useState(undefined);
  const [addMode, setAddMode] = useState(undefined);
  const [inventoryMode, setInventoryMode] = useState(undefined);
  const [hideMissing, setHideMissing] = useState(false);
  const [cryptDeckSort, setCryptDeckSort] = useState(undefined);
  const [cryptSearchSort, setCryptSearchSort] = useState(undefined);
  const [librarySearchSort, setLibrarySearchSort] = useState(undefined);
  const [twdSearchSort, setTwdSearchSort] = useState(undefined);
  const [pdaSearchSort, setPdaSearchSort] = useState(undefined);

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);

  const [preconDecks, setPreconDecks] = useState({});

  const [showPdaSearch, setShowPdaSearch] = useState(true);
  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

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
  const [lastDeckId, setLastDeckId] = useState(undefined);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  // CARD BASE

  useEffect(() => {
    cardServices.getCardBase().then((data) => {
      Object.values(data.crypt).map((card) => {
        let sect;
        if (imbuedClansList.includes(card['Clan'])) {
          sect = 'Imbued';
        } else {
          const cardText = card['Card Text'].split(/\W+/);
          sect = cardText[0] === 'Advanced' ? cardText[1] : cardText[0];
        }

        data.crypt[card.Id].Sect = sect;
      });
      setCryptCardBase(data.crypt);
      setLibraryCardBase(data.library);
      setNativeCrypt(data.nativeCrypt);
      setNativeLibrary(data.nativeLibrary);
      setLocalizedCrypt({ 'en-EN': data.nativeCrypt });
      setLocalizedLibrary({ 'en-EN': data.nativeLibrary });
    });
  }, []);

  // USER FUNCTIONS

  const whoAmI = () => {
    const url = `${process.env.API_URL}account`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (!data.username) {
          initializeUnauthenticatedUser();
        } else {
          initializeUserData(data);
        }
      });
  };

  const initializeUserData = (data) => {
    const inventory = parseInventoryData(data.inventory);
    setUsername(data.username);
    setPublicName(data.public_name);
    setEmail(data.email);
    setInventoryCrypt(inventory.crypt);
    setInventoryLibrary(inventory.library);
    setDecks(parseDecksData(data.decks));
  };

  const initializeUnauthenticatedUser = () => {
    setAddMode(false);
    setInventoryMode(false);
    setInventoryCrypt({});
    setInventoryLibrary({});
    setUsername(undefined);
    if (activeDeck.deckid !== 'deckInUrl' && activeDeck.deckid !== null) {
      setActiveDeck({ src: null, deckid: null });
    }
    setEmail(undefined);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      whoAmI();
      setPreconDecks(cardServices.getPreconDecks(parseDeckCards));
    }
  }, [cryptCardBase, libraryCardBase]);

  // LANGUAGE FUNCTIONS

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
    cardServices.getLocalizedCardBase(lang).then((data) => {
      setLocalizedCrypt((prevState) => ({
        ...prevState,
        [lang]: data.crypt,
      }));

      setLocalizedLibrary((prevState) => ({
        ...prevState,
        [lang]: data.library,
      }));

      changeBaseTextToLocalizedText(setCryptCardBase, data.crypt, nativeCrypt);
      changeBaseTextToLocalizedText(
        setLibraryCardBase,
        data.library,
        nativeLibrary
      );
    });
  };

  // Trigger the language change
  useEffect(() => {
    async function triggerLangChange() {
      if (!localizedCrypt[lang] || !localizedLibrary[lang]) {
        await initializeLocalizedInfo(lang);
      } else {
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
    }

    if (cryptCardBase && libraryCardBase) {
      triggerLangChange();
    }
  }, [lang, nativeCrypt, nativeLibrary]);

  // APP DATA FUNCTIONS

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

  const changeTwdSearchSort = (method) => {
    setTwdSearchSort(method);
    setLocalStorage('twdSearchSort', method);
  };

  const changePdaSearchSort = (method) => {
    setPdaSearchSort(method);
    setLocalStorage('pdaSearchSort', method);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    setLocalStorage('addMode', !addMode);
  };

  const addRecentDeck = (deck) => {
    const src =
      deck.deckid.length != 32 ? 'twd' : deck.public_parent ? 'pda' : 'shared';
    let d = [...recentDecks];
    const idx = recentDecks.map((v) => v.deckid).indexOf(deck.deckid);
    if (idx !== -1) d.splice(idx, 1);
    d.unshift({
      deckid: deck.deckid,
      name: deck.name,
      src: src,
    });
    if (d.length > 10) d = d.slice(0, 10);
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
    initFromStorage('twdSearchSort', 'Date - New to Old', setTwdSearchSort);
    initFromStorage('pdaSearchSort', 'Date - New to Old', setPdaSearchSort);
    initFromStorage('lang', 'en-EN', setLang);
    initFromStorage('addMode', isDesktop ? true : false, setAddMode);
    initFromStorage('inventoryMode', false, setInventoryMode);
    initFromStorage('showImage', true, setShowImage);
    initFromStorage('recentDecks', [], setRecentDecks);
  }, []);

  // DECK FUNCTIONS

  const parseDecksData = (decksData) => {
    if (cryptCardBase && libraryCardBase) {
      Object.keys(decksData).map((deckid) => {
        const cardsData = parseDeckCards(decksData[deckid].cards);
        decksData[deckid] = { ...decksData[deckid], ...cardsData };

        if (decksData[deckid].used_in_inventory) {
          Object.keys(decksData[deckid].used_in_inventory).map((cardid) => {
            if (cardid > 200000) {
              if (decksData[deckid].crypt[cardid]) {
                decksData[deckid].crypt[cardid].i =
                  decksData[deckid].used_in_inventory[cardid];
              }
            } else {
              if (decksData[deckid].library[cardid]) {
                decksData[deckid].library[cardid].i =
                  decksData[deckid].used_in_inventory[cardid];
              }
            }
          });
        }

        decksData[deckid].is_yours = true;
        delete decksData[deckid].cards;
      });
    }
    return decksData;
  };

  const parseDeckCards = (cards) => {
    const crypt = {};
    const library = {};

    if (cards && cryptCardBase && libraryCardBase) {
      Object.keys(cards).map((cardid) => {
        if (cardid > 200000) {
          crypt[cardid] = {
            q: cards[cardid],
            c: cryptCardBase[cardid],
          };
        } else {
          library[cardid] = {
            q: cards[cardid],
            c: libraryCardBase[cardid],
          };
        }
      });
    }
    return { crypt: crypt, library: library };
  };

  const changeMaster = (deckid) => {
    const masterid = decks[deckid].master;
    if (masterid) {
      setDecks((prevState) => {
        const branches = prevState[masterid].branches;
        branches.splice(branches.indexOf(deckid), 1);
        branches.push(masterid);
        branches.map((b) => {
          prevState[b].master = deckid;
        });

        return {
          ...prevState,
          [masterid]: {
            ...prevState[masterid],
            branches: null,
          },
          [deckid]: {
            ...prevState[deckid],
            branches: branches,
            master: null,
          },
        };
      });
    }
  };

  const branchesUpdate = (deckid, field, value) => {
    setDecks((prevState) => {
      let revisions = [];
      if (decks[deckid].master) {
        revisions = [
          decks[deckid].master,
          ...decks[decks[deckid].master].branches,
        ];
      } else {
        revisions = [deckid, ...decks[deckid].branches];
      }

      const newState = { ...prevState };
      revisions.map((d) => {
        newState[d] = {
          ...newState[d],
          [field]: value,
        };
      });

      return newState;
    });
  };

  const deckUpdate = (deckid, field, value) => {
    deckServices.deckUpdate(deckid, field, value).then(() => {
      if (field === 'used_in_inventory') {
        setDecks((prevState) => {
          const newState = { ...prevState };
          Object.keys(value).map((cardid) => {
            if (cardid > 200000) {
              newState[deckid].crypt[cardid].i = value[cardid];
            } else {
              newState[deckid].library[cardid].i = value[cardid];
            }
          });
          return newState;
        });
      } else {
        setDecks((prevState) => {
          const newState = { ...prevState };
          newState[deckid] = {
            ...newState[deckid],
            [field]: value,
          };

          if (field === 'inventory_type') {
            Object.keys(newState[deckid].crypt).map((cardid) => {
              newState[deckid].crypt[cardid].i = '';
            });
            Object.keys(newState[deckid].library).map((cardid) => {
              newState[deckid].library[cardid].i = '';
            });
          }

          return newState;
        });
      }

      const branchesUpdateFields = ['name', 'author'];
      if (
        branchesUpdateFields.includes(field) &&
        (decks[deckid].branches || decks[deckid].master)
      ) {
        branchesUpdate(deckid, field, value);
      }

      changeMaster(deckid);
    });
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

    const cardSrc = cardid > 200000 ? 'crypt' : 'library';
    const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
    let initialState = {};

    if (deckid in decks) {
      initialState = JSON.parse(JSON.stringify(decks));

      setDecks((prevState) => {
        const oldState = { ...prevState };
        if (count >= 0) {
          oldState[deckid][cardSrc][cardid] = {
            c: cardBase[cardid],
            q: count,
          };
        } else {
          delete oldState[deckid][cardSrc][cardid];
        }

        return oldState;
      });

      changeMaster(deckid);
    } else if (deckid in sharedDeck) {
      initialState = JSON.parse(JSON.stringify(sharedDeck));

      setSharedDeck((prevState) => {
        const oldState = { ...prevState };
        if (count >= 0) {
          oldState[deckid][cardSrc][cardid] = {
            c: cardBase[cardid],
            q: count,
          };
        } else {
          delete oldState[deckid][cardSrc][cardid];
        }
        return oldState;
      });
    }

    fetch(url, options).catch((error) => {
      if (deckid in decks) {
        setDecks(initialState);
      } else if (deckid in sharedDeck) {
        setSharedDeck(initialState);
      }
    });

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

  useEffect(() => {
    if (decks && Object.keys(decks).length) {
      const lastDeckArray = Object.values(decks).sort(byTimestamp);
      setLastDeckId(lastDeckArray[0].deckid);
    }
  }, [decks]);

  useEffect(() => {
    if (decks) {
      const d = recentDecks.filter((v) => !decks[v.deckid]);
      if (d.length < recentDecks.length) {
        updateRecentDecks(d);
      }
    }
  }, [decks, recentDecks]);

  useEffect(() => {
    if (lastDeckId && !activeDeck.deckid) {
      setActiveDeck({ src: 'my', deckid: lastDeckId });
    }
  }, [lastDeckId]);

  // INVENTORY FUNCTIONS

  const parseInventoryData = (inventoryData) => {
    Object.keys(inventoryData.crypt).map((i) => {
      inventoryData.crypt[i].c = cryptCardBase[i];
    });
    Object.keys(inventoryData.library).map((i) => {
      inventoryData.library[i].c = libraryCardBase[i];
    });

    return { crypt: inventoryData.crypt, library: inventoryData.library };
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

    inventoryCardsChange(cards);
  };

  const inventoryDeckDelete = (deck) => {
    const cards = {};

    Object.keys(deck.crypt).forEach((card) => {
      if (deck.crypt[card].q) {
        cards[card] = -deck.crypt[card].q;
      }
    });

    Object.keys(deck.library).forEach((card) => {
      if (deck.library[card].q) {
        cards[card] = -deck.library[card].q;
      }
    });

    inventoryCardsChange(cards);
  };

  const inventoryCardsChange = (cards) => {
    const url = `${process.env.API_URL}inventory`;
    const options = {
      method: 'PATCH',
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

    inventoryChangeState(cards);
  };

  const inventoryChangeState = (cards) => {
    inventoryServices.changeState(
      setInventoryCrypt,
      cryptCardBase,
      Object.keys(cards).filter((cardid) => cardid > 200000),
      cards
    );

    inventoryServices.changeState(
      setInventoryLibrary,
      libraryCardBase,
      Object.keys(cards).filter((cardid) => cardid < 200000),
      cards
    );
  };

  const inventoryCardChange = (cardid, count) => {
    const url = `${process.env.API_URL}inventory`;
    const options = {
      method: 'PUT',
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
        // APP Context
        isMobile,
        isNarrow,
        isWide,
        isDesktop,
        lang,
        changeLang,
        hideMissing,
        setHideMissing,
        inventoryMode,
        toggleInventoryMode,
        setInventoryMode,
        addMode,
        toggleAddMode,
        showImage,
        setShowImage,
        toggleShowImage,
        showFloatingButtons,
        setShowFloatingButtons,
        showMenuButtons,
        setShowMenuButtons,

        // USER Context
        whoAmI,
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        initializeUserData,
        initializeUnauthenticatedUser,

        // CARDBASE Context
        cryptCardBase,
        libraryCardBase,
        localizedCrypt,
        localizedLibrary,
        nativeCrypt,
        nativeLibrary,

        // INVENTORY Context
        inventoryCrypt,
        setInventoryCrypt,
        inventoryLibrary,
        setInventoryLibrary,
        inventoryDeckAdd,
        inventoryDeckDelete,
        usedCryptCards,
        usedLibraryCards,
        inventoryCardChange,

        // DECK Context
        preconDecks,
        decks,
        setDecks,
        activeDeck,
        setActiveDeck,
        sharedDeck,
        setSharedDeck,
        lastDeckId,
        recentDecks,
        addRecentDeck,
        updateRecentDecks,
        deckRouter,
        deckUpdate,
        deckCardChange,
        parseDeckCards,
        timers,
        changeTimer,
        setChangeTimer,
        setTimers,

        // LISTING Context
        showPdaSearch,
        setShowPdaSearch,
        showTwdSearch,
        setShowTwdSearch,
        showCryptSearch,
        setShowCryptSearch,
        showLibrarySearch,
        setShowLibrarySearch,

        // SORTING Context
        cryptSearchSort,
        changeCryptSearchSort,
        librarySearchSort,
        changeLibrarySearchSort,
        cryptDeckSort,
        changeCryptDeckSort,
        twdSearchSort,
        changeTwdSearchSort,
        pdaSearchSort,
        changePdaSearchSort,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
