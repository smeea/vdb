import React, { useState } from 'react';
import Cart4 from 'assets/images/icons/cart4.svg';
import { ButtonIconed, DeckMissingModal } from 'components';
import { useApp } from 'context';

const DeckMissing = ({ deck, missingCrypt, missingLibrary, inDiff }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showModal, setShowModal] = useState(undefined);
  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowModal(true)}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text={inDiff ? 'Differences' : 'Missing Cards'}
      />
      {showModal && (
        <DeckMissingModal
          deck={{
            ...deck,
            name: `Missing card for ${deck.name}`,
            crypt: missingCrypt,
            library: missingLibrary,
          }}
          show={showModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default DeckMissing;
