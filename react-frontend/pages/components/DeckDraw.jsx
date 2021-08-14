import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Dice3 from '../../assets/images/icons/dice-3-fill.svg';
import DeckDrawModal from './DeckDrawModal.jsx';
import AppContext from '../../context/AppContext.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function DeckDraw(props) {
  const { isMobile } = useContext(AppContext);

  const cryptArr = [];
  Object.keys(props.crypt).map((card) => {
    for (let i = 0; i < props.crypt[card].q; i++) {
      cryptArr.push(props.crypt[card].c);
    }
  });

  const libraryArr = [];
  Object.keys(props.library).map((card) => {
    for (let i = 0; i < props.library[card].q; i++) {
      libraryArr.push(props.library[card].c);
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

  const [showDrawModal, setShowDrawModal] = useState(undefined);
  const [libraryHandSize, setLibraryHandSize] = useState(7);
  const [cryptHandSize, setCryptHandSize] = useState(4);
  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState([]);
  const [drawedLibrary, setDrawedLibrary] = useState([]);
  const [burnedCrypt, setBurnedCrypt] = useState([]);
  const [burnedLibrary, setBurnedLibrary] = useState([]);

  const handleCloseDrawModal = () => {
    setShowDrawModal(false);
    isMobile && props.setShowButtons(false);
  };

  const handleOpenDraw = () => {
    setCryptHandSize(4);
    setLibraryHandSize(7);
    setBurnedCrypt([]);
    setBurnedLibrary([]);
    setDrawedCrypt([]);
    setDrawedLibrary([]);
    setRestCrypt(cryptArr);
    setRestLibrary(libraryArr);
    setShowDrawModal(true);
  };

  const handleReDrawCrypt = () => {
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
      <Button variant="outline-secondary" onClick={handleOpenDraw} block>
        <Dice3 /> Draw Cards
      </Button>
      {showDrawModal && (
        <DeckDrawModal
          crypt={props.crypt}
          library={props.library}
          cryptTotal={cryptArr.length}
          libraryTotal={libraryArr.length}
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
          setShowButtons={props.setShowButtons}
          burnedPoolTotal={burnedPoolTotal}
          burnedBloodTotal={burnedBloodTotal}
        />
      )}
    </>
  );
}

export default DeckDraw;
