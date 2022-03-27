import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cart4 from 'assets/images/icons/cart4.svg';
import { ButtonIconed, DeckMissingModal } from 'components';
import { useApp } from 'context';

function DeckMissing(props) {
  const { isMobile } = useApp();
  const [showModal, setShowModal] = useState(undefined);
  const handleCloseModal = () => {
    setShowModal(false);
    isMobile && props.setShowButtons(false);
  };

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowModal(true)}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text={props.inDiff ? 'Differences' : 'Missing Cards'}
      />
      {showModal && (
        <DeckMissingModal
          deck={{
            ...props.deck,
            name: `Missing card for ${props.deck.name}`,
            crypt: props.missingCrypt,
            library: props.missingLibrary,
          }}
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
