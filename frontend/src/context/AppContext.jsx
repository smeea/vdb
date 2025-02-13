import { getMany, set, setMany, update } from 'idb-keyval';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useSnapshot } from 'valtio';
import {
  BRANCHES,
  CAPACITY_MIN_MAX,
  CARDS,
  CRYPT,
  DATE_NEW_OLD,
  DECK,
  DECKID,
  DECKS,
  EN,
  IS_AUTHOR,
  IS_BRANCHES,
  IS_FROZEN,
  LIBRARY,
  LIMITED_ALLOWED_CRYPT,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_SETS,
  MASTER,
  NAME,
  NATIVE_CRYPT,
  NATIVE_LIBRARY,
  PDA,
  PLAYTEST,
  PUBLIC_PARENT,
  QUANTITYx,
  RANK_HIGH_LOW,
  SRC,
  TEXT,
  TWD,
  TYPE,
} from '@/constants';
import {
  deckLocalize,
  deckStore,
  inventoryStore,
  limitedFullStore,
  setLimitedAllowedCrypt,
  setLimitedAllowedLibrary,
  setLimitedBannedCrypt,
  setLimitedBannedLibrary,
  setLimitedSets,
  setupUsedInventory,
} from '@/context';
import { useWindowSize } from '@/hooks';
import { cardServices, playtestServices, userServices } from '@/services';
import { getLocalStorage, setLocalStorage } from '@/services/storageServices';
import { byTimestamp, deepClone, parseDeck } from '@/utils';

