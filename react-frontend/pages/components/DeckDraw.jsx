import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Dice3 from '../../assets/images/icons/dice-3-fill.svg';
import DeckDrawModal from './DeckDrawModal.jsx';
import AppContext from '../../context/AppContext.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function DeckDraw(props) {
  const { isMobile } = useContext(AppContext);
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
      return [[], []];
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
  const [cryptTotal, setCryptTotal] = useState(undefined);
  const [libraryTotal, setLibraryTotal] = useState(undefined);
  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState(undefined);
  const [drawedLibrary, setDrawedLibrary] = useState(undefined);
  const [burnedCrypt, setBurnedCrypt] = useState([]);
  const [burnedLibrary, setBurnedLibrary] = useState([]);

  const handleCloseDrawModal = () => {
    setShowDrawModal(false);
    isMobile && props.setShowButtons(false);
  };

  const handleOpenDraw = () => {
    setBurnedCrypt([]);
    setBurnedLibrary([]);

    const [drawedCrypt, restCrypt] = initialDrawCards(props.crypt, 4);
    setDrawedCrypt(drawedCrypt);
    setRestCrypt(restCrypt);
    setCryptTotal(restCrypt.length + drawedCrypt.length);

    const [drawedLibrary, restLibrary] = initialDrawCards(props.library, 7);
    setDrawedLibrary(drawedLibrary);
    setRestLibrary(restLibrary);
    setLibraryTotal(restLibrary.length + drawedLibrary.length);

    if (drawedCrypt || drawedLibrary) {
      setShowDrawModal(true);
    }
  };

  const handleReDrawCrypt = () => {
    const allCards = [...drawedCrypt, ...restCrypt, ...burnedCrypt];
    const [drawedCards, restCards] = drawCards(allCards, 4);
    setDrawedCrypt(drawedCards);
    setRestCrypt(restCards);
    setBurnedCrypt([]);
  };

  const handleReDrawLibrary = () => {
    const allCards = [...drawedLibrary, ...restLibrary, ...burnedLibrary];
    const [drawedCards, restCards] = drawCards(allCards, 7);
    setDrawedLibrary(drawedCards);
    setRestLibrary(restCards);
    setBurnedLibrary([]);
  };

  const handleDrawCryptOne = () => {
    let newDrawedCards = [];
    let newRestCards = [];
    if (restCrypt.length > 0) {
      [newDrawedCards, newRestCards] = drawCards(restCrypt, 1);
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
    }
    const allDrawedCards = [...drawedLibrary, ...newDrawedCards];
    setDrawedLibrary(allDrawedCards);
    setRestLibrary(newRestCards);
  };

  const burnCrypt = (index) => {
    const hand = drawedCrypt;
    setBurnedCrypt([...burnedCrypt, ...hand.splice(index, 1)]);
    setDrawedCrypt(hand);
  };

  const burnLibrary = (index) => {
    const hand = drawedLibrary;
    setBurnedLibrary([...burnedLibrary, ...hand.splice(index, 1)]);
    let newDrawedCards = [];
    let newRestCards = [];
    if (restLibrary.length > 0) {
      [newDrawedCards, newRestCards] = drawCards(restLibrary, 1);
    }
    const allDrawedCards = [...hand, ...newDrawedCards];
    setDrawedLibrary(allDrawedCards);
    setRestLibrary(newRestCards);
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleOpenDraw} block>
        <Dice3 /> Draw Cards
      </Button>
      {showDrawModal && (
        <DeckDrawModal
          crypt={props.crypt}
          library={props.library}
          cryptTotal={cryptTotal}
          libraryTotal={libraryTotal}
          drawedCrypt={drawedCrypt}
          drawedLibrary={drawedLibrary}
          handleReDrawCrypt={handleReDrawCrypt}
          handleReDrawLibrary={handleReDrawLibrary}
          handleDrawOneCrypt={handleDrawCryptOne}
          handleDrawOneLibrary={handleDrawLibraryOne}
          burnCrypt={burnCrypt}
          burnedCrypt={burnedCrypt}
          burnLibrary={burnLibrary}
          burnedLibrary={burnedLibrary}
          restCrypt={restCrypt}
          restLibrary={restLibrary}
          show={showDrawModal}
          handleClose={handleCloseDrawModal}
          setShowButtons={props.setShowButtons}
        />
      )}
    </>
  );
}

export default DeckDraw;
