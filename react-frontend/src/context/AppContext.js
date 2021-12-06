import React, { useState, useLayoutEffect } from 'react';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from 'components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from 'components/forms_data/defaultsLibraryForm.json';

const AppContext = React.createContext();

export default AppContext;

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error(`useApp must be used within a AppProvider`);

  return context;
};

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;

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

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);

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

  const [preconDecks, setPreconDecks] = useState({});
  const [decks, setDecks] = useState(undefined);
  const [activeDeck, setActiveDeck] = useState({ src: null, deckid: null });
  const [sharedDeck, setSharedDeck] = useState({});
  const [recentDecks, setRecentDecks] = useState([]);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const changeLang = (lang) => {
    setLang(lang);
    window.localStorage.setItem('lang', lang);
  };

  const toggleShowImage = () => {
    setShowImage(!showImage);
    window.localStorage.setItem('showImage', !showImage);
  };

  const toggleInventoryMode = () => {
    setInventoryMode(!inventoryMode);
    window.localStorage.setItem('inventoryMode', !inventoryMode);
  };

  const changeCryptDeckSort = (method) => {
    setCryptDeckSort(method);
    window.localStorage.setItem('cryptDeckSort', method);
  };

  const changeCryptSearchSort = (method) => {
    setCryptSearchSort(method);
    window.localStorage.setItem('cryptSearchSort', method);
  };

  const changeLibrarySearchSort = (method) => {
    setLibrarySearchSort(method);
    window.localStorage.setItem('librarySearchSort', method);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    window.localStorage.setItem('addMode', !addMode);
  };

  const addRecentDeck = (deck) => {
    const d = [...recentDecks];
    const idx = recentDecks.map((v) => v.deckid).indexOf(deck.deckid);
    if (idx !== -1) d.splice(idx, 1);
    d.unshift({ deckid: deck.deckid, name: deck.name });
    if (d.length > 10) d.slice(0, 10);
    setRecentDecks(d);
    window.localStorage.setItem('recentDecks', JSON.stringify(d));
  };

  const updateRecentDecks = (decks) => {
    setRecentDecks(decks);
    window.localStorage.setItem('recentDecks', JSON.stringify(decks));
  };

  useLayoutEffect(() => {
    const css = window.localStorage.getItem('cryptSearchSort');
    if (css) {
      setCryptSearchSort(css);
    } else {
      setCryptSearchSort('Capacity - Min to Max');
    }

    const cds = window.localStorage.getItem('cryptDeckSort');
    if (cds) {
      setCryptDeckSort(cds);
    } else {
      setCryptDeckSort('Quantity');
    }

    const ls = window.localStorage.getItem('librarySearchSort');
    if (ls) {
      setLibrarySearchSort(ls);
    } else {
      setLibrarySearchSort('Type');
    }

    const lg = window.localStorage.getItem('lang');
    if (lg) {
      setLang(lg);
    } else {
      setLang('en-EN');
    }

    const am = window.localStorage.getItem('addMode');
    if (am === 'false') {
      setAddMode(false);
    } else {
      setAddMode(true);
    }

    const im = window.localStorage.getItem('inventoryMode');
    if (im === 'true') {
      setInventoryMode(true);
    } else {
      setInventoryMode(false);
    }

    const si = window.localStorage.getItem('showImage');
    if (si === 'false') {
      setShowImage(false);
    } else {
      setShowImage(true);
    }

    const rd = window.localStorage.getItem('recentDecks');
    if (rd) setRecentDecks(JSON.parse(rd));
  }, []);

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

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => getDecks());
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

    if (count >= 0) {
      if (cardid > 200000) {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          oldState[deckid]['crypt'][cardid] = {
            c: cryptCardBase[cardid],
            q: count,
          };
          return oldState;
        });
      } else {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          oldState[deckid]['library'][cardid] = {
            c: libraryCardBase[cardid],
            q: count,
          };
          return oldState;
        });
      }
    } else {
      if (cardid > 200000) {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          delete oldState[deckid]['crypt'][cardid];
          return oldState;
        });
      } else {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          delete oldState[deckid]['library'][cardid];
          return oldState;
        });
      }
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

    if (cardid > 200000) {
      if (count >= 0 || (count < 0 && inventoryCrypt[cardid])) {
        const oldState = { ...inventoryCrypt };

        fetch(url, options).catch((error) => {
          setInventoryCrypt(oldState);
        });

        if (count >= 0) {
          setInventoryCrypt((prevState) => ({
            ...prevState,
            [cardid]: {
              c: cryptCardBase[cardid],
              q: count,
            },
          }));
        } else {
          setInventoryCrypt((prevState) => {
            const state = { ...prevState };
            delete state[cardid];
            return state;
          });
        }
      }
    } else {
      if (count >= 0 || (count < 0 && inventoryLibrary[cardid])) {
        const oldState = { ...inventoryLibrary };

        fetch(url, options).catch((error) => {
          setInventoryLibrary(oldState);
        });

        if (count >= 0) {
          setInventoryLibrary((prevState) => ({
            ...prevState,
            [cardid]: {
              c: libraryCardBase[cardid],
              q: count,
            },
          }));
        } else {
          setInventoryLibrary((prevState) => {
            const state = { ...prevState };
            delete state[cardid];
            return state;
          });
        }
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        // 1 - APP Context
        isMobile,
        isWide,
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
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,

        // 3 - CARDBASE Context
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

        // 4 - INVENTORY Context
        inventoryCrypt,
        setInventoryCrypt,
        inventoryLibrary,
        setInventoryLibrary,

        usedCryptCards,
        setUsedCryptCards,
        usedLibraryCards,
        setUsedLibraryCards,
        inventoryCardChange,

        // 5 - DECK Context
        preconDecks,
        setPreconDecks,
        decks,
        setDecks,
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
