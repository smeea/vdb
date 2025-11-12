import { getMany, set, setMany, update } from "idb-keyval";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useSnapshot } from "valtio";
import limitedV5 from "@/assets/data/limitedV5.json";
import {
  ALLOWED,
  BANNED,
  BRANCHES,
  CAPACITY_MIN_MAX,
  CARDS,
  CRYPT,
  CUSTOM,
  DATE_NEW_OLD,
  DECK,
  DECKID,
  DECKS,
  EN,
  ID,
  IS_AUTHOR,
  IS_BRANCHES,
  IS_FROZEN,
  LEGAL_RESTRICTIONS,
  LIBRARY,
  LIMITED_ALLOWED_CRYPT,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_ONLY_DECKS,
  LIMITED_SETS,
  MASTER,
  NAME,
  NATIVE_CRYPT,
  NATIVE_LIBRARY,
  NO_BANNED,
  PDA,
  PLAYTEST,
  PUBLIC_PARENT,
  QUANTITYx,
  RANK_HIGH_LOW,
  SETS,
  SRC,
  TEXT,
  TWD,
  TWO_P,
  TYPE,
  V5,
} from "@/constants";
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
} from "@/context";
import { useWindowSize } from "@/hooks";
import { cardServices, playtestServices, userServices } from "@/services";
import { getLocalStorage, setLocalStorage } from "@/services/storageServices";
import { getLegality, byTimestamp, deepClone, parseDeck } from "@/utils";

