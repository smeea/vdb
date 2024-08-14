import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { useSnapshot } from 'valtio';
import { set, setMany, getMany, update } from 'idb-keyval';
import { storageServices, userServices, cardServices } from '@/services';
import { useDeck, useWindowSize } from '@/hooks';
import { byTimestamp } from '@/utils';
import {
  CAPACITY_MIN_MAX,
  QUANTITYx,
  TYPE,
  DATE_NEW_OLD,
  RANK_HIGH_LOW,
  EN,
  TWD,
  PDA,
  CARD_TEXT,
} from '@/utils/constants';
import {
  setLimitedSets,
  setLimitedAllowedCrypt,
  setLimitedAllowedLibrary,
  setLimitedBannedCrypt,
  setLimitedBannedLibrary,
  setupUsedInventory,
  limitedFullStore,
  deckStore,
  inventoryStore,
  deckLocalize,
} from '@/context';

const CRYPT_SEARCH_SORT = 'cryptSearchSort';
const CRYPT_DECK_SORT = 'cryptDeckSort';
const LIBRARY_SEARCH_SORT = 'librarySearchSort';
const TWD_SEARCH_SORT = 'twdSearchSort';
const PDA_SEARCH_SORT = 'pdaSearchSort';
const ANALYZE_SEARCH_SORT = 'analyzeSearchSort';
const LANG = 'lang';
const ADD_MODE = 'addMode';
const INVENTORY_MODE = 'inventoryMode';
const LIMITED_MODE = 'limitedMode';
const PLAYTEST_MODE = 'playtestMode';
const SHOW_IMAGE = 'showImage';
const SHOW_LEGACY_IMAGE = 'showLegacyImage';
const RECENT_DECKS = 'recentDecks';
const ONLINE = 'online';
const OFFLINE = 'offline';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const screenSize = useWindowSize();
  const isMobile = useMemo(() => screenSize <= 767, [screenSize]);
  const isNarrow = useMemo(() => screenSize <= 1024, [screenSize]);
  const isDesktop = useMemo(() => screenSize >= 1280, [screenSize]);
  const isWide = useMemo(() => screenSize >= 1440, [screenSize]);
  const isXWide = useMemo(() => screenSize >= 1920, [screenSize]);

  const [userData, setUserData] = useState();
  const [username, setUsername] = useState();
  const [publicName, setPublicName] = useState();
  const [email, setEmail] = useState();
  const [inventoryKey, setInventoryKey] = useState();
  const [lang, setLang] = useState(EN);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPlaytestAdmin, setIsPlaytestAdmin] = useState();
  const [isPlaytester, setIsPlaytester] = useState();
  const [playtestMode, setPlaytestMode] = useState();
  const [showImage, setShowImage] = useState();
  const [showLegacyImage, setShowLegacyImage] = useState();
  const [addMode, setAddMode] = useState();
  const [inventoryMode, setInventoryMode] = useState();
  const [limitedMode, setLimitedMode] = useState();
  const [searchInventoryMode, setSearchInventoryMode] = useState();
  const [searchMissingInventoryMode, setSearchMissingInventoryMode] = useState();
  const [cryptDeckSort, setCryptDeckSort] = useState();
  const [cryptSearchSort, setCryptSearchSort] = useState();
  const [librarySearchSort, setLibrarySearchSort] = useState();
  const [twdSearchSort, setTwdSearchSort] = useState();
  const [pdaSearchSort, setPdaSearchSort] = useState();
  const [analyzeSearchSort, setAnalyzeSearchSort] = useState();
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState();

  const [cryptCardBase, setCryptCardBase] = useImmer();
  const [libraryCardBase, setLibraryCardBase] = useImmer();
  const [nativeCrypt, setNativeCrypt] = useState();
  const [nativeLibrary, setNativeLibrary] = useState();
  const [localizedCrypt, setLocalizedCrypt] = useState();
  const [localizedLibrary, setLocalizedLibrary] = useState();
  const [preconDecks, setPreconDecks] = useState();

  const { deck, decks } = useSnapshot(deckStore);
  const lastDeckArray = (decks && Object.values(decks).toSorted(byTimestamp)) ?? [
    { deckid: undefined },
  ];
  const lastDeckId = lastDeckArray[0]?.deckid;
  const [recentDecks, setRecentDecks] = useState([]);

  // CARD BASE
  const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
  const fetchAndSetCardBase = (isIndexedDB = true) => {
    cardServices.getCardBase().then((data) => {
      if (isIndexedDB) {
        setMany([
          ['cardVersion', CARD_VERSION],
          ['cryptCardBase', data.crypt],
          ['libraryCardBase', data.library],
          ['nativeCrypt', data.nativeCrypt],
          ['nativeLibrary', data.nativeLibrary],
          ['localizedCrypt', { [EN]: data.nativeCrypt }],
          ['localizedLibrary', { [EN]: data.nativeLibrary }],
        ]);
      }

      setCryptCardBase(data.crypt);
      setLibraryCardBase(data.library);
      setNativeCrypt(data.nativeCrypt);
      setNativeLibrary(data.nativeLibrary);
      setLocalizedCrypt({ [EN]: data.nativeCrypt });
      setLocalizedLibrary({ [EN]: data.nativeLibrary });

      cardServices.getPreconDecks(data.crypt, data.library).then((preconData) => {
        if (isIndexedDB) set('preconDecks', preconData);
        setPreconDecks(preconData);
      });
    });
  };

  const setLimitedFormat = (lac, lal, lbc, lbl, ls) => {
    if (lac) setLimitedAllowedCrypt(lac);
    if (lal) setLimitedAllowedLibrary(lal);
    if (lbc) setLimitedBannedCrypt(lbc);
    if (lbl) setLimitedBannedLibrary(lbl);
    if (ls) setLimitedSets(ls);
  };

  useEffect(() => {
    getMany([
      'cardVersion',
      'cryptCardBase',
      'libraryCardBase',
      'nativeCrypt',
      'nativeLibrary',
      'localizedCrypt',
      'localizedLibrary',
      'preconDecks',
      'limitedAllowedCrypt',
      'limitedAllowedLibrary',
      'limitedBannedCrypt',
      'limitedBannedLibrary',
      'limitedSets',
    ])
      .then(([v, cb, lb, nc, nl, lc, ll, pd, lac, lal, lbc, lbl, ls]) => {
        if (!v || CARD_VERSION > v) {
          fetchAndSetCardBase();
        } else {
          limitedFullStore.crypt = cb;
          limitedFullStore.library = lb;
          setCryptCardBase(cb);
          setLibraryCardBase(lb);
          setNativeCrypt(nc);
          setNativeLibrary(nl);
          setLocalizedCrypt(lc);
          setLocalizedLibrary(ll);
          setPreconDecks(pd);
          setLimitedFormat(lac, lal, lbc, lbl, ls);
        }
      })
      .catch(() => {
        fetchAndSetCardBase(false);
      });

    userServices.whoAmI().then((data) => {
      if (data.success === false) {
        setUserData(null);
      } else {
        setUserData(data);
      }
    });
  }, []);

  const parseInventoryData = (inventoryData) => {
    Object.keys(inventoryData.crypt).forEach((i) => {
      if (cryptCardBase[i]) {
        inventoryData.crypt[i].c = cryptCardBase[i];
      } else {
        delete inventoryData.crypt[i];
      }
    });
    Object.keys(inventoryData.library).forEach((i) => {
      if (libraryCardBase[i]) {
        inventoryData.library[i].c = libraryCardBase[i];
      } else {
        delete inventoryData.library[i];
      }
    });

    return inventoryData;
  };

  const initializeUserData = (data) => {
    setUsername(data.username);
    setPublicName(data.public_name);
    setEmail(data.email);
    setInventoryKey(data.inventory_key);
    setIsPlaytester(data.playtester);
    setIsPlaytestAdmin(data.playtest_admin);
    if (!data.playtester && !data.playtest_admin) setPlaytestMode(false);
    const { isFrozen, crypt, library } = parseInventoryData(data.inventory);
    inventoryStore.isFrozen = isFrozen;
    inventoryStore.crypt = crypt;
    inventoryStore.library = library;
    deckStore.decks = parseDecksData(data.decks);
  };

  const initializeUnauthenticatedUser = () => {
    setAddMode(false);
    setInventoryMode(false);
    setLimitedMode(false);
    setIsPlaytester(false);
    setIsPlaytestAdmin(false);
    setPlaytestMode(false);
    setUsername(null);
    setEmail(undefined);
    inventoryStore.crypt = {};
    inventoryStore.library = {};
    if (decks?.[deck?.deckid]) {
      deckStore.deck = undefined;
    }
    deckStore.decks = undefined;
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (userData === null) {
        initializeUnauthenticatedUser();
      } else if (userData) {
        initializeUserData(userData);
      }
    }
  }, [userData, cryptCardBase, libraryCardBase]);

  // LANGUAGE
  const changeLang = (lang) => {
    setLang(lang);
    storageServices.setLocalStorage(LANG, lang);
  };

  const changeBaseTextToLocalizedText = (setCardBase, localizedInfo, nativeInfo) => {
    setCardBase((draft) => {
      Object.keys(draft).forEach((k) => {
        const newInfo = localizedInfo[k] ?? nativeInfo[k];
        draft[k].Name = newInfo.Name;
        draft[k][CARD_TEXT] = newInfo[CARD_TEXT];
      });
    });
  };

  const initializeLocalizedInfo = async (lang) => {
    cardServices.getLocalizedCardBase(lang).then((data) => {
      update('localizedCrypt', (val) => ({
        ...val,
        [lang]: data.crypt,
      }));
      update('localizedLibrary', (val) => ({
        ...val,
        [lang]: data.library,
      }));
      setLocalizedCrypt((prevState) => ({
        ...prevState,
        [lang]: data.crypt,
      }));
      setLocalizedLibrary((prevState) => ({
        ...prevState,
        [lang]: data.library,
      }));
      changeBaseTextToLocalizedText(setCryptCardBase, data.crypt, nativeCrypt);
      changeBaseTextToLocalizedText(setLibraryCardBase, data.library, nativeLibrary);
    });
  };

  useEffect(() => {
    async function triggerLangChange() {
      if ((!localizedCrypt[lang] || !localizedLibrary[lang]) && lang !== EN) {
        await initializeLocalizedInfo(lang);
      } else {
        changeBaseTextToLocalizedText(setCryptCardBase, localizedCrypt[lang], nativeCrypt);
        changeBaseTextToLocalizedText(setLibraryCardBase, localizedLibrary[lang], nativeLibrary);
      }
    }
    if (cryptCardBase && libraryCardBase) {
      triggerLangChange();
    }
  }, [lang, nativeCrypt, nativeLibrary]);

  useEffect(() => {
    if (
      deck &&
      localizedCrypt?.[lang] &&
      localizedLibrary?.[lang] &&
      Object.keys(localizedCrypt).length > 1
    ) {
      deckLocalize(localizedCrypt[lang], nativeCrypt, localizedLibrary[lang], nativeLibrary);
    }
  }, [deck?.deckid, lang, localizedCrypt, localizedLibrary]);

  // APP DATA
  const toggleShowImage = () => {
    setShowImage(!showImage);
    storageServices.setLocalStorage(SHOW_IMAGE, !showImage);
  };

  const toggleShowLegacyImage = () => {
    setShowLegacyImage(!showLegacyImage);
    storageServices.setLocalStorage(SHOW_LEGACY_IMAGE, !showLegacyImage);
  };

  const toggleInventoryMode = () => {
    setInventoryMode(!inventoryMode);
    storageServices.setLocalStorage(INVENTORY_MODE, !inventoryMode);
  };

  const toggleLimitedMode = () => {
    setLimitedMode(!limitedMode);
    storageServices.setLocalStorage(LIMITED_MODE, !limitedMode);
  };

  const togglePlaytestMode = () => {
    setPlaytestMode(!playtestMode);
    storageServices.setLocalStorage(PLAYTEST_MODE, !playtestMode);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    storageServices.setLocalStorage(ADD_MODE, !addMode);
  };

  const changeCryptDeckSort = (method) => {
    setCryptDeckSort(method);
    storageServices.setLocalStorage(CRYPT_DECK_SORT, method);
  };

  const changeCryptSearchSort = (method) => {
    setCryptSearchSort(method);
    storageServices.setLocalStorage(CRYPT_SEARCH_SORT, method);
  };

  const changeLibrarySearchSort = (method) => {
    setLibrarySearchSort(method);
    storageServices.setLocalStorage(LIBRARY_SEARCH_SORT, method);
  };

  const changeTwdSearchSort = (method) => {
    setTwdSearchSort(method);
    storageServices.setLocalStorage(TWD_SEARCH_SORT, method);
  };

  const changePdaSearchSort = (method) => {
    setPdaSearchSort(method);
    storageServices.setLocalStorage(PDA_SEARCH_SORT, method);
  };

  const changeAnalyzeSearchSort = (method) => {
    setAnalyzeSearchSort(method);
    storageServices.setLocalStorage(ANALYZE_SEARCH_SORT, method);
  };

  const addRecentDeck = (deck) => {
    const src = deck.deckid.length != 9 ? TWD : deck.publicParent ? PDA : 'shared';
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
    storageServices.setLocalStorage(RECENT_DECKS, d);
  };

  const updateRecentDecks = (decks) => {
    setRecentDecks(decks);
    storageServices.setLocalStorage(RECENT_DECKS, decks);
  };

  useEffect(() => {
    window.addEventListener(OFFLINE, () => setIsOnline(false));
    window.addEventListener(ONLINE, () => setIsOnline(true));

    return () => {
      window.removeEventListener(OFFLINE, () => setIsOnline(false));
      window.removeEventListener(ONLINE, () => setIsOnline(true));
    };
  }, []);

  useLayoutEffect(() => {
    storageServices.initFromStorage(CRYPT_SEARCH_SORT, CAPACITY_MIN_MAX, setCryptSearchSort);
    storageServices.initFromStorage(CRYPT_DECK_SORT, QUANTITYx, setCryptDeckSort);
    storageServices.initFromStorage(LIBRARY_SEARCH_SORT, TYPE, setLibrarySearchSort);
    storageServices.initFromStorage(TWD_SEARCH_SORT, DATE_NEW_OLD, setTwdSearchSort);
    storageServices.initFromStorage(PDA_SEARCH_SORT, DATE_NEW_OLD, setPdaSearchSort);
    storageServices.initFromStorage(ANALYZE_SEARCH_SORT, RANK_HIGH_LOW, setAnalyzeSearchSort);
    storageServices.initFromStorage(LANG, EN, setLang);
    storageServices.initFromStorage(ADD_MODE, isDesktop, setAddMode);
    storageServices.initFromStorage(INVENTORY_MODE, false, setInventoryMode);
    storageServices.initFromStorage(LIMITED_MODE, false, setLimitedMode);
    storageServices.initFromStorage(SHOW_IMAGE, true, setShowImage);
    storageServices.initFromStorage(RECENT_DECKS, [], setRecentDecks);
    storageServices.initFromStorage(PLAYTEST_MODE, false, setPlaytestMode);
    storageServices.initFromStorage(SHOW_LEGACY_IMAGE, false, setShowLegacyImage);
  }, []);

  // DECKS
  const parseDecksData = (decksData) => {
    Object.keys(decksData).forEach((deckid) => {
      const cardsData = useDeck(decksData[deckid].cards, cryptCardBase, libraryCardBase);

      decksData[deckid] = { ...decksData[deckid], ...cardsData };
      if (decksData[deckid].usedInInventory) {
        Object.keys(decksData[deckid].usedInInventory).forEach((cardid) => {
          if (cardid > 200000) {
            if (decksData[deckid].crypt[cardid]) {
              decksData[deckid].crypt[cardid].i = decksData[deckid].usedInInventory[cardid];
            }
          } else {
            if (decksData[deckid].library[cardid]) {
              decksData[deckid].library[cardid].i = decksData[deckid].usedInInventory[cardid];
            }
          }
        });
      }
      decksData[deckid].isAuthor = true;
      decksData[deckid].master = decksData[deckid].master !== '' ? decksData[deckid].master : null;
      decksData[deckid].isBranches = !!(
        decksData[deckid].master || decksData[deckid].branches?.length > 0
      );
      delete decksData[deckid].cards;
    });

    return decksData;
  };

  useEffect(() => {
    if (decks || username === null) {
      const d = recentDecks.filter((v) => username === null || !decks[v.deckid]);
      if (d.length < recentDecks.length) {
        updateRecentDecks(d);
      }
    }
  }, [decks, recentDecks]);

  useEffect(() => {
    if (decks && inventoryMode) setupUsedInventory(decks);
  }, [decks, decks?.[deck?.deckid]?.crypt, decks?.[deck?.deckid]?.library, inventoryMode]);

  return (
    <AppContext.Provider
      value={{
        // APP Context
        isMobile,
        isNarrow,
        isWide,
        isXWide,
        isDesktop,
        lang,
        changeLang,
        isPlaytester,
        isPlaytestAdmin,
        playtestMode,
        togglePlaytestMode,
        searchInventoryMode,
        setSearchInventoryMode,
        searchMissingInventoryMode,
        setSearchMissingInventoryMode,
        inventoryMode,
        toggleInventoryMode,
        limitedMode,
        toggleLimitedMode,
        setLimitedFormat,
        setInventoryMode,
        addMode,
        toggleAddMode,
        showImage,
        toggleShowImage,
        showLegacyImage,
        toggleShowLegacyImage,
        showFloatingButtons,
        setShowFloatingButtons,
        showMenuButtons,
        setShowMenuButtons,
        isOnline,

        // USER Context
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        inventoryKey,
        setInventoryKey,
        initializeUserData,
        initializeUnauthenticatedUser,

        // CARDBASE Context
        cryptCardBase,
        setCryptCardBase,
        libraryCardBase,
        setLibraryCardBase,
        localizedCrypt,
        localizedLibrary,
        nativeCrypt,
        nativeLibrary,

        // DECK Context
        preconDecks,
        recentDecks,
        addRecentDeck,
        lastDeckId,

        // LISTING Context
        showCryptSearch,
        setShowCryptSearch,
        showLibrarySearch,
        setShowLibrarySearch,

        // SORTING Context
        cryptSearchSort,
        changeCryptSearchSort,
        librarySearchSort,
        changeLibrarySearchSort,
        twdSearchSort,
        changeTwdSearchSort,
        pdaSearchSort,
        changePdaSearchSort,
        analyzeSearchSort,
        changeAnalyzeSearchSort,
        cryptDeckSort,
        changeCryptDeckSort,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
