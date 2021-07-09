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

  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [showDrawModal, setShowDrawModal] = useState(undefined);
  const [libraryHandSize, setLibraryHandSize] = useState(7);
  const [cryptHandSize, setCryptHandSize] = useState(4);
  const [cryptTotal, setCryptTotal] = useState(undefined);
  const [libraryTotal, setLibraryTotal] = useState(undefined);
  const [restCrypt, setRestCrypt] = useState(undefined);
  const [restLibrary, setRestLibrary] = useState(undefined);
  const [drawedCrypt, setDrawedCrypt] = useState([]);
  const [drawedLibrary, setDrawedLibrary] = useState([]);
  const [burnedCrypt, setBurnedCrypt] = useState([]);
  const [burnedLibrary, setBurnedLibrary] = useState([]);

  useEffect(() => {
    if (Object.keys(props.crypt).length > 0) {
      let total = 0;
      const arr = [];
      Object.keys(props.crypt).map((card) => {
        total += props.crypt[card].q;
        for (let i = 0; i < props.crypt[card].q; i++) {
          arr.push(props.crypt[card].c);
        }
      });
      setCryptTotal(total);
      setCrypt(arr);
      setRestCrypt(crypt);
    }
  }, [props.crypt]);

  useEffect(() => {
    if (Object.keys(props.library).length > 0) {
      let total = 0;
      const arr = [];
      Object.keys(props.library).map((card) => {
        total += props.library[card].q;
        for (let i = 0; i < props.library[card].q; i++) {
          arr.push(props.library[card].c);
        }
      });
      setLibraryTotal(total);
      setLibrary(arr);
      setRestLibrary(library);
    }
  }, [props.library]);

  useEffect(() => {
    if (restCrypt) {
      if (drawedCrypt.length < cryptHandSize) {
        const diff = cryptHandSize - drawedCrypt.length;
        const [draw, rest] = drawCards(restCrypt, diff);
        setDrawedCrypt([...drawedCrypt, ...draw]);
        setRestCrypt(rest);
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
        const diff = libraryHandSize - drawedLibrary.length;
        const [draw, rest] = drawCards(restLibrary, diff);
        setDrawedLibrary([...drawedLibrary, ...draw]);
        setRestLibrary(rest);
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

  const handleCloseDrawModal = () => {
    setShowDrawModal(false);
    isMobile && props.setShowButtons(false);
  };

  const handleOpenDraw = () => {
    setBurnedCrypt([]);
    setBurnedLibrary([]);
    setDrawedCrypt([]);
    setDrawedLibrary([]);
    setRestCrypt(crypt);
    setRestLibrary(library);
    setShowDrawModal(true);
  };

  const handleReDrawCrypt = () => {
    setCryptHandSize(4);
    const [draw, rest] = drawCards(crypt, 4);
    setDrawedCrypt(draw);
    setRestCrypt(rest);
    setBurnedCrypt([]);
  };

  const handleReDrawLibrary = () => {
    setLibraryHandSize(7);
    const [draw, rest] = drawCards(library, 7);
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
