import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cart4 from '../../assets/images/icons/cart4.svg';
import DeckMissingModal from './DeckMissingModal.jsx';

function DeckMissing(props) {
  const [showModal, setShowModal] = useState(undefined);
  const handleCloseModal = () => {
    setShowModal(false);
    props.setShowButtons(false);
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setShowModal(true)} block>
        <Cart4 /> Missing Cards
      </Button>
      {showModal && (
        <DeckMissingModal
          crypt={props.missingCrypt}
          library={props.missingLibrary}
          name={props.name}
          show={showModal}
          setShow={setShowModal}
          handleClose={handleCloseModal}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          isMobile={props.isMobile}
          isWide={props.isWide}
          setShowButtons={props.setShowButtons}
          cryptCardBase={props.cryptCardBase}
          libraryCardBase={props.libraryCardBase}
        />
      )}
    </>
  );
}

export default DeckMissing;
