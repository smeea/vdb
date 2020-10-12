import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ArrowClockwise from '../../assets/images/icons/arrow-clockwise.svg';

import DeckDrawCryptModal from './DeckDrawCryptModal.jsx';
import DeckDrawLibraryModal from './DeckDrawLibraryModal.jsx';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function DeckDraw(props) {
  const initialDrawCards = (cards, quantity) => {
    let cardsTotal = 0;
    for (const i of Object.keys(cards)) {
      cardsTotal += cards[i].q;
    }

    if (quantity <= cardsTotal) {
      const restArray = [];
      const drawArray = [];

      Object.keys(cards).map((card) => {
        let q = cards[card].q;
        while (q > 0) {
          q -= 1;
          restArray.push(cards[card].c);
        }
      });

      while (quantity > 0) {
        const randomId = getRandomInt(restArray.length);
        drawArray.push(restArray[randomId]);
        restArray.splice(randomId, 1);
        quantity -= 1;
      }

      return [drawArray, restArray];
    } else {
      return [null, null];
    }
  };

  const drawCards = (cards, quantity) => {
    const restArray = cards;
    const drawArray = [];

    while (quantity > 0) {
      const randomId = getRandomInt(restArray.length);
      drawArray.push(restArray[randomId]);
      restArray.splice(randomId, 1);
      quantity -= 1;
    }
    return [drawArray, restArray];
  };

  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState(undefined);
  const [drawedLibrary, setDrawedLibrary] = useState(undefined);
  const [showDrawCryptModal, setShowDrawCryptModal] = useState(false);
  const [showDrawLibraryModal, setShowDrawLibraryModal] = useState(false);

  const handleCloseDrawCryptModal = () => setShowDrawCryptModal(false);
  const handleCloseDrawLibraryModal = () => setShowDrawLibraryModal(false);

  const handleOpenDrawCrypt = () => {
    const [drawedCards, restCards] = initialDrawCards(props.crypt, 4);
    if (drawedCards) {
      setDrawedCrypt(drawedCards);
      setRestCrypt(restCards);
      setShowDrawCryptModal(true);
    } else {
      console.log('crypt < 4 cards');
    }
  };

  const handleOpenDrawLibrary = () => {
    const [drawedCards, restCards] = initialDrawCards(props.library, 7);
    if (drawedCards) {
      setDrawedLibrary(drawedCards);
      setRestLibrary(restCards);
      setShowDrawLibraryModal(true);
    } else {
      console.log('library < 7 cards');
    }
  };

  const handleReDrawCrypt = () => {
    const allCards = [...drawedCrypt, ...restCrypt];
    const [drawedCards, restCards] = drawCards(allCards, 4);
    setDrawedCrypt(drawedCards);
    setRestCrypt(restCards);
  };

  const handleReDrawLibrary = () => {
    const allCards = [...drawedLibrary, ...restLibrary];
    const [drawedCards, restCards] = drawCards(allCards, 7);
    setDrawedLibrary(drawedCards);
    setRestLibrary(restCards);
  };

  const handleDrawCryptOne = () => {
    let newDrawedCards = [];
    let newRestCards = [];
    if (restCrypt.length > 0) {
      [newDrawedCards, newRestCards] = drawCards(restCrypt, 1);
    } else {
      console.log('no more cards to draw');
    }
    const allDrawedCards = [...drawedCrypt, ...newDrawedCards];
    setDrawedCrypt(allDrawedCards);
    setRestCrypt(newRestCards);
  };

  const handleDrawLibraryOne = () => {
    let newDrawedCards = [];
    let newRestCards = [];
    if (restLibrary.length > 0) {
      [newDrawedCards, newRestCards] = drawCards(restLibrary, 1);
    } else {
      console.log('no more cards to draw');
    }
    const allDrawedCards = [...drawedLibrary, ...newDrawedCards];
    setDrawedLibrary(allDrawedCards);
    setRestLibrary(newRestCards);
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleOpenDrawCrypt}>
        <ArrowClockwise /> Draw Crypt
      </Button>
      <Button variant="outline-secondary" onClick={handleOpenDrawLibrary}>
        <ArrowClockwise /> Draw Library
      </Button>
      <br />
      {showDrawCryptModal != null && (
        <DeckDrawCryptModal
          handleReDraw={handleReDrawCrypt}
          handleDrawOne={handleDrawCryptOne}
          handleClose={handleCloseDrawCryptModal}
          drawedCards={drawedCrypt}
          restCards={restCrypt}
          show={showDrawCryptModal}
        />
      )}
      {drawedLibrary != null && (
        <DeckDrawLibraryModal
          handleReDraw={handleReDrawLibrary}
          handleDrawOne={handleDrawLibraryOne}
          handleClose={handleCloseDrawLibraryModal}
          drawedCards={drawedLibrary}
          restCards={restLibrary}
          show={showDrawLibraryModal}
        />
      )}
    </>
  );
}

export default DeckDraw;
