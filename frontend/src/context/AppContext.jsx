import { getMany, set, setMany, update } from "idb-keyval";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useSnapshot } from "valtio";
import limitedV5 from "@/assets/data/limitedV5.json";
import {
  ADD_MODE,
  ALLOWED,
  BANNED,
  BRANCHES,
  CARDS,
  CARD_VERSION_KEY,
  CRYPT,
  CRYPT_CARDBASE,
  CRYPT_DECK_SORT,
  CRYPT_INVENTORY_SORT,
  CRYPT_SEARCH_SORT,
  CUSTOM,
  DECK,
  DECKID,
  DECKS,
  DECKS_ADV_SORT,
  EN,
  ID,
  INVENTORY_KEY,
  INVENTORY_MODE,
  IS_ADMIN,
  IS_AUTHOR,
  IS_BRANCHES,
  IS_FROZEN,
  IS_PLAYTEST,
  IS_PLAYTESTER,
  LANG,
  LEGAL_RESTRICTIONS,
  LIBRARY,
  LIBRARY_CARDBASE,
  LIBRARY_INVENTORY_SORT,
  LIBRARY_SEARCH_SORT,
  LIMITED_ALLOWED_CRYPT,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_MODE,
  LIMITED_ONLY_DECKS,
  LIMITED_PRESET,
  LIMITED_SETS,
  LOCALIZED_CRYPT,
  LOCALIZED_LIBRARY,
  MASTER,
  NAME,
  NATIVE_CRYPT,
  NATIVE_LIBRARY,
  NO_BANNED,
  OFFLINE,
  ONLINE,
  PDA,
  PDA_SEARCH_SORT,
  PLAYTEST,
  PLAYTEST_MODE,
  PRECON_DECKS,
  PUBLIC_PARENT,
  RECENT_DECKS,
  SETS,
  SHARED_KEY,
  SHOW_IMAGE,
  SHOW_LEGACY_IMAGE,
  SRC,
  SURPLUS_KEY,
  TDA_SEARCH_SORT,
  TEXT,
  TWD,
  TWD_SEARCH_SORT,
  TWO_P,
  V5,
  WISHLIST,
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
  settings,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { cardServices, playtestServices, userServices } from "@/services";
import { byTimestamp, deepClone, getLegality, parseDeck } from "@/utils";

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
  const [surplusKey, setSurplusKey] = useState();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPlaytestAdmin, setIsPlaytestAdmin] = useState();
  const [isPlaytester, setIsPlaytester] = useState();
  const [hidePlaytestNames, setHidePlaytestNames] = useState(false);
  const [showPlaytestImages, setShowPlaytestImages] = useState(true);
  const [playtestProfile, setPlaytestProfile] = useState();

  const {
    [SHOW_IMAGE]: showImage,
    [PLAYTEST_MODE]: playtestMode,
    [ADD_MODE]: addMode,
    [SHOW_LEGACY_IMAGE]: showLegacyImage,
    [INVENTORY_MODE]: inventoryMode,
    [LIMITED_MODE]: limitedMode,
    [LIMITED_PRESET]: limitedPreset,
    [LIMITED_ONLY_DECKS]: limitedOnlyDecks,
    [SHARED_KEY]: sharedKey,
    [CRYPT_SEARCH_SORT]: cryptSearchSort,
    [CRYPT_DECK_SORT]: cryptDeckSort,
    [LIBRARY_SEARCH_SORT]: librarySearchSort,
    [CRYPT_INVENTORY_SORT]: cryptInventorySort,
    [LIBRARY_INVENTORY_SORT]: libraryInventorySort,
    [TWD_SEARCH_SORT]: twdSearchSort,
    [PDA_SEARCH_SORT]: pdaSearchSort,
    [TDA_SEARCH_SORT]: tdaSearchSort,
    [DECKS_ADV_SORT]: decksAdvSort,
    [LANG]: lang,
    [RECENT_DECKS]: recentDecks,
  } = useSnapshot(settings);

  const toggleShowImage = () => (settings[SHOW_IMAGE] = !showImage);
  const togglePlaytestMode = () => (settings[PLAYTEST_MODE] = !playtestMode);
  const toggleAddMode = () => (settings[ADD_MODE] = !addMode);
  const toggleShowLegacyImage = () => (settings[SHOW_LEGACY_IMAGE] = !showLegacyImage);
  const toggleInventoryMode = () => (settings[INVENTORY_MODE] = !inventoryMode);
  const toggleLimitedMode = () => settings[LIMITED_MODE] = !limitedMode;
  const toggleLimitedOnlyDecks = () => settings[LIMITED_ONLY_DECKS] = !limitedOnlyDecks;

  const setCryptSearchSort = (value) => (settings[CRYPT_SEARCH_SORT] = value);
  const setCryptDeckSort = (value) => (settings[CRYPT_DECK_SORT] = value);
  const setLibrarySearchSort = (value) => (settings[LIBRARY_SEARCH_SORT] = value);
  const setCryptInventorySort = (value) => (settings[CRYPT_INVENTORY_SORT] = value);
  const setLibraryInventorySort = (value) => (settings[LIBRARY_INVENTORY_SORT] = value);
  const setTwdSearchSort = (value) => (settings[TWD_SEARCH_SORT] = value);
  const setPdaSearchSort = (value) => (settings[PDA_SEARCH_SORT] = value);
  const setTdaSearchSort = (value) => (settings[TDA_SEARCH_SORT] = value);
  const setDecksAdvSort = (value) => (settings[DECKS_ADV_SORT] = value);
  const setAddMode = (value) => (settings[ADD_MODE] = value);
  const setInventoryMode = (value) => (settings[INVENTORY_MODE] = value);
  const setLimitedMode = (value) => (settings[LIMITED_MODE] = value);
  const setLimitedPreset = (value) => settings[LIMITED_PRESET] = value
  const setLimitedOnlyDecks = (value) => (settings[LIMITED_ONLY_DECKS] = value);
  const setPlaytestMode = (value) => (settings[PLAYTEST_MODE] = value);
  const setSharedKey = (value) => (settings[SHARED_KEY] = value);
  const setLang = (value) => (settings[LANG] = value);
  const setRecentDecks = (value) => (settings[RECENT_DECKS] = value);

  const [searchSharedMode, setSearchSharedMode] = useState();
  const [searchInventoryMode, setSearchInventoryMode] = useState();
  const [searchMissingInventoryMode, setSearchMissingInventoryMode] = useState();
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
        const allowedCrypt = {};
        const allowedLibrary = {};
        const bannedCrypt = {};
        const bannedLibrary = {};
        Object.keys(cryptCardBase ?? {}).forEach((cardid) => {
          const target = cryptCardBase[cardid][BANNED] ? bannedCrypt : allowedCrypt;
          target[cardid] = true;
        });
        Object.keys(libraryCardBase ?? {}).forEach((cardid) => {
          const target = libraryCardBase[cardid][BANNED] ? bannedLibrary : allowedLibrary;
          target[cardid] = true;
        });
        setLimitedAllowedCrypt(allowedCrypt);
        setLimitedAllowedLibrary(allowedLibrary);
        setLimitedSets({});
        setLimitedBannedCrypt(bannedCrypt);
        setLimitedBannedLibrary(bannedLibrary);
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
      setInventoryKey(data[INVENTORY_KEY]);
      setSurplusKey(data[SURPLUS_KEY]);
      if ([data[INVENTORY_KEY], data[SURPLUS_KEY]].includes(sharedKey)) {
        setSharedKey(null)
      }
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
      inventoryStore[WISHLIST] = data.inventory_wishlist;
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
    inventoryStore[WISHLIST] = {};
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
        setRecentDecks(d);
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
        setLang,
        playtestMode,
        togglePlaytestMode,
        searchSharedMode,
        setSearchSharedMode,
        searchInventoryMode,
        setSearchInventoryMode,
        searchMissingInventoryMode,
        setSearchMissingInventoryMode,
        inventoryMode,
        toggleInventoryMode,
        limitedMode,
        toggleLimitedMode,
        limitedPreset,
        setLimitedPreset,
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
        showPlaytestImages,
        setShowPlaytestImages,
        showFloatingButtons,
        setShowFloatingButtons,
        showMenuButtons,
        setShowMenuButtons,
        isOnline,
        sharedKey,
        setSharedKey,

        // USER Context
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        inventoryKey,
        setInventoryKey,
        surplusKey,
        setSurplusKey,
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
        setCryptSearchSort,
        librarySearchSort,
        setLibrarySearchSort,
        twdSearchSort,
        setTwdSearchSort,
        pdaSearchSort,
        setPdaSearchSort,
        tdaSearchSort,
        setTdaSearchSort,
        decksAdvSort,
        setDecksAdvSort,
        cryptDeckSort,
        setCryptDeckSort,
        cryptInventorySort,
        setCryptInventorySort,
        libraryInventorySort,
        setLibraryInventorySort,
      }}
    >
      {children}
    </AppContext>
  );
};
