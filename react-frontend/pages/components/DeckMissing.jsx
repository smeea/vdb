import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Cart4 from '../../assets/images/icons/cart4.svg';
import DeckMissingModal from './DeckMissingModal.jsx';
import AppContext from '../../context/AppContext.js';

function DeckMissing(props) {
  const { isMobile } = useContext(AppContext);
  const [showModal, setShowModal] = useState(undefined);
  const handleCloseModal = () => {
    setShowModal(false);
    isMobile && props.setShowButtons(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        <Cart4 /> {props.inDiff ? 'Show Changes' : 'Missing Cards'}
      </Button>
      {showModal && (
        <DeckMissingModal
          crypt={props.missingCrypt}
          library={props.missingLibrary}
          name={props.name}
          show={showModal}
          setShow={setShowModal}
          handleClose={handleCloseModal}
          setShowButtons={props.setShowButtons}
        />
      )}
    </>
  );
}

export default DeckMissing;