const CRYPT_SEARCH_SORT = 'cryptSearchSort';
const CRYPT_DECK_SORT = 'cryptDeckSort';
const CRYPT_INVENTORY_SORT = 'cryptInventorySort';
const LIBRARY_SEARCH_SORT = 'libraryInventorySort';
const LIBRARY_INVENTORY_SORT = 'libraryInventorySort';
const TWD_SEARCH_SORT = 'twdSearchSort';
const PDA_SEARCH_SORT = 'pdaSearchSort';
const TDA_SEARCH_SORT = 'tdaSearchSort';
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
const LOCALIZED_CRYPT = 'localizedCrypt';
const LOCALIZED_LIBRARY = 'localizedLibrary';
const PRECON_DECKS = 'preconDecks';
const IS_PLAYTEST = 'isPlaytest';
const IS_PLAYTESTER = 'is_playtester';
const IS_ADMIN = 'is_admin';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const screenSize = useWindowSize();
  const isMobile = useMemo(() => screenSize <= 767, [screenSize]);
  const isNarrow = useMemo(() => screenSize <= 1024, [screenSize]);
  const isDesktop = useMemo(() => screenSize >= 1280, [screenSize]);
  const isWide = useMemo(() => screenSize >= 1440, [screenSize]);

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
  const [tdaSearchSort, setTdaSearchSort] = useState(
    getLocalStorage(TDA_SEARCH_SORT) ?? RANK_HIGH_LOW,
  );
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState();

  const updatePlaytestProfile = useCallback((target, value) => {
    setPlaytestProfile((prevState) => ({
      ...prevState,
      [target]: value,
    }));
    playtestServices.updateProfile(target, value);
  }, []);

  const [cryptCardBase, setCryptCardBase] = useImmer();
  const [libraryCardBase, setLibraryCardBase] = useImmer();
  const [nativeCrypt, setNativeCrypt] = useState();
  const [nativeLibrary, setNativeLibrary] = useState();
  const [localizedCrypt, setLocalizedCrypt] = useState();
  const [localizedLibrary, setLocalizedLibrary] = useState();
  const [preconDecks, setPreconDecks] = useState();

  const { [DECKS]: decks } = useSnapshot(deckStore);
  const lastDeckArray = (decks && Object.values(decks).toSorted(byTimestamp)) ?? [
    { [DECKID]: undefined },
  ];
  const lastDeckId = lastDeckArray[0]?.[DECKID];
  const [recentDecks, setRecentDecks] = useState(getLocalStorage(RECENT_DECKS) ?? []);

  // CARD BASE
  const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
  const fetchAndSetCardBase = (isIndexedDB = true, secret) => {
    cardServices.getCardBase(secret).then((data) => {
      if (isIndexedDB) {
        setMany([
          [CARD_VERSION_KEY, CARD_VERSION],
          [IS_PLAYTEST, !!secret],
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

      cardServices.getPreconDecks(data[CRYPT], data[LIBRARY], secret).then((preconData) => {
        if (isIndexedDB) set(PRECON_DECKS, deepClone(preconData));
        setPreconDecks(preconData);
      });
    });
  };

  const setLimitedFormat = useCallback((lac, lal, lbc, lbl, ls) => {
    if (lac) setLimitedAllowedCrypt(lac);
    if (lal) setLimitedAllowedLibrary(lal);
    if (lbc) setLimitedBannedCrypt(lbc);
    if (lbl) setLimitedBannedLibrary(lbl);
    if (ls) setLimitedSets(ls);
  }, []);

  useEffect(() => {
    getMany([
      CARD_VERSION_KEY,
      IS_PLAYTEST,
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
      .then(([v, pt, cb, lb, nc, nl, lc, ll, pd, lac, lal, lbc, lbl, ls]) => {
        if (!v || CARD_VERSION > v || (userData?.[PLAYTEST][IS_PLAYTESTER] && !pt)) {
          fetchAndSetCardBase(true, userData?.[PLAYTEST]?.secret);
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
        fetchAndSetCardBase(false, userData?.[PLAYTEST]?.secret);
      });
  }, [userData]);

  useEffect(() => {
    userServices.whoAmI().then((data) => {
      if (data.success === false) {
        setUserData(null);
      } else {
        setUserData(data);
      }
    });
  }, []);

  const parseInventoryData = (inventoryData) => {
    Object.keys(inventoryData[CRYPT]).forEach((i) => {
      if (cryptCardBase[i]) {
        inventoryData[CRYPT][i].c = cryptCardBase[i];
      } else {
        delete inventoryData[CRYPT][i];
      }
    });
    Object.keys(inventoryData[LIBRARY]).forEach((i) => {
      if (libraryCardBase[i]) {
        inventoryData[LIBRARY][i].c = libraryCardBase[i];
      } else {
        delete inventoryData[LIBRARY][i];
      }
    });

    return inventoryData;
  };

  const initializeUserData = useCallback(
    (data) => {
      if (cryptCardBase && libraryCardBase) {
        setUsername(data.username);
        setPublicName(data.public_name);
        setEmail(data.email);
        setInventoryKey(data.inventory_key);
        setIsPlaytester(data[PLAYTEST][IS_PLAYTESTER]);
        setIsPlaytestAdmin(data[PLAYTEST][IS_ADMIN]);
        setPlaytestProfile(data[PLAYTEST].profile);
        if (!data[PLAYTEST][IS_PLAYTESTER] && !data[PLAYTEST][IS_ADMIN]) setPlaytestMode(false);
        const {
          [IS_FROZEN]: isFrozen,
          [CRYPT]: crypt,
          [LIBRARY]: library,
        } = parseInventoryData(data.inventory);
        inventoryStore[IS_FROZEN] = isFrozen;
        inventoryStore[CRYPT] = crypt;
        inventoryStore[LIBRARY] = library;
        deckStore[DECKS] = parseDecksData(data[DECKS]);
      }
    },
    [deckStore, inventoryStore, cryptCardBase, libraryCardBase],
  );

  const initializeUnauthenticatedUser = useCallback(() => {
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
    if (deckStore[DECKS]?.[deckStore[DECK]?.[DECKID]]) {
      deckStore[DECK] = undefined;
    }
    deckStore[DECKS] = undefined;
  }, [deckStore, inventoryStore]);

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
  const changeLang = useCallback((lang) => {
    setLang(lang);
    setLocalStorage(LANG, lang);
  }, []);

  const changeBaseTextToLocalizedText = (setCardBase, localizedInfo, nativeInfo) => {
    setCardBase((draft) => {
      Object.keys(draft).forEach((k) => {
        const newInfo = localizedInfo[k] ?? nativeInfo[k];
        draft[k][NAME] = newInfo[NAME];
        draft[k][TEXT] = newInfo[TEXT];
      });
    });
  };

  const initializeLocalizedInfo = async (lang) => {
    cardServices.getLocalizedCardBase(lang).then((data) => {
      update(LOCALIZED_CRYPT, (val) => ({
        ...val,
        [lang]: data[CRYPT],
      }));
      update(LOCALIZED_LIBRARY, (val) => ({
        ...val,
        [lang]: data[LIBRARY],
      }));
      setLocalizedCrypt((prevState) => ({
        ...prevState,
        [lang]: data[CRYPT],
      }));
      setLocalizedLibrary((prevState) => ({
        ...prevState,
        [lang]: data[LIBRARY],
      }));
      changeBaseTextToLocalizedText(setCryptCardBase, data[CRYPT], nativeCrypt);
      changeBaseTextToLocalizedText(setLibraryCardBase, data[LIBRARY], nativeLibrary);
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
      deckStore[DECK] &&
      localizedCrypt?.[lang] &&
      localizedLibrary?.[lang] &&
      Object.keys(localizedCrypt).length > 1
    ) {
      deckLocalize(localizedCrypt[lang], nativeCrypt, localizedLibrary[lang], nativeLibrary);
    }
  }, [deckStore[DECK]?.[DECKID], lang, localizedCrypt, localizedLibrary]);

  // APP DATA
  const toggleShowImage = useCallback(() => {
    setShowImage(!showImage);
    setLocalStorage(SHOW_IMAGE, !showImage);
  }, [showImage]);

  const toggleShowLegacyImage = useCallback(() => {
    setShowLegacyImage(!showLegacyImage);
    setLocalStorage(SHOW_LEGACY_IMAGE, !showLegacyImage);
  }, [showLegacyImage]);

  const toggleInventoryMode = useCallback(() => {
    setInventoryMode(!inventoryMode);
    setLocalStorage(INVENTORY_MODE, !inventoryMode);
  }, [inventoryMode]);

  const toggleLimitedMode = useCallback(() => {
    setLimitedMode(!limitedMode);
    setLocalStorage(LIMITED_MODE, !limitedMode);
  }, [limitedMode]);

  const togglePlaytestMode = useCallback(() => {
    setPlaytestMode(!playtestMode);
    setLocalStorage(PLAYTEST_MODE, !playtestMode);
  }, [playtestMode]);

  const toggleAddMode = useCallback(() => {
    setAddMode(!addMode);
    setLocalStorage(ADD_MODE, !addMode);
  }, [addMode]);

  const changeCryptDeckSort = useCallback((method) => {
    setCryptDeckSort(method);
    setLocalStorage(CRYPT_DECK_SORT, method);
  }, []);

  const changeCryptSearchSort = useCallback((method) => {
    setCryptSearchSort(method);
    setLocalStorage(CRYPT_SEARCH_SORT, method);
  }, []);

  const changeCryptInventorySort = useCallback((method) => {
    setCryptInventorySort(method);
    setLocalStorage(CRYPT_INVENTORY_SORT, method);
  }, []);

  const changeLibrarySearchSort = useCallback((method) => {
    setLibrarySearchSort(method);
    setLocalStorage(LIBRARY_SEARCH_SORT, method);
  }, []);

  const changeLibraryInventorySort = useCallback((method) => {
    setLibraryInventorySort(method);
    setLocalStorage(LIBRARY_INVENTORY_SORT, method);
  }, []);

  const changeTwdSearchSort = useCallback((method) => {
    setTwdSearchSort(method);
    setLocalStorage(TWD_SEARCH_SORT, method);
  }, []);

  const changePdaSearchSort = useCallback((method) => {
    setPdaSearchSort(method);
    setLocalStorage(PDA_SEARCH_SORT, method);
  }, []);

  const changeTdaSearchSort = useCallback((method) => {
    setTdaSearchSort(method);
    setLocalStorage(TDA_SEARCH_SORT, method);
  }, []);

  const addRecentDeck = useCallback((recentDeck) => {
    const src = recentDeck[DECKID].length != 9 ? TWD : recentDeck[PUBLIC_PARENT] ? PDA : 'shared';
    let d = [...recentDecks];
    const idx = recentDecks.map((v) => v[DECKID]).indexOf(recentDeck[DECKID]);
    if (idx !== -1) d.splice(idx, 1);
    d.unshift({
      [DECKID]: recentDeck[DECKID],
      [NAME]: recentDeck[NAME],
      [SRC]: src,
    });
    if (d.length > 10) d = d.slice(0, 10);
    setRecentDecks(d);
    setLocalStorage(RECENT_DECKS, d);
  }, []);

  const updateRecentDecks = useCallback((recentDecks) => {
    setRecentDecks(recentDecks);
    setLocalStorage(RECENT_DECKS, recentDecks);
  }, []);

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
    const parsedDecks = {};
    Object.keys(decksData).forEach((deckid) => {
      const cardsData = parseDeck(decksData[deckid][CARDS], cryptCardBase, libraryCardBase);

      parsedDecks[deckid] = { ...decksData[deckid], ...cardsData };
      if (decksData[deckid].usedInInventory) {
        Object.keys(decksData[deckid].usedInInventory).forEach((cardid) => {
          if (cardid > 200000) {
            if (decksData[deckid][CRYPT][cardid]) {
              parsedDecks[deckid][CRYPT][cardid].i = decksData[deckid].usedInInventory[cardid];
            }
          } else {
            if (decksData[deckid][LIBRARY][cardid]) {
              parsedDecks[deckid][LIBRARY][cardid].i = decksData[deckid].usedInInventory[cardid];
            }
          }
        });
      }
      parsedDecks[deckid][IS_AUTHOR] = true;
      parsedDecks[deckid][MASTER] = decksData[deckid][MASTER] || null;
      parsedDecks[deckid][IS_BRANCHES] = !!(
        decksData[deckid][MASTER] || decksData[deckid][BRANCHES]?.length > 0
      );
      delete parsedDecks[deckid][CARDS];
    });

    return parsedDecks;
  };

  useEffect(() => {
    if (decks || username === null) {
      const d = recentDecks.filter((v) => username === null || !decks[v[DECKID]]);
      if (d.length < recentDecks.length) {
        updateRecentDecks(d);
      }
    }
  }, [decks, recentDecks]);

  useEffect(() => {
    if (decks && inventoryMode) setupUsedInventory(decks);
  }, [
    decks,
    deckStore[DECKS]?.[deckStore[DECK]?.[DECKID]]?.[CRYPT],
    deckStore[DECKS]?.[deckStore[DECK]?.[DECKID]]?.[LIBRARY],
    inventoryMode,
  ]);

  return (
    <AppContext
      value={{
        // APP Context
        isMobile,
        isNarrow,
        isDesktop,
        isWide,
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

        // SORTING Context
        cryptSearchSort,
        changeCryptSearchSort,
        librarySearchSort,
        changeLibrarySearchSort,
        twdSearchSort,
        changeTwdSearchSort,
        pdaSearchSort,
        changePdaSearchSort,
        tdaSearchSort,
        changeTdaSearchSort,
        cryptDeckSort,
        changeCryptDeckSort,
        cryptInventorySort,
        changeCryptInventorySort,
        libraryInventorySort,
        changeLibraryInventorySort,
      }}
    >
      {children}
    </AppContext>
  );
};
