import React, { useState, useEffect } from 'react';
import DeckDrawModal from './DeckDrawModal.jsx';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function DeckDraw(props) {
  const cryptArr = [];
  Object.keys(props.deck.crypt).map((card) => {
    for (let i = 0; i < props.deck.crypt[card].q; i++) {
      cryptArr.push(props.deck.crypt[card].c);
    }
  });

  const libraryArr = [];
  Object.keys(props.deck.library).map((card) => {
    for (let i = 0; i < props.deck.library[card].q; i++) {
      libraryArr.push(props.deck.library[card].c);
    }
  });

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

  const disciplinesDict = {};
  for (const card of Object.keys(props.deck.crypt)) {
    for (const d of Object.keys(props.deck.crypt[card].c['Disciplines'])) {
      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = 0;
        disciplinesDict[d] += props.deck.crypt[card].q;
      } else {
        disciplinesDict[d] += props.deck.crypt[card].q;
      }
    }
  }

  const disciplinesForSort = [];
  Object.keys(disciplinesDict).map((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] >= 5) {
        keyDisciplines += 1;
      }
    });

  const nonKeyDisciplinesList = [];
  for (let i = keyDisciplines; i < disciplinesSet.length; i++) {
    nonKeyDisciplinesList.push(disciplinesSet[i]);
  }

  let nonKeyDisciplines = 0;
  Object.keys(props.deck.crypt).map((card) => {
    let counter = 0;
    Object.keys(props.deck.crypt[card].c['Disciplines']).map((d) => {
      if (nonKeyDisciplinesList.includes(d)) {
        counter += 1;
      }
    });
    if (nonKeyDisciplines < counter) nonKeyDisciplines = counter;
  });

  const handleCloseDrawModal = () => {
    setShowDrawModal(false);
    props.setShow(false);
    props.setShowFloatingButtons(true);
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
    props.setShowFloatingButtons(false);
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
    burnedCapacityTotal += parseInt(card['Capacity']);
  });

  let burnedPoolTotal = 0;
  let burnedBloodTotal = 0;

  burnedLibrary.map((card) => {
    if (card['Blood Cost'] && !isNaN(card['Blood Cost'])) {
      burnedBloodTotal += parseInt(card['Blood Cost']);
    }
    if (card['Pool Cost'] && !isNaN(card['Pool Cost'])) {
      burnedPoolTotal += parseInt(card['Pool Cost']);
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
          crypt={props.deck.crypt}
          library={props.deck.library}
          cryptTotal={cryptArr.length}
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
}

export default DeckDraw;