const CRYPT_SEARCH_SORT = "cryptSearchSort";
const CRYPT_DECK_SORT = "cryptDeckSort";
const CRYPT_INVENTORY_SORT = "cryptInventorySort";
const LIBRARY_SEARCH_SORT = "libraryInventorySort";
const LIBRARY_INVENTORY_SORT = "libraryInventorySort";
const DECKS_ADV_SORT = "decksAdvSort";
const TWD_SEARCH_SORT = "twdSearchSort";
const PDA_SEARCH_SORT = "pdaSearchSort";
const TDA_SEARCH_SORT = "tdaSearchSort";
const LANG = "lang";
const ADD_MODE = "addMode";
const INVENTORY_MODE = "inventoryMode";
const LIMITED_MODE = "limitedMode";
const LIMITED_PRESET = "limitedPreset";
const PLAYTEST_MODE = "playtestMode";
const SHOW_IMAGE = "showImage";
const SHOW_LEGACY_IMAGE = "showLegacyImage";
const RECENT_DECKS = "recentDecks";
const ONLINE = "online";
const OFFLINE = "offline";
const CARD_VERSION_KEY = "cardVersion";
const CRYPT_CARDBASE = "cryptCardBase";
const LIBRARY_CARDBASE = "libraryCardBase";
const LOCALIZED_CRYPT = "localizedCrypt";
const LOCALIZED_LIBRARY = "localizedLibrary";
const PRECON_DECKS = "preconDecks";
const IS_PLAYTEST = "isPlaytest";
const IS_PLAYTESTER = "is_playtester";
const IS_ADMIN = "is_admin";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const screenSize = useWindowSize();
  const isMobile = screenSize <= 767;
  const isNarrow = screenSize <= 1024;
  const isDesktop = screenSize >= 1280;
  const isWide = screenSize >= 1440;

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
  const [limitedPreset, setLimitedPreset] = useState(getLocalStorage(LIMITED_PRESET) ?? false);
  const [limitedOnlyDecks, setLimitedOnlyDecks] = useState(
    getLocalStorage(LIMITED_ONLY_DECKS) ?? false,
  );
  const [searchInventoryMode, setSearchInventoryMode] = useState();
  const [searchMissingInventoryMode, setSearchMissingInventoryMode] = useState();
  const [cryptDeckSort, setCryptDeckSort] = useState(getLocalStorage(CRYPT_DECK_SORT) ?? QUANTITYx);
  const [cryptSearchSort, setCryptSearchSort] = useState(
    getLocalStorage(CRYPT_SEARCH_SORT) ?? CAPACITY_MIN_MAX,
  );
  const [decksAdvSort, setDecksAdvSort] = useState(getLocalStorage(DECKS_ADV_SORT) ?? NAME);
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

  const { [DECKS]: decks } = useSnapshot(deckStore);
  const lastDeckArray = (decks && Object.values(decks).toSorted(byTimestamp)) ?? [
    { [DECKID]: undefined },
  ];
  const lastDeckId = lastDeckArray[0]?.[DECKID];
  const [recentDecks, setRecentDecks] = useState(getLocalStorage(RECENT_DECKS) ?? []);

  // CARD BASE
  const CARD_VERSION = import.meta.env.VITE_CARD_VERSION;
  const fetchAndSetCardBase = (isIndexedDB, secret) => {
    cardServices.getCardBase(secret).then((data) => {
      Object.values(data[CRYPT]).forEach((card) => {
        data[CRYPT][card[ID]][LEGAL_RESTRICTIONS] = getLegality(card);
      });
      Object.values(data[LIBRARY]).forEach((card) => {
        data[LIBRARY][card[ID]][LEGAL_RESTRICTIONS] = getLegality(card);
      });

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

  useEffect(() => {
    switch (limitedPreset) {
      case V5:
        setLimitedAllowedCrypt(limitedV5[ALLOWED][CRYPT]);
        setLimitedAllowedLibrary(limitedV5[ALLOWED][LIBRARY]);
        setLimitedSets(limitedV5[SETS]);
        setLimitedBannedCrypt({});
        setLimitedBannedLibrary({});
        break;
      case TWO_P:
        setLimitedAllowedCrypt({});
        setLimitedAllowedLibrary({});
        setLimitedSets({ "2P": true });
        setLimitedBannedCrypt({});
        setLimitedBannedLibrary({});
        break;
      case NO_BANNED: {
        const allCrypt = {};
        const allLibrary = {};
        Object.keys(cryptCardBase ?? {}).forEach((cardid) => {
          if (!cryptCardBase[cardid][BANNED]) allCrypt[cardid] = true;
        });
        Object.keys(libraryCardBase ?? {}).forEach((cardid) => {
          if (!libraryCardBase[cardid][BANNED]) allLibrary[cardid] = true;
        });
        setLimitedAllowedCrypt(allCrypt);
        setLimitedAllowedLibrary(allLibrary);
        setLimitedSets({});
        setLimitedBannedCrypt({});
        setLimitedBannedLibrary({});
        break;
      }
      case CUSTOM:
        getMany([
          LIMITED_ALLOWED_CRYPT,
          LIMITED_ALLOWED_LIBRARY,
          LIMITED_BANNED_CRYPT,
          LIMITED_BANNED_LIBRARY,
          LIMITED_SETS,
        ]).then(([lac, lal, lbc, lbl, ls]) => {
          setLimitedFormat(lac, lal, lbc, lbl, ls);
        });
        break;
      default:
        if (limitedMode) toggleLimitedMode();
    }
  }, [limitedPreset, cryptCardBase, libraryCardBase]);

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
      IS_PLAYTEST,
      CRYPT_CARDBASE,
      LIBRARY_CARDBASE,
      NATIVE_CRYPT,
      NATIVE_LIBRARY,
      LOCALIZED_CRYPT,
      LOCALIZED_LIBRARY,
      PRECON_DECKS,
    ])
      .then(([v, pt, cb, lb, nc, nl, lc, ll, pd, _lac, _lal, _lbc, _lbl, _ls]) => {
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

  const initializeUserData = (data) => {
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
  };

  const initializeUnauthenticatedUser = () => {
    setAddMode(false);
    setInventoryMode(false);
    setLimitedMode(false);
    setLimitedPreset(false);
    setLimitedOnlyDecks(false);
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
    deckStore[DECKS] = {};
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

  const toggleLimitedOnlyDecks = () => {
    setLimitedOnlyDecks(!limitedOnlyDecks);
    setLocalStorage(LIMITED_ONLY_DECKS, !limitedOnlyDecks);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    setLocalStorage(ADD_MODE, !addMode);
  };

  const changeLimitedPreset = (value) => {
    setLimitedPreset(value);
    setLocalStorage(LIMITED_PRESET, value);
  };

  const changeDecksAdvSort = (method) => {
    setDecksAdvSort(method);
    setLocalStorage(DECKS_ADV_SORT, method);
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

  const changeTdaSearchSort = (method) => {
    setTdaSearchSort(method);
    setLocalStorage(TDA_SEARCH_SORT, method);
  };

  const addRecentDeck = (recentDeck) => {
    const src = recentDeck[DECKID].length !== 9 ? TWD : recentDeck[PUBLIC_PARENT] ? PDA : "shared";
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
  };

  const updateRecentDecks = (recentDecks) => {
    setRecentDecks(recentDecks);
    setLocalStorage(RECENT_DECKS, recentDecks);
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
    const parsedDecks = {};
    Object.keys(decksData).forEach((deckid) => {
      const cardsData = parseDeck(cryptCardBase, libraryCardBase, decksData[deckid][CARDS]);
      parsedDecks[deckid] = { ...decksData[deckid], ...cardsData };

      if (decksData[deckid].usedInInventory) {
        Object.keys(decksData[deckid].usedInInventory).forEach((cardid) => {
          const target = cardid > 200000 ? CRYPT : LIBRARY;
          if (parsedDecks[deckid][target][cardid]) {
            parsedDecks[deckid][target][cardid].i = decksData[deckid].usedInInventory[cardid];
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
        limitedPreset,
        changeLimitedPreset,
        limitedOnlyDecks,
        toggleLimitedOnlyDecks,
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
        decksAdvSort,
        changeDecksAdvSort,
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
