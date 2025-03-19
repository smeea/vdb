import { useCallback, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { DeckDrawModal } from '@/components';
import { CRYPT, LIBRARY } from '@/constants';
import { useApp } from '@/context';
import { getCardsArray } from '@/utils';

const HAND = 'hand';
const REST = 'rest';
const DRAWED = 'drawed';
const BURNED = 'burned';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomTransfers = () => {
  const t = [1, 2, 3, 4, 4];
  return t[getRandomInt(5)];
};

const DeckDraw = ({ deck, setShow }) => {
  const { setShowFloatingButtons } = useApp();
  const cryptList = getCardsArray(deck[CRYPT]);
  const libraryList = getCardsArray(deck[LIBRARY]);
  const [initialTransfers, setInitialTransfers] = useState(getRandomTransfers());

  const [cryptDraw, setCryptDraw] = useImmer({
    [HAND]: 4,
    [DRAWED]: [],
    [BURNED]: [],
    [REST]: [...Array(cryptList.length).keys()],
  });
  const restCrypt = cryptDraw[REST].map((i) => cryptList[i]);
  const drawedCrypt = cryptDraw[DRAWED].map((i) => cryptList[i]);
  const burnedCrypt = cryptDraw[BURNED].map((i) => cryptList[i]);

  const [libraryDraw, setLibraryDraw] = useImmer({
    [HAND]: 7,
    [DRAWED]: [],
    [BURNED]: [],
    [REST]: [...Array(libraryList.length).keys()],
  });
  const restLibrary = libraryDraw[REST].map((i) => libraryList[i]);
  const drawedLibrary = libraryDraw[DRAWED].map((i) => libraryList[i]);
  const burnedLibrary = libraryDraw[BURNED].map((i) => libraryList[i]);

  const drawCards = (cards, quantity) => {
    const restArray = [...cards];
    const drawArray = [];
    for (let i = 0; i < quantity; i++) {
      const randomId = getRandomInt(restArray.length);
      drawArray.push(restArray[randomId]);
      restArray.splice(randomId, 1);
    }
    return [drawArray, restArray];
  };

  const handleClose = useCallback(() => {
    setShow(false);
    setShowFloatingButtons(true);
  }, []);

  const handleReDrawCrypt = useCallback(() => {
    setInitialTransfers(getRandomTransfers());
    setCryptDraw((draft) => {
      const [drawed, rest] = drawCards([...Array(cryptList.length).keys()], 4);
      draft[HAND] = 4;
      draft[DRAWED] = drawed;
      draft[REST] = rest;
      draft[BURNED] = [];
    });
  }, [deck[CRYPT]]);

  const handleReDrawLibrary = useCallback(() => {
    setLibraryDraw((draft) => {
      const [drawed, rest] = drawCards([...Array(libraryList.length).keys()], 7);
      draft[HAND] = 7;
      draft[DRAWED] = drawed;
      draft[REST] = rest;
      draft[BURNED] = [];
    });
  }, [deck[LIBRARY]]);

  const handleCryptHandSize = useCallback(
    (q) => {
      setCryptDraw((draft) => {
        draft[HAND] += q;
      });
    },
    [cryptDraw[HAND]],
  );

  const handleLibraryHandSize = useCallback(
    (q) => {
      setLibraryDraw((draft) => {
        draft[HAND] += q;
      });
    },
    [libraryDraw[HAND]],
  );

  const handleBurnCrypt = useCallback(
    (idx) => {
      setCryptDraw((draft) => {
        const card = draft[DRAWED].splice(idx, 1)[0];
        draft[BURNED].unshift(card);
        if (draft[HAND] > 0) {
          draft[HAND] -= 1;
        }
      });
    },
    [cryptDraw],
  );

  const handleBurnLibrary = useCallback(
    (idx) => {
      setLibraryDraw((draft) => {
        const card = draft[DRAWED].splice(idx, 1)[0];
        draft[BURNED].unshift(card);
        if (draft[REST].length > 0) {
          const [newDrawedCards, newRestCards] = drawCards(draft[REST], 1);
          draft[DRAWED].push(...newDrawedCards);
          draft[REST] = newRestCards;
        } else if (draft[HAND] > 0) {
          draft[HAND] -= 1;
        }
      });
    },
    [libraryDraw],
  );

  useEffect(() => {
    if (cryptDraw[DRAWED].length < cryptDraw[HAND]) {
      if (cryptDraw[HAND] - drawedCrypt.length <= restCrypt.length) {
        const diff = cryptDraw[HAND] - cryptDraw[DRAWED].length;
        const [draw, rest] = drawCards(cryptDraw[REST], diff);
        setCryptDraw((draft) => {
          draft[DRAWED].push(...draw);
          draft[REST] = rest;
        });
      }
    } else if (cryptDraw[DRAWED].length > cryptDraw[HAND]) {
      setCryptDraw((draft) => {
        const diff = draft[DRAWED].length - draft[HAND];
        const overhead = draft[DRAWED].slice(-diff);
        draft[DRAWED] = [...draft[DRAWED].slice(0, draft[DRAWED].length - diff)];
        draft[REST].push(...overhead);
      });
    }
  }, [cryptDraw[DRAWED], cryptDraw[HAND]]);

  useEffect(() => {
    if (libraryDraw[DRAWED].length < libraryDraw[HAND]) {
      if (libraryDraw[HAND] - drawedLibrary.length <= restLibrary.length) {
        const diff = libraryDraw[HAND] - libraryDraw[DRAWED].length;
        const [draw, rest] = drawCards(libraryDraw[REST], diff);
        setLibraryDraw((draft) => {
          draft[DRAWED].push(...draw);
          draft[REST] = rest;
        });
      }
    } else if (libraryDraw[DRAWED].length > libraryDraw[HAND]) {
      setLibraryDraw((draft) => {
        const diff = draft[DRAWED].length - draft[HAND];
        const overhead = draft[DRAWED].slice(-diff);
        draft[DRAWED] = [...draft[DRAWED].slice(0, draft[DRAWED].length - diff)];
        draft[REST].push(...overhead);
      });
    }
  }, [libraryDraw[DRAWED], libraryDraw[HAND]]);

  return (
    <DeckDrawModal
      burnedCrypt={burnedCrypt}
      burnedLibrary={burnedLibrary}
      drawedCrypt={drawedCrypt}
      drawedLibrary={drawedLibrary}
      handleClose={handleClose}
      handleBurnCrypt={handleBurnCrypt}
      handleBurnLibrary={handleBurnLibrary}
      handleCryptHandSize={handleCryptHandSize}
      handleLibraryHandSize={handleLibraryHandSize}
      handleReDrawCrypt={handleReDrawCrypt}
      handleReDrawLibrary={handleReDrawLibrary}
      initialTransfers={initialTransfers}
      restCrypt={restCrypt}
      restLibrary={restLibrary}
    />
  );
};

export default DeckDraw;
