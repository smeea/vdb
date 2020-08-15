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
        let random_num = getRandomInt(cards_array.length);
        while (cards_array[random_num] === undefined ) {
          random_num = getRandomInt(cards_array.length);
        }
        draw_array.push(cards_array[random_num]);
        delete cards_array[random_num];
        quantity -= 1;
      }

      return(draw_array);
    } else {
      return(null);
    }
  };

  const [drawedCrypt, setDrawCrypt] = useState(undefined);
  const [drawedLibrary, setDrawLibrary] = useState(undefined);

  const handleDrawCryptButton = () => {
    setDrawCrypt(drawCards(props.crypt, 4));
    setShowDrawCrypt(true);
  };

  const handleDrawLibraryButton = () => {
    setDrawLibrary(drawCards(props.library, 7));
    setShowDrawLibrary(true);
  };

  const [showDrawLibrary, setShowDrawLibrary] = useState(false);
  const [showDrawCrypt, setShowDrawCrypt] = useState(false);

  const handleCloseDrawCrypt = () => setShowDrawCrypt(false);
  const handleCloseDrawLibrary = () => setShowDrawLibrary(false);

  return(
    <React.Fragment>
      <Button variant='outline-primary' onClick={handleDrawCryptButton}>
        Draw Crypt
      </Button>

      <Button variant='outline-primary' onClick={handleDrawLibraryButton}>
        Draw Library
      </Button>
      <br />
      {drawedCrypt != null &&
       <DeckDrawCryptModal handleDraw={handleDrawCryptButton} handleClose={handleCloseDrawCrypt} show={showDrawCrypt} cards={drawedCrypt} />
      }
      {drawedLibrary != null &&
       <DeckDrawLibraryModal handleDraw={handleDrawLibraryButton} handleClose={handleCloseDrawLibrary} show={showDrawLibrary} cards={drawedLibrary} />
      }
    </React.Fragment>
  );
}

export default DeckDraw;
