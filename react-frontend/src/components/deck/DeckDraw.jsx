import React, { useState, useEffect } from 'react';
import { DeckDrawModal } from 'components';
import { POOL_COST, BLOOD_COST } from 'utils/constants';
import { countCards, getCardsArray } from 'utils';
import { useKeyDisciplines } from 'hooks';
import { useApp } from 'context';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const DeckDraw = ({ deck, setShow }) => {
  const { setShowFloatingButtons } = useApp();

  const cryptTotal = countCards(Object.values(deck.crypt));
  const cryptArr = getCardsArray(deck.crypt);
  const libraryArr = getCardsArray(deck.library);

  const drawCards = (cards, quantity) => {
    const restArray = [...cards];
    const drawArray = [];

    while (quantity > 0) {
      const randomId = getRandomInt(restArray.length);
      drawArray.push(restArray[randomId]);
      restArray.splice(randomId, 1);
      quantity -= 1;
    }
    return [drawArray, restArray];
  };

  const [showDrawModal, setShowDrawModal] = useState(false);
  const [libraryHandSize, setLibraryHandSize] = useState(7);
  const [cryptHandSize, setCryptHandSize] = useState(4);
  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState([]);
  const [drawedLibrary, setDrawedLibrary] = useState([]);
  const [burnedCrypt, setBurnedCrypt] = useState([]);
  const [burnedLibrary, setBurnedLibrary] = useState([]);
  const [initialTransfers, setInitialTransfers] = useState(undefined);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(deck.crypt, cryptTotal);

  const handleCloseDrawModal = () => {
    setShowDrawModal(false);
    setShow(false);
    setShowFloatingButtons(true);
  };

  const randomTransfers = () => {
    const t = [1, 2, 3, 4, 4];
    return t[getRandomInt(5)];
  };

  useEffect(() => {
    setInitialTransfers(randomTransfers());
    setCryptHandSize(4);
    setLibraryHandSize(7);
    setBurnedCrypt([]);
    setBurnedLibrary([]);
    setDrawedCrypt([]);
    setDrawedLibrary([]);
    setRestCrypt(cryptArr);
    setRestLibrary(libraryArr);
    setShowDrawModal(true);
    setShowFloatingButtons(false);
  }, []);

  const handleReDrawCrypt = () => {
    setInitialTransfers(randomTransfers());
    setCryptHandSize(4);
    const [draw, rest] = drawCards(cryptArr, 4);
    setDrawedCrypt(draw);
    setRestCrypt(rest);
    setBurnedCrypt([]);
  };

  const handleReDrawLibrary = () => {
    setLibraryHandSize(7);
    const [draw, rest] = drawCards(libraryArr, 7);
    setDrawedLibrary(draw);
    setRestLibrary(rest);
    setBurnedLibrary([]);
  };

  const handleCryptHandSize = (q) => {
    setCryptHandSize(cryptHandSize + q);
  };

  const handleLibraryHandSize = (q) => {
    setLibraryHandSize(libraryHandSize + q);
  };

  const burnCrypt = (index) => {
    const hand = drawedCrypt;
    setBurnedCrypt([...burnedCrypt, ...hand.splice(index, 1)]);
    setDrawedCrypt(hand);
    setCryptHandSize(cryptHandSize - 1);
  };

  const burnLibrary = (index) => {
    const hand = drawedLibrary;
    setBurnedLibrary([...burnedLibrary, ...hand.splice(index, 1)]);
    let newDrawedCards = [];
    let newRestCards = [];
    if (restLibrary.length > 0) {
      [newDrawedCards, newRestCards] = drawCards(restLibrary, 1);
    } else {
      setLibraryHandSize(libraryHandSize - 1);
    }
    const allDrawedCards = [...hand, ...newDrawedCards];
    setDrawedLibrary(allDrawedCards);
    setRestLibrary(newRestCards);
  };

  let burnedCapacityTotal = 0;
  burnedCrypt.map((card) => {
    burnedCapacityTotal += parseInt(card.Capacity);
  });

  let burnedPoolTotal = 0;
  let burnedBloodTotal = 0;

  burnedLibrary.map((card) => {
    if (card[BLOOD_COST] && !isNaN(card[BLOOD_COST])) {
      burnedBloodTotal += parseInt(card[BLOOD_COST]);
    }
    if (card[POOL_COST] && !isNaN(card[POOL_COST])) {
      burnedPoolTotal += parseInt(card[POOL_COST]);
    }
  });

  useEffect(() => {
    if (restCrypt) {
      if (drawedCrypt.length < cryptHandSize) {
        if (cryptHandSize - drawedCrypt.length <= restCrypt.length) {
          const diff = cryptHandSize - drawedCrypt.length;
          const [draw, rest] = drawCards(restCrypt, diff);
          setDrawedCrypt([...drawedCrypt, ...draw]);
          setRestCrypt(rest);
        }
      } else if (drawedCrypt.length > cryptHandSize) {
        const diff = drawedCrypt.length - cryptHandSize;
        const overhead = drawedCrypt.slice(-diff);
        setDrawedCrypt([...drawedCrypt.slice(0, drawedCrypt.length - diff)]);
        setRestCrypt([...restCrypt, ...overhead]);
      }
    }
  }, [restCrypt, cryptHandSize]);

  useEffect(() => {
    if (restLibrary) {
      if (drawedLibrary.length < libraryHandSize) {
        if (libraryHandSize - drawedLibrary.length <= restLibrary.length) {
          const diff = libraryHandSize - drawedLibrary.length;
          const [draw, rest] = drawCards(restLibrary, diff);
          setDrawedLibrary([...drawedLibrary, ...draw]);
          setRestLibrary(rest);
        }
      } else if (drawedLibrary.length > libraryHandSize) {
        const diff = drawedLibrary.length - libraryHandSize;
        const overhead = drawedLibrary.slice(-diff);
        setDrawedLibrary([
          ...drawedLibrary.slice(0, drawedLibrary.length - diff),
        ]);
        setRestLibrary([...restLibrary, ...overhead]);
      }
    }
  }, [restLibrary, libraryHandSize]);

  return (
    <>
      {showDrawModal && (
        <DeckDrawModal
          crypt={deck.crypt}
          library={deck.library}
          cryptTotal={cryptTotal}
          libraryTotal={libraryArr.length}
          initialTransfers={initialTransfers}
          drawedCrypt={drawedCrypt}
          drawedLibrary={drawedLibrary}
          handleReDrawCrypt={handleReDrawCrypt}
          handleReDrawLibrary={handleReDrawLibrary}
          handleCryptHandSize={handleCryptHandSize}
          handleLibraryHandSize={handleLibraryHandSize}
          burnCrypt={burnCrypt}
          burnedCrypt={burnedCrypt}
          burnLibrary={burnLibrary}
          burnedLibrary={burnedLibrary}
          restCrypt={restCrypt}
          restLibrary={restLibrary}
          show={showDrawModal}
          handleClose={handleCloseDrawModal}
          burnedCapacityTotal={burnedCapacityTotal}
          burnedPoolTotal={burnedPoolTotal}
          burnedBloodTotal={burnedBloodTotal}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
          nonKeyDisciplines={nonKeyDisciplines}
        />
      )}
    </>
  );
};

export default DeckDraw;
