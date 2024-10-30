import React, { useState, useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { useSnapshot } from 'valtio';
import { set, setMany, getMany, update } from 'idb-keyval';
import { playtestServices, userServices, cardServices } from '@/services';
import { getLocalStorage, setLocalStorage } from '@/services/storageServices';
import { useDeck, useWindowSize } from '@/hooks';
import { deepClone, byTimestamp } from '@/utils';
import {
  CAPACITY_MIN_MAX,
  QUANTITYx,
  NAME,
  TYPE,
  DATE_NEW_OLD,
  RANK_HIGH_LOW,
  EN,
  TWD,
  PDA,
  CARD_TEXT,
  DECK,
  DECKS,
  CRYPT,
  LIBRARY,
  IS_FROZEN,
  LIMITED_SETS,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_ALLOWED_CRYPT,
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
const CRYPT_INVENTORY_SORT = 'cryptInventorySort';
const LIBRARY_SEARCH_SORT = 'libraryInventorySort';
const LIBRARY_INVENTORY_SORT = 'libraryInventorySort';
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
const CARD_VERSION_KEY = 'cardVersion';
const CRYPT_CARDBASE = 'cryptCardBase';
const LIBRARY_CARDBASE = 'libraryCardBase';
const NATIVE_CRYPT = 'nativeCrypt';
const NATIVE_LIBRARY = 'nativeLibrary';
const LOCALIZED_CRYPT = 'localizedCrypt';
const LOCALIZED_LIBRARY = 'localizedLibrary';
const PRECON_DECKS = 'preconDecks';

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
  const [lang, setLang] = useState(getLocalStorage(LANG) ?? EN);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPlaytestAdmin, setIsPlaytestAdmin] = useState();
  const [isPlaytester, setIsPlaytester] = useState();
  const [hidePlaytestNames, setHidePlaytestNames] = useState(false);
  const [playtestProfile, setPlaytestProfile] = useState();
  const [playtestMode, setPlaytestMode] = useState(getLocalStorage(PLAYTEST_MODE) ?? false);
  const [showImage, setShowImage] = useState(getLocalStorage(SHOW_IMAGE) ?? true);
  const [showLegacyImage, setShowLegacyImage] = useState(
    getLocalStorage(SHOW_LEGACY_IMAGE) ?? false,
  );
  const [addMode, setAddMode] = useState(getLocalStorage(ADD_MODE) ?? isDesktop);
  const [inventoryMode, setInventoryMode] = useState(getLocalStorage(INVENTORY_MODE) ?? false);
  const [limitedMode, setLimitedMode] = useState(getLocalStorage(LIMITED_MODE) ?? false);
  const [searchInventoryMode, setSearchInventoryMode] = useState();
  const [searchMissingInventoryMode, setSearchMissingInventoryMode] = useState();
  const [cryptDeckSort, setCryptDeckSort] = useState(getLocalStorage(CRYPT_DECK_SORT) ?? QUANTITYx);
  const [cryptSearchSort, setCryptSearchSort] = useState(
    getLocalStorage(CRYPT_SEARCH_SORT) ?? CAPACITY_MIN_MAX,
  );
  const [cryptInventorySort, setCryptInventorySort] = useState(
    getLocalStorage(CRYPT_INVENTORY_SORT) ?? NAME,
  );
  const [librarySearchSort, setLibrarySearchSort] = useState(
    getLocalStorage(LIBRARY_SEARCH_SORT) ?? TYPE,
  );
  const [libraryInventorySort, setLibraryInventorySort] = useState(
    getLocalStorage(LIBRARY_INVENTORY_SORT) ?? NAME,
  );
  const [twdSearchSort, setTwdSearchSort] = useState(
    getLocalStorage(TWD_SEARCH_SORT) ?? DATE_NEW_OLD,
  );
  const [pdaSearchSort, setPdaSearchSort] = useState(
    getLocalStorage(PDA_SEARCH_SORT) ?? DATE_NEW_OLD,
  );
  const [analyzeSearchSort, setAnalyzeSearchSort] = useState(
    getLocalStorage(ANALYZE_SEARCH_SORT) ?? RANK_HIGH_LOW,
  );
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState();

  const updatePlaytestProfile = (target, value) => {
    setPlaytestProfile((prevState) => ({
      ...prevState,
      [target]: value,
    }));
    playtestServices.updateProfile(target, value);
  };

  const [cryptCardBase, setCryptCardBase] = useImmer();
  const [libraryCardBase, setLibraryCardBase] = useImmer();
  const [nativeCrypt, setNativeCrypt] = useState();
  const [nativeLibrary, setNativeLibrary] = useState();
  const [localizedCrypt, setLocalizedCrypt] = useState();
  const [localizedLibrary, setLocalizedLibrary] = useState();
  const [preconDecks, setPreconDecks] = useState();

  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const lastDeckArray = (decks && Object.values(decks).toSorted(byTimestamp)) ?? [
    { deckid: undefined },
  ];
  const lastDeckId = lastDeckArray[0]?.deckid;
  const [recentDecks, setRecentDecks] = useState(getLocalStorage(RECENT_DECKS) ?? []);

  // CARD BASE
  const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
  const fetchAndSetCardBase = (isIndexedDB = true) => {
    cardServices.getCardBase().then((data) => {
      if (isIndexedDB) {
        setMany([
          [CARD_VERSION_KEY, CARD_VERSION],
          [CRYPT_CARDBASE, data[CRYPT]],
          [LIBRARY_CARDBASE, data[LIBRARY]],
          [NATIVE_CRYPT, data[NATIVE_CRYPT]],
          [NATIVE_LIBRARY, data[NATIVE_LIBRARY]],
          [LOCALIZED_CRYPT, { [EN]: data[NATIVE_CRYPT] }],
          [LOCALIZED_LIBRARY, { [EN]: data[NATIVE_LIBRARY] }],
        ]);
      }

      setCryptCardBase(data[CRYPT]);
      setLibraryCardBase(data[LIBRARY]);
      setNativeCrypt(data[NATIVE_CRYPT]);
      setNativeLibrary(data[NATIVE_LIBRARY]);
      setLocalizedCrypt({ [EN]: data[NATIVE_CRYPT] });
      setLocalizedLibrary({ [EN]: data[NATIVE_LIBRARY] });

      cardServices.getPreconDecks(data.crypt, data.library).then((preconData) => {
        if (isIndexedDB) set(PRECON_DECKS, deepClone(preconData));
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
      CARD_VERSION_KEY,
      CRYPT_CARDBASE,
      LIBRARY_CARDBASE,
      NATIVE_CRYPT,
      NATIVE_LIBRARY,
      LOCALIZED_CRYPT,
      LOCALIZED_LIBRARY,
      PRECON_DECKS,
      LIMITED_ALLOWED_CRYPT,
      LIMITED_ALLOWED_LIBRARY,
      LIMITED_BANNED_CRYPT,
      LIMITED_BANNED_LIBRARY,
      LIMITED_SETS,
    ])
      .then(([v, cb, lb, nc, nl, lc, ll, pd, lac, lal, lbc, lbl, ls]) => {
        if (!v || CARD_VERSION > v) {
          fetchAndSetCardBase();
        } else {
          limitedFullStore[CRYPT] = cb;
          limitedFullStore[LIBRARY] = lb;
          setCryptCardBase(cb);
          setLibraryCardBase(lb);
          setNativeCrypt(nc);
          setNativeLibrary(nl);
          setLocalizedCrypt(lc);
          setLocalizedLibrary(ll);
          setPreconDecks(pd);
        }
        setLimitedFormat(lac, lal, lbc, lbl, ls);
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
    setIsPlaytester(data.playtest.is_playtester);
    setIsPlaytestAdmin(data.playtest.is_admin);
    setPlaytestProfile(data.playtest.profile);
    if (!data.playtest.is_playtester && !data.playtest.is_admin) setPlaytestMode(false);
    const { isFrozen, crypt, library } = parseInventoryData(data.inventory);
    inventoryStore[IS_FROZEN] = isFrozen;
    inventoryStore[CRYPT] = crypt;
    inventoryStore[LIBRARY] = library;
    deckStore[DECKS] = parseDecksData(data.decks);
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
    inventoryStore[CRYPT] = {};
    inventoryStore[LIBRARY] = {};
    if (decks?.[deck?.deckid]) {
      deckStore[DECK] = undefined;
    }
    deckStore[DECKS] = undefined;
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
    setLocalStorage(LANG, lang);
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
      update(LOCALIZED_CRYPT, (val) => ({
        ...val,
        [lang]: data.crypt,
      }));
      update(LOCALIZED_LIBRARY, (val) => ({
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
    setLocalStorage(SHOW_IMAGE, !showImage);
  };

  const toggleShowLegacyImage = () => {
    setShowLegacyImage(!showLegacyImage);
    setLocalStorage(SHOW_LEGACY_IMAGE, !showLegacyImage);
  };

  const toggleInventoryMode = () => {
    setInventoryMode(!inventoryMode);
    setLocalStorage(INVENTORY_MODE, !inventoryMode);
  };

  const toggleLimitedMode = () => {
    setLimitedMode(!limitedMode);
    setLocalStorage(LIMITED_MODE, !limitedMode);
  };

  const togglePlaytestMode = () => {
    setPlaytestMode(!playtestMode);
    setLocalStorage(PLAYTEST_MODE, !playtestMode);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    setLocalStorage(ADD_MODE, !addMode);
  };

  const changeCryptDeckSort = (method) => {
    setCryptDeckSort(method);
    setLocalStorage(CRYPT_DECK_SORT, method);
  };

  const changeCryptSearchSort = (method) => {
    setCryptSearchSort(method);
    setLocalStorage(CRYPT_SEARCH_SORT, method);
  };

  const changeCryptInventorySort = (method) => {
    setCryptInventorySort(method);
    setLocalStorage(CRYPT_INVENTORY_SORT, method);
  };

  const changeLibrarySearchSort = (method) => {
    setLibrarySearchSort(method);
    setLocalStorage(LIBRARY_SEARCH_SORT, method);
  };

  const changeLibraryInventorySort = (method) => {
    setLibraryInventorySort(method);
    setLocalStorage(LIBRARY_INVENTORY_SORT, method);
  };

  const changeTwdSearchSort = (method) => {
    setTwdSearchSort(method);
    setLocalStorage(TWD_SEARCH_SORT, method);
  };

  const changePdaSearchSort = (method) => {
    setPdaSearchSort(method);
    setLocalStorage(PDA_SEARCH_SORT, method);
  };

  const changeAnalyzeSearchSort = (method) => {
    setAnalyzeSearchSort(method);
    setLocalStorage(ANALYZE_SEARCH_SORT, method);
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
    setLocalStorage(RECENT_DECKS, d);
  };

  const updateRecentDecks = (decks) => {
    setRecentDecks(decks);
    setLocalStorage(RECENT_DECKS, decks);
  };

  useEffect(() => {
    window.addEventListener(OFFLINE, () => setIsOnline(false));
    window.addEventListener(ONLINE, () => setIsOnline(true));

    return () => {
      window.removeEventListener(OFFLINE, () => setIsOnline(false));
      window.removeEventListener(ONLINE, () => setIsOnline(true));
    };
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
        hidePlaytestNames,
        setHidePlaytestNames,
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
        isPlaytester,
        isPlaytestAdmin,
        playtestProfile,
        updatePlaytestProfile,

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
        cryptInventorySort,
        changeCryptInventorySort,
        libraryInventorySort,
        changeLibraryInventorySort,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
