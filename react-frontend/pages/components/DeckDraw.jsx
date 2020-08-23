import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ResultLibrary from './ResultLibrary.jsx';
import DeckDrawCryptModal from './DeckDrawCryptModal.jsx';
import DeckDrawLibraryModal from './DeckDrawLibraryModal.jsx';

function DeckDraw(props) {
  const drawCards = (cards, quantity) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let cards_total = 0;
    for (const i of Object.keys(cards)) {
      cards_total += cards[i].q;
    }

    if (quantity <= cards_total) {
      const cards_array = [];
      const draw_array = [];

      Object.keys(cards).map((card) => {
        let q = cards[card].q;
        while (q > 0) {
          q -= 1;
          cards_array.push(cards[card].c);
        }
      });

      while (quantity > 0) {
        let random_card = getRandomInt(cards_array.length);
        while (cards_array[random_card] === undefined ) {
          random_card = getRandomInt(cards_array.length);
        }
        draw_array.push(cards_array[random_card]);
        delete cards_array[random_card];
        quantity -= 1;
      }

      return(draw_array);
    } else {
      return(null);
    }
  };

  const [drawedCrypt, setDrawedCrypt] = useState(undefined);
  const [drawedLibrary, setDrawedLibrary] = useState(undefined);

  const handleDrawCrypt = () => {
    const cards = drawCards(props.crypt, 4);
    setDrawedCrypt(cards);
  };

  const handleDrawLibrary = () => {
    const cards = drawCards(props.library, 7);
    setDrawedLibrary(cards);
  };

  const handleDrawCryptOne = () => {
    const cards = [... drawedCrypt];
    cards.push(... drawCards(props.crypt, 1));
    setDrawedCrypt(cards);
  };

  const handleDrawLibraryOne = () => {
    const cards = [... drawedLibrary];
    cards.push(... drawCards(props.library, 1));
    setDrawedLibrary(cards);
  };

  const handleOpenDrawCrypt = () => {
    const cards = drawCards(props.crypt, 4);
    setDrawedCrypt(cards);
    setShowDrawCryptModal(true);
  };

  const handleOpenDrawLibrary = () => {
    const cards = drawCards(props.library, 7);
    setDrawedLibrary(cards);
    setShowDrawLibraryModal(true);
  };

  const [showDrawCryptModal, setShowDrawCryptModal] = useState(false);
  const [showDrawLibraryModal, setShowDrawLibraryModal] = useState(false);

  const handleCloseDrawCryptModal = () => setShowDrawCryptModal(false);
  const handleCloseDrawLibraryModal = () => setShowDrawLibraryModal(false);

  return(
    <React.Fragment>
      <Button variant='outline-primary' onClick={handleOpenDrawCrypt}>
        Draw Crypt
      </Button>
      <Button variant='outline-primary' onClick={handleOpenDrawLibrary}>
        Draw Library
      </Button>
      <br />
      {showDrawCryptModal != null &&
       <DeckDrawCryptModal handleDraw={handleDrawCrypt} handleDrawOne={handleDrawCryptOne} handleClose={handleCloseDrawCryptModal} cards={drawedCrypt} show={showDrawCryptModal} />
      }
      {drawedLibrary != null &&
       <DeckDrawLibraryModal handleDraw={handleDrawLibrary} handleDrawOne={handleDrawLibraryOne} handleClose={handleCloseDrawLibraryModal} cards={drawedLibrary} show={showDrawLibraryModal} />
      }
    </React.Fragment>
  );
}

export default DeckDraw;
