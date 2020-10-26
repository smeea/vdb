import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ArrowClockwise from '../../assets/images/icons/arrow-clockwise.svg';

import DeckDrawModal from './DeckDrawModal.jsx';

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

  const [showDrawModal, setShowDrawModal] = useState(undefined);
  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState(undefined);
  const [drawedLibrary, setDrawedLibrary] = useState(undefined);

  const handleCloseDrawModal = () => setShowDrawModal(false);

  const handleOpenDraw = () => {
    const [drawedCrypt, restCrypt] = initialDrawCards(props.crypt, 4);
    const [drawedLibrary, restLibrary] = initialDrawCards(props.library, 7);
    if (drawedCrypt || drawedLibrary) {
      setDrawedCrypt(drawedCrypt);
      setDrawedLibrary(drawedLibrary);
      setRestCrypt(restCrypt);
      setRestLibrary(restLibrary);
      setShowDrawModal(true);
    } else {
      console.log('not enough cards for draw');
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
      <Button variant="outline-secondary" onClick={handleOpenDraw} block>
        <ArrowClockwise /> Draw
      </Button>
      {showDrawModal != null && (
        <DeckDrawModal
          drawedCrypt={drawedCrypt}
          drawedLibrary={drawedLibrary}
          handleReDrawCrypt={handleReDrawCrypt}
          handleReDrawLibrary={handleReDrawLibrary}
          handleDrawOneCrypt={handleDrawCryptOne}
          handleDrawOneLibrary={handleDrawLibraryOne}
          restCrypt={restCrypt}
          restLibrary={restLibrary}
          show={showDrawModal}
          handleClose={handleCloseDrawModal}
        />
      )}
    </>
  );
}

export default DeckDraw;
